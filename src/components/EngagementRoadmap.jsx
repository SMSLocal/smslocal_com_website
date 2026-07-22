import './EngagementRoadmap.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke, spatial engagement-phases section for /services/ai-consulting.
 * A horizontal zig-zag roadmap: a gradient path runs across the middle with a
 * node per phase, and the phase clusters alternate above and below the path.
 * NOT a list, NOT a quadrant (PartnerCore owns that on this page). De-boxed,
 * light. Each cluster carries its duration, title, description and exit gate.
 */
function EngagementRoadmap({ eyebrow, title, subtitle, phases = [] }) {
  return (
    <section className="section section-alt eroad-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="eroad">
          <span className="eroad-line" aria-hidden="true" />
          {phases.map((p, i) => (
            <div className={`eroad-phase ${i % 2 === 0 ? 'eroad-phase--up' : 'eroad-phase--down'}`} key={p.title}>
              <div className="eroad-card">
                <span className="eroad-dur">{p.duration}</span>
                <h3 className="eroad-title">{p.title}</h3>
                <p className="eroad-desc">{p.desc}</p>
                <span className="eroad-exit">
                  <span className="eroad-exit-check" aria-hidden="true"><IconCheck /></span>
                  {p.exit}
                </span>
              </div>
              <span className="eroad-node" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EngagementRoadmap
