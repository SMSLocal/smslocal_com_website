import { useEffect, useState } from 'react'
import './BulkComplianceStamp.css'

/**
 * Compliance/trust section for the Bulk SMS page. Not an audit checklist
 * in a bar/card (tried twice, rejected both times) — a live "stamping"
 * interaction instead: each requirement gets visually stamped VERIFIED
 * one at a time, like watching approval actually happen, then the whole
 * set clears and starts again. No container — plain rows on the page.
 */

const ITEMS = [
  'Sender ID pre-registered with carriers',
  '10DLC / A2P campaign approved',
  'STOP / opt-out handled automatically',
  'Quiet-hours windows respected',
]

const TICK_MS = 1400
const HOLD_TICKS = 2 // extra ticks fully-stamped before the loop resets
const TOTAL_TICKS = ITEMS.length + HOLD_TICKS

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function BulkComplianceStamp({ eyebrow, title, subtitle }) {
  const [tick, setTick] = useState(REDUCED ? ITEMS.length : 0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setTick((t) => (t + 1) % TOTAL_TICKS), TICK_MS)
    return () => clearInterval(id)
  }, [])

  const stampedCount = Math.min(tick, ITEMS.length)
  const activeIndex = tick < ITEMS.length ? tick : -1

  return (
    <section className="section bcst-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div
          className="bcst-stage"
          role="img"
          aria-label={`A live compliance check, stamping each requirement verified one at a time. ${stampedCount} of ${ITEMS.length} currently verified.`}
        >
          <span className="bcst-progress">
            {stampedCount} / {ITEMS.length} verified
          </span>

          <div className="bcst-rows">
            {ITEMS.map((text, i) => {
              const isStamped = i < stampedCount
              const isActive = i === activeIndex
              return (
                <div className="bcst-row" key={text}>
                  <span className="bcst-text">{text}</span>
                  <span className="bcst-mark">
                    {isActive && <span className="bcst-stamp-actor" key={tick} aria-hidden="true" />}
                    <span className={isStamped ? 'bcst-badge is-in' : 'bcst-badge'}>Verified</span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BulkComplianceStamp
