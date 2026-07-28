import { useEffect, useRef, useState } from 'react'
import './ImmersivePhoneCall.css'
import { IconPhone, IconMic, IconCheck, IconLink } from './icons.jsx'

const DEFAULT_CARDS = [
  { key: 'answered', pos: 'tl', icon: <IconPhone />, label: 'Call answered', title: '0.3s pickup', sub: 'Never rings busy' },
  { key: 'transcript', pos: 'r', icon: <IconMic />, label: 'Live transcript', title: '“Mera order kahan hai?”', sub: 'Hindi & English · real-time' },
  { key: 'escalated', pos: 'bl', icon: <IconCheck />, label: 'Escalated', title: 'Routed to Priya', sub: 'Full context attached' },
  { key: 'synced', pos: 'br', icon: <IconLink />, label: 'CRM synced', title: 'Transcript saved', sub: 'Searchable from dashboard' },
]

function ImmersivePhoneCall({ cards = DEFAULT_CARDS }) {
  const wrapRef = useRef(null)
  const [inRange, setInRange] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInRange(entry.isIntersecting),
      { rootMargin: '-32% 0px -32% 0px', threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="ipc">
      <div className={`ipc-stage${inRange ? ' is-forward' : ''}`} ref={wrapRef}>
        {cards.map((c) => (
          <div className={`ipc-card ipc-card--${c.pos}`} key={c.key}>
            <span className="ipc-card-ic">{c.icon}</span>
            <div>
              <span className="ipc-card-label">{c.label}</span>
              <strong>{c.title}</strong>
              <span className="ipc-card-sub">{c.sub}</span>
            </div>
          </div>
        ))}

        <div className="ipc-phone">
          <div className="ipc-screen">
            <div className="ipc-bar">
              <span>9:41</span>
              <span className="ipc-bar-status">INCOMING</span>
            </div>
            <p className="ipc-number">+91 98450 · 12210</p>

            <div className="ipc-orb">
              <span className="ipc-orb-ring" />
              <span className="ipc-orb-ring ipc-orb-ring--2" />
              <span className="ipc-orb-core">AI</span>
            </div>
            <span className="ipc-caption">Voice AI Agent</span>
            <span className="ipc-status">
              <i className="ipc-dot" /> On call · 00:42
            </span>

            <div className="ipc-wave" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}
            </div>

            <div className="ipc-controls">
              <span className="ipc-ctrl"><IconMic /></span>
              <span className="ipc-ctrl ipc-ctrl--end"><IconPhone /></span>
              <span className="ipc-ctrl">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImmersivePhoneCall
