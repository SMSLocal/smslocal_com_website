import './PartnerCore.css'
import { IconRocket } from './icons.jsx'

/**
 * Bespoke, spatial "why partner with us" section for /services/ai-consulting.
 * NOT a list: four cornerstones sit in the four quadrants, clustered inward
 * around a glowing central core (production-first), split by a gradient cross.
 * De-boxed, light, immersive via the central emblem, glow and gradient cross.
 */
const QUADRANTS = ['tl', 'tr', 'bl', 'br']

function PartnerCore({ eyebrow, title, subtitle, items = [] }) {
  return (
    <section className="section pcore-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="pcore">
          <span className="pcore-glow" aria-hidden="true" />
          <span className="pcore-vline" aria-hidden="true" />
          <span className="pcore-hline" aria-hidden="true" />

          {items.slice(0, 4).map((r, i) => (
            <div className={`pcore-cell pcore-cell--${QUADRANTS[i]}`} key={r.title}>
              <div className="pcore-content">
                <span className="pcore-medal">{r.icon}</span>
                <h3 className="pcore-title">{r.title}</h3>
                <p className="pcore-desc">{r.desc}</p>
              </div>
            </div>
          ))}

          <span className="pcore-core" aria-hidden="true">
            <span className="pcore-core-aura" />
            <IconRocket />
          </span>
        </div>
      </div>
    </section>
  )
}

export default PartnerCore
