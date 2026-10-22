import { Link } from 'react-router-dom'
import CpaasHubStage from './CpaasHubStage.jsx'
import './cpaas-hub-hero.css'

/**
 * Hero for the CPaaS hub. Copy on the left; on the right an animated phone that
 * re-skins itself for every channel (CpaasHubStage).
 */

function CpaasHubHero({ eyebrow, title, subtitle, primaryCta, secondaryCta }) {
  return (
    <section className="cph-hero">
      <div className="container cph-inner">
        <div className="cph-copy">
          <span className="cph-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="cph-ctas">
            <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>
            <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>
          </div>
        </div>

        <CpaasHubStage />
      </div>
    </section>
  )
}

export default CpaasHubHero
