import { Link } from 'react-router-dom'
import './AgentDirectory.css'

function AgentDirectory({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="agd-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="agd-grid">
          {items.map((item, i) => (
            <Link to={item.href} className={`agd-card agd-tint--${i % 5}`} key={item.title}>
              <span className="agd-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="agd-more">
                Learn more
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AgentDirectory
