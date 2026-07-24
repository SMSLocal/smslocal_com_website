import './MessengerScorecard.css'
import { IconCheck } from './icons.jsx'

/**
 * "Why us" for /facebook-messenger-api.
 * An annotated product moment: a live Page inbox in the middle, with the five
 * reasons pinned around it as callouts. Each callout lights in turn and sends a
 * spark down its leader line into the inbox (12s loop, CSS only).
 */
const PINS = [
  { side: 'l', title: 'First reply in seconds', desc: 'Auto-replies and menus answer before anyone opens a tab.' },
  { side: 'l', title: 'Many agents, no collisions', desc: 'The whole team works one inbox with assignment built in.' },
  { side: 'r', title: 'Context on every reply', desc: 'CRM, helpdesk and store data ride along with the thread.' },
  { side: 'r', title: 'Covered out of hours', desc: 'Agentic AI answers at midnight, Sundays and holidays.' },
  { side: 'r', title: 'Official Platform API', desc: 'Meta’s own Messenger API — never a workaround.' },
]

const THREADS = [
  { who: 'Dana R.', msg: 'Is this back in stock?', tag: 'AI replied · 4s', hot: true },
  { who: 'Marcus L.', msg: 'Where has my order got to?', tag: 'Assigned · Maya' },
  { who: 'Priya S.', msg: 'Can I still change my address?', tag: 'AI replied · 6s' },
]

function MessengerScorecard({ eyebrow, title }) {
  const left = PINS.filter((p) => p.side === 'l')
  const right = PINS.filter((p) => p.side === 'r')

  return (
    <section className="section mscard-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="mscard">
          <div className="mscard-pins mscard-pins--l">
            {left.map((p, i) => (
              <div className="mscard-pin" key={p.title} style={{ '--i': i }}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="mscard-lead" aria-hidden="true"><i /></span>
              </div>
            ))}
          </div>

          {/* the inbox everything is pinned to */}
          <div className="mscard-inbox" aria-hidden="true">
            <div className="mscard-inbox-bar">
              <span className="mscard-inbox-dot" />
              Page inbox · SMSLocal
              <span className="mscard-live">live</span>
            </div>

            {THREADS.map((t, i) => (
              <div className={t.hot ? 'mscard-thread mscard-thread--hot' : 'mscard-thread'} key={t.who} style={{ '--i': i }}>
                <span className="mscard-av">{t.who[0]}</span>
                <span className="mscard-thread-text">
                  <b>{t.who}</b>
                  {t.msg}
                </span>
                <span className="mscard-tag"><IconCheck />{t.tag}</span>
              </div>
            ))}
          </div>

          <div className="mscard-pins mscard-pins--r">
            {right.map((p, i) => (
              <div className="mscard-pin" key={p.title} style={{ '--i': i + 2 }}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="mscard-lead" aria-hidden="true"><i /></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessengerScorecard
