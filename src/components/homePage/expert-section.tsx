import React from 'react'
import uiLayout from '../../images/Expert-image.png'

export const ExpertSection = () => (
  <>
    <header className="bg-white">
      <div className="container px-6 mx-auto">
        <div className="items-center lg:flex">
          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img src={uiLayout} alt="#" />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl">
                Experts in <span className="text-red-500">VTEX</span> io{' '}
              </h1>
              <p className="mt-4 text-gray-600">
                At eu elementum nunc, augue lorem phasellus vehicula in duis
                sempertem consequat aliquet conse ecteturt pellentesque sedolob.
              </p>
              <div className="flex flex-col mt-8 space-y-3 lg:space-y-0 lg:flex-row">
                <button className="bg-transparent hover:bg-gray-300 text-gray-500 font-semibold hover:text-black py-2 px-4 border border-gray-300 hover:border-transparent rounded-full">
                  Visit Website
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
)
