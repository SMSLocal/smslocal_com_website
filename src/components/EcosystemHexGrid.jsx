import { Link } from 'react-router-dom'
import './EcosystemHexGrid.css'

function EcosystemHexGrid({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ehx-grid">
          {items.map((item) => (
            <Link to={item.href} className="ehx-item" key={item.title}>
              <span className="ehx-hex">
                <span className="ehx-hex-icon">{item.icon}</span>
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcosystemHexGrid
