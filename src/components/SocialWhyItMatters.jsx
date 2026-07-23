import './SocialWhyItMatters.css'
import { IconChat, IconGlobe, IconMail, IconUsers, IconCheck } from './icons.jsx'

const SOURCES = [
  { icon: <IconChat />, label: 'Instagram & comments' },
  { icon: <IconGlobe />, label: 'Messenger & Telegram' },
  { icon: <IconMail />, label: 'WhatsApp & LINE' },
  { icon: <IconUsers />, label: 'Every other channel' },
]

const Y = [40, 130, 220, 310]

function SocialWhyItMatters({ alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container swim-inner">
        <div className="swim-copy">
          <span className="section-kicker">Why it matters</span>
          <h2>Your customers message everywhere. Your team shouldn't have to.</h2>
          <p>A DM on Instagram, a comment on Facebook, a WhatsApp about the same order — spread across apps and logins. SMSLocal pulls every channel into <strong>one shared inbox with one customer record</strong>, so any teammate can pick up any conversation with full context.</p>
        </div>

        <div className="swim-converge">
          <svg className="swim-lines" viewBox="0 0 220 350" preserveAspectRatio="none" aria-hidden="true">
            {Y.map((y) => (
              <path key={y} d={`M0,${y} C110,${y} 110,175 220,175`} />
            ))}
          </svg>

          <div className="swim-sources">
            {SOURCES.map((s, i) => (
              <span className="swim-source" key={s.label} style={{ top: `${(Y[i] / 350) * 100}%` }}>
                <i className="swim-source-icon">{s.icon}</i>
                {s.label}
              </span>
            ))}
          </div>

          <div className="swim-inbox">
            <span className="swim-inbox-badge"><IconCheck /> Unified inbox</span>
            <strong>One customer record</strong>
            <p>Every channel, one thread, full context.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialWhyItMatters
