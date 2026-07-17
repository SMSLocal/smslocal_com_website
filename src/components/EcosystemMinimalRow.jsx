import { Link } from 'react-router-dom'
import './EcosystemMinimalRow.css'

function EcosystemMinimalRow({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="emr-row">
          {items.map((item) => (
            <Link to={item.href} className="emr-item" key={item.title}>
              <span className="emr-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcosystemMinimalRow
