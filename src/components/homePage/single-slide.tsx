// An Carousel example

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import * as swiperStyles from '../../styles/swiper.module.css'
import { Pagination, Parallax } from 'swiper'
import BannerSubCard from './banner_tab_section/banner-sub-card'
import vector1 from '../../images/carousel-1.png'
import vector2 from '../../images/carousel-2.png'

type SingleSlideProps = {
  bannerData: [BannerData]
}

const SingleSlide = ({ bannerData }: SingleSlideProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = bannerData.reduce(
    (accumulator: any, _currentValue, currentIndex, array) => {
      if (currentIndex % 2 === 0) {
        accumulator.push(array.slice(currentIndex, currentIndex + 2))
      }
      return accumulator
    },
    []
  )

  const params = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index: number, className: string) => {
        return (
          '<span key="' +
          index +
          '" class="' +
          className +
          '">' +
          (index + 1) +
          '</span>'
        )
      },
    },
  }

  if (data.length === 0) {
    return null
  }

  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        speed={300}
        parallax={true}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={false}
        modules={[Parallax, Pagination]}
        className={swiperStyles.container}
        {...params}
      >
        <div
          slot="container-start"
          className={`${swiperStyles.parallaxBg}`}
          data-swiper-parallax="-23%"
        ></div>
        <div>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data.map((tabs: any) => {
            return (
              <SwiperSlide key={data.indexOf(tabs)}>
                <div
                  key={data.indexOf(tabs)}
                  className={'flex items-center justify-around'}
                >
                  <span className="container flex items-center justify-between px-6 py-3 mx-auto">
                    {tabs.map((tab: BannerData) => {
                      return (
                        <div
                          key={tabs.indexOf(tab)}
                          className="container flex place-content-center"
                        >
                          <BannerSubCard
                            title={tab.title}
                            description={tab.description}
                            link={tab.link}
                            imageLink={
                              tabs.indexOf(tab) === 0 ? vector1 : vector2
                            }
                          />
                        </div>
                      )
                    })}
                  </span>
                </div>
              </SwiperSlide>
            )
          })}
        </div>
      </Swiper>
    </>
  )
}

export default SingleSlide
