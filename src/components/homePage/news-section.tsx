import React from 'react'
import NewsCard from './news_section/news-card'

type NewsSectionProps = {
  data: News[]
}

export const NewsSection = ({ data }: NewsSectionProps) => {
  return (
    <>
      <h1 className='text-lg font-semibold text-4xl pl-8 pt-8 pb-8'>Featured news</h1>
      <div className='container flex items-center px-6 py-3 mx-auto'>
        {data.map((news) => {
          return (
            <NewsCard key={news.id} date={news.date.toString()} title={news.title} link={news.link} />
          )
        })}</div>
    </>
  )
}
