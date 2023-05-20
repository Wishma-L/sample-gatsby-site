import { Link } from 'gatsby'
import React, { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

type callBackFunction = (arg: string) => void

type PaginationProps = {
  totalPages: number
  currentPage: string
  changeCurrentPage: callBackFunction
  tagNameList: string[]
}

export default function Pagination({
  totalPages,
  changeCurrentPage,
  currentPage,
  tagNameList,
}: PaginationProps) {
  const [currentPageNum, setCurrentPageNum] = useQueryParam('page', StringParam)

  const prevDisabled = parseInt(currentPage) <= 1
  const nextDisabled = parseInt(currentPage) >= totalPages

  useEffect(() => {
    if (currentPageNum) {
      setCurrentPageNum(currentPageNum)
      changeCurrentPage(parseInt(currentPageNum, 10).toString())
    }
  }, [currentPageNum, setCurrentPageNum])

  const pathResolver = (
    tagNameList: string[],
    currentPage: string,
    isPrevPath: boolean
  ) => {
    if (isPrevPath) {
      if (tagNameList[0]) {
        return `?tag=${tagNameList[0]}&page=${parseInt(currentPage, 10) - 1}`
      } else {
        return `?page=${parseInt(currentPage, 10) - 1}`
      }
    } else {
      if (tagNameList[0]) {
        return `?tag=${tagNameList[0]}&page=${parseInt(currentPage, 10) + 1}`
      } else {
        return `?page=${parseInt(currentPage, 10) + 1}`
      }
    }
  }

  const prevPageUrl = pathResolver(tagNameList, currentPage, true)

  const nextPageUrl = pathResolver(tagNameList, currentPage, false)
  return (
    <ol className="flex justify-center">
      <li>
        <div className="text-center">
          {!prevDisabled && (
            <Link to={prevPageUrl}>
              <button
                className="px-4"
                onClick={() => {
                  setCurrentPageNum((parseInt(currentPage, 10) - 1).toString())
                  changeCurrentPage((parseInt(currentPage, 10) - 1).toString())
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
                  setCurrentPageNum((parseInt(currentPage, 10) + 1).toString())
                  changeCurrentPage((parseInt(currentPage, 10) + 1).toString())
                }}
              >
                Next page
              </button>
            </Link>
          )}
        </div>
      </li>
    </ol>
  )
}
