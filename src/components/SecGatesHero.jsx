import { useState, useEffect } from 'react'
import './SecGatesHero.css'

const GATES = [
  { key: 'auth', label: 'Authenticate', left: '18%' },
  { key: 'encrypt', label: 'Encrypt', left: '39%' },
  { key: 'authorize', label: 'Authorize', left: '60%' },
  { key: 'audit', label: 'Audit', left: '81%' },
]

// packet resting position for each phase (0 reset, 1 appear, 2-5 gates, 6 lock, 7 sealed)
const PACKET_LEFT = ['4%', '4%', '18%', '39%', '60%', '81%', '90%', '90%']

function SecGatesHero() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPhase(6)
      return undefined
    }
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % 8)
    }, 950)
    return () => clearInterval(id)
  }, [])

  const locked = phase === 6 || phase === 7
  const hidden = phase === 0 || phase === 7
  const snap = phase === 0

  return (
    <div
      className="sec-gates"
      role="img"
      aria-label="A message packet passing through authenticate, encrypt, authorize and audit security gates before the vault locks shut"
    >
      <span className="sec-gates-eyebrow" aria-hidden="true">Every message, gated end to end</span>

      <div className="sec-gates-stage">
        <span className="sec-gates-rail" aria-hidden="true" />

        {GATES.map((g, i) => {
          const lit = phase >= i + 2
          return (
            <div className={`sec-gate${lit ? ' is-lit' : ''}`} style={{ left: g.left }} key={g.key}>
              <span className="sec-gate-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="10" height="10">
                  <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="sec-gate-bar" />
              <span className="sec-gate-label">{g.label}</span>
            </div>
          )
        })}

        <span
          className={`sec-packet${hidden ? ' is-hidden' : ''}${snap ? ' is-snap' : ''}`}
          style={{ left: PACKET_LEFT[phase] }}
          aria-hidden="true"
        >
          <span className="sec-packet-core" />
        </span>

        <div className={`sec-lock${locked ? ' is-closed' : ''}`} aria-hidden="true">
          <span className="sec-lock-glow" />
          <svg className="sec-lock-svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.4" />
            <path className="sec-lock-shackle" d="M7.5 10.5V8a4.5 4.5 0 0 1 9 0v2.5" />
            <circle cx="12" cy="15.6" r="1.35" fill="currentColor" stroke="none" />
            <path d="M12 16.9v1.7" />
          </svg>
          <span className="sec-lock-label">Sealed</span>
        </div>
      </div>
    </div>
  )
}

export default SecGatesHero
