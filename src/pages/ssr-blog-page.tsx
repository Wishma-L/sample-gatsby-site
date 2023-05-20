import React, { useState } from 'react'
import { GetServerDataProps, GetServerDataReturn, graphql, Link } from 'gatsby'
import MainLayout from '../components/main-layout'
import ContentfulApi from '../utils/contentful-api'
import { Config } from '../utils/config'

type ServerDataProps = {
  response: {
    blogRes: BlogResponse
    tagRes: TagResponse
  }
  record: Record<string, unknown> | undefined
}

type SSRBlogsPageProps = {
  serverData: ServerDataProps
}

interface BlogContext {
  page: number
  tag: string[]
}

interface BlogResponse {
  items: Blog[]
  total: number
  skip?: number
  limit?: number
}

interface TagResponse {
  items: TagType[]
  total?: number
  skip?: number
  limit?: number
}

const SSRBlogsPage = ({ serverData }: SSRBlogsPageProps) => {
  const summaries = serverData.response.blogRes.items ?? []
  const tagList = serverData.response.tagRes.items ?? []

  const page = serverData.record?.page as number

  const [selectedTag, setSelectedTag] = useState<TagType | null>(null)

  const totalPages = Math.ceil(
    serverData.response.blogRes.total / Config.pagination.pageSize
  )

  const prevDisabled = page <= 1
  const nextDisabled = page >= totalPages

  const pathResolver = (currentPage: number, isPrevPath: boolean) => {
    if (isPrevPath) {
      if (selectedTag) {
        return `?tag=${selectedTag.name}&page=${currentPage - 1}`
      } else {
        return `?page=${currentPage - 1}`
      }
    } else {
      if (selectedTag) {
        return `?tag=${selectedTag.name}&page=${+currentPage + +1}`
      } else {
        return `?page=${+currentPage + +1}`
      }
    }
  }

  const prevPageUrl = pathResolver(page ?? 1, true)

  const nextPageUrl = pathResolver(page ?? 1, false)

  return (
    <>
      <MainLayout>
        <h1>This content is rendered as SSR</h1>
        <div className="flex justify-center gap-x-5">
          {tagList.map((tag) => {
            return (
              <Link key={`tag-Name-${tag.name}`} to={`?tag=${tag.name}&page=1`}>
                <button
                  className="px-4"
                  onClick={() => {
                    setSelectedTag(tag)
                  }}
                >
                  <p>{tag.name}</p>
                </button>
              </Link>
            )
          })}
          <Link to={`/ssr-blog-page?page=1`}>
            <button
              className="px-4"
              onClick={() => {
                setSelectedTag(null)
              }}
            >
              <p>Clear</p>
            </button>
          </Link>
        </div>
        <br />
        <div>
          {summaries.map((blog) => {
            return (
              <p key={`blog-id-${blog.identity}`}>{JSON.stringify(blog)}</p>
            )
          })}
        </div>
        {/*  */}
        <div>
          <ol className="flex justify-center">
            <li>
              <div className="text-center">
                {!prevDisabled && (
                  <Link to={prevPageUrl}>
                    <button className="px-4">Previous page</button>
                  </Link>
                )}
              </div>
            </li>
            <li>
              Page {page ?? 1} of {totalPages}
            </li>
            <li>
              <div className="text-center">
                {!nextDisabled && (
                  <Link to={nextPageUrl}>
                    <button className="px-4">Next page</button>
                  </Link>
                )}
              </div>
            </li>
          </ol>
        </div>
        {/*  */}
      </MainLayout>
    </>
  )
}

export default SSRBlogsPage

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBlogData = async (data: any) => {
  const api = new ContentfulApi()
  const blogItems = await api.getPaginatedPostSummaries(
    data.page,
    data.tag ? [data.tag] : []
  )
  return blogItems as BlogResponse
}

const getTagData = async () => {
  const api = new ContentfulApi()
  const blogTagItems = await api.getTagList()
  return blogTagItems as TagResponse
}

const getErrorServerData = () => {
  return {
    status: 500,
    props: {} as ServerDataProps,
  }
}

export const getServerData = async (
  context: GetServerDataProps
): GetServerDataReturn<ServerDataProps> => {
  const blogRes = await getBlogData(
    (context.query ?? { page: 1, tag: [] }) as unknown as BlogContext
  )
  const tagRes = await getTagData()
  const pageContextProps = context.query ?? { page: 1, tag: [] }
  const dataResponse = { blogRes, tagRes, pageContextProps }
  try {
    return {
      status: 200,
      props: {
        response: dataResponse,
        record: context.query ?? { page: 1, tag: [] },
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
