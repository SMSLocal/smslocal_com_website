import { Link } from 'react-router-dom'
import './PricingTiers.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke pricing tiers for the /pricing page.
 * A premium ladder: the free Starter tier is deliberately plain and airy, and
 * each paid tier escalates in polish — gradient price, gradient ring, deeper
 * elevation and (on Enterprise) a soft gradient glow — all kept LIGHT.
 * Cards are the accepted pricing convention; premium is conveyed by depth, not
 * by dark fills.
 */

// visual tier per index: free -> popular -> premium -> top
const LEVELS = ['free', 'popular', 'premium', 'top']

function PricingTiers({ title, subtitle, plans }) {
  return (
    <section className="section ptiers-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ptiers">
          {plans.map((plan, i) => {
            const level = LEVELS[i] || 'premium'
            const paid = level !== 'free'
            return (
              <div className={`ptier ptier--${level}`} key={plan.name}>
                {level === 'popular' && <span className="ptier-flag">Most popular</span>}
                {level === 'top' && <span className="ptier-flag ptier-flag--top">White-glove</span>}

                <div className="ptier-head">
                  <h3 className="ptier-name">{plan.name}</h3>
                  {plan.tagline && <p className="ptier-tag">{plan.tagline}</p>}
                </div>

                <p className="ptier-price">
                  <span className="ptier-amount">{plan.price}</span>
                  {plan.period && <span className="ptier-period">{plan.period}</span>}
                </p>

                <Link
                  to={plan.href || '/contact-us'}
                  className={paid ? 'ptier-cta ptier-cta--solid' : 'ptier-cta ptier-cta--ghost'}
                >
                  {plan.cta || 'Choose plan'}
                </Link>

                <ul className="ptier-feats">
                  {plan.features.map((f) => (
                    <li className="ptier-feat" key={f}>
                      <span className="ptier-check" aria-hidden="true"><IconCheck /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingTiers
