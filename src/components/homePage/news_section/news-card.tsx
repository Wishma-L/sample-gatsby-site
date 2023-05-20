import React from 'react'

type NewsCardProps = {
  date: string
  title: string
  link: string
}

const NewsCard = ({ date, title, link }: NewsCardProps) => {
  const divStyle = {
    height: `350px`,
    width: `640px`,
    background: `#F9F9F9`,
  }
  return (
    <>
      <div
        className={`mx-auto overflow-hidden bg-white rounded-lg p-8`}
        style={divStyle}
      >
        <div className="">
          <div>
            <span className="text-sm text-gray-700">{date}</span>
            <a
              href={link}
              className="block text-2xl font-bold text-gray-800 no-underline"
            >
              {title}
            </a>
          </div>
          <button className="bg-transparent hover:bg-gray-300 text-gray-500 font-semibold hover:text-black py-2 px-4 border border-gray-300 hover:border-transparent rounded-full mt-28">
            See more
          </button>
        </div>
      </div>
    </>
  )
}

export default NewsCard
