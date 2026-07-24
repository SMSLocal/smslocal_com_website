import './SocialWhyItMatters.css'
import { IconChat, IconGlobe, IconMail, IconUsers, IconCheck } from './icons.jsx'

/**
 * "Why it matters" for /channels/social.
 * Centered statement over a live convergence stage: four channel sources on a
 * rail light up in sequence, a packet of light travels the curve, and the
 * matching message lands in one shared inbox card. One 8s loop, CSS only.
 */

const SOURCES = [
  { icon: <IconChat />, label: 'Instagram & comments', meta: 'DMs, story replies, post comments', who: 'Priya', msg: 'Is the black one back in stock?' },
  { icon: <IconGlobe />, label: 'Messenger & Telegram', meta: 'Facebook pages and group chats', who: 'Daniel', msg: 'Any update on order #4192?' },
  { icon: <IconMail />, label: 'WhatsApp & LINE', meta: 'Business numbers and templates', who: 'Mei', msg: 'Can I change the delivery address?' },
  { icon: <IconUsers />, label: 'Every other channel', meta: 'Viber, Apple Messages, SMS', who: 'Omar', msg: 'Thanks — got it this morning!' },
]

/* Rail is 340px tall in a 4-row grid, so source centres sit at these Y values.
   The curve layer uses the same local coordinate space (170 x 340). */
const Y = [42.5, 127.5, 212.5, 297.5]

function SocialWhyItMatters({ alt }) {
  return (
    <section className={alt ? 'section section-alt swim-section' : 'section swim-section'}>
      <div className="container">
        <div className="swim-head">
          <span className="section-kicker">Why it matters</span>
          <h2>Your customers message everywhere. Your team shouldn't have to.</h2>
          <p>A DM on Instagram, a comment on Facebook, a WhatsApp about the same order — spread across apps and logins. SMSLocal pulls every channel into <strong>one shared inbox with one customer record</strong>, so any teammate can pick up any conversation with full context.</p>
        </div>

        <div className="swim-stage">
          <div className="swim-rail">
            {SOURCES.map((s, i) => (
              <span className="swim-source" key={s.label} style={{ '--i': i }}>
                <i className="swim-source-icon">{s.icon}</i>
                <span className="swim-source-text">
                  <b>{s.label}</b>
                  <small>{s.meta}</small>
                </span>
              </span>
            ))}
          </div>

          <div className="swim-flow" aria-hidden="true">
            <svg className="swim-lines" viewBox="0 0 170 340">
              {Y.map((y) => (
                <path key={y} d={`M0,${y} C85,${y} 85,170 170,170`} />
              ))}
            </svg>
            {Y.map((y, i) => (
              <span
                className="swim-packet"
                key={y}
                style={{ '--i': i, offsetPath: `path("M0,${y} C85,${y} 85,170 170,170")` }}
              />
            ))}
          </div>

          <div className="swim-inbox">
            <div className="swim-inbox-top">
              <span className="swim-inbox-badge"><IconCheck /> Unified inbox</span>
              <strong>One customer record</strong>
              <p>Every channel, one thread, full context.</p>
            </div>
            <ul className="swim-thread">
              {SOURCES.map((s, i) => (
                <li className="swim-msg" key={s.label} style={{ '--i': i }}>
                  <span className="swim-msg-avatar">{s.who[0]}</span>
                  <span className="swim-msg-text">
                    <b>{s.who}</b>
                    {s.msg}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialWhyItMatters
