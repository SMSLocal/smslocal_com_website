import { useEffect, useRef, useState } from 'react'
import './StepsControlPanel.css'

// New layout: no connecting line, no left/right zigzag, no cards. Each
// step is a centered block with a giant faint number watermarked behind
// it; its live mini-simulation starts the moment it scrolls into view,
// and clicking the number replays it.

function StepsControlPanel({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="scp-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="scp-stages">
          {steps.map((step, i) => (
            <Stage key={step.title} index={i} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Stage({ index, step }) {
  const [runId, setRunId] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const replay = () => {
    setStarted(true)
    setRunId((r) => r + 1)
  }

  return (
    <div className="scp-stage" ref={ref}>
      <button type="button" className="scp-stage-num" onClick={replay} aria-label={`Replay: ${step.title}`}>
        {String(index + 1).padStart(2, '0')}
      </button>
      <div className="scp-stage-content">
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
        <div className="scp-sim-float" key={runId}>
          {index === 0 && <SimConnect running={started} />}
          {index === 1 && <SimRules running={started} />}
          {index === 2 && <SimLive running={started} />}
        </div>
      </div>
    </div>
  )
}

function SimConnect({ running }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    if (!running) return undefined
    const id = window.setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + 4))
    }, 60)
    return () => window.clearInterval(id)
  }, [running])

  return (
    <div className="scp-sim">
      <div className="scp-sim-url">
        <span className="scp-sim-dot" />
        docs.yoursite.com/help
      </div>
      <div className="scp-sim-bar">
        <span className="scp-sim-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="scp-sim-caption">
        {pct < 100 ? `Learning your content… ${pct}%` : '✓ Learned 128 articles'}
      </span>
    </div>
  )
}

function SimRules({ running }) {
  const rules = ['Answer FAQs automatically', 'Capture qualified leads', 'Escalate to your team']
  return (
    <div className={`scp-sim scp-sim--rules${running ? ' is-running' : ''}`}>
      {rules.map((r, i) => (
        <div className="scp-toggle-row" style={{ animationDelay: `${i * 0.5}s` }} key={r}>
          <span className="scp-toggle">
            <span className="scp-toggle-knob" />
          </span>
          <span>{r}</span>
        </div>
      ))}
    </div>
  )
}

function SimLive({ running }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    if (!running) return undefined
    const id = window.setInterval(() => {
      setPct((p) => (p >= 87 ? 87 : p + 3))
    }, 45)
    return () => window.clearInterval(id)
  }, [running])

  return (
    <div className="scp-sim scp-sim--live">
      <span className="scp-live-badge"><i />Live</span>
      <strong className="scp-live-number">{pct}%</strong>
      <span className="scp-live-caption">Resolution rate this week</span>
    </div>
  )
}

export default StepsControlPanel
