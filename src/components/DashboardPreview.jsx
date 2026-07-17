import { useEffect, useState } from 'react'
import './DashboardPreview.css'
import { IconChart, IconMegaphone, IconChat, IconRobot, IconBrain } from './icons.jsx'

const NAV_ITEMS = [
  { icon: <IconChart />, label: 'Overview', active: true },
  { icon: <IconMegaphone />, label: 'Campaigns' },
  { icon: <IconChat />, label: 'WhatsApp' },
  { icon: <IconRobot />, label: 'Chatbot' },
  { icon: <IconBrain />, label: 'AI Agents' },
  { icon: <IconChart />, label: 'Analytics' },
]

const STATS = [
  { label: 'Messages sent', value: '18,420', delta: '+22%' },
  { label: 'AI resolutions', value: '3,180', delta: '+41%' },
  { label: 'Delivery rate', value: '98.6%', delta: 'live' },
  { label: 'Avg reply', value: '0.6s', delta: 'fast' },
]

const ACTIVITY = [
  { text: 'SMS delivered · Bengaluru', time: 'now' },
  { text: 'WhatsApp opened · +91 90···', time: '2s' },
  { text: 'AI resolved a refund request', time: '4s' },
  { text: 'RCS card sent · 12 recipients', time: '6s' },
]

const CHAT = [
  { from: 'user', text: 'Do you deliver to Pune?' },
  { from: 'bot', text: 'Yes — 2-day delivery, free above ₹500.' },
  { from: 'user', text: 'Great, placing the order now!' },
]

function DashboardPreview() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(81), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="dash-wrap">
      <div className="dash-window">
        <div className="dash-titlebar">
          <span className="dash-dot dash-dot-red" />
          <span className="dash-dot dash-dot-yellow" />
          <span className="dash-dot dash-dot-green" />
          <span className="dash-url">app.smslocal.com</span>
          <span className="dash-live"><span className="dash-live-dot" />Live</span>
        </div>

        <div className="dash-body">
          <aside className="dash-sidebar">
            <div className="dash-brand">SMSLocal</div>
            <nav>
              {NAV_ITEMS.map((item) => (
                <div className={item.active ? 'dash-nav-item active' : 'dash-nav-item'} key={item.label}>
                  <span>{item.icon}</span>{item.label}
                </div>
              ))}
            </nav>
            <div className="dash-credit">
              <strong>₹2,100 free credit</strong>
              <span>No card required</span>
            </div>
          </aside>

          <main className="dash-main">
            <h4>Overview <span>Welcome back — here&rsquo;s today</span></h4>

            <div className="dash-stats">
              {STATS.map((s) => (
                <div className="dash-stat" key={s.label}>
                  <span className="dash-stat-label">{s.label}</span>
                  <strong>{s.value}</strong>
                  <span className="dash-stat-delta">{s.delta}</span>
                </div>
              ))}
            </div>

            <div className="dash-campaign">
              <div className="dash-campaign-head">
                <div>
                  <strong>Festive Sale Blast</strong>
                  <span>WhatsApp + SMS · Sending</span>
                </div>
                <span className="dash-pill">Sending</span>
              </div>
              <div className="dash-progress-track">
                <div className="dash-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="dash-progress-meta">
                <span>14,900 / 18,420 delivered</span>
                <span>{progress}%</span>
              </div>
            </div>

            <div className="dash-activity">
              <h5>Live activity</h5>
              {ACTIVITY.map((a, idx) => (
                <div className="dash-activity-item" style={{ animationDelay: `${idx * 0.15}s` }} key={a.text}>
                  <span className="dash-activity-dot" />
                  {a.text}
                  <span className="dash-activity-time">{a.time}</span>
                </div>
              ))}
            </div>
          </main>
        </div>

        <div className="dash-chat">
          <div className="dash-chat-head">
            <span className="dash-chat-avatar"><IconRobot /></span>
            <div>
              <strong>SMSLocal Assistant</strong>
              <span><span className="dash-chat-online" />online</span>
            </div>
          </div>
          <div className="dash-chat-body">
            {CHAT.map((c, idx) => (
              <div
                className={c.from === 'bot' ? 'dash-bubble bot' : 'dash-bubble user'}
                style={{ animationDelay: `${0.4 + idx * 0.35}s` }}
                key={idx}
              >
                {c.text}
              </div>
            ))}
            <div className="dash-typing" style={{ animationDelay: `${0.4 + CHAT.length * 0.35}s` }}>
              <span /><span /><span />
            </div>
          </div>
          <div className="dash-chat-input">Ask anything…</div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPreview
