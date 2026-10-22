import { Link } from 'react-router-dom'
import SmsApiGlobe from './SmsApiGlobe.jsx'
import './sms-api-hero.css'

/**
 * Hero for the SMS API page. Copy on the left; on the right a live globe of
 * message routes (SmsApiGlobe) that the visitor can drag.
 */

function SmsApiHero({ eyebrow, title, subtitle, primaryCta, secondaryCta }) {
  return (
    <section className="sh-hero">
      <div className="container sh-inner">
        <div className="sh-copy">
          <span className="sh-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="sh-ctas">
            <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>
            <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>
          </div>
        </div>

        <SmsApiGlobe />
      </div>
    </section>
  )
}

export default SmsApiHero
