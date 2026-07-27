import { useEffect, useRef, useState } from 'react'
import './BroadcastInboxScene.css'

/**
 * "What teams broadcast" for /channels/sms-broadcasting.
 *
 * One recognisable artifact — a real SMS inbox holding five different broadcast
 * types — but ANNOTATED: the use-case name sits out in the left margin and the
 * result it drove sits out in the right margin, each aligned to its own message
 * and joined by a hairline leader. That fills the full width instead of leaving
 * dead space either side of a centred phone, and turns the picture into a
 * labelled diagram you can read across.
 *
 * Built as one CSS grid (left margin / screen / right margin) so the three
 * columns align by construction rather than by measurement. Rows keep a fixed
 * height; selecting one emphasises its annotations instead of resizing it, so
 * nothing ever shifts. Hover pauses the cycle.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const MESSAGES = [
  {
    k: 'outage',
    from: 'ORBIT-CLOUD',
    time: '19:45',
    body: "We're aware of an issue affecting sign-ins. Live updates: smsl.co/status",
    kind: 'Outage notice',
    note: 'Sent the moment status changes',
    figure: '9s',
    result: 'to reach the whole base',
    tint: 'coral',
  },
  {
    k: 'delivery',
    from: 'NORTHFIELD',
    time: '17:30',
    body: 'Your order #4821 is out for delivery and arrives before 6pm today.',
    kind: 'Delivery update',
    note: 'Triggered by your order system',
    figure: '40%',
    result: 'fewer "where is my order" tickets',
    tint: 'teal',
  },
  {
    k: 'sale',
    from: 'NORTHFIELD',
    time: '14:00',
    body: '50% off everything for the next 4 hours only. Shop now: smsl.co/x7k',
    kind: 'Flash sale',
    note: 'Segmented to lapsed buyers',
    figure: '3.2×',
    result: 'cart lift versus the same email',
    tint: 'violet',
  },
  {
    k: 'restock',
    from: 'NORTHFIELD',
    time: '11:15',
    body: 'Good news Emma — the Alpine Jacket is back in your size. Reserve it: smsl.co/r4b',
    kind: 'Restock alert',
    note: 'Fires on the back-in-stock event',
    figure: '68%',
    result: 'convert within the first hour',
    tint: 'blue',
  },
  {
    k: 'reminder',
    from: 'BRIGHTON-DENTAL',
    time: '08:40',
    body: 'Reminder: your appointment is tomorrow at 09:40. Reply R to reschedule.',
    kind: 'Appointment reminder',
    note: 'Scheduled 24h before the slot',
    figure: '31%',
    result: 'fewer no-shows',
    tint: 'slate',
  },
]

const DWELL = 3400

function BroadcastInboxScene({ eyebrow = 'Use cases', title, subtitle }) {
  const [open, setOpen] = useState(0)
  const [paused, setPaused] = useState(false)
  const [nonce, setNonce] = useState(0)
  const t = useRef(null)

  useEffect(() => {
    if (REDUCED || paused) return undefined
    t.current = setTimeout(() => setOpen((n) => (n + 1) % MESSAGES.length), DWELL)
    return () => clearTimeout(t.current)
  }, [open, paused, nonce])

  const pick = (i) => {
    setOpen(i)
    setNonce((n) => n + 1)
  }

  return (
    <section className="bis">
      <span className="bis-glow" aria-hidden="true" />

      <div className="container bis-inner">
        <div className="bis-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div
          className="bis-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* screen header sits in the centre column only */}
          <span className="bis-gcell bis-gcell--left bis-colhead">Broadcast type</span>
          <div className="bis-screenhead">
            <span className="bis-title">Messages</span>
            <span className="bis-sub">5 broadcasts · one list · today</span>
          </div>
          <span className="bis-gcell bis-gcell--right bis-colhead">What it drove</span>

          {MESSAGES.map((m, i) => {
            const on = i === open
            return (
              <div className="bis-line" key={m.k} data-on={on || undefined}>
                {/* LEFT margin annotation */}
                <button
                  type="button"
                  className={`bis-ann bis-ann--left${on ? ' is-on' : ''}`}
                  onClick={() => pick(i)}
                >
                  <span className="bis-kind">{m.kind}</span>
                  <span className="bis-note">{m.note}</span>
                  <span className="bis-lead" aria-hidden="true" />
                </button>

                {/* CENTRE — the message inside the screen */}
                <button
                  type="button"
                  className={`bis-row bis-row--${m.tint}${on ? ' is-on' : ''}`}
                  onClick={() => pick(i)}
                  aria-pressed={on}
                >
                  <span className="bis-avatar">{m.from.charAt(0)}</span>
                  <span className="bis-main">
                    <span className="bis-meta">
                      <span className="bis-from">{m.from}</span>
                      <span className="bis-time">{m.time}</span>
                    </span>
                    <span className="bis-body">{m.body}</span>
                  </span>
                </button>

                {/* RIGHT margin annotation */}
                <button
                  type="button"
                  className={`bis-ann bis-ann--right${on ? ' is-on' : ''}`}
                  onClick={() => pick(i)}
                >
                  <span className="bis-lead" aria-hidden="true" />
                  <span className="bis-figure">{m.figure}</span>
                  <span className="bis-result">{m.result}</span>
                </button>
              </div>
            )
          })}
        </div>

        <p className="bis-foot">
          Five different broadcasts, five different segments — all sent from one list, on one platform.
        </p>
      </div>
    </section>
  )
}

export default BroadcastInboxScene
