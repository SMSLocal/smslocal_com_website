import './SdrCampaignMock.css'
import {
  IconSearch, IconChart, IconBook, IconMail, IconGear, IconCalendar, IconDollar, IconChat,
} from './icons.jsx'

const NAV = [IconSearch, IconChart, IconBook, IconMail, IconChart, IconGear]

const STATS = [
  { icon: <IconMail />, label: 'Meeting Requests', value: '9', trend: '+14%' },
  { icon: <IconCalendar />, label: 'Meetings Booked', value: '28', trend: '+21%' },
  { icon: <IconChart />, label: 'Pipeline Generated', value: '$565K', trend: '+19%' },
  { icon: <IconDollar />, label: 'Closed Won', value: '$265K', trend: '+27%' },
]

const FEED = [
  { name: 'Leslie Alexander', role: 'Sales Director · Ramp', status: 'Meeting Booked', tint: 'a' },
  { name: 'Cameron Williamson', role: 'VP of Sales · Brex', status: 'Called', tint: 'b' },
  { name: 'Taylor Blake', role: 'Team Lead · Coinbase', status: 'Message Sent', tint: 'c' },
]

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

function SdrCampaignMock() {
  return (
    <div className="sdr-card">
      <aside className="sdr-sidebar">
        <span className="sdr-logo"><IconChat /></span>
        {NAV.map((Icon, i) => (
          <span className={i === 4 ? 'sdr-nav active' : 'sdr-nav'} key={i}><Icon /></span>
        ))}
      </aside>

      <div className="sdr-main">
        <div className="sdr-breadcrumb">
          <span>‹ Back</span><span className="sep">·</span><span>Campaigns</span><span className="sep">/</span><strong>US FinTech Campaign</strong>
        </div>

        <div className="sdr-titlerow">
          <h4>US FinTech Campaign</h4>
          <div className="sdr-tabs">
            <span className="active">Weekly</span><span>Monthly</span><span>Yearly</span>
          </div>
        </div>

        <div className="sdr-stats">
          {STATS.map((s) => (
            <div className="sdr-stat" key={s.label}>
              <span className="sdr-stat-head"><span className="sdr-stat-icon">{s.icon}</span>{s.label}</span>
              <strong className="sdr-stat-value">{s.value}</strong>
              <span className="sdr-stat-trend">▲ {s.trend} <small>vs last week</small></span>
            </div>
          ))}
        </div>

        <div className="sdr-lower">
          <div className="sdr-chart-panel">
            <div className="sdr-chart-head">
              <span className="sdr-chart-title">Worker Output</span>
              <span className="sdr-chart-pill">Pipeline ▾</span>
            </div>
            <svg className="sdr-chart" viewBox="0 0 300 130" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="32" x2="300" y2="32" className="sdr-grid" />
              <line x1="0" y1="64" x2="300" y2="64" className="sdr-grid" />
              <line x1="0" y1="96" x2="300" y2="96" className="sdr-grid" />
              <polyline className="sdr-line b" points="8,95 55,70 102,88 150,45 197,58 244,50 290,100" />
              <polyline className="sdr-line a" points="8,80 55,52 102,68 150,22 197,42 244,32 290,78" />
              <circle className="sdr-dot" cx="150" cy="22" r="4" />
            </svg>
            <div className="sdr-chart-axis"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
          </div>

          <div className="sdr-feed">
            <span className="sdr-feed-title">Activity Feed</span>
            {FEED.map((f) => (
              <div className="sdr-feed-item" key={f.name}>
                <span className={`sdr-avatar tint-${f.tint}`}>{initials(f.name)}</span>
                <div className="sdr-feed-text">
                  <strong>{f.name}</strong>
                  <span>{f.role}</span>
                  <span className="sdr-feed-badge">{f.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SdrCampaignMock
