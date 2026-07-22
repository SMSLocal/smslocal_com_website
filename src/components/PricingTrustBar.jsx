import './PricingTrustBar.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke trust bar for /pricing (replaces the generic StatBand here).
 * Four reassurance points with gradient values on a subtle gradient-washed
 * band — reads as "safe to buy". De-boxed, light, no dark fills.
 */
function PricingTrustBar({ items }) {
  return (
    <section className="section ptrust-section">
      <div className="container">
        <div className="ptrust">
          {items.map((it) => (
            <div className="ptrust-item" key={it.label}>
              <span className="ptrust-check" aria-hidden="true"><IconCheck /></span>
              <span className="ptrust-value">{it.value}</span>
              <span className="ptrust-label">{it.label}</span>
              <span className="ptrust-desc">{it.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingTrustBar
