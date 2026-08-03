import { useState } from 'react'
import { Link } from 'react-router-dom'
import './IntegrationsTabs.css'
import AppLogo, { colorFor } from './AppLogo.jsx'
import { APP_CATEGORIES } from '../data/appCategories.jsx'

const TAB_DOTS = ['#4f5bd5', '#ec4899', '#fb7185', '#8b5cf6', '#0ea5e9', '#154989']

function IntegrationsTabs({ title, subtitle, eyebrow = 'Integrations', alt, id }) {
  const total = APP_CATEGORIES.length
  const [index, setIndex] = useState(0)
  const cat = APP_CATEGORIES[index]
  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  return (
    <section id={id} className={alt ? 'section section-alt' : 'section'} style={id ? { scrollMarginTop: '88px' } : undefined}>
      <div className="container">
        <div className="intt-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        {/* Arrow navigation */}
        <div className="intt-nav">
          <button className="intt-arrow" onClick={prev} aria-label="Previous category">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span className="intt-current">
            <span className="intt-dot" style={{ '--dot': TAB_DOTS[index % TAB_DOTS.length] }} />
            {cat.title}
            <small>{index + 1} / {total}</small>
          </span>
          <button className="intt-arrow" onClick={next} aria-label="Next category">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {/* Active category's apps */}
        <div className="intt-panel">
          <div className="intt-grid">
            {cat.apps.map((app, i) => (
              <div className="intt-card" key={app.name}>
                <div className="intt-card-top">
                  <AppLogo name={app.name} color={colorFor(i)} size={22} />
                  <span className="intt-name">{app.name}</span>
                  {app.tags?.[0] && <span className="intt-tag">{app.tags[0]}</span>}
                </div>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>
          <div className="intt-foot">
            <span className="intt-count">{cat.count} apps in {cat.title}</span>
            <Link to={`/products/ai-agents/apps/${cat.slug}/`} className="intt-link">View all {cat.title} →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntegrationsTabs
