import { Link } from 'gatsby'
import React from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type callBackFunction = (arg: any) => void

type TagSelectorParamsProps = {
  tags: Tag[]
  setTheSelectedTag: callBackFunction
}

const TagSelectorParams = ({
  tags,
  setTheSelectedTag,
}: TagSelectorParamsProps) => {
  const [tagName, setTagName] = useQueryParam('tag', StringParam)

  // console.log('withQueryParams: ', withQueryParams)
  console.log('tagName: ', tagName)

  return (
    <>
      <div className="text-center">
        {tags.map((tag: Tag) => {
          return (
            <Link key={tag.id} to={`?tag=${tag.name}`}>
              <button
                className="px-4"
                onClick={() => {
                  setTagName(tag.name)
                  setTheSelectedTag(tag)
                }}
              >
                <p>{tag.name}</p>
              </button>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default TagSelectorParams
