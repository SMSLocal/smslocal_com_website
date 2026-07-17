import { Link } from 'react-router-dom'
import './UseCaseShowcase.css'

function CaseLink({ href, className, children }) {
  if (!href) return null
  const external = href.startsWith('mailto:') || href.startsWith('http')
  return external
    ? <a href={href} className={className}>{children}</a>
    : <Link to={href} className={className}>{children}</Link>
}

function UseCaseShowcase({ eyebrow, title, subtitle, items }) {
  const featured = items[items.length - 1]
  const rest = items.slice(0, -1)

  return (
    <section className="section ucs-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ucs">
          <div className="ucs-feature">
            <span className="ucs-feature-icon">{featured.icon}</span>
            <h3>{featured.title}</h3>
            <p>{featured.desc}</p>
            <CaseLink href={featured.href} className="ucs-feature-link">Learn more →</CaseLink>
          </div>

          <div className="ucs-list">
            {rest.map((item) => (
              <div className="ucs-row" key={item.title}>
                <span className="ucs-row-icon">{item.icon}</span>
                <div className="ucs-row-copy">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <CaseLink href={item.href} className="ucs-row-link">→</CaseLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UseCaseShowcase
