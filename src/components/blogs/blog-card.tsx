import React from 'react'

type BlogCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  key: any
  card: Blog
}

const BlogCard = ({ card }: BlogCardProps) => {
  return (
    <div className="card bg-[#15263F] h-[20rem] rounded-xl p-6 space-y-4">
      <div id="description" className="space-y-4">
        <h2 className="text-white font-semibold text-xl transition hover:text-cyan-300">
          {card.title}
        </h2>
        <div className="flex items-center justify-between font-semibold text-sm border-b border-slate-500 pb-6">
          <span
            id="price"
            className="text-cyan-300 flex justify-between items-center"
          >
            {card.subTitle}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
