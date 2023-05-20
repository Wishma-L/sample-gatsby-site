// delete this
import React from 'react'

import '../styles/variables.css'
import '../styles/global.css'
import { withTranslation } from 'react-i18next'
import Header from './homePage/header-section'
import { Footer } from './homePage/footer-section'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div style={{ margin: `0 auto`, maxWidth: `98rem`, width: `100%`}}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default withTranslation()(MainLayout)
