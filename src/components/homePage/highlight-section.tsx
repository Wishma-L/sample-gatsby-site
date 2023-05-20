import React from 'react'
import AllHighlightCards from './highlight_section/all-highlight-cards'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HighlightSection = ({ data }: any) => {
  return (
    <>
      <h1 className="text-lg font-semibold text-4xl pl-8 pt-8 pb-8">
        Highlights
      </h1>
      <AllHighlightCards highlights={data.nodes} />
    </>
  )
}

export default HighlightSection
