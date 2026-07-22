import { Link } from 'react-router-dom'
import './AnalyticsReportIndex.css'
import { IconBolt, IconChat, IconChart, IconRobot, IconDollar, IconUsers } from './icons.jsx'

const REPORTS = [
  { icon: <IconBolt />, name: 'Delivery & throughput', desc: 'Sent, delivered, failed and latency by channel and route.' },
  { icon: <IconChat />, name: 'Engagement & replies', desc: 'Opens, clicks, reply rate and time-to-first-response.' },
  { icon: <IconChart />, name: 'Conversion funnels', desc: 'Step-by-step drop-off from first message to purchase.' },
  { icon: <IconRobot />, name: 'Agent & bot performance', desc: 'Resolution rate, handoffs and CSAT for humans and AI.' },
  { icon: <IconDollar />, name: 'Campaign ROI / attribution', desc: 'Revenue tied back to the message that drove it.' },
  { icon: <IconUsers />, name: 'Cohort retention', desc: 'How each audience keeps engaging over the weeks after.' },
]

function AnalyticsReportIndex() {
  return (
    <section className="section ari-section">
      <div className="container ari-inner">
        <div className="ari-aside">
          <span className="ari-index-tag">06 report families</span>
          <h2 className="ari-title">Every <span className="grad-word">report</span>, one place</h2>
          <p className="ari-blurb">
            No hunting across dashboards. Delivery, engagement, funnels, agent performance and revenue all live in the
            same workspace — filterable, schedulable and one click from an export or an API pull.
          </p>
          <Link to="/pricing" className="ari-link">
            See what is included
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>

        <ol className="ari-list">
          {REPORTS.map((r, i) => (
            <li className="ari-item reveal" key={r.name} style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="ari-item-icon">{r.icon}</span>
              <span className="ari-item-body">
                <span className="ari-item-name">{r.name}</span>
                <span className="ari-item-desc">{r.desc}</span>
              </span>
              <span className="ari-item-no">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default AnalyticsReportIndex
