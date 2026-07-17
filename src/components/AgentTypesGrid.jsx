import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AgentTypesGrid.css'

function AgentTypesGrid({ title, subtitle, eyebrow, items, alt, perPage = 2 }) {
  const pages = Math.max(1, Math.ceil(items.length / perPage))
  const [page, setPage] = useState(0)
  const prev = () => setPage((p) => (p - 1 + pages) % pages)
  const next = () => setPage((p) => (p + 1) % pages)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pages])

  const visible = items.slice(page * perPage, page * perPage + perPage)

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="agt-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="agt-grid" key={page}>
          {visible.map((it) => (
            <Link to={it.href} className="agt-card" key={it.title}>
              <div className="agt-body">
                <p>{it.desc}</p>
                <span className="agt-more">Learn more →</span>
              </div>
              <div className="agt-head">
                <span className="agt-icon">{it.icon}</span>
                <h3>{it.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        {pages > 1 && (
          <div className="agt-nav">
            <button className="agt-arrow" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="agt-dots">
              {Array.from({ length: pages }).map((_, i) => (
                <span key={i} className={`agt-dot${i === page ? ' is-active' : ''}`} />
              ))}
            </div>
            <button className="agt-arrow" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default AgentTypesGrid
