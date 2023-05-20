type Post = {
  id: string
  title: string
  body: string
}

type Text = {
  raw: string
}

type Blog = {
  id: string
  title: string
  subTitle: string
  identity: number
  image: IGatsbyImageData
  text: Text
}

type BlogTagType = {
  id: string
  title: string
  subTitle: string
  identity: number
  image: IGatsbyImageData
  text: Text
  contentfulMetadata: ContentfulMetadata
}

type ContentfulMetadata = {
  tags: Tag[]
}

type BannerData = {
  id: string
  title: string
  description: string
  link: string
}

type Highlight = {
  id: string
  title: string
  link: string
  image: FileType
}

type FileType = {
  file: UrlType
}

type UrlType = {
  url: string
}

type CloudaPost = {
  id: string
  title: string
  slug: string
  publishDate: string
  heroImage: File
  description: string
  body: string
  author: string
}

type Tag = {
  name: string
  id: string
}

type TagGroupType = {
  fieldValue: string
  nodes: Blog[]
}

type News = {
  id: string
  title: string
  date: Date
  link: string
}

type Project = {
  id: string
  title: string
  description: string
  link: string
  bgImage: FileType
  bgColor: string
  isHighlighted: boolean
  txtColor: string
}

// Client-only-routes

type TagType = {
  name: string
  sys: SysType
}

type SysType = {
  id: string
}

// Articles

type ArticleBody = {
  json: {
    content: string
  }
}

type ArticleImage = {
  url: string
}

type Sys = {
  id: string
}

type ReplyType = {
  id: string
  name: string
  handle: string
  message: string
  timeStamp: string // TODO: This can be DateTime
}

type CommentType = {
  id: string
  name: string
  handle: string
  message: string
  replies: ReplyType[]
}

type Comments = {
  en: { comments: CommentType[] }
}

type ArticleFieldType = {
  title: string
  category: string
  description: { en: string }
  body: ArticleBody
  image: ArticleImage
  enableComments: boolean
  comments: Comments
}

type ArticleType = {
  sys: Sys
  fields: ArticleFieldType
}

type TeamData = {
  id: string
  description: string
  firstName: string
  lastName: string
}
