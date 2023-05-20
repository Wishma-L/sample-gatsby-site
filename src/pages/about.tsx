import { graphql } from 'gatsby'
import React from 'react'

type AboutProps = {
  data: { members: { nodes: TeamData[] } }
}

const About = ({ data }: AboutProps) => {
  return (
    <>
      <h1 className="text-center">Clouda Team</h1>

      {data.members.nodes.map((node) => {
        return (
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal mx-12 my-4">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">
                <span>{`${node.firstName} `}</span>
                <span>{node.lastName}</span>
              </div>
              <p className="text-gray-700 text-base">{node.description}</p>
            </div>
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
          </div>
        )
      })}

      <div>List</div>
    </>
  )
}

export default About

export const query = graphql`
  query AboutQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    members: allTeamMember {
      nodes {
        id
        description
        firstName
        lastName
      }
    }
  }
`
