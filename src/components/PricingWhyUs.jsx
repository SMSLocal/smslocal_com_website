import { IconRobot, IconGlobe, IconBolt } from './icons.jsx'
import './PricingWhyUs.css'

/**
 * "Why SMSLocal" section for /pricing — structurally replicated from
 * acepeak.com/pricing's "Why Acepeak" 3-column block: an icon badge,
 * serif heading, and paragraph per column, divided by a vertical hairline
 * between columns (horizontal on mobile).
 */
const REASONS = [
  {
    icon: <IconRobot />,
    accent: 'primary',
    title: 'Premium AI, included',
    body: 'Most platforms charge extra for their AI tier. SMSLocal ships the agentic AI agent in every plan — replies, routing and handoff all bundled in, from the free Starter tier up.',
  },
  {
    icon: <IconGlobe />,
    accent: 'teal',
    title: 'Every channel, actually included',
    body: 'WhatsApp, RCS, SMS, voice, email and social ship in every tier — not as per-channel add-ons you unlock one at a time as you grow.',
  },
  {
    icon: <IconBolt />,
    accent: 'coral',
    title: 'One platform, not a bundle',
    body: 'Messaging, the shared inbox, broadcasting and the AI agent — one billing line, one console, one place to look when something needs attention. No stitching three vendors together.',
  },
]

function PricingWhyUs() {
  return (
    <section className="section pwhy-section">
      <div className="container">
        <span className="section-kicker">Why SMSLocal</span>
        <h2 className="section-title">Lower friction. Real AI. No asterisks.</h2>

        <div className="pwhy-grid">
          {REASONS.map((r) => (
            <div className="pwhy-item" key={r.title}>
              <span className={`pwhy-icon pwhy-icon--${r.accent}`}>{r.icon}</span>
              <h3 className="pwhy-title">{r.title}</h3>
              <p className="pwhy-body">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingWhyUs
