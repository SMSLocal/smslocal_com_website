import { Link } from 'react-router-dom'
import { slugify } from '../../lib/posts.js'
import styles from './BlogPost.module.css'

function BodyBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={i} id={`block-${i}`}>
                {block.text}
              </p>
            )
          case 'h2':
            return (
              <h2 key={i} id={slugify(block.text)}>
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} id={`block-${i}`}>
                {block.text}
              </h3>
            )
          case 'quote':
            return (
              <blockquote key={i} id={`block-${i}`} className={styles.quote}>
                “{block.text}”
                {block.attribution && (
                  <span className={styles.quoteAttribution}>— {block.attribution}</span>
                )}
              </blockquote>
            )
          case 'ul':
            return (
              <ul key={i} id={`block-${i}`}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case 'stats':
            return (
              <div key={i} className={styles.statRow}>
                {block.items.map((stat, j) => (
                  <div key={j} className={styles.statCard}>
                    <div className={styles.num}>{stat.num}</div>
                    <div className={styles.label}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )
          case 'cta':
            return (
              <div key={i} className={styles.inlineCta}>
                <div>
                  <div className={styles.inlineCtaHeading}>{block.heading}</div>
                  <p className={styles.inlineCtaText}>{block.text}</p>
                </div>
                <Link to="/contact-us" className={styles.inlineCtaButton}>
                  {block.buttonText}
                </Link>
              </div>
            )
          default:
            return null
        }
      })}
    </>
  )
}

export default BodyBlocks
