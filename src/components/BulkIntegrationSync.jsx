import { useEffect, useState } from 'react'
import './BulkIntegrationSync.css'

/**
 * Integrations section for the Bulk SMS page — the SMSLocal mark stays
 * fixed on one side, a connecting link pulses between them, and the app on
 * the other side cycles through the integration list, one at a time.
 * Replaces the plain dot-separated name list.
 */

const APPS = [
  { name: 'Shopify', logo: '/logos/shopify.svg', desc: 'A new order in Shopify fires an instant confirmation text — no app to babysit, no manual export.' },
  { name: 'HubSpot', logo: '/logos/hubspot.svg', desc: 'A deal stage change in HubSpot triggers a follow-up text to that contact, automatically.' },
  { name: 'Zoho', logo: '/logos/zoho.svg', desc: 'Update a record in Zoho CRM and the customer gets a text the same second, every time.' },
  { name: 'Zapier', logo: '/logos/zapier.svg', desc: 'Wire SMSLocal into any of 5,000+ apps through Zapier — no code required on either end.' },
  { name: 'WooCommerce', logo: '/logos/woocommerce.svg', desc: 'A WooCommerce checkout sends a shipping-update text without a single line of glue code.' },
  { name: 'Mailchimp', logo: '/logos/mailchimp.svg', desc: 'Sync a Mailchimp audience and follow up every email campaign with an SMS nudge.' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function BulkIntegrationSync({ eyebrow, title, subtitle }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setI((v) => (v + 1) % APPS.length), 2200)
    return () => clearInterval(id)
  }, [])

  const app = APPS[i]

  return (
    <section className="section section-alt bis-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="bis-stage"
          role="img"
          aria-label={`SMSLocal connected live to ${app.name}, cycling through Shopify, HubSpot, Zoho, Zapier, WooCommerce and Mailchimp`}
        >
          <div className="bis-node">
            <span className="bis-logo-ring">
              <img src="/smslocal-icon.png" alt="" className="bis-logo" draggable={false} />
            </span>
            <span className="bis-node-label">SMSLocal</span>
          </div>

          <div className="bis-link" aria-hidden="true">
            <span className="bis-link-line" />
            <span className="bis-link-pulse" />
            <span className="bis-link-pulse bis-link-pulse--b" />
          </div>

          <div className="bis-node" key={i}>
            <span className="bis-logo-ring">
              <img src={app.logo} alt="" className="bis-logo bis-logo--app" draggable={false} />
            </span>
            <span className="bis-node-label">{app.name}</span>
          </div>
        </div>

        <p className="bis-desc" key={`d-${i}`} aria-hidden="true">
          {app.desc}
        </p>
      </div>
    </section>
  )
}

export default BulkIntegrationSync
