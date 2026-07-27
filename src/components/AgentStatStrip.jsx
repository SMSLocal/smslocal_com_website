import { useEffect, useRef, useState } from 'react'
import './AgentStatStrip.css'

/* A plain stat row that counts up once and lifts gently on hover —
   simple layout, just enough motion to feel alive. */

const STATS = [
  { to: 3, suffix: '', label: 'Channels', desc: 'Chat, WhatsApp and voice from one agent definition.' },
  { to: 48, suffix: 'hrs', label: 'To first live agent', desc: 'Typical time from a blank prompt to a deployed agent.' },
  { to: 100, suffix: '%', label: 'Guardrailed actions', desc: 'Every autonomous action checked against rules you set.' },
  { to: 0, suffix: '', label: 'Code required to start', desc: 'Optional custom code only when logic needs it.' },
]

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

function Stat({ item }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const check = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
        setActive(true)
      }
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  const n = useCountUp(item.to, active)

  return (
    <div className="ass-col" ref={ref}>
      <strong className="ass-value">{n}{item.suffix}</strong>
      <span className="ass-label">{item.label}</span>
      <p className="ass-desc">{item.desc}</p>
    </div>
  )
}

function AgentStatStrip({ eyebrow = 'At a glance', title, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ass-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
        </div>
        <div className="ass-row">
          {STATS.map((item) => (
            <Stat item={item} key={item.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AgentStatStrip
