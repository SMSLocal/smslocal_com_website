import { Link } from 'react-router-dom'
import './EcosystemIconGrid.css'

function EcosystemIconGrid({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="eig-grid">
          {items.map((item) => (
            <Link to={item.href} className="eig-item" key={item.title}>
              <span className="eig-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="eig-link">Explore <span className="eig-arrow">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcosystemIconGrid
