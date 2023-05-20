// const { graphql } = require("gatsby")
// const path = require("path")

// // module.exports = ({ actions }) => {
// const createPosts = async ({ actions}) => {
//     const { createPage } = actions
//     console.log('inside the page')
//     const result = await graphql(`
//       {
//         allPosts(limit: 10) {
//           nodes {
//             id
//             title
//             body
//           }
//         }
//       }
//     `)

//     console.log("result: ", result)
//     return Promise.all(
//       result.data.allPosts.nodes.map(async (node) => {
//         await createPage({
//           path: `/posts/${node.id}`,
//           component: path.resolve("../pages/Post.tsx"),
//           context: {
//             id: node.id,
//           },
//           post: node,
//         })
//         console.log(result)
//       })
//     )
// }

// module.exports.createPosts = createPosts