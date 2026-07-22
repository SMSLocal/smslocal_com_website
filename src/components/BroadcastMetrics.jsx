import './BroadcastMetrics.css'
import { IconCheck, IconChat, IconUsers, IconGlobe, IconShield } from './icons.jsx'

/**
 * "Why us" metrics section for /channels/whatsapp-broadcasting — a bento
 * grid: the strongest stat (Read rate) as one large featured panel with a
 * grid of "read receipt" chips for real contacts, the other four as
 * smaller cards each with an icon, description and a small data preview.
 * Rebuilt to match a reference bento layout the user supplied.
 */

const READ_CONTACTS = [
  { name: 'Priya' }, { name: 'Sam' }, { name: 'Maya' },
  { name: 'Aria' }, { name: 'Leo' }, { name: 'Noor' },
]

function DoubleTick() {
  return (
    <svg viewBox="0 0 26 16" width="12" height="8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8.5l3.5 3.5L13 3" />
      <path d="M11 12l1.5 1.5L23 3" />
    </svg>
  )
}

function BroadcastMetrics({ eyebrow, title, subtitle, items = [] }) {
  const [featured, replyLift, sharedInbox, countries, delivery] = items

  return (
    <section className="section bmet-section">
      <div className="container">
        <div className="bmet-head">
          <div>
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            {title && <h2 className="bmet-title">{title}</h2>}
          </div>
          {subtitle && <p className="bmet-lead">{subtitle}</p>}
        </div>

        <div className="bmet-bento">
          {featured && (
            <div className="bmet-feature">
              <span className="bmet-icon bmet-icon--coral"><IconCheck /></span>
              <span className="bmet-feature-kicker">READ RATE</span>
              <span className="bmet-feature-value">
                {featured.value}<i>{featured.suffix}</i>
              </span>
              <p className="bmet-feature-desc">{featured.desc}</p>

              <div className="bmet-receipts">
                {READ_CONTACTS.map((c) => (
                  <span className="bmet-receipt" key={c.name}>
                    <span className="bmet-receipt-name">{c.name}</span>
                    <span className="bmet-receipt-status"><DoubleTick /> Read</span>
                  </span>
                ))}
              </div>

              <span className="bmet-feature-foot">
                <DoubleTick /> Read within minutes · No extra setup required
              </span>
            </div>
          )}

          <div className="bmet-grid">
            {replyLift && (
              <div className="bmet-tile">
                <span className="bmet-icon bmet-icon--blue"><IconChat /></span>
                <span className="bmet-tile-heading">{replyLift.heading}</span>
                <p className="bmet-tile-desc">{replyLift.desc}</p>
                <span className="bmet-tile-preview">{replyLift.value}{replyLift.suffix} more replies than a one-way blast</span>
              </div>
            )}

            {sharedInbox && (
              <div className="bmet-tile">
                <span className="bmet-icon bmet-icon--teal"><IconUsers /></span>
                <span className="bmet-tile-heading">{sharedInbox.heading}</span>
                <p className="bmet-tile-desc">{sharedInbox.desc}</p>
                <span className="bmet-tile-preview">Whole team · {sharedInbox.value} shared inbox</span>
              </div>
            )}

            {countries && (
              <div className="bmet-tile">
                <span className="bmet-icon bmet-icon--cyan"><IconGlobe /></span>
                <span className="bmet-tile-heading">{countries.heading}</span>
                <p className="bmet-tile-desc">{countries.desc}</p>
                <span className="bmet-tile-preview">{countries.value}{countries.suffix} countries live</span>
              </div>
            )}

            {delivery && (
              <div className="bmet-tile">
                <span className="bmet-icon bmet-icon--success"><IconShield /></span>
                <span className="bmet-tile-heading">{delivery.heading}</span>
                <p className="bmet-tile-desc">{delivery.desc}</p>
                <span className="bmet-tile-preview">{delivery.value}{delivery.suffix} delivered · Official API</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BroadcastMetrics
