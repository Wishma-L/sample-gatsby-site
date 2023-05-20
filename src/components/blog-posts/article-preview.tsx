import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Container from './container'
import * as styles from '../../styles/article-preview.module.css'

type Post = {
  slug: string
}

type PostArrayType = {
  posts: [Post]
}

const ArticlePreview = ({ posts }: PostArrayType) => {
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {posts.map((post: any) => {
        return (
          <div key={posts.indexOf(post)}>
            <Container>
              <ul className={styles.articleList}>
                <div>{post.slug}</div>
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className={styles.link}>
                    <GatsbyImage
                      alt=""
                      image={post.heroImage?.gatsbyImageData}
                    />
                    <h2 className={styles.title}>{post.title}</h2>
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.description?.childMarkdownRemark.html,
                    }}
                  />
                  <div className={styles.meta}>
                    <small className="meta">{post.publishDate}</small>
                  </div>
                </li>
              </ul>
            </Container>
          </div>
        )
      })}
    </>
  )
}

export default ArticlePreview
