import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import * as blogStyles from '../styles/blog-template.module.css'
import AuthorDetails from '../components/templates/blog_template/meta_data/author-details.tsx'
import CommentSection from '../components/templates/blog_template/blog_data/comment-section'
import SidePanel from '../components/templates/blog_template/blog_data/side-panel'
import SharingSection from '../components/templates/blog_template/blog_data/sharing-section'
import MainLayout from '../components/main-layout'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Blog = ({ data }: any) => {
  const options = {
    renderMark: {
      [MARKS.UNDERLINE]: (text: string) => {
        return <span className="underline">{text}</span>
      },
      [MARKS.BOLD]: (text: string) => <b>{text}</b>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (children: unknown) => {
        return <h1 className="h1">{children}</h1>
      },
      [BLOCKS.HEADING_3]: (children: unknown) => {
        return <h3 className="h3 text-sky-600">{children}</h3>
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        if (node.data.target) {
          const { name, title, heroImage } = node.data.target
          return (
            <>
              <p>Author: {name}</p>
              <GatsbyImage alt={''} image={getImage(heroImage)} />
              <br />
              <h4>person {title}</h4>
            </>
          )
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [INLINES.EMBEDDED_ENTRY]: (node: any, children: unknown) => {
        if (node) {
          const { name, title, heroImage } = node.data.target
          return (
            <>
              <div>{children}</div>
              <p>Author: {name}</p>
              <GatsbyImage alt={''} image={getImage(heroImage)} />
              <br />
              <h4>person {title}</h4>
            </>
          )
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        if (node) {
          return (
            <>
              <GatsbyImage
                image={getImage(node.data.target)}
                alt={node.data.target.description}
              />
            </>
          )
        }
      },
    },
  }

  const metaDataOption = {
    renderMark: {
      [MARKS.UNDERLINE]: (text: string) => (
        <span className="underline">{text}</span>
      ),
      [MARKS.BOLD]: (text: string) => <b>{text}</b>,
      [MARKS.CODE]: (text: string) => <code>{text}</code>,
      [MARKS.ITALIC]: (text: string) => <p>{text}</p>,
    },
    renderNode: {
      // Blocks
      [BLOCKS.HEADING_1]: (children: unknown) => {
        return <h1 className="h1">{children}</h1>
      },
      [BLOCKS.HEADING_2]: (children: unknown) => {
        return <h3 className="h2 text-sky-600">{children}</h3>
      },
      [BLOCKS.HEADING_3]: (children: unknown) => {
        return <h3 className="h3 text-sky-600">{children}</h3>
      },
      [BLOCKS.HEADING_4]: (children: unknown) => {
        return <h4 className="h4">{children}</h4>
      },
      [BLOCKS.PARAGRAPH]: (children: unknown) => {
        return <p>{children}</p>
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        if (node) {
          return (
            <>
              <div className="blogStyles.authorContainer">
                <GatsbyImage
                  imgStyle={{ borderRadius: `50%` }}
                  image={getImage(node.data.target)}
                  alt={node.data.target.description}
                />
              </div>
            </>
          )
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [BLOCKS.QUOTE]: (node: any) => {
        if (node) {
          return <></>
        }
      },
      // Inlines
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        if (node) {
          const { name, title, heroImage } = node.data.target
          return (
            <AuthorDetails name={name} title={title} heroImage={heroImage} />
          )
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [INLINES.HYPERLINK]: (node: any, children: unknown) => {
        if (node) {
          const { uri } = node.data
          return (
            <a href={uri} className="underline">
              {children}
            </a>
          )
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [INLINES.ASSET_HYPERLINK]: (node: any, children: unknown) => {
        if (node) {
          const { uri } = node.data
          return (
            <a href={uri} className="underline">
              {children}
            </a>
          )
        }
      },
      [INLINES.ENTRY_HYPERLINK]: () => {
        return <></>
      },
    },
  }

  return (
    <MainLayout>
      <div className={blogStyles.container}>
        <SidePanel />
        <div className={blogStyles.meta}>
          <div className={blogStyles.info}>
            {renderRichText(data.post.postMetaData, metaDataOption)}
            <SharingSection />
          </div>
        </div>
        <main className={blogStyles.article}>
          {renderRichText(data.post.text, options)}
          <div className="mt-8">
            <CommentSection />
          </div>
        </main>
      </div>
    </MainLayout>
  )
}

export default Blog

export const query = graphql`
  query SingleBlogQuery($identity: Int, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    post: contentfulCloudaPosts(identity: { eq: $identity }) {
      title
      subTitle
      identity
      image {
        gatsbyImageData
      }
      text {
        raw
        references {
          ... on ContentfulAsset {
            id
            contentful_id
            gatsbyImageData(height: 400, width: 600)
            description
            title
            __typename
          }
        }
      }
      postMetaData {
        raw
        references {
          ... on ContentfulPerson {
            contentful_id
            name
            title
            heroImage {
              gatsbyImageData(height: 80, width: 80)
            }
          }
        }
      }
    }
  }
`
