// this is the clouda layout
import React from 'react'

import '../../styles/variables.css'
import '../../styles/global.css'
import Navigation from '../navigation'

type BlogPostLayoutProps = {
  children?: React.ReactNode
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({children}) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}

export default BlogPostLayout