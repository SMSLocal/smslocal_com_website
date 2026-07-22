import { useEffect, useState } from 'react'
import './WaBroadcastHero.css'

/**
 * Hero visual for the WhatsApp Broadcasting page.
 * Dramatizes one-to-many personal reach: a single compose line ("Broadcast to
 * 8,240 contacts — Hi {{name}}") fans out down three dashed lines into three
 * personalized 1:1 message cards for named recipients (Aisha, Marco, Priya).
 * Each card resolves the token to a real name and shows a double-tick that
 * warms from grey to brand-blue as it's read, while a live counter ticks up
 * delivered / read totals. Fully-assembled (final) state is the base; motion
 * only enhances, and the counter jumps straight to its final value when the
 * visitor prefers reduced motion.
 */
const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const DELIVERED = 6120
const READ = 4880

const RECIPIENTS = [
  { initial: 'A', name: 'Aisha', line: 'Hi Aisha — your order shipped.' },
  { initial: 'M', name: 'Marco', line: 'Hi Marco — your order shipped.' },
  { initial: 'P', name: 'Priya', line: 'Hi Priya — your order shipped.' },
]

function DoubleTick() {
  return (
    <svg className="wabh-ticks" viewBox="0 0 26 16" width="22" height="14" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8.5l3.5 3.5L13 3" />
      <path d="M11 12l1.5 1.5L23 3" />
    </svg>
  )
}

function WaBroadcastHero() {
  const [delivered, setDelivered] = useState(REDUCED ? DELIVERED : 0)
  const [read, setRead] = useState(REDUCED ? READ : 0)

  useEffect(() => {
    if (REDUCED) return
    let raf
    const start = performance.now()
    const dur = 2200
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur)
      const e = 1 - Math.pow(1 - t, 3)
      setDelivered(Math.round(DELIVERED * e))
      setRead(Math.round(READ * e))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="wabh" aria-hidden="true">
      {/* Compose line — one broadcast to the whole list */}
      <div className="wabh-compose">
        <div className="wabh-compose-top">
          <span className="wabh-badge">
            <span className="wabh-badge-icon" aria-hidden="true" />
            Broadcast
          </span>
          <span className="wabh-count">to <strong>8,240</strong> contacts</span>
        </div>
        <p className="wabh-msg">
          <span className="wabh-token">Hi {'{{name}}'}</span> — your order shipped 📦 track it here.
        </p>
        <span className="wabh-send">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>
          Send
        </span>
      </div>

      {/* Fan — the send flows down to each recipient */}
      <svg className="wabh-fan" viewBox="0 0 300 46" preserveAspectRatio="none" aria-hidden="true">
        <path d="M150 2 C 150 26, 60 24, 42 44" />
        <path d="M150 2 L 150 44" />
        <path d="M150 2 C 150 26, 240 24, 258 44" />
      </svg>

      {/* Recipients — each gets a personal 1:1 thread */}
      <div className="wabh-rcpts">
        {RECIPIENTS.map((r) => (
          <div className="wabh-rcpt" key={r.name}>
            <span className="wabh-avatar">{r.initial}</span>
            <span className="wabh-name">{r.name}</span>
            <span className="wabh-line">{r.line}</span>
            <DoubleTick />
          </div>
        ))}
      </div>

      {/* Live delivery counter */}
      <div className="wabh-counter">
        <span className="wabh-live" />
        <span><b>{delivered.toLocaleString()}</b> delivered</span>
        <span className="wabh-sep" />
        <span><b>{read.toLocaleString()}</b> read</span>
      </div>
    </div>
  )
}

export default WaBroadcastHero
