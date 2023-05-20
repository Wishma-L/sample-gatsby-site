import { graphql, Link } from 'gatsby'
import React from 'react'

type SsrProps = {
  serverData: {
    image: string
  }
}

const Ssr = ({ serverData }: SsrProps) => {
  const { image } = serverData

  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <h1>SSR: Server Side Rendering</h1>
      <img alt="doggo" src={image} />
    </>
  )
}

export default Ssr

export async function getServerData() {
  const data = await fetch(`https://dog.ceo/api/breeds/image/random`).then(
    (res) => res.json()
  )

  return {
    props: {
      // data has the shape of "message", "status" where message is the image src
      image: data.message,
    },
  }
}

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
  }
`
