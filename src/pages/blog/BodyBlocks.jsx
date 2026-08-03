import { Link } from 'react-router-dom'
import { headingId } from '../../lib/posts.js'
import { withSlash } from '../../lib/url.js'
import styles from './BlogPost.module.css'

/**
 * Inline runs from imported posts: a string, `{ b }` bold, `{ i }` italic, or
 * `{ a, x, c }` link (`x` marks an off-site destination). Authored posts carry
 * plain `text` instead and skip this path entirely.
 */
export function RichText({ rich }) {
  return (
    <>
      {rich.map((node, i) => {
        if (typeof node === 'string') return node
        if (node.b) {
          return (
            <strong key={i}>
              <RichText rich={node.b} />
            </strong>
          )
        }
        if (node.i) {
          return (
            <em key={i}>
              <RichText rich={node.i} />
            </em>
          )
        }
        if (node.a) {
          const label = <RichText rich={node.c} />
          if (node.x) {
            return (
              <a key={i} href={node.a} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            )
          }
          if (node.a.startsWith('#')) {
            return (
              <a key={i} href={node.a}>
                {label}
              </a>
            )
          }
          // Imported copy carries WordPress-era hrefs, some without the
          // trailing slash this site serves. Normalised here rather than in
          // importedPosts.generated.json, which is regenerated from the source.
          return (
            <Link key={i} to={withSlash(node.a)}>
              {label}
            </Link>
          )
        }
        return null
      })}
    </>
  )
}

/** A block's inline content, whichever shape the post uses. */
function Inline({ block }) {
  if (block.rich) return <RichText rich={block.rich} />
  return block.text
}

function BodyBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={i} id={`block-${i}`}>
                <Inline block={block} />
              </p>
            )
          case 'h2':
            return (
              <h2 key={i} id={headingId(block, i)}>
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} id={headingId(block, i)}>
                {block.text}
              </h3>
            )
          case 'h4':
            return (
              <h4 key={i} id={headingId(block, i)}>
                {block.text}
              </h4>
            )
          case 'quote':
            return (
              <blockquote key={i} id={`block-${i}`} className={styles.quote}>
                “<Inline block={block} />”
                {block.attribution && (
                  <span className={styles.quoteAttribution}>— {block.attribution}</span>
                )}
              </blockquote>
            )
          case 'ul':
          case 'ol': {
            const List = block.type === 'ol' ? 'ol' : 'ul'
            return (
              <List key={i} id={`block-${i}`}>
                {block.items.map((item, j) => (
                  <li key={j}>{typeof item === 'string' ? item : <RichText rich={item} />}</li>
                ))}
              </List>
            )
          }
          case 'img':
            return (
              <figure key={i} id={`block-${i}`} className={styles.figure}>
                <img
                  src={block.src}
                  alt={block.alt}
                  width={block.width || undefined}
                  height={block.height || undefined}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            )
          case 'table':
            return (
              <div key={i} id={`block-${i}`} className={styles.tableScroll}>
                <table className={styles.table}>
                  {block.head && (
                    <thead>
                      <tr>
                        {block.head.map((cell, j) => (
                          <th key={j}>
                            <RichText rich={cell} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>
                            <RichText rich={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'hr':
            return <hr key={i} className={styles.rule} />
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
          case 'cta': {
            const href = block.buttonHref ?? '/contact-us'
            return (
              <div key={i} className={styles.inlineCta}>
                <div className={styles.inlineCtaBody}>
                  <div className={styles.inlineCtaHeading}>
                    <RichText rich={block.heading} />
                  </div>
                  {block.text?.length > 0 && (
                    <p className={styles.inlineCtaText}>
                      <RichText rich={block.text} />
                    </p>
                  )}
                </div>
                {block.buttonExternal ? (
                  <a
                    href={href}
                    className={styles.inlineCtaButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {block.buttonText}
                  </a>
                ) : (
                  <Link to={href} className={styles.inlineCtaButton}>
                    {block.buttonText}
                  </Link>
                )}
              </div>
            )
          }
          default:
            return null
        }
      })}
    </>
  )
}

export default BodyBlocks
