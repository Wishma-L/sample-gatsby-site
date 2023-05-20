import React from 'react'

type Props = {
  children?: React.ReactNode
}

const Container: React.FC<Props> = ({children}) => {
  return (
    <>
      <div
        style={{
          maxWidth: 'var(--size-max-width)',
          margin: '0 auto',
          padding: 'var(--space-2xl) var(--size-gutter)',
        }}
      >
        {children}
      </div>
    </>
  )
}

export default Container
