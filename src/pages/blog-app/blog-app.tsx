import React from "react"
import { Router } from "@reach/router"
import NotFoundTag from "../../components/client-only-components/not-found-tag"
import MainLayout from "../../components/main-layout"
import FullBlogList from "../../components/client-only-components/full-blog-list"
import PaginatedBlogList from "../../components/client-only-components/paginated-blog-list.tsx"
import { graphql } from "gatsby"
import BlogWithComment from "../../components/client-only-components/blog-with-comment"

const BlogApp = () => {

  return (
    <MainLayout>
      <Router basepath="/blog-app">
        <FullBlogList path="/blog-list" />
        <NotFoundTag path="/not-found" />
        <PaginatedBlogList path="/paginated-blog-list"/>
        <BlogWithComment path="/blog-with-comments"/>
        {/* blog-with-comments */}
      </Router>
    </MainLayout>
  )
}

export default BlogApp

export const query = graphql`
  query QueryBlogPaginationNotFound($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
` 
