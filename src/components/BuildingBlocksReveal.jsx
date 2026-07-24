import { useState } from 'react'
import './BuildingBlocksReveal.css'

// Pure hover/focus-driven reveal cards. Every animation is a fixed-height
// CSS transform (translateY of a 2x-height inner strip) — nothing measures
// content, nothing runs on a timer, so there is no layout thrash and no
// interval/state machine that can drift out of sync.

function BuildingBlocksReveal({ title, subtitle, eyebrow, items, alt }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex((cur) => (cur === i ? null : i))

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="bbr-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="bbr-grid">
          {items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              className={`bbr-card bbr-card--${i % 4}${openIndex === i ? ' is-open' : ''}`}
              onClick={() => toggle(i)}
            >
              <span className="bbr-card-inner">
                <span className="bbr-face bbr-face-front">
                  <span className="bbr-icon">{it.icon}</span>
                  <h3>{it.title}</h3>
                  <span className="bbr-hint">Tap to explore</span>
                </span>
                <span className="bbr-face bbr-face-back">
                  <span className="bbr-icon bbr-icon-back">{it.icon}</span>
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BuildingBlocksReveal
