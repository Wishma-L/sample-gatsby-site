import { Link } from 'gatsby'
import React, { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type callBackFunction = (arg: any) => void

type TagSelectorParamsProps = {
  tags: TagType[]
  setSelectedTag: callBackFunction
  // currentPage: number
}

const TagSelectorParams = ({
  tags,
  setSelectedTag,
}: TagSelectorParamsProps) => {
  const [tagName, setTagName] = useQueryParam('tag', StringParam)

  // TODO: multi-select tag option capability
  // const initTags: TagType[] = []
  // const [selectedTags, setSelectedTags] = useState(initTags)

  useEffect(() => {
    if (tagName) {
      setSelectedTag(tagName)
    }
  }, [tagName])

  return (
    <>
      <div className="flex justify-center gap-x-5">
        {tags?.map((tag) => {
          return (
            <>
              <Link key={tag.sys.id} to={`?tag=${tag.name}&page=1`}>
                <button
                  className="px-4"
                  onClick={() => {
                    setTagName(tag.name)
                    setSelectedTag(tagName)
                  }}
                >
                  <p>{tag.name}</p>
                </button>
              </Link>
            </>
          )
        })}
        <Link to={`/blog-app/paginated-blog-list`}>
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
    </>
  )
}

export default TagSelectorParams
