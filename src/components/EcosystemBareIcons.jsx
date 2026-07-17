import { Link } from 'react-router-dom'
import './EcosystemBareIcons.css'

function EcosystemBareIcons({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ebi-grid">
          {items.map((item) => (
            <Link to={item.href} className="ebi-item" key={item.title}>
              <span className="ebi-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcosystemBareIcons
