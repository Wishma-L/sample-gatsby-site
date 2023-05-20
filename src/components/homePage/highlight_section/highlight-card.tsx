import React from 'react'

type HighlightCardProps = {
  image?: string
  title: string
  link: string
}

export const HighlightCard = ({ image, title, link }: HighlightCardProps) => {

  const divStyle = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: `no-repat`,
    backgroundSize: `cover`,
    backgroundBlendMode: `multiply`,
    justifyContent: `start`,
    alignContent: `end`,
    height: `500px`,
    width: `376px`
  }

  return (
    <>
      <div className={`rounded-lg shadow-lg w-full flex flex-row flex-wrap mx-5`} style={divStyle} >
        <div className="py-5 px-5 text-center">
          <h2 className="block py-3 text-2xl font-bold text-white">{title}</h2>
          <a href={link} className="text-white no-underline">View More</a>
        </div>
      </div>
    </>
  )
}
