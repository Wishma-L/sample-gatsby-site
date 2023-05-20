/* eslint-disable no-empty-pattern */
import { RouteComponentProps } from '@reach/router'
import { Config } from '../../utils/config'
import ContentfulApi from '../../utils/contentful-api'
import React, { useEffect, useState } from 'react'
import Pagination from './pagination'
import TagSelectorParams from './tag-selector-params'

type PaginatedBlogListProps = RouteComponentProps

const PaginatedBlogList = ({}: PaginatedBlogListProps) => {
  const [currentPage, setCurrentPage] = useState(1)

  const [blog, setBlog] = useState({
    summaries: [],
    total: 0,
  })

  const initTagList: TagType[] = []
  const initTagNameList: string[] = []

  const [tagList, setTagList] = useState(initTagList)
  const [tagNameList, setTagNameList] = useState(initTagNameList)

  const totalPages = Math.ceil(blog.total / Config.pagination.pageSize)
  const api = new ContentfulApi()

  useEffect(() => {
    api.getPaginatedPostSummaries(currentPage, tagNameList).then((res) => {
      setBlog({ summaries: res.items, total: res.total })
    })

    api.getTagList().then((res) => {
      setTagList(res.items)
    })
  }, [currentPage, tagNameList])

  const changeCurrentPage = (selectedPage: string) => {
    setCurrentPage(parseInt(selectedPage, 10))
  }

  const setSelectedTag = (tags: string) => {
    setTagNameList(Array.of(tags))
    setCurrentPage(1)
  }

  return (
    <>
      <TagSelectorParams
        tags={tagList}
        setSelectedTag={setSelectedTag}
        // currentPage={currentPage}
      />
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {blog.summaries.map((summary: any) => {
          return <p key={summary.identity}>{JSON.stringify(summary)}</p>
        })}
      </div>
      <Pagination
        changeCurrentPage={changeCurrentPage}
        currentPage={currentPage.toString()}
        totalPages={totalPages}
        tagNameList={tagNameList}
      />
    </>
  )
}

export default PaginatedBlogList
