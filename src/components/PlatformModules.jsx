import { Link } from 'react-router-dom'
import './PlatformModules.css'

const MODULES = [
  { to: '/channels/', name: 'All channels', desc: 'SMS, WhatsApp, RCS, Voice, Email and more — one reach layer.' },
  { to: '/products/omnichannel-inbox/', name: 'Omnichannel shared inbox', desc: 'One queue where your whole team replies across every channel.' },
  { to: '/products/analytics/', name: 'Analytics & insights', desc: 'Delivery, replies and resolutions in a single reporting view.' },
  { to: '/integrations/', name: 'Integrations', desc: 'Connect your CRM, helpdesk and store with one-click connectors.' },
  { to: '/platform/security/', name: 'Enterprise security', desc: 'Roles, encryption and a full audit trail across the stack.' },
]

function PlatformModules() {
  return (
    <section className="section pmods-section">
      <div className="container">
        <span className="section-kicker">Explore the platform</span>
        <h2 className="section-title">Jump into any layer</h2>
        <p className="section-subtitle">
          Every module lives on the same account and shares one customer record. Open the one you
          need next.
        </p>

        <nav className="pmods-index" aria-label="Platform modules">
          {MODULES.map((m, i) => (
            <Link className="pmods-row" to={m.to} key={m.to}>
              <span className="pmods-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="pmods-text">
                <span className="pmods-name">{m.name}</span>
                <span className="pmods-desc">{m.desc}</span>
              </span>
              <span className="pmods-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default PlatformModules
