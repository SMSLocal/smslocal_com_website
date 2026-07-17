import { Link } from 'react-router-dom'
import './ChannelDirectory.css'

function ChannelDirectory({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="chd-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="chd-grid">
          {items.map((item) => (
            <Link to={item.href} className="chd-row" key={item.title}>
              <span className="chd-icon">{item.icon}</span>
              <div className="chd-text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <span className="chd-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChannelDirectory
