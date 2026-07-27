import { useEffect, useState } from 'react'
import { slugify } from '../../lib/posts.js'
import styles from './BlogPost.module.css'

function TableOfContents({ blocks, hasFaq = false }) {
  const headings = blocks
    .filter((b) => b.type === 'h2')
    .map((h) => ({ id: slugify(h.text), text: h.text }))

  const entries = hasFaq
    ? [...headings, { id: 'faq', text: 'Frequently Asked Questions' }]
    : headings

  const ids = entries.map((e) => e.id)
  const idKey = ids.join(',')
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const els = idKey
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (els.length === 0) return

    const TRIGGER_OFFSET = 120

    function update() {
      let current = els[0].id
      for (const el of els) {
        if (el.getBoundingClientRect().top - TRIGGER_OFFSET <= 0) {
          current = el.id
        } else {
          break
        }
      }
      setActiveId(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [idKey])

  if (entries.length === 0) return null

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <div className={styles.tocLabel}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="14" y2="18" />
        </svg>
        Table of Contents
      </div>
      <div className={styles.tocScroll}>
        <ul>
          {entries.map((entry, i) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={entry.id === activeId ? styles.tocActive : undefined}
              >
                <span className={styles.tocNum}>{String(i + 1).padStart(2, '0')}</span>
                <span>{entry.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.tocCta}>
        <div className={styles.tocCtaHeading}>Try SMSLocal free</div>
        <p className={styles.tocCtaText}>No apps, no code — send your first campaign today.</p>
        <a href="/signup" className={styles.tocCtaButton}>
          Create Free Trial Account
        </a>
      </div>
    </nav>
  )
}

export default TableOfContents
