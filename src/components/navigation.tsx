import React from 'react'
import { Link } from 'gatsby'

import * as styles from '../styles/navigation.module.css'

const Navigation = () => {
  return (
    <nav role="navigation" className={styles.container} aria-label="Main">
      <Link to="/" className={styles.logoLink}>
        <span className={styles.logo} />
        <span className={styles.navigationItem}>Gatsby Starter Contentful</span>
      </Link>
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/" activeClassName="active">
            Home
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/blog/" activeClassName="active">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
