import * as React from 'react'
import { MainBanner } from '../components/homePage/main_banner_section/main-banner'
import { ExpertSection } from '../components/homePage/expert-section'
import { NewsSection } from '../components/homePage/news-section'
import { ProjectsSection } from '../components/homePage/project-section'
import TabCarousel from '../components/homePage/tab-carousel'
import HighlightSection from '../components/homePage/highlight-section'
import MainLayout from '../components/main-layout'
import { graphql } from 'gatsby'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IndexPage = (data: any) => {
  return (
    <MainLayout>
      <MainBanner />
      <TabCarousel data={data.data.banners} />
      <ExpertSection />
      <HighlightSection data={data.data.highlights} />
      <NewsSection data={data.data.news.nodes} />
      <ProjectsSection data={data.data.projects.nodes} />
    </MainLayout>
  )
}

export default IndexPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    highlights: allContentfulHighlights(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        id
        title
        description
        image {
          file {
            url
          }
        }
        link
      }
    }
    banners: allContentfulBanners(filter: { node_locale: { eq: $language } }) {
      nodes {
        title
        description
        link
      }
    }
    news: allContentfulNews(filter: { node_locale: { eq: $language } }) {
      nodes {
        id
        date
        link
        title
      }
    }
    projects: allContentfulProjects(
      filter: { node_locale: { eq: $language } }
      sort: { fields: isHighlighted, order: DESC }
    ) {
      nodes {
        id
        title
        description
        link
        bgImage {
          file {
            url
          }
        }
        bgColor
        txtColor
        isHighlighted
      }
    }
  }
`
