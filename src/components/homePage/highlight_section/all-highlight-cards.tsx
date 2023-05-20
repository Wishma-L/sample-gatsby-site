import React from 'react'
import { HighlightCard } from './highlight-card'
import SelectedHighlightCard from './selected-highlighted-card'
type AllHighlightCardsProps = {
  highlights: [Highlight]
}

const AllHighlightCards = ({ highlights }: AllHighlightCardsProps) => {
  return (
    <>
      <div className='flex items-center justify-center'>
        {highlights?.map((highlight: Highlight) => {
          if (highlights.indexOf(highlight) === 0) {
            return <SelectedHighlightCard key={highlight.id} image={`https:${highlight.image?.file.url}`} title={highlight.title} link={highlight.link} />
          } else {
            return <div key={highlight.id}>
              <HighlightCard image={`https:${highlight.image?.file.url}`} title={highlight.title} link={highlight.link} />
            </div>
          }
        })}
      </div>
    </>
  )
}

export default AllHighlightCards
