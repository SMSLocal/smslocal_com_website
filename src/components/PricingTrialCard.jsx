import { Link } from 'react-router-dom'
import { IconChat, IconRobot, IconUsers, IconBolt } from './icons.jsx'
import './PricingTrialCard.css'

/**
 * "$0 today / 14-day free trial" callout for /pricing — structurally
 * replicated from acepeak.com/pricing's trial section: a 3-column grid
 * (giant price+badge / eyebrow+heading+chips / CTA+caption), themed in
 * this project's own gradient instead of the reference's red/amber.
 */
const CHIPS = [
  { icon: <IconChat />, label: '500 conversations' },
  { icon: <IconUsers />, label: 'Shared team inbox' },
  { icon: <IconRobot />, label: 'AI agent included' },
  { icon: <IconBolt />, label: 'Broadcasting' },
]

function PricingTrialCard() {
  return (
    <section className="section ptrial-section">
      <div className="container">
        <div className="ptrial">
          <span className="ptrial-clip" aria-hidden="true">
            <span className="ptrial-dots" />
            <span className="ptrial-glow" />
          </span>

          <div className="ptrial-price-col">
            <div className="ptrial-price-row">
              <span className="ptrial-price">$0</span>
              <span className="ptrial-today">Today</span>
            </div>
            <div className="ptrial-cancel">Cancel anytime</div>
          </div>

          <div className="ptrial-mid">
            <div className="ptrial-badge">
              <span className="ptrial-badge-dot" aria-hidden="true" />
              14-day free trial
            </div>
            <h3 className="ptrial-title">Try the full platform <em>free for 14 days.</em></h3>
            <p className="ptrial-sub">Exactly what your team would use on day one — no feature lock-outs, no demo mode.</p>
            <div className="ptrial-chips">
              {CHIPS.map((c) => (
                <span className="ptrial-chip" key={c.label}>
                  <span className="ptrial-chip-icon">{c.icon}</span>
                  {c.label}
                </span>
              ))}
            </div>
          </div>

          <div className="ptrial-cta-col">
            <Link to="/signup" className="ptrial-cta">
              Start free trial
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <span className="ptrial-caption">Live in under 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingTrialCard
