import { useEffect, useRef, useState } from 'react'
import './AgentStatStrip.css'
import { IconChat, IconGlobe, IconMic, IconCheck } from './icons.jsx'

function useInView() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const check = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) setActive(true)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])
  return [ref, active]
}

function useCountUp(to, active) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return undefined
    const start = performance.now()
    const dur = 900
    const id = setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / dur)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p >= 1) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [to, active])
  return n
}

const CHANNELS = [
  { icon: <IconChat />, name: 'Chat' },
  { icon: <IconGlobe />, name: 'WhatsApp' },
  { icon: <IconMic />, name: 'Voice' },
]

const GUARDRAILS = [
  'Refund over $50 → needs approval',
  'Never quotes unlisted pricing',
  'Escalates on repeated frustration',
]

function AgentStatStrip({ eyebrow = 'At a glance', title, alt }) {
  const [ref, active] = useInView()
  const hrs = useCountUp(48, active)
  const pct = useCountUp(100, active)

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ash-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
        </div>

        <div className="ash-console" ref={ref}>
          <div className="ash-bar">
            <span className="ash-bar-dot" />
            <span>agent-builder / customer-support-v1</span>
            <span className="ash-bar-live">● Live</span>
          </div>

          <div className="ash-grid">
            <div className="ash-col">
              <span className="ash-col-num">3</span>
              <h3>Channels</h3>
              <div className="ash-channels">
                {CHANNELS.map((c) => (
                  <span className="ash-channel" key={c.name}>
                    <span className="ash-channel-ic">{c.icon}</span>
                    {c.name}
                    <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                ))}
              </div>
              <p className="ash-col-desc">One agent definition, connected everywhere.</p>
            </div>

            <div className="ash-col">
              <span className="ash-col-num">{hrs}<small>hrs</small></span>
              <h3>To first live agent</h3>
              <div className="ash-timeline">
                <div className="ash-timeline-bar"><span /></div>
                <div className="ash-timeline-labels">
                  <span>Blank prompt</span>
                  <span>Guardrails set</span>
                  <span>Live</span>
                </div>
              </div>
              <p className="ash-col-desc">Typical time to a deployed agent.</p>
            </div>

            <div className="ash-col">
              <span className="ash-col-num">{pct}%</span>
              <h3>Guardrailed actions</h3>
              <ul className="ash-checklist">
                {GUARDRAILS.map((g) => (
                  <li key={g}><IconCheck /> {g}</li>
                ))}
              </ul>
            </div>

            <div className="ash-col">
              <span className="ash-col-num">0</span>
              <h3>Code required to start</h3>
              <div className="ash-code">
                <div className="ash-code-head"><i /><i /><i /></div>
                <p><span className="ash-code-comment">// optional — add custom logic later</span></p>
                <p className="ash-code-empty">&nbsp;</p>
              </div>
              <p className="ash-col-desc">Only needed when logic gets specific.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentStatStrip
