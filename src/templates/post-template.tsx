import React from 'react'
import { graphql } from 'gatsby'
import MainLayout from '../components/main-layout'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Post = ({ data }: any) => {
  return (
    <MainLayout>
      <h1>Title: {data.posts.title}</h1>
      <h2>Description: {data.posts.body}</h2>
      <h3>UserId: {data.posts.id}</h3>
    </MainLayout>
  )
}

export default Post

export const query = graphql`
  query SinglePostQuery($title: String) {
    posts(title: { eq: $title }) {
      id
      title
      body
    }
  }
`
