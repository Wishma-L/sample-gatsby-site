// *the initial page will be static but rest of the pages are dynamic
import ContentfulApi from '../utils/contentful-api'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/blogs/blog-card'
import MainLayout from '../components/main-layout'
import { Config } from '../utils/config'
import HybridTagSelector from '../components/hybrid-blog/hybrid-tag-selector'

const HybridPage = () => {
  const blogData = useStaticQuery(graphql`
    {
      allContentfulCloudaPosts(
        limit: 3
        skip: 0
        filter: { node_locale: { eq: "en" } }
      ) {
        nodes {
          title
          identity
          subTitle
        }
        pageInfo {
          totalCount
          currentPage
        }
      }
      tags: allContentfulTag(sort: { fields: name, order: ASC }) {
        nodes {
          name
          id
        }
      }
      locales: allLocale(filter: { language: { eq: "en" } }) {
        edges {
          node {
            language
          }
        }
      }
    }
  `)

  const pathResolver = (currentPage: number, isPrevPath: boolean) => {
    if (isPrevPath) {
      if (selectedTagList.length !== 0) {
        return `?tag=${selectedTagList[0]}&page=${currentPage - 1}`
      } else {
        return currentPage === 2 ? `` : `?page=${currentPage - 1}`
      }
    } else {
      if (selectedTagList.length !== 0) {
        return `?tag=${selectedTagList[0]}&page=${+currentPage + +1}`
      } else {
        return `?page=${+currentPage + +1}`
      }
    }
  }

  const initBlogs: Blog[] = blogData.allContentfulCloudaPosts.nodes
  const initTagNameList: string[] = []
  const tagList = blogData.tags.nodes

  const [totalPages, setTotalPages] = useState(
    blogData.allContentfulCloudaPosts.pageInfo.totalCount /
      Config.pagination.pageSize
  )

  const [currentPage, setCurrentPage] = useState(
    blogData.allContentfulCloudaPosts.pageInfo.currentPage
  )

  const [selectedTagList, setSelectedTagList] = useState(initTagNameList)
  const [blogList, setBlogList] = useState(initBlogs)

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages

  useEffect(() => {
    const api = new ContentfulApi()
    api.getPaginatedPostSummaries(currentPage, selectedTagList).then((res) => {
      setBlogList(res.items)
      setTotalPages(Math.ceil(res.total / Config.pagination.pageSize))
    })
  }, [currentPage, selectedTagList])

  const prevPageUrl = pathResolver(currentPage, true)
  const nextPageUrl = pathResolver(currentPage, false)

  const setSelectedTag = (tags: string) => {
    setSelectedTagList(tags !== null ? Array.of(tags) : [])
    setCurrentPage(1)
  }

  if ((blogList ?? []).length === 0) {
    return <p>Hybrid app is Loading...</p>
  }

  return (
    <MainLayout>
      <h2 className="text-center">Hybrid Blog List</h2>

      <HybridTagSelector tags={tagList} setSelectedTag={setSelectedTag} />

      <div className="grid grid-cols-3 gap-3 p-10">
        {(blogList ?? []).map((blog: Blog) => {
          return <BlogCard key={blog.identity} card={blog} />
        })}
      </div>
      <div>
        <ol className="flex justify-center">
          <li>
            <div className="text-center">
              {!prevDisabled && (
                <Link to={prevPageUrl}>
                  <button
                    className="px-4"
                    onClick={() => {
                      setCurrentPage((currentPage ?? 2) - 1)
                    }}
                  >
                    Previous page
                  </button>
                </Link>
              )}
            </div>
          </li>
          <li>
            Page {currentPage} of {totalPages}
          </li>
          <li>
            <div className="text-center">
              {!nextDisabled && (
                <Link to={nextPageUrl}>
                  <button
                    className="px-4"
                    onClick={() => {
                      setCurrentPage((currentPage ?? 0) + 1)
                    }}
                  >
                    Next page
                  </button>
                </Link>
              )}
            </div>
          </li>
        </ol>
      </div>
    </MainLayout>
  )
}

export default HybridPage
