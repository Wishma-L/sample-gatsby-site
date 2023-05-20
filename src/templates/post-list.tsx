/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { graphql, Link } from 'gatsby'
import MainLayout from '../components/main-layout'

type PostListProps = {
  data: any
  pageContext: any
}

const PostList = ({ data, pageContext }: PostListProps) => {
  const { currentPage, numPostsPages } = pageContext //from here we can get the data passed in context field in gatsby-node.ts
  const prevPagePath =
    currentPage - 1 === 1 ? '/posts/' : '/posts/' + (currentPage - 1).toString()
  const nextPagePath = '/posts/' + (currentPage + 1).toString()

  const getPageNumberPath = (currentIndex: number) => {
    if (currentIndex === 0) {
      return '/posts'
    }
    return '/posts/' + (currentIndex + 1)
  }

  return (
    <MainLayout>
      <ul>
        {data.allPosts.nodes.map((post: Post) => (
          <Link key={post.id} to={`/postpage/${post.title}`}>
            <li key={post.id}> {post.title}</li>
          </Link>
        ))}
      </ul>
      <br />
      <Link to={prevPagePath} rel="prev">
        &larr Previous page
      </Link>
      {Array.from({ length: numPostsPages }, (_, i) => {
        return (
          <Link key={i + 1} to={getPageNumberPath(i)}>
            {i + 1}
          </Link>
        )
      })}
      <Link to={nextPagePath} rel="next">
        &rarr Next page
      </Link>
    </MainLayout>
  )
}

export default PostList

export const query = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allPosts(limit: $limit, skip: $skip) {
      nodes {
        body
        title
        userId
        id
      }
    }
  }
`
