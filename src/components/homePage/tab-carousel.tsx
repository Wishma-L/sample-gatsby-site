import React from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import SingleSlide from './single-slide'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabCarousel = (data: any) => {
  return (
    <>
      <SingleSlide bannerData={data.data.nodes} />
    </>
  )
}

export default TabCarousel
