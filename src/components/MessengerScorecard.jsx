import './MessengerScorecard.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke competitive "why us" for /facebook-messenger-api.
 * A head-to-head scorecard: the plain Page inbox vs SMSLocal across each
 * dimension — proving the advantage by contrast. SMSLocal column wins visually
 * (gradient, checks); the old way is muted with crosses. De-boxed, light.
 */
const ROWS = [
  { dim: 'Response time', old: 'Hours late, checked between other tasks', us: 'First reply in seconds — auto-replies + menu' },
  { dim: 'Teamwork', old: 'One shared login, agents collide', us: 'Many agents on one inbox, zero collisions' },
  { dim: 'Your stack', old: 'A disconnected queue, no order context', us: 'CRM, helpdesk & store on every reply' },
  { dim: 'Coverage', old: 'Answered only in team hours', us: 'Agentic AI, day, night, weekend or holiday' },
  { dim: 'Platform', old: 'Risky workarounds that flag your Page', us: 'Official Messenger Platform API' },
]

function MessengerScorecard({ eyebrow, title }) {
  return (
    <section className="section mscard-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="mscard">
          <div className="mscard-row mscard-head">
            <span className="mscard-dim" />
            <span className="mscard-col mscard-col--old">The Page inbox alone</span>
            <span className="mscard-col mscard-col--us">
              With SMSLocal
              <span className="mscard-win">Winner</span>
            </span>
          </div>

          {ROWS.map((r) => (
            <div className="mscard-row" key={r.dim}>
              <span className="mscard-dim">{r.dim}</span>
              <span className="mscard-col mscard-col--old">
                <span className="mscard-x" aria-hidden="true">✕</span>{r.old}
              </span>
              <span className="mscard-col mscard-col--us">
                <span className="mscard-check" aria-hidden="true"><IconCheck /></span>{r.us}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MessengerScorecard
