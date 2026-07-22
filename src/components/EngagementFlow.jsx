import './EngagementFlow.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke engagement-phases section for /services/ai-consulting.
 * A horizontal 4-phase flow: each phase is a column with a gradient duration
 * pill, title, description, and an "exit gate" chip at the foot showing what
 * you walk away with. Columns divided by hairlines. De-boxed, light.
 */
function EngagementFlow({ eyebrow, title, subtitle, phases = [] }) {
  return (
    <section className="section section-alt eflow-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="eflow">
          {phases.map((p, i) => (
            <div className="eflow-phase" key={p.title} style={{ '--i': i }}>
              <span className="eflow-dur">{p.duration}</span>
              <h3 className="eflow-title">{p.title}</h3>
              <p className="eflow-desc">{p.desc}</p>
              <span className="eflow-exit">
                <span className="eflow-exit-check" aria-hidden="true"><IconCheck /></span>
                {p.exit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EngagementFlow
