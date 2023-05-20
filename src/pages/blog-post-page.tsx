import React from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo/seo'
import Layout from '../components/blog-posts/blogpost-layout'
import ArticlePreview from '../components/blog-posts/article-preview'
import Hero from '../components/hero/hero'

type BlogIndexProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  location: string
}

const BlogIndex = ({ data }: BlogIndexProps) => {
  const posts = data.allContentfulBlogPosts.nodes

  return (
    <>
      <Layout>
        <Seo title="Blog" />
        <Hero title="Blog" />
        <ArticlePreview posts={posts} />
      </Layout>
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPosts(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        heroImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
