import { Link } from 'react-router-dom'
import './IntegrationsGrid.css'

function IntegrationsGrid({ title, subtitle, items, alt, id, eyebrow = 'Integrations' }) {
  return (
    <section id={id} className={alt ? 'section section-alt' : 'section'} style={id ? { scrollMarginTop: '88px' } : undefined}>
      <div className="container">
        <div className="intg-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="intg-grid">
          {items.map((it) => {
            const inner = (
              <>
                <div className="intg-card-top">
                  <span className="intg-icon">{it.icon}</span>
                  {it.count && <span className="intg-count">{it.count} apps</span>}
                </div>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
                <div className="intg-tools">
                  {it.tools.map((t) => (
                    <span className="intg-tool" key={t}>{t}</span>
                  ))}
                  {it.href && <span className="intg-more">View →</span>}
                </div>
              </>
            )
            return it.href ? (
              <Link className="intg-card intg-card--link" to={it.href} key={it.title}>{inner}</Link>
            ) : (
              <div className="intg-card" key={it.title}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default IntegrationsGrid
