// import { useStaticQuery, graphql } from "gatsby"

// export const useTagData = (tag: string) => {
//   const { site } = useStaticQuery(
//     graphql`
//       query allContentfulCloudaPosts(filter: {metadata: {tags: {elemMatch: {name: {eq: 'tag'}}}}}) {
//         group(field: $tagName) {
//           fieldValue
//           nodes {
//             title
//             subTitle
//             identity
//             image {
//               gatsbyImageData(height: 10, width: 10)
//             }
//             text {
//               raw
//             }
//           }
//         }
//       }
//     `
//   )
//   return site.siteMetadata
// }
