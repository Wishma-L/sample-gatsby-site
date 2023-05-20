import * as contentful from 'contentful-management'

const client = contentful.createClient({
  accessToken: process.env.GATSBY_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN as string,
})

const articleContentType = 'articles'

export const getArticleItems = () => {
  const data = client
    .getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID as string)
    .then((space) =>
      space.getEnvironment(process.env.GATSBY_ENVIRONMENT_ID as string)
    )
    .then((env) => env.getEntries({ content_type: articleContentType }))
    .then((articles) => {
      return articles
    })
    .catch(console.error)

  return data
}

export const createNewComment = (comment: CommentType, entryId: string) => {
  client
    .getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID as string)
    .then((space) =>
      space.getEnvironment(process.env.GATSBY_ENVIRONMENT_ID as string)
    )
    .then((environment) => environment.getEntry(entryId))
    .then((entry) => {
      const existingComments = entry.fields.comments.en.comments
      entry.fields.comments.en.comments = [...existingComments, comment]
      entry.update().then((entry) => entry.publish())
    })
    .catch(console.error)
}

// THIS FOR CREATE NEW REPLY FOR A COMMENT

// export const createNewReply = (
//   reply: ReplyType,
//   entryId: string,
//   commentId: string
// ) => {
//   console.log('reply: ', reply)
//   console.log('entryId: ', entryId)

//   // Create entry
//   client
//     .getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID as string)
//     .then((space) =>
//       space.getEnvironment(process.env.GATSBY_ENVIRONMENT_ID as string)
//     )
//     .then((environment) => environment.getEntry(entryId))
//     .then((entry) => {
//       console.log(entry)
//       const replies = entry.fields.comments.en.comments.find(
//         (comment: CommentType) => {
//           return comment.id === commentId
//         }
//       ).replies

//       console.log('replies: ', replies)
//       entry.fields.comments.en.comments.replies = [...replies, reply]
//       entry.update().then((entry) => entry.publish())
//     })
//     .catch(console.error)
// }
