import { Link } from 'react-router-dom'
import './EcosystemAccentList.css'

function EcosystemAccentList({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="eal-list">
          {items.map((item) => (
            <Link to={item.href} className="eal-row" key={item.title}>
              <span className="eal-bar" aria-hidden="true" />
              <span className="eal-icon">{item.icon}</span>
              <div className="eal-text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcosystemAccentList
