import './SocialCapabilitySpotlight.css'
import { IconUsers, IconGear, IconShield, IconBrain, IconClock } from './icons.jsx'

/**
 * Bespoke capabilities section for /channels/social.
 * A feature spotlight + supporting list: the primary "unified inbox" capability
 * is featured on the left with a cluster of channel chips, and the remaining
 * capabilities stack as a compact list on the right. No uniform grid, no cards.
 * Deliberately different from the collage compare, the converge steps and the
 * social-feed WhyUs cards elsewhere on the page.
 */

const CHANNELS = ['Instagram', 'Messenger', 'WhatsApp', 'Telegram', 'LINE', 'Viber', 'Apple Messages']

const SUPPORTING = [
  { icon: <IconUsers />, title: 'One customer record', desc: 'Every conversation ties to a single profile with full cross-channel history — DMs and comments together.' },
  { icon: <IconGear />, title: 'Assignment & routing', desc: 'Auto-route by channel, language or topic and assign an owner in a click, so nothing sits unclaimed.' },
  { icon: <IconShield />, title: 'Collision detection', desc: 'See when a teammate is already viewing or typing on a thread, so two agents never reply at once.' },
  { icon: <IconBrain />, title: 'AI-assist drafting', desc: 'Draft an on-brand reply in a click, then edit and send — a human stays in control of every message.' },
  { icon: <IconClock />, title: 'SLA timers & notes', desc: 'First-response timers, internal notes and canned replies keep every conversation moving on time.' },
]

function SocialCapabilitySpotlight() {
  return (
    <section className="section scs-section">
      <div className="container">
        <span className="section-kicker">Capabilities</span>
        <h2 className="section-title">One inbox, every conversation</h2>
        <p className="section-subtitle">
          Everything your team needs to route, reply and never lose a message — across every social channel.
        </p>

        <div className="scs">
          <div className="scs-lead">
            <span className="scs-tag">Unified inbox</span>
            <h3 className="scs-lead-title">Every channel in one shared stream</h3>
            <p className="scs-lead-desc">
              Instagram, Messenger, WhatsApp, Telegram, LINE, Viber and Apple Messages all land in a single
              stream your whole team can see — each message and comment tied to one customer record.
            </p>
            <div className="scs-chips">
              {CHANNELS.map((c) => (
                <span className="scs-chip" key={c}>
                  <span className="scs-chip-dot" aria-hidden="true" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          <ul className="scs-list">
            {SUPPORTING.map((s) => (
              <li className="scs-item" key={s.title}>
                <span className="scs-ic">{s.icon}</span>
                <div className="scs-item-text">
                  <h4 className="scs-item-title">{s.title}</h4>
                  <p className="scs-item-desc">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SocialCapabilitySpotlight
