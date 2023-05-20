import { Config } from './config'

export default class ContentfulApi {

   static spaceId: string | undefined 
   static accessToken: string | undefined 
   static envId: string | undefined  

  constructor() {
    ContentfulApi.spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID
    ContentfulApi.accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN
    ContentfulApi.envId = process.env.GATSBY_ENVIRONMENT_ID
  }
  // Common contentfulQuery function
   async callContentful(query: string, limit: number, skip: number, selectedTags?: string[]) {

    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${ContentfulApi.spaceId}`

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ContentfulApi.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          // TODO: Fix the language selector here
          lang: 'en',
          tagNames: selectedTags
            ? selectedTags[0] !== null
              ? selectedTags.map((tag: string) => tag)
              : []
            : null,
          limit: limit,
          skip: skip
        },
      }),
    }

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json()
      )
      return data
    } catch (error) {
      throw new Error('Could not fetch data from Contentful!')
    }
  }

  // Querying the post summaries by page number
   async getPaginatedPostSummaries(page: number, tagNames: string[]) {
    const skipMultiplier = page === 1 ? 0 : page - 1
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0

    const limit = 3

    // TODO: add tagName as a variable
    const query = `query PostCollectionQuery($lang: String, $tagNames: [String], $limit: Int, $skip: Int) {
                    cloudaPostsCollection(locale: $lang, limit: $limit, skip: $skip, where: {contentfulMetadata: {tags: {id_contains_all: $tagNames}}}, order: title_DESC) {
                      total
                      skip
                      limit
                      items {
                        title
                        subTitle
                        identity
                        contentfulMetadata {
                          tags {
                            name
                          }
                        }
                      }
                    }
                  }`

    // Call out to the API
    const response = await this.callContentful(query, limit, skip, tagNames)
    const paginatedPostSummaries = response.data?.cloudaPostsCollection
      ? response.data.cloudaPostsCollection
      : { total: 0, items: [] }

    return paginatedPostSummaries
  }

   getTagList = async() => {
    const fetchUrl = `https://cdn.contentful.com/spaces/${ContentfulApi.spaceId}/environments/${ContentfulApi.envId}/tags`

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + ContentfulApi.accessToken,
        "Content-Type": "application/json",
      }
    }
    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json()
      )
      return data
    } catch (error) {
      throw new Error('Could not fetch tag data from Contentful!')
    }
  }
  
  getArticles = async() => {
    const query = `query ArticleCollectionQuery($lang: String, $limit: Int, $skip: Int) {
      articlesCollection(locale: $lang, limit: $limit, skip: $skip, order: title_DESC) {
        total
        skip
        limit
        items {
          sys {
            id
          }
          title
          category
          description
          body{
            json
          }
          image{
            url
          }
          enableComments
          comments
        }
      }
    }`
    const response = await this.callContentful(query, 2, 0)
    const paginatedPostSummaries = response.data.articlesCollection ?? {items: [], total: 0}
  return paginatedPostSummaries
  }
}

// Graphiql Link
// https://graphql.contentful.com/content/v1/spaces/uclo49joslii/explore?access_token=3zqid0tMvD6C0JTi-6fG6R_uVYU2jiOTLjEhe_-G5L4

// Tags API
// https://cdn.contentful.com/content/v1/spaces/uclo49joslii/environments/master/tags
