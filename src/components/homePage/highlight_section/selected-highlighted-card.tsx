import React from 'react'
// import backGroundImage from '../../../images/Earth.png'

type HighlightCardProps = {
  image?: string
  title: string
  link: string
}

// TODO : Remove this if no necessary
// const divStyle = {
//   backgroundImage: `url(${backGroundImage})`,
//   backgroundRepeat: `no-repat`,
//   backgroundSize: `cover`,
//   backgroundBlendMode: `multiply`,
// }

const SelectedHighlightCard = ({ image, title, link }: HighlightCardProps) => {
  const divStyle = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: `no-repat`,
    backgroundSize: `cover`,
    backgroundBlendMode: `multiply`,
    placeContent: `center`,
    height: `500px`,
    width: `508px`,
  }

  return (
    <>
      <div
        className={`rounded-lg shadow-lg w-full flex flex-row flex-wrap p-3 h-64 w-64 mx-5`}
        style={divStyle}
      >
        <div className="py-5 px-5 text-center">
          <h2 className="block py-3 text-2xl font-bold text-white">{title}</h2>
          <a href={link} className="text-white no-underline">
            View More
          </a>
        </div>
      </div>
    </>
  )
}

export default SelectedHighlightCard
