import { useState } from 'react'
import './EmailCapabilityAccordion.css'
import { IconMail, IconCode, IconRefresh } from './icons.jsx'

/**
 * Bespoke capabilities section for /email-api.
 * A VERTICAL accordion: three capabilities stack; the open one reveals its copy
 * and a small live-looking proof. De-boxed, light. Vertical orientation.
 */
const ITEMS = [
  {
    icon: <IconMail />, title: 'Templates that render everywhere',
    desc: 'Design once in a visual editor and send transactional or bulk email that looks right in every inbox.',
    mock: (
      <div className="eca-proof">
        <span className="eca-bar" />
        <span className="eca-line"><i>Order confirmation</i><b className="ok">tested ✓</b></span>
      </div>
    ),
  },
  {
    icon: <IconCode />, title: 'REST or SMTP, your choice',
    desc: 'Integrate with a simple REST API, or just point your existing SMTP relay at us — no rewrite required.',
    mock: (
      <div className="eca-proof">
        <code className="eca-code">POST /v1/email/send</code>
        <span className="eca-line"><i>or via</i><b>SMTP relay</b></span>
      </div>
    ),
  },
  {
    icon: <IconRefresh />, title: 'SMS fallback, built in',
    desc: 'When an email bounces or goes unopened, the same message can retry over SMS automatically.',
    mock: (
      <div className="eca-proof">
        <span className="eca-line"><i>Email bounced</i><b>detected</b></span>
        <span className="eca-line"><i>Retried via SMS</i><b className="ok">delivered</b></span>
      </div>
    ),
  },
]

function EmailCapabilityAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section eca-section">
      <div className="container">
        <h2 className="section-title">One API for email and SMS</h2>
        <p className="section-subtitle">Three things that change when email stops being a separate system.</p>

        <div className="eca">
          {ITEMS.map((it, i) => (
            <div className={open === i ? 'eca-row is-open' : 'eca-row'} key={it.title}>
              <button type="button" className="eca-head" onClick={() => setOpen(i)} onMouseEnter={() => setOpen(i)} aria-expanded={open === i}>
                <span className="eca-ic">{it.icon}</span>
                <span className="eca-title">{it.title}</span>
                <span className="eca-plus" aria-hidden="true" />
              </button>
              <div className="eca-panel">
                <div className="eca-panel-in">
                  <p className="eca-desc">{it.desc}</p>
                  {it.mock}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailCapabilityAccordion
