import './EmailFallbackFlow.css'
import { IconMail, IconChat, IconCheck } from './icons.jsx'

/**
 * Bespoke "email runs alone" section for /email-api.
 * A VERTICAL delivery flow down a gradient spine: an email bounces, and where a
 * standalone provider stops, SMSLocal retries over SMS and still lands.
 * De-boxed, light. Vertical orientation.
 */
const NODES = [
  { icon: <IconMail />, label: 'Email sent', note: null, kind: 'start' },
  { icon: null, label: 'It bounces', note: 'On its own, this is where reach ends', kind: 'bounce' },
  { icon: <IconChat />, label: 'Auto-retry over SMS', note: 'SMSLocal keeps going', kind: 'sms' },
  { icon: <IconCheck />, label: 'Delivered anyway', note: null, kind: 'win' },
]

function EmailFallbackFlow({ eyebrow, heading, paragraphs = [] }) {
  return (
    <section className="section section-alt eff-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraphs.map((p, i) => <p className="section-subtitle eff-lead" key={i}>{p}</p>)}

        <div className="eff">
          <span className="eff-spine" aria-hidden="true" />
          {NODES.map((n, i) => (
            <div className={`eff-node eff-node--${n.kind}`} key={i}>
              <span className="eff-dot" aria-hidden="true">
                {n.icon || <span className="eff-x">✕</span>}
              </span>
              <div className="eff-text">
                <span className="eff-label">{n.label}</span>
                {n.note && <span className="eff-note">{n.note}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailFallbackFlow
