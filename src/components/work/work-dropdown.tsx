import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'gatsby'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Trans } from 'gatsby-plugin-react-i18next'

const WorkDropdown = () => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="block mx-4 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400">
            <span className="flex">
              <Trans>Work</Trans>
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 bg-white ring-1">
            <h4>Rendering Modes Starter</h4>
            <ul>
              <Menu.Item>
                <li>
                  <Link to="/dsg" className="no-underline text-lg">
                    DSG page
                  </Link>
                </li>
              </Menu.Item>
              <Menu.Item>
                <li>
                  <Link to="/ssr" className="no-underline text-lg">
                    SSR page
                  </Link>
                </li>
              </Menu.Item>
            </ul>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default WorkDropdown
