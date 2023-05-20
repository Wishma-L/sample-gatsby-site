import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { I18nextContext, useI18next } from 'gatsby-plugin-react-i18next'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const LanguageSelector = () => {
  const { languages, changeLanguage } = useI18next()

  const context = React.useContext(I18nextContext)

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {/* {_state.selectedLang==='' ? 'Prefered Language':_state.selectedLang} */}
          {context.language}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 w-56 bg-white ring-1">
          <div className="py-1">
            {languages.map((lng) => (
              <div key={lng}>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 text-base no-underline'
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        changeLanguage(lng)
                      }}
                    >
                      {lng}
                    </a>
                  )}
                </Menu.Item>
              </div>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default LanguageSelector
