import React from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import * as styles from '../../styles/hero.module.css'

type HeroProps = {
  image?: IGatsbyImageData
  title: string
  content?: string
}

const Hero = ({ image, title, content }: HeroProps) => {
  return (
    <div className={styles.hero}>
      {image && (
        <GatsbyImage className={styles.image} alt={title} image={image} />
      )}
      <div className={styles.details}>
        <h1 className={styles.title}>{title}</h1>
        {content && <p className={styles.content}>{content}</p>}
      </div>
    </div>
  )
}

export default Hero
