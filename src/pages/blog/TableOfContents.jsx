import { useEffect, useState } from 'react'
import { headingId } from '../../lib/posts.js'
import styles from './BlogPost.module.css'

function TableOfContents({ blocks, hasFaq = false }) {
  const headings = blocks
    .map((block, i) => ({ block, i }))
    .filter(({ block }) => block.type === 'h2')
    .map(({ block, i }) => ({ id: headingId(block, i), text: block.text }))

  const entries = hasFaq
    ? [...headings, { id: 'faq', text: 'Frequently Asked Questions' }]
    : headings

  const ids = entries.map((e) => e.id)
  const idKey = ids.join(',')
  const [activeId, setActiveId] = useState(ids[0] ?? '')
  const [progress, setProgress] = useState(0)

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

      /* How far through the article body the reader is — drives the bar at
         the top of the card. Driven by state rather than a scroll-linked CSS
         animation so it stays in lockstep with the active-section highlight. */
      const article = document.getElementById('article-body')
      if (!article) return
      const rect = article.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const ratio = scrollable > 0 ? -rect.top / scrollable : rect.top <= 0 ? 1 : 0
      setProgress(Math.min(1, Math.max(0, ratio)))
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
      <div className={styles.tocProgressTrack} aria-hidden="true">
        <span
          className={styles.tocProgressBar}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className={styles.tocLabel}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="14" y2="18" />
        </svg>
        Table of Contents
        <span className={styles.tocPercent}>{Math.round(progress * 100)}%</span>
      </div>

      <ul className={styles.tocList}>
        {entries.map((entry) => {
          const active = entry.id === activeId
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={active ? 'location' : undefined}
                className={`${styles.tocLink} ${active ? styles.tocLinkActive : ''}`}
              >
                {entry.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default TableOfContents
