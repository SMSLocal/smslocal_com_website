import { Link } from 'react-router-dom'
import './RcsEcosystemHub.css'

/**
 * Bespoke "everything RCS connects to" for /rcs-business-messaging.
 * A linked chain: the connected channels sit in a row joined by interlocking
 * chain-link connectors — a system, not a hub-and-spokes. De-boxed. Links.
 */
function RcsEcosystemHub({ eyebrow, title, subtitle, items = [] }) {
  return (
    <section className="section reco-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="rchain">
          {items.map((it, i) => (
            <div className="rchain-node" key={it.title}>
              {i > 0 && <span className="rchain-link" aria-hidden="true" />}
              <Link className="rchain-item" to={it.href || '/'}>
                <span className="rchain-icon">{it.icon}</span>
                <h3 className="rchain-title">{it.title}</h3>
                <p className="rchain-desc">{it.desc}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RcsEcosystemHub
