import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { StringParam, useQueryParam } from 'use-query-params'

type callBackFunction = (arg: unknown) => void

type HybridTagSelectorProps = {
  tags: Tag[]
  setSelectedTag: callBackFunction
}

const HybridTagSelector = ({
  tags,
  setSelectedTag,
}: HybridTagSelectorProps) => {
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
              <Link key={tag.id} to={`?tag=${tag.name}&page=1`}>
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
        <Link to={`/hybrid-page`}>
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

export default HybridTagSelector
