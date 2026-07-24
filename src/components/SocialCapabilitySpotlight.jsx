import './SocialCapabilitySpotlight.css'
import { IconUsers, IconGear, IconShield, IconBrain, IconClock } from './icons.jsx'

/**
 * Capabilities for /channels/social.
 * A horizontal track, not a grid or a spotlight-plus-list: the supported
 * channels scroll past as a ribbon, then five capability cards sit staggered
 * along a live beam that pulses each one in turn (10s loop, CSS only).
 */

const CHANNELS = ['Instagram', 'Messenger', 'WhatsApp', 'Telegram', 'LINE', 'Viber', 'Apple Messages']

const CAPABILITIES = [
  { icon: <IconUsers />, title: 'One customer record', desc: 'Every conversation ties to a single profile with full cross-channel history.' },
  { icon: <IconGear />, title: 'Assignment & routing', desc: 'Auto-route by channel, language or topic and assign an owner in a click.' },
  { icon: <IconShield />, title: 'Collision detection', desc: 'See who is already viewing or typing, so two agents never reply at once.' },
  { icon: <IconBrain />, title: 'AI-assist drafting', desc: 'Draft an on-brand reply in a click, then edit and send — a human stays in control.' },
  { icon: <IconClock />, title: 'SLA timers & notes', desc: 'Response timers, internal notes and canned replies keep threads moving on time.' },
]

function SocialCapabilitySpotlight() {
  return (
    <section className="section scs-section">
      <div className="container">
        <div className="scs-head">
          <span className="section-kicker">Capabilities</span>
          <h2 className="section-title">One inbox, every conversation</h2>
        </div>

        <div className="scs-ribbon" aria-hidden="true">
          <div className="scs-ribbon-track">
            {[0, 1].map((pass) =>
              CHANNELS.map((c) => (
                <span className="scs-chip" key={`${pass}-${c}`}>
                  <span className="scs-chip-dot" />
                  {c}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="scs-track">
          <span className="scs-beam" aria-hidden="true">
            <span className="scs-beam-pulse" />
          </span>

          {CAPABILITIES.map((c, i) => (
            <article className="scs-card" key={c.title} style={{ '--i': i }}>
              <span className="scs-ic">{c.icon}</span>
              <h3 className="scs-card-title">{c.title}</h3>
              <p className="scs-card-desc">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialCapabilitySpotlight
