import './WhyShorterQueue.css'
import { IconClock, IconBolt, IconUsers, IconCheck } from './icons.jsx'

/* Plain "why it works" section — kicker, title, subtitle, four reasons in a
   two-column list. No moving parts; the sections either side carry those. */

const REASONS = [
  {
    icon: <IconClock />,
    title: 'No queue for the routine stuff',
    desc: 'Password resets, order status and FAQ-shaped tickets stop clogging the queue meant for the hard cases.',
  },
  {
    icon: <IconBolt />,
    title: 'Faster resolution for everyone',
    desc: 'Tier-one deflection means your human agents spend their time on tickets that actually need judgement.',
  },
  {
    icon: <IconUsers />,
    title: 'Escalates with respect for context',
    desc: 'A human picking up an escalated ticket sees the full thread — nobody makes the customer repeat themselves.',
  },
  {
    icon: <IconCheck />,
    title: 'Consistent tier-one answers',
    desc: 'Every customer gets the same accurate answer, sourced from the same help centre, every time.',
  },
]

function WhyShorterQueue() {
  return (
    <section className="section wsq">
      <div className="container">
        <span className="section-kicker">Why it works</span>
        <h2 className="section-title">A shorter queue, not a bigger team</h2>
        <p className="section-subtitle">
          Deflecting the repetitive tickets frees your human agents for the ones that
          actually need them.
        </p>

        <div className="wsq-list">
          {REASONS.map((r) => (
            <div className="wsq-item" key={r.title}>
              <span className="wsq-icon">{r.icon}</span>
              <div className="wsq-txt">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyShorterQueue
