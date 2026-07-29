import { useState } from 'react'
import { Link } from 'react-router-dom'
import './PricingTiers.css'
import { IconCheck } from './icons.jsx'

/**
 * Pricing tiers for /pricing — structurally replicated from
 * acepeak.com/pricing's plan-card anatomy: icon badge, serif plan name,
 * tagline, big serif price + secondary "billed monthly" line, a colored
 * "fit" pill, a full-width CTA, an italic "Best for:" line, a "plus" chip
 * ("Everything in X, plus:") and a plain-check feature list — each card
 * carrying its own accent color (teal / brand gradient / coral / dark),
 * mirroring the reference's per-tier color coding but in this project's
 * own theme tokens.
 */
function PricingTiers({ title, subtitle, plans }) {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="section ptiers-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ptiers-toggle keeps-own-width" role="group" aria-label="Billing period">
          <button
            type="button"
            className={annual ? 'ptiers-toggle-btn' : 'ptiers-toggle-btn is-active'}
            onClick={() => setAnnual(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            className={annual ? 'ptiers-toggle-btn is-active' : 'ptiers-toggle-btn'}
            onClick={() => setAnnual(true)}
          >
            Annual
            <span className="ptiers-toggle-save">Save 20%</span>
          </button>
        </div>

        <div className="ptiers">
          {plans.map((plan) => {
            const price = annual && plan.annualPrice ? plan.annualPrice : plan.price
            return (
              <div className={`ptier ptier--${plan.accent}${plan.highlighted ? ' ptier--pop' : ''}`} key={plan.name}>
                {plan.highlighted && <span className="ptier-flag">Most popular</span>}

                <span className="ptier-icon">{plan.icon}</span>

                <h3 className="ptier-name">{plan.name}</h3>
                {plan.tagline && <p className="ptier-tag">{plan.tagline}</p>}

                <div className="ptier-price-block">
                  <p className="ptier-price">
                    <span className="ptier-amount">{price}</span>
                    {plan.period && <span className="ptier-period">{plan.period}</span>}
                  </p>
                  {plan.billedNote && <div className="ptier-billed">{plan.billedNote}</div>}
                </div>

                {plan.fitTag && <span className="ptier-fittag">{plan.fitTag}</span>}

                <Link to={plan.href || '/contact-us'} className="ptier-cta">
                  {plan.cta || 'Choose plan'}
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>

                {plan.bestFor && (
                  <p className="ptier-bestfor"><strong>Best for:</strong> {plan.bestFor}</p>
                )}

                <div className="ptier-plus">What you get</div>

                <ul className="ptier-feats">
                  {plan.features.map((f) => {
                    const label = typeof f === 'string' ? f : f.label
                    const isUpgrade = typeof f !== 'string' && f.upgrade
                    return (
                      <li className={isUpgrade ? 'ptier-feat is-upgrade' : 'ptier-feat'} key={label}>
                        <span className="ptier-check" aria-hidden="true"><IconCheck /></span>
                        {label}
                      </li>
                    )
                  })}
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
