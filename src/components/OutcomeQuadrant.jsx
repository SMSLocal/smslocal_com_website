import { IconRocket } from './icons.jsx'
import './OutcomeQuadrant.css'

function OutcomeQuadrant({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section oqd-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="oqd-grid">
          <span className="oqd-line oqd-line--v" aria-hidden="true" />
          <span className="oqd-line oqd-line--h" aria-hidden="true" />
          <span className="oqd-center" aria-hidden="true">
            <span className="oqd-center-glow" />
            <span className="oqd-center-core"><IconRocket /></span>
          </span>

          {items.map((item, i) => (
            <div className={`oqd-cell oqd-cell--${i}`} key={item.label} style={{ '--oqd-i': i }}>
              <span className="oqd-icon">{item.icon}</span>
              <strong className="oqd-value">{item.value}</strong>
              <span className="oqd-label">{item.label}</span>
              <p className="oqd-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OutcomeQuadrant
