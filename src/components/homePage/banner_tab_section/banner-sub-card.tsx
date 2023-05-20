import { Link } from 'gatsby'
import React from 'react'

type BannerSubCardProps = {
  title: string
  description: string
  link: string
  imageLink: string
}

const BannerSubCard = ({ title, description, link, imageLink }: BannerSubCardProps) => {

  return (
    <>
      <div className="w-full max-w-[85%] px-10 py-3 bg-white rounded-md shadow-xl h-60">

        <div className='container flex items-center justify-between'>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-black ">{title}</span>
            </div>
            <p className="mt-2 text-sm text-black">{description}</p>

            <div className='pb-1 mt-8'>
              <Link to={link} className="no-underline">
                <span className="px-3 py-3 text-xs text-black-800 rounded-full bg-gray-300">Learn more</span>
              </Link>
            </div>
          </div>
          <img className='object-contain h-24 w-24' src={String(imageLink)} alt="" />
        </div>
      </div>
    </>
  )
}

export default BannerSubCard
