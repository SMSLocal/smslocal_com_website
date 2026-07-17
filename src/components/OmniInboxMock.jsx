import { useState, useEffect } from 'react'
import './OmniInboxMock.css'
import { IconChat, IconMic, IconGlobe, IconMail, IconMegaphone, IconBolt } from './icons.jsx'

const CONVOS = [
  { name: 'Priya M.', channel: 'WhatsApp', tint: 'a', preview: 'Where is my order?', time: '2m', unread: 2 },
  { name: 'Marcus W.', channel: 'Voice', tint: 'b', preview: 'Missed call — callback queued', time: '5m', unread: 0 },
  { name: 'Aisha K.', channel: 'Instagram', tint: 'c', preview: 'How do I redeem the offer?', time: '12m', unread: 3 },
  { name: 'Tom B.', channel: 'Email', tint: 'd', preview: 'Invoice copy for March', time: '18m', unread: 0 },
]

const CHANNELS = [
  { icon: <IconChat />, k: 'wa' },
  { icon: <IconBolt />, k: 'rcs' },
  { icon: <IconMegaphone />, k: 'sms' },
  { icon: <IconMic />, k: 'voice' },
  { icon: <IconMail />, k: 'email' },
  { icon: <IconGlobe />, k: 'ig' },
  { icon: <IconChat />, k: 'msgr' },
]

function initials(name) {
  return name.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

function OmniInboxMock() {
  const [active, setActive] = useState(1)
  const [resolved, setResolved] = useState([])

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % CONVOS.length
        setResolved((r) => (r.includes(a) ? r : [...r, a]).slice(-3))
        return next
      })
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="oim" role="img" aria-label="One AI agent resolving conversations across WhatsApp, voice, Instagram and email">
      <span className="oim-status">
        <i className="oim-status-dot" />
        Live · 7 channels
      </span>

      <div className="oim-list">
        {CONVOS.map((c, i) => {
          const isActive = i === active
          const isDone = resolved.includes(i) && !isActive
          return (
            <div className={`oim-row oim-in${isActive ? ' is-active' : ''}${isDone ? ' is-done' : ''}`} style={{ '--d': `${0.15 + i * 0.18}s` }} key={c.name}>
              <span className={`oim-av tint-${c.tint}${isActive ? ' is-working' : ''}`}>{initials(c.name)}</span>
              <div className="oim-body">
                <div className="oim-line1">
                  <strong>{c.name}</strong>
                  <span className={`oim-ch ch-${c.tint}`}>{c.channel}</span>
                  <span className="oim-time">{c.time}</span>
                </div>
                {isActive ? (
                  <span className="oim-typing"><i /><i /><i /> agent resolving…</span>
                ) : (
                  <span className="oim-preview">{c.preview}</span>
                )}
              </div>
              {isDone ? (
                <span className="oim-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="11" height="11"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              ) : c.unread > 0 ? (
                <span className="oim-unread">{c.unread}</span>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="oim-channels">
        {CHANNELS.map((c, i) => (
          <span className={`oim-cico${i === active % CHANNELS.length ? ' is-lit' : ''}`} key={c.k}>{c.icon}</span>
        ))}
      </div>
    </div>
  )
}

export default OmniInboxMock
