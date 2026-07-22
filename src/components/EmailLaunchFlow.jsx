import './EmailLaunchFlow.css'
import { IconRocket } from './icons.jsx'

/**
 * Bespoke "how it works" for /email-api.
 * A VERTICAL launch ladder: numbered steps stack downward into a "You're live"
 * destination. Step one carries the DNS records as chips. De-boxed, light.
 */
const DNS = ['SPF', 'DKIM', 'DMARC']

function EmailLaunchFlow({ eyebrow, title, steps = [] }) {
  return (
    <section className="section section-alt ell-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="ell">
          {steps.map((s, i) => (
            <div className="ell-step" key={s.title}>
              <span className="ell-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="ell-body">
                <h3 className="ell-title">{s.title}</h3>
                <p className="ell-desc">{s.desc}</p>
                {i === 0 && (
                  <div className="ell-chips">
                    {DNS.map((d) => <span className="ell-chip" key={d}>{d}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="ell-live">
            <span className="ell-rocket"><IconRocket /></span>
            <div>
              <strong>You&rsquo;re live</strong>
              <span>sending on email + SMS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailLaunchFlow
