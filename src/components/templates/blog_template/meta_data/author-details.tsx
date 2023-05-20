import React from 'react'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'

type AuthorDetailsProps = {
  name: string
  title: string
  // FIXME: Previously 'any' is assigned here
  heroImage: ImageDataLike
}

const AuthorDetails = ({ name, title, heroImage }: AuthorDetailsProps) => {
  return (
    <div>
      <span className="flex ">
        <GatsbyImage
          imgStyle={{ borderRadius: `50%` }}
          alt={'person image'}
          image={getImage(heroImage)}
        />
        <div className="self-center ml-4">
          <h3 className="m-0">{name}</h3>
          <p className="m-0 text-base">{title}</p>
        </div>
      </span>
    </div>
  )
}

export default AuthorDetails
