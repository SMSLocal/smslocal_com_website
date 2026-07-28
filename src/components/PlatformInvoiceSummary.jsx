import { useEffect, useRef, useState } from 'react'
import './PlatformInvoiceSummary.css'
import { IconReceipt, IconUsers, IconClock } from './icons.jsx'

const OUTCOMES = [
  { icon: <IconReceipt />, value: '1', label: 'invoice', desc: 'Every channel, seat and message on a single itemised bill.' },
  { icon: <IconUsers />, value: '1', label: 'customer record', desc: 'Each touchpoint resolves to the same profile, so context never resets.' },
  { icon: <IconClock />, value: 'Days', label: 'to launch', desc: 'Go live without a multi-vendor integration project.' },
]

function useInView() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const check = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) setActive(true)
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

function PlatformInvoiceSummary({ title, subtitle }) {
  const [ref, active] = useInView()

  return (
    <section className="section pis-section">
      <div className="container">
        {(title || subtitle) && (
          <div className="pis-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}

        <div className={`pis-spread${active ? ' is-active' : ''}`} ref={ref}>
          <div className="pis-hero">
            <span className="pis-hero-glow" aria-hidden="true" />
            <strong>5<span className="pis-hero-arrow">→</span>1</strong>
            <span className="pis-hero-dots" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}
            </span>
            <span className="pis-hero-label">tools become one platform</span>
          </div>

          <svg className="pis-connector" viewBox="0 0 120 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 50 C 40 50, 60 20, 120 20 M0 50 C 40 50, 60 50, 120 50 M0 50 C 40 50, 60 80, 120 80" />
          </svg>

          <div className="pis-list">
            {OUTCOMES.map((o, i) => (
              <div className="pis-row" key={o.label} style={{ '--d': `${i * 0.12 + 0.15}s` }}>
                <span className="pis-row-ic">{o.icon}</span>
                <span className="pis-row-value">{o.value}</span>
                <div className="pis-row-copy">
                  <strong>{o.label}</strong>
                  <p>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformInvoiceSummary
