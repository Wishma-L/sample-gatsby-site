import React from 'react'
import { Link, graphql } from 'gatsby'

import BlogPostLayout from '../components/blog-posts/blogpost-layout'
import Seo from '../components/seo/seo'
import Hero from '../components/hero/hero'
import * as styles from '../styles/blog-post.module.css'
import MainLayout from '../components/main-layout'

type BlogPostTemplateProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const BlogPostTemplate = ({ data }: BlogPostTemplateProps) => {
  const post = data.contentfulBlogPosts
  const previous = data.previous
  const next = data.next

  return (
    <MainLayout>
      <BlogPostLayout>
        <Seo
          title={post.title}
          description={post.description?.childMarkdownRemark?.excerpt}
          image={`http:${post.heroImage.resize.src}`}
        />
        <Hero
          title={post.title}
          content={post.description?.childMarkdownRemark?.excerpt}
        />
        <div className={styles.container}>
          <span className={styles.meta}>
            {post.author?.name} &middot{' '}
            <time dateTime={post.rawDate}>{post.publishDate}</time> –{' '}
            {post.body?.childMarkdownRemark?.timeToRead} minute read
          </span>
          <div className={styles.article}>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{
                __html: post.body?.childMarkdownRemark?.html,
              }}
            />
            {(previous || next) && (
              <nav>
                <ul className={styles.articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/blog/${previous.slug}`} rel="prev">
                        ← {previous.title}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/blog/${next.slug}`} rel="next">
                        {next.title} →
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </BlogPostLayout>
    </MainLayout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBlogPosts(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
      description {
        childMarkdownRemark {
          excerpt
        }
      }
    }
    previous: contentfulBlogPosts(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPosts(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
