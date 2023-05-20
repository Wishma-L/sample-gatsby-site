import React from 'react'
import backGroundImage from '../../../images/homePage-bg.png'

const divStyle = {
  backgroundImage: `url(${backGroundImage})`,
}

export const MainBanner = () => (
  <>
    <header>
      <div className="w-full bg-center bg-cover h-[32rem]" style={divStyle}>
        <div className="flex items-center w-full h-full ">
          <div className="text-left">
            <p className="text-7xl font-semibold text-black font-normal px-16">
              Sodales amet
            </p>
            <p className="text-7xl font-semibold text-black font-normal px-16">
              morbi adipiscing
            </p>
          </div>
        </div>
      </div>
    </header>
  </>
)
