import './RcsBroadcastUseCases.css'
import { IconBolt, IconPackage, IconCalendar, IconRefresh, IconCheck } from './icons.jsx'

const CASES = [
  {
    icon: <IconBolt />,
    tag: 'Flash sale',
    title: 'Flash sale — 30% off, ends tonight',
    outcome: 'Sent to 40,200 subscribers in one click',
  },
  {
    icon: <IconPackage />,
    tag: 'Shipping update',
    title: 'Your order is out for delivery today',
    outcome: 'Delivered to 8,600 recipients in under 2 minutes',
  },
  {
    icon: <IconCalendar />,
    tag: 'Appointment reminder',
    title: 'Reminder: your visit is tomorrow at 10 AM',
    outcome: 'Cut no-shows 24% across 3,100 monthly bookings',
  },
  {
    icon: <IconRefresh />,
    tag: 'Win-back',
    title: "We miss you — here's 20% back on your next order",
    outcome: 'Re-engaged 12% of a 26,000-contact dormant list',
  },
]

function RcsBroadcastUseCases() {
  return (
    <section className="section">
      <div className="container">
        <div className="rbuc-head">
          <span className="section-kicker">Built for real sends</span>
          <h2>The same broadcast engine, four very different campaigns</h2>
          <p>Whatever you're sending, it goes out as one verified RCS broadcast — with SMS fallback built in, not bolted on.</p>
        </div>

        <div className="rbuc-grid">
          {CASES.map((c) => (
            <div className="rbuc-card" key={c.tag}>
              <span className="rbuc-tag"><span className="rbuc-tag-icon">{c.icon}</span>{c.tag}</span>
              <p className="rbuc-title">{c.title}</p>
              <span className="rbuc-perf" aria-hidden="true" />
              <span className="rbuc-outcome"><IconCheck />{c.outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RcsBroadcastUseCases
