import { useEffect, useState } from 'react'
import './TouchpointCarousel.css'

const SLOT_TINTS = ['tpc-tint-a', 'tpc-tint-b', 'tpc-tint-c']
const DURATION = 5000

function TouchpointCarousel({ eyebrow, title, subtitle, items, alt }) {
  const [index, setIndex] = useState(0)
  const count = items.length

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), DURATION)
    return () => clearInterval(id)
  }, [count])

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  const visible = [0, 1, 2].map((offset) => items[(index + offset) % count])

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="tpc">
          <button type="button" className="tpc-arrow" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="tpc-cards">
            {visible.map((item, i) => (
              <div className={`tpc-card ${SLOT_TINTS[i]}${i === 1 ? ' is-center' : ''}`} key={`${item.title}-${index}-${i}`}>
                <span className="tpc-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <button type="button" className="tpc-arrow" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <div className="tpc-dots">
          {items.map((item, i) => (
            <button
              type="button"
              key={item.title}
              className={`tpc-dot${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to ${item.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TouchpointCarousel
