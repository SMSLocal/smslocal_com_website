import { useEffect, useRef, useState } from 'react'
import './QueueWallSection.css'

const SHELVES = [
  { id: 'orders', hue: 'a', count: 34, label: 'Tracking your delivery' },
  { id: 'plan', hue: 'b', count: 21, label: 'Upgrading & downgrading' },
  { id: 'ship', hue: 'c', count: 18, label: 'International shipping' },
  { id: 'login', hue: 'd', count: 15, label: 'Resetting your password' },
  { id: 'return', hue: 'e', count: 12, label: 'Returns & refunds' },
]

const TOTAL = SHELVES.reduce((n, s) => n + s.count, 0) + 9
const ANSWERED = TOTAL - 9
const RATE = Math.round((ANSWERED / TOTAL) * 100)

const HUMAN_TICKETS = [
  { channel: 'Email', time: '8:11am', text: 'Driver left it with a stranger' },
  { channel: 'WhatsApp', time: '10:12am', text: 'Going to my bank about this' },
  { channel: 'WhatsApp', time: '10:56am', text: 'Invoice needs a different company' },
  { channel: 'Web chat', time: '11:51am', text: 'Wrong address on a live order' },
  { channel: 'Web chat', time: '12:35pm', text: 'Charged twice, need it reversed' },
  { channel: 'WhatsApp', time: '3:48pm', text: 'Bulk order, 400 units — who do I ask' },
  { channel: 'Web chat', time: '3:59pm', text: 'Account owner has left the company' },
  { channel: 'SMS', time: '4:48pm', text: 'Damaged on arrival — wants a call' },
  { channel: 'SMS', time: '5:05pm', text: 'Cancel my contract early' },
]

function QueueWallSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') { setVisible(true); return undefined }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } })
    }, { threshold: 0.2 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <section className="qw">
      <div className="container">
        <div className="qw-head">
          <div className="qw-head-l">
            <span className="qw-eyebrow">The problem</span>
            <h2 className="qw-title">
              This is every ticket you got yesterday.{' '}
              <em>{ANSWERED} of them never reach your team.</em>
            </h2>
          </div>
          <p className="qw-sub">
            {TOTAL} real questions came in. The agent read each one against your help centre —
            what it could answer, it answered. What it couldn&apos;t, it left for your team.
          </p>
        </div>

        <div className="qw-stats">
          <div className="qw-ring" style={{ '--pct': RATE }}>
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle className="qw-ring-track" cx="50" cy="50" r="44" />
              <circle className="qw-ring-fill" cx="50" cy="50" r="44" />
            </svg>
            <span className="qw-ring-txt">
              <b>{RATE}%</b>
              answered automatically
            </span>
          </div>

          <ul className="qw-chips">
            {SHELVES.map((s) => (
              <li className={`qw-chip qw-h--${s.hue}`} key={s.id}>
                <b>{s.count}</b>{s.label}
              </li>
            ))}
            <li className="qw-chip qw-h--human">
              <b>9</b>needs a person
            </li>
          </ul>
        </div>

        <div className="qw-grid" ref={ref}>
          {HUMAN_TICKETS.map((t, i) => (
            <div
              className={`qw-card${visible ? ' is-in' : ''}`}
              style={{ transitionDelay: `${i * 55}ms` }}
              key={t.text}
            >
              <span className="qw-card-meta">{t.channel} · {t.time}</span>
              <strong className="qw-card-q">&ldquo;{t.text}&rdquo;</strong>
              <span className="qw-card-tag">no article covers this — escalated</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QueueWallSection
