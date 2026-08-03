import { Link } from 'react-router-dom'
import './FinalCta.css'

const TRUST_ITEMS = [
  'Enterprise-grade security',
  'Data encrypted in transit',
  'GDPR-ready',
  '99.9% uptime SLA',
]

function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="final-cta-card">
          <div className="final-cta-badge">
            <span className="final-cta-dot" />
            Trusted by growing teams
            <span className="final-cta-divider">|</span>
            live in minutes
          </div>

          <h2 className="final-cta-title">
            One platform.<br />
            <span className="grad-word">Every conversation.</span>
          </h2>

          <p className="final-cta-subtitle">
            Put messaging, chatbots and agentic AI in one platform — everything you need to reach and resolve, in one place.
          </p>

          <div className="final-cta-actions">
            <Link to="/contact-us/" className="btn btn-primary">Start Free →</Link>
            <Link to="/contact-us/" className="btn btn-ghost">Book a Demo</Link>
          </div>
        </div>

        <div className="final-cta-trust">
          {TRUST_ITEMS.map((item) => (
            <span className="final-cta-trust-item" key={item}>
              <span className="final-cta-trust-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FinalCta
