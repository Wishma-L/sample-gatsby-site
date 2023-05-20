import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'gatsby'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Trans } from 'gatsby-plugin-react-i18next'

const BlogsDropdown = () => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="block mx-4 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400">
            <span className="flex">
              <Trans>Blogs</Trans>
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
            <h4>Rendering Modes Blogs</h4>
            <ul>
              <Menu.Item>
                <li>
                  <Link
                    className="block mx-2 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                    to="/blog-post-page"
                  >
                    <Trans>Clouda Blogs</Trans>
                  </Link>
                </li>
              </Menu.Item>
              <Menu.Item>
                <li>
                  <Link
                    className="block mx-2 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                    to="/blog-app/paginated-blog-list"
                  >
                    <Trans>CSR-Blogs</Trans>
                  </Link>
                </li>
              </Menu.Item>
              <Menu.Item>
                <li>
                  <Link
                    className="block mx-2 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                    to="/blogs"
                  >
                    <Trans>SSG-Blogs</Trans>
                  </Link>
                </li>
              </Menu.Item>
              <Menu.Item>
                <li>
                  <Link
                    className="block mx-2 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                    to="/ssr-blog-page?page=1"
                  >
                    <Trans>SSR-Blogs</Trans>
                  </Link>
                </li>
              </Menu.Item>
              <Menu.Item>
                <li>
                  <Link
                    className="block mx-2 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                    to="/hybrid-page"
                  >
                    <Trans>Hybrid-Blogs</Trans>
                  </Link>
                </li>
              </Menu.Item>
              <Menu.Item>
                <li>
                  <Link
                    className="block mx-2 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                    to="/blog-app/blog-with-comments"
                  >
                    <Trans>CSR-blogs with comments</Trans>
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

export default BlogsDropdown
