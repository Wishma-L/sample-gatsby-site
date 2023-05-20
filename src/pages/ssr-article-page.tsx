import React from 'react'
import { GetServerDataReturn, graphql } from 'gatsby'
import MainLayout from '../components/main-layout'
import CommentSection from '../components/blog-comment/comment-section'
import { getArticleItems } from '../utils/article-comment-api'

interface ArticleResponse {
  items: ArticleType[]
  total: number
}

type ServerDataProps = {
  response: ArticleResponse
}

type SSRArticlePageProps = {
  serverData: ServerDataProps
}

const SSRArticlePage = ({ serverData }: SSRArticlePageProps) => {
  const articles = serverData.response.items ?? []

  return (
    <>
      <MainLayout>
        <h1 className="text-center">SSR-Articles</h1>
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
            {articles.map((article) => {
              return (
                <div key={`article-Id: ${article.sys.id}`}>
                  <p>{JSON.stringify(article.fields.description.en)}</p>
                  <CommentSection
                    availableComments={article.fields.comments.en.comments}
                    entryId={article.sys.id}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="py-8 text-center"></div>
      </MainLayout>
    </>
  )
}

export default SSRArticlePage

const getArticleData = async () => {
  const articleItems = await getArticleItems()
  return articleItems as unknown as ArticleResponse
}

const getErrorServerData = () => {
  return {
    status: 500,
    props: {} as ServerDataProps,
  }
}

export const getServerData = async (): GetServerDataReturn<ServerDataProps> => {
  const articlesRes = await getArticleData()
  const dataResponse = { total: articlesRes.total, items: articlesRes.items }
  try {
    return {
      status: 200,
      props: {
        response: dataResponse,
      },
    }
  } catch (error) {
    console.error(error)
    return getErrorServerData()
  }
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
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
