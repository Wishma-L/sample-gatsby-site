import React from 'react'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Seo from '../components/solutions/seo/seo'
import MainLayout from '../components/main-layout'
import { graphql } from 'gatsby'
import { useKeycloak } from '@react-keycloak/web'

const Solutions = () => {
  const { t } = useTranslation()
  const { keycloak } = useKeycloak()
  return (
    <MainLayout>
      <Seo title={t('Home')} />
      <h1>
        <Trans>Hi people</Trans>
      </h1>
      <p>
        <Trans>Welcome to your new Gatsby site.</Trans>
      </p>
      <p>
        <Trans>Now go build something great.</Trans>
      </p>
      {keycloak.authenticated ? <div>This is gated content</div> : <div>
        Please <Link to="/" onClick={(e) => {
        e.preventDefault()
        keycloak.login({ redirectUri: window.location.href })
      }}>login</Link> to view content.
      </div>}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      </div>
      <Link to="/page-2/">
        <Trans>Go to page 2</Trans>
      </Link>
    </MainLayout>
  )
}

export default Solutions

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
