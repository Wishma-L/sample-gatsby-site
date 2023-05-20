/* eslint-disable no-empty-pattern */
import React, { useEffect, useState } from 'react'
import CommentSection from '../blog-comment/comment-section.tsx'
import { getArticleItems } from '../../utils/article-comment-api'
import { RouteComponentProps } from '@reach/router'

import {
  Collection,
  Entry,
  EntryProps,
  KeyValueMap,
} from 'contentful-management'

interface ArticleResponse extends Collection<Entry, EntryProps<KeyValueMap>> {
  items: Entry[]
  total: number
}

type BlogWithCommentProps = RouteComponentProps

const BlogWithComment = ({}: BlogWithCommentProps) => {
  const [availableArticles, setAvailableArticles] = useState<Entry[]>([])
  const [commentCount, setCommentCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      getArticleItems().then((entries) => {
        const data = entries as ArticleResponse
        const dataResponse = { total: data.total, items: data.items }
        setAvailableArticles(dataResponse.items)
        // setTotalArticles(dataResponse.total)
      })
    }, 1500)
  }, [commentCount])

  const changeNewCommentState = () => {
    console.log('state: ', commentCount)
    setCommentCount(commentCount + 1)
  }

  return (
    <>
      <h1 className="text-center">CSR-Articles</h1>
      <div className="flex ">
        {/* //TODO Implement the tab-effect here */}
        {/* <div className="w-1/4">
            {articles.map((item) => {
              return <p>{item.title}</p>
            })}
          </div> */}
        <div className="w-3/4 mx-12">
          {/* <p>
              {JSON.stringify(
                articles[0].fields.description.en ?? 'No article is avaialble'
              )}
            </p> */}
          {availableArticles.map((article) => {
            return (
              <div key={`article-Id: ${article.sys.id}`}>
                <p>{JSON.stringify(article.fields.description.en)}</p>
                <CommentSection
                  availableComments={article.fields.comments.en.comments}
                  entryId={article.sys.id}
                  changeNewCommentState={changeNewCommentState}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="py-8 text-center"></div>
    </>
  )
}

export default BlogWithComment
