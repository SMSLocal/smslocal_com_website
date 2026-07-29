import { useEffect, useState } from 'react'
import './FeatureAgentShowcase.css'

const CHANNELS = [
  { name: 'WhatsApp', status: 'Active' },
  { name: 'Web chat', status: 'Active' },
  { name: 'Email', status: 'Queued' },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChannelsVisual() {
  return (
    <div className="fas-visual fas-visual--channels">
      <div className="fas-visual-head">
        <span>Live channels</span>
        <span className="fas-live"><span className="fas-live-dot" />Live</span>
      </div>
      <div className="fas-channel-list">
        {CHANNELS.map((c) => (
          <div className="fas-channel-row" key={c.name}>
            <span className={`fas-channel-dot fas-channel-dot--${c.status === 'Active' ? 'on' : 'wait'}`} />
            <span>{c.name}</span>
            <span className={`fas-status fas-status--${c.status === 'Active' ? 'on' : 'wait'}`}>{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResolvedVisual() {
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setFill(1), 300)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="fas-visual fas-visual--resolved">
      <div className="fas-visual-head">
        <span>Today</span>
        <span className="fas-resolved-count">312 resolved</span>
      </div>
      <div className="fas-bar">
        <span className="fas-bar-seg fas-bar-seg--resolved" style={{ transform: `scaleX(${fill})` }} />
        <span className="fas-bar-seg fas-bar-seg--progress" style={{ transform: `scaleX(${fill})` }} />
        <span className="fas-bar-seg fas-bar-seg--escalated" style={{ transform: `scaleX(${fill})` }} />
      </div>
      <div className="fas-legend">
        <span><i className="fas-dot fas-dot--resolved" />Resolved</span>
        <span><i className="fas-dot fas-dot--progress" />In progress</span>
        <span><i className="fas-dot fas-dot--escalated" />Escalated</span>
      </div>
    </div>
  )
}

function EscalationVisual() {
  return (
    <div className="fas-visual fas-visual--escalation">
      <div className="fas-visual-head">
        <span>Escalation</span>
        <span className="fas-priority">High priority</span>
      </div>
      <strong className="fas-escalation-title">Refund — Order #4821</strong>
      <p className="fas-escalation-desc">Customer disputes a charge on a cancelled order.</p>
      <div className="fas-escalation-foot">
        <span className="fas-avatar">AM</span>
        <span className="fas-context-check"><CheckIcon />Full context attached</span>
      </div>
    </div>
  )
}

const SOURCES = ['Help center', 'PDF library', 'Website']

function SourcesVisual() {
  return (
    <div className="fas-visual fas-visual--sources">
      <div className="fas-visual-head">
        <span>Trained sources</span>
      </div>
      <div className="fas-source-list">
        {SOURCES.map((s, i) => (
          <div className="fas-source-row" key={s} style={{ '--fas-i': i }}>
            <span className="fas-source-check"><CheckIcon /></span>
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

const VISUALS = [ChannelsVisual, ResolvedVisual, EscalationVisual, SourcesVisual]

function FeatureAgentShowcase({ eyebrow, title, subtitle, items }) {
  const top = items.slice(0, 3)
  const bottom = items[3]
  const BottomVisual = VISUALS[3]

  return (
    <section className="section fas-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fas-top-row">
          {top.map((item, i) => {
            const Visual = VISUALS[i]
            return (
              <div className="fas-card" key={item.title} style={{ '--fas-i': i }}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Visual />
              </div>
            )
          })}
        </div>

        {bottom && (
          <div className="fas-wide-card" style={{ '--fas-i': 3 }}>
            <div className="fas-wide-copy">
              <h3>{bottom.title}</h3>
              <p>{bottom.desc}</p>
            </div>
            <BottomVisual />
          </div>
        )}
      </div>
    </section>
  )
}

export default FeatureAgentShowcase
