import React from 'react'
import arrow from '../../images/arrow.png'

export const JoinUsBanner = () => {
  return (
    <>
      <h2>Contact Us</h2>
      <div className="flex items-center py-5 mt-8">
        <div className="mb-6 md:mb-0 flex justify-between block w-[35rem] rounded py-3 mb-3 leading-tight bg-gray-200 focus:outline-none focus:bg-white">
          <input
            className="bg-gray-200 text-gray-700 placeholder:pl-4"
            id="grid-first-name"
            type="text"
            placeholder="Send message"
          />
          <a className="m-2">
            <img className="w-[13px]" src={arrow} alt="arrow" />
          </a>
        </div>
      </div>
    </>
  )
}
