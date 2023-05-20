import { graphql, Link, StaticQuery } from 'gatsby'
import React from 'react'

const TagSelector = () => {
  return (
    <>
      <StaticQuery
        query={graphql`
          query HeadingQuery {
            tags: allContentfulTag(sort: { fields: name, order: ASC }) {
              nodes {
                name
                id
              }
            }
          }
        `}
        render={(data) => (
          <>
            <span className="flex justify-center pt-8 space-x-4">
              {data.tags.nodes.map((tag: Tag) => {
                return (
                  <Link key={tag.id} to={`/tag/${tag.name}`}>
                    <p> {tag.name}</p>
                  </Link>
                )
              })}
            </span>
          </>
        )}
      />
    </>
  )
}

export default TagSelector
