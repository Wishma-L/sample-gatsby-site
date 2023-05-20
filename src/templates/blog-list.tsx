/* eslint-disable @typescript-eslint/no-explicit-any */
import { graphql, Link } from 'gatsby'
import React, { useState } from 'react'
import BlogCard from '../components/blogs/blog-card'
// import Pagination from '../components/blogs/pagination'
import TagSelectorParams from '../components/blogs/tag-selector-params'
import MainLayout from '../components/main-layout'

type BlogListProps = {
  data: any
  pageContext: any
}

const BlogList = ({ data }: BlogListProps) => {
  const currentPage: number = data.posts.pageInfo.currentPage
  const numBlogsPages: number = data.posts.pageInfo.pageCount
  const hasNextPage: boolean = data.posts.pageInfo.hasNextPage
  const hasPreviousPage: boolean = data.posts.pageInfo.hasPreviousPage

  const prevPagePath =
    currentPage > 1
      ? currentPage === 2
        ? '/blogs'
        : '/blogs/' + (currentPage - 1).toString()
      : '/blogs'
  const nextPagePath =
    currentPage < numBlogsPages
      ? '/blogs/' + (currentPage + 1).toString()
      : currentPage === 1
      ? '/blogs'
      : '/blogs/' + currentPage.toString()

  const getPageNumberPath = (currentIndex: number) => {
    if (currentIndex === 1) {
      return '/blogs'
    } else if (currentIndex === currentPage) {
      return '/blogs/' + currentPage.toString()
    } else {
      return '/blogs/' + currentIndex
    }
  }

  const initTagState = {
    name: '',
    id: '',
  }

  const [_state, setState] = useState({
    selectedTag: initTagState,
  })

  const setTheSelectedTag = (tag: Tag) => {
    setState({ selectedTag: tag })
  }

  const handleTag = (tag: Tag) => {
    const tagGroups: [TagGroupType] = data.postTags.group
    if (JSON.stringify(tag) !== JSON.stringify(initTagState)) {
      const requiredGroup = tagGroups.find((group: TagGroupType) => {
        return group.fieldValue === tag.name
      })
      return requiredGroup?.nodes
    } else {
      return data.posts.nodes
    }
  }

  return (
    <MainLayout>
      <div className="text-center">
        {hasPreviousPage && (
          <Link to={prevPagePath} rel="prev" className="no-underline">
            &larr; Previous page
          </Link>
        )}
        {Array.from({ length: numBlogsPages }, (_, i) => {
          return (
            <Link
              key={i + 1}
              className="no-underline"
              to={getPageNumberPath(i + 1)}
            >
              {i + 1}
            </Link>
          )
        })}
        {hasNextPage && (
          <Link to={nextPagePath} rel="next" className="no-underline">
            &rarr; Next page
          </Link>
        )}
      </div>

      {/* //TODO: Add styling to pagination */}
      {/* <Pagination /> */}

      <TagSelectorParams
        tags={data.tags.nodes}
        setTheSelectedTag={setTheSelectedTag}
      />

      {/* <h2>{_state.selectedTag.name !== "" && _state.selectedTag}</h2> */}

      <div className="grid grid-cols-3 gap-3 p-10">
        {handleTag(_state.selectedTag)?.map((blog: Blog) => {
          return (
            <Link
              key={handleTag(_state.selectedTag).indexOf(blog)}
              to={`/blogpage/${blog.identity}`}
            >
              <BlogCard key={blog.identity} card={blog} />
            </Link>
          )
        })}
      </div>
      <br />
      <div className="text-center">
        {hasPreviousPage && (
          <Link to={prevPagePath} rel="prev" className="no-underline">
            &larr; Previous page
          </Link>
        )}
        {Array.from({ length: numBlogsPages }, (_, i) => {
          return (
            <Link
              key={i + 1}
              className="no-underline"
              to={getPageNumberPath(i)}
            >
              {i + 1}
            </Link>
          )
        })}
        {hasNextPage && (
          <Link to={nextPagePath} rel="next" className="no-underline">
            &rarr; Next page
          </Link>
        )}
      </div>
    </MainLayout>
  )
}

export default BlogList

export const query = graphql`
  query BlogsQuery($skip: Int!, $limit: Int!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    posts: allContentfulCloudaPosts(
      limit: $limit
      skip: $skip
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        title
        subTitle
        identity
        image {
          gatsbyImageData(height: 10, width: 10)
        }
        text {
          raw
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        totalCount
      }
    }
    tags: allContentfulTag(sort: { fields: name, order: ASC }) {
      nodes {
        name
        id
      }
    }
    postTags: allContentfulCloudaPosts(
      limit: $limit
      skip: $skip
      filter: { node_locale: { eq: $language } }
    ) {
      group(field: metadata___tags___name) {
        fieldValue
        nodes {
          title
          subTitle
          identity
          image {
            gatsbyImageData(height: 10, width: 10)
          }
          text {
            raw
          }
        }
      }
    }
  }
`
