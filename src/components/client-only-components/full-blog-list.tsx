/* eslint-disable no-empty-pattern */
import { RouteComponentProps } from '@reach/router'
import React, { useEffect, useState } from 'react'
import BlogCard from '../blogs/blog-card'
import TagSelectorParams from './tag-selector-params'
// import TagPage from './tag-page';
// import { Config } from '../../utils/config';

type FullBlogListProps = RouteComponentProps

const query = `query PostCollectionQuery($lang: String, $tagName: [String]) {
  cloudaPostsCollection(locale: $lang, where: {contentfulMetadata: {tags: {id_contains_all: $tagName}}}) {
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

const FullBlogList = ({}: FullBlogListProps) => {
  const initBlogs: BlogTagType[] = []
  const initTags: TagType[] = []
  const initTagNames: string[] = []

  const [blogList, setBlogList] = useState(initBlogs)
  const [tags, setTags] = useState(initTags)
  const [selectedTags, setSelectedTags] = useState(initTagNames)

  const fetchBlogsOption = {
    spaceID: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    endpoint: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        // TODO: Fix the language selector here
        lang: 'en',
        tagName: selectedTags[0] !== null ? selectedTags.map((tag) => tag) : [],
      },
    }),
  }

  const fetchTagOption = {
    spaceID: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    // endpoint: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
  }

  useEffect(() => {
    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
      fetchBlogsOption
    )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors)
        }
        setBlogList(data.cloudaPostsCollection.items)
      })

    fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.ENVIRONMENT_ID}/tags`,
      fetchTagOption
    )
      .then((response) => {
        return response.json()
      })
      .then(({ items, errors }) => {
        if (errors) {
          console.error(errors)
        }
        setTags(items)
      })
  }, [])

  useEffect(() => {
    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
      fetchBlogsOption
    )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors)
        }
        setBlogList(data.cloudaPostsCollection.items)
      })
  }, [selectedTags])

  const setSelectedTag = (tags: string) => {
    setSelectedTags(Array.of(tags))
  }

  if (blogList.length === 0) {
    return <p>Tag-app is Loading...</p>
  }

  return (
    <>
      <TagSelectorParams tags={tags} setSelectedTag={setSelectedTag} />
      <h2 className="text-center">The Blog List</h2>
      <div className="grid grid-cols-3 gap-3 p-10">
        {blogList.map((blog: Blog) => {
          return <BlogCard key={blog.identity} card={blog} />
        })}
      </div>
    </>
  )
}

export default FullBlogList
