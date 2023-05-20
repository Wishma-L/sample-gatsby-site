/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from 'path'

exports.createPages = async ({ graphql, actions, reporter }: any) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/post-template.tsx`)
  const blogTemplate = path.resolve(`./src/templates/blog-template.tsx`)
  const postsPage = path.resolve(`./src/templates/post-list.tsx`)
  const blogsPage = path.resolve(`./src/templates/blog-list.tsx`)
  const blogPost = path.resolve('./src/templates/blog-post.tsx')

  const itemsPerPage = 6

  const result = await graphql(`
    {
      allPosts {
        nodes {
          id
          title
          body
        }
      }
      allContentfulCloudaPosts {
        nodes {
          title
          subTitle
          identity
          text {
            raw
          }
        }
      }
      allContentfulBlogPosts {
        nodes {
          title
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading data`, result.errors)
    return
  }

  const blogs = result.data.allContentfulCloudaPosts.nodes
  const posts = result.data.allPosts.nodes
  const blogPosts = result.data.allContentfulBlogPosts.nodes

  const numPostsPages = Math.ceil(posts.length / itemsPerPage)
  const numBlogsPages = Math.ceil(blogs.length / itemsPerPage)

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  return Promise.all([
    // For blog-single items
    blogs.map((node: Blog) => {
      createPage({
        path: `/blogpage/${node.identity}`,
        component: blogTemplate,
        context: {
          identity: node.identity,
        },
      })
    }),
    // For post-single items
    posts.map((node: Post) => {
      createPage({
        path: `/postpage/${node.title}`,
        component: postTemplate,
        context: {
          title: node.title,
        },
      })
    }),
    // For post-list pages
    Array.from({ length: numPostsPages }).map((_, i) => {
      createPage({
        path: i === 0 ? `/posts` : `/posts/${i + 1}`,
        component: postsPage,
        context: {
          limit: itemsPerPage,
          skip: i * itemsPerPage,
          numPostsPages,
          currentPage: i + 1,
        },
      })
    }),
    // For blog-list pages
    Array.from({ length: numBlogsPages }).map((_, i) => {
      createPage({
        path: i === 0 ? `/blogs` : `/blogs/${i + 1}`,
        component: blogsPage,
        context: {
          limit: itemsPerPage,
          skip: i * itemsPerPage,
        },
      })
    }),
    // blog-post pages
    blogPosts.forEach((post: CloudaPost, index: number) => {
      const previousPostSlug = index === 0 ? null : blogPosts[index - 1].slug
      const nextPostSlug =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    }),
    actions.createPage({
      path: '/dsg',
      component: path.resolve('src/templates/dsg.tsx'),
      defer: true,
    }),
    //
  ])
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

exports.onCreatePage = async ({ page, actions }: any) => {
  const { createPage } = actions
  if (page.path.match(/^\/app/)) {
    page.matchPath = '/app/*'
    createPage(page)
  }
  if (page.path.match(/^\/blog-app/)) {
    page.matchPath = '/blog-app/*'
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ actions }: any) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        os: false,
        fs: false,
        // "tls": false,
        // "net": false,
        path: false,
        // "zlib": false,
        // "http": false,
        // "https": false,
        // "stream": false,
        // "crypto": false,
        // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
      },
    },
  })
}

// using Gatsby Type Builder API
exports.createSchemaCustomization = ({ actions, schema }: any) => {
  const { createTypes } = actions
  const typeDefs = [
    schema.buildObjectType({
      name: 'Frontmatter',
      fields: {
        title: {
          type: 'String!',
          resolve(parent: { title: any }) {
            return parent.title || '(Untitled)'
          },
        },
        author: {
          type: 'AuthorJson',
          extensions: {
            link: {},
          },
        },
        date: {
          type: 'Date!',
          extensions: {
            dateformat: {},
          },
        },
        published: 'Boolean!',
        tags: '[String!]!',
      },
    }),
    schema.buildObjectType({
      name: 'TeamMember',
      fields: {
        fullName: {
          type: 'String',
          resolve(parent: any) {
            return parent.firstName + ' ' + parent.lastName || '(Untitled)'
          },
        },
      },
      interfaces: ['Node'],
      extensions: {
        infer: true,
      },
    }),
    schema.buildObjectType({
      name: 'AuthorJson',
      fields: {
        name: 'String!',
        birthday: {
          type: 'Date!',
          extensions: {
            dateformat: {
              locale: 'ru',
            },
          },
        },
      },
      interfaces: ['Node'],
      extensions: {
        infer: false,
      },
    }),
  ]
  createTypes(typeDefs)
}
