import React from 'react'
import footerImage from '../../images/footer-image.png'
import footerCloudaIcon from '../../images/cloudaFooterIcon.png'
import { JoinUsBanner } from './join-us-banner.tsx'

export const Footer = () => (
  <>
    <footer className="bg-[#F0F0F0]">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex justify-between">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <div>
                <a href="#" className="">
                  <img className="h-18 w-56" src={footerCloudaIcon} alt="" />
                </a>
              </div>
              <p className="max-w-md mt-2 text-lg px-2">
                Vel massa mattis neque rutrum rhoncus vitae non. Odio elit
                ullamcorper vestidbulum et magcdana id feugiat dictumst. Neque
                nulla sit
              </p>
              <div className="px-2">
                <JoinUsBanner />
              </div>
            </div>
          </div>
          <div className="">
            <div className=" ">
              <div className="-w-5/6">
                <div>
                  <div className="flex pt-4 pb-2">
                    <h3 className="text-lg uppercase w-1/3 text-left underline">
                      Solutions
                    </h3>
                    <h3 className="text-lg uppercase w-1/3 text-left underline">
                      Work
                    </h3>
                    <h3 className="text-lg uppercase w-1/3 text-left underline">
                      Blog
                    </h3>
                  </div>
                  <div className="flex pb-4 pt-2">
                    <h3 className="text-lg uppercase w-1/3 text-left underline">
                      Careers
                    </h3>
                    <h3 className="text-lg uppercase w-1/3 text-left underline">
                      About
                    </h3>
                    <h3 className="text-lg uppercase w-1/3 text-left underline">
                      Contact
                    </h3>
                  </div>
                </div>
                <div className="">
                  <img
                    className="bg-cover bg-center"
                    src={footerImage}
                    alt="Footer-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-px my-6 bg-gray-300 border-none dark:bg-gray-700" />
        <div className="flex justify-between">
          <p className="text-center text-lg text-gray-800">
            Copyright © 2020 Clouda® Inc
          </p>
          <div className="flex justify-around">
            <p className="mt-2 text-lg ml-32 pr-2">Privacy and Policy</p>
            <p className="mt-2 text-lg mr-32 pl-2">Terms and Conditions </p>
          </div>
        </div>
      </div>
    </footer>
  </>
)
