import { useEffect, useState } from 'react'
import './SdrFunnelVisual.css'
import { IconMail, IconCalendar, IconChart, IconDollar } from './icons.jsx'

const STATS = [
  { icon: <IconMail />, value: '9', label: 'Meeting requests', trend: '+14%' },
  { icon: <IconCalendar />, value: '28', label: 'Meetings booked', trend: '+21%' },
  { icon: <IconChart />, value: '$565K', label: 'Pipeline generated', trend: '+19%' },
  { icon: <IconDollar />, value: '$265K', label: 'Closed won', trend: '+27%' },
]

const ACTIVITY = [
  { name: 'Leslie Alexander', role: 'Sales Director · Ramp', action: 'Meeting booked' },
  { name: 'Cameron Williamson', role: 'VP of Sales · Brex', action: 'Called' },
  { name: 'Taylor Blake', role: 'Team Lead · Coinbase', action: 'Message sent' },
]

function SdrFunnelVisual() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % ACTIVITY.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="sfv" role="img" aria-label="Live AI SDR campaign stats: meeting requests, meetings booked, pipeline generated and closed won, plus a worker output trend and recent prospect activity">
      <div className="sfv-stats">
        {STATS.map((s, i) => (
          <div className="sfv-stat" key={s.label} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="sfv-stat-ic">{s.icon}</span>
            <div className="sfv-stat-t">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
            <span className="sfv-stat-trend">{s.trend}</span>
          </div>
        ))}
      </div>

      <div className="sfv-chart">
        <div className="sfv-chart-head">
          <span>Worker output</span>
          <span className="sfv-chart-tag">Pipeline</span>
        </div>
        <svg className="sfv-chart-svg" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true">
          <polyline className="sfv-chart-line" points="0,50 40,44 80,46 120,20 160,28 200,10 240,18 300,6" />
        </svg>
      </div>

      <div className="sfv-activity">
        <span className="sfv-activity-head"><i className="sfv-live-dot" />Activity feed</span>
        {ACTIVITY.map((a, i) => (
          <div className={`sfv-row${i === active ? ' sfv-row--active' : ''}`} key={a.name} style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
            <span className="sfv-av">{a.name.split(' ').map((p) => p[0]).join('')}</span>
            <div className="sfv-row-t">
              <strong>{a.name}</strong>
              <span>{a.role}</span>
            </div>
            <span className="sfv-row-tag">{a.action}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SdrFunnelVisual
