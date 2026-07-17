import { Link } from 'react-router-dom'
import './EcosystemChipsRow.css'

function EcosystemChipsRow({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ecr2-wrap">
          {items.map((item) => (
            <Link to={item.href} className="ecr2-chip" key={item.title}>
              <span className="ecr2-pill">
                <span className="ecr2-icon">{item.icon}</span>
                {item.title}
              </span>
              <p className="ecr2-desc">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcosystemChipsRow
