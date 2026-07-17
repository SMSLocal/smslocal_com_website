import { useState, useEffect } from 'react'
import './BuildingBlocksCarousel.css'

function BuildingBlocksCarousel({ title, subtitle, eyebrow, items, alt }) {
  const total = items.length
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  const item = items[index]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="bbc-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="bbc-panel">
          <div className="bbc-card" key={index}>
            <div className="bbc-text">
              <span className="bbc-step">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <span className="bbc-icon">{item.icon}</span>
          </div>

          <div className="bbc-nav">
            <button className="bbc-arrow" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="bbc-dots">
              {items.map((it, i) => (
                <button
                  key={it.title}
                  className={`bbc-dot${i === index ? ' is-active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={it.title}
                />
              ))}
            </div>
            <button className="bbc-arrow" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuildingBlocksCarousel
