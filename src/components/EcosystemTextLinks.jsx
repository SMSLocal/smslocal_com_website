import { Link } from 'react-router-dom'
import './EcosystemTextLinks.css'

function EcosystemTextLinks({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="etl-grid">
          {items.map((item) => (
            <Link to={item.href} className="etl-item" key={item.title}>
              <h3>
                {item.title}
                <span className="etl-arrow">→</span>
              </h3>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcosystemTextLinks
