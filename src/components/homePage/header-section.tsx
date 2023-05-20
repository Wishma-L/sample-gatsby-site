import { Link } from 'gatsby'
import React from 'react'
import clouda from '../../images/cloudaLogo.png'
import LanguageSelector from './language-selector'
import {
  Trans,
  Link as LangLink,
  I18nextContext,
} from 'gatsby-plugin-react-i18next'
import WorkDropdown from '../work/work-dropdown'
import { useKeycloak } from '@react-keycloak/web'
import BlogsDropdown from '../blog-dropdown'

const Header = () => {
  const divStyle = {
    height: '70px',
    width: '100%',
  }
  const context = React.useContext(I18nextContext)
  const { keycloak } = useKeycloak()
  return (
    <nav className="bg-white shadow">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <a
                className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="/"
              >
                <img style={divStyle} src={clouda} alt="" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden -mx-4 lg:flex lg:items-center">
            <LangLink
              className="block mx-4 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
              to={'/solutions'}
              language={context.language}
            >
              <Trans>Solutions</Trans>
            </LangLink>
            <WorkDropdown />
            <a
              href="/about"
              className="block mx-4 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
            >
              <Trans>About</Trans>
            </a>
            <a
              href="#"
              className="block mx-4 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
            >
              <Trans>Careers</Trans>
            </a>
            <Link
              className="block mx-4 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
              to="/posts"
            >
              <Trans>posts</Trans>
            </Link>
            <Link
              className="block mx-4 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
              to="/ssr-article-page"
            >
              <Trans>Articles</Trans>
            </Link>
            <BlogsDropdown />
            <a
              href="#"
              className="block mx-4 mt-2 text-base text-blue-400 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-black-400 rounded-3xl border-solid border-2 border-blue-400 p-2 no-underline"
            >
              <Trans>Get in touch with us</Trans>
            </a>
            <LanguageSelector />
            {keycloak.authenticated ? (
              <Link
                to="#"
                onClick={() => {
                  keycloak.logout({ redirectUri: window.location.origin })
                }}
                className="block mx-4 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Trans>Logout {keycloak.idTokenParsed?.name}</Trans>
              </Link>
            ) : (
              <Link
                className="block mx-4 mt-2 text-base text-gray-700 capitalize lg:mt-0 hover:text-blue-600 dark:hover:text-blue-400 no-underline"
                to="/"
                onClick={(e) => {
                  e.preventDefault()
                  keycloak.login({ redirectUri: window.location.href })
                }}
              >
                <Trans>Login</Trans>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
