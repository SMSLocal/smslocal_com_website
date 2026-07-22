import { useEffect, useState } from 'react'
import './CoverageReasons.css'

/**
 * "Why us" section for the DID / virtual numbers page — a row of 3D flip
 * cards. One auto-cycles to its flipped (description) face at a time; any
 * card can also be flipped by hand. Real depth/motion, distinct from the
 * stat band, orbit, track and card-grid patterns used elsewhere.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CoverageReasons({ eyebrow, title, subtitle, items, alt }) {
  const [flipped, setFlipped] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setFlipped((i) => (i + 1) % items.length), 2200)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <section className={alt ? 'section section-alt cvr-section' : 'section cvr-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="cvr-row">
          {items.map((item, i) => (
            <div
              className="cvr-flip"
              key={item.title}
              onClick={() => setFlipped(i)}
              onMouseEnter={() => setFlipped(i)}
            >
              <div className={i === flipped ? 'cvr-flip-inner flipped' : 'cvr-flip-inner'}>
                <div className="cvr-face cvr-front">
                  <span className="cvr-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                </div>
                <div className="cvr-face cvr-back">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoverageReasons
