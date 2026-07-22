import { useEffect, useState } from 'react'
import './BulkUseCaseFeed.css'

/**
 * Use-cases section for the Bulk SMS page — one single message bubble that
 * cycles through all four types over time (marketing → alert → reminder →
 * OTP), rather than a panel listing them all at once. Proves "one gateway,
 * every kind of text" by transformation, not by a static grid/list — kept
 * deliberately unlike the Capabilities console (bordered panel + rows)
 * elsewhere on this same page.
 */

const MESSAGES = [
  { tag: 'Marketing', text: '🎉 Flash sale — 30% off everything, ends tonight!', time: '0.6s' },
  { tag: 'Alerts', text: 'Your order has shipped — arriving Thursday.', time: '0.4s' },
  { tag: 'Reminders', text: 'Reminder: your appointment is tomorrow at 3:00pm.', time: '0.7s' },
  { tag: 'OTP & 2FA', text: 'Your verification code is 482913. Expires in 5 min.', time: '0.5s' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function BulkUseCaseFeed({ eyebrow, title, subtitle }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 2600)
    return () => clearInterval(id)
  }, [])

  const m = MESSAGES[i]
  const prevIdx = (i - 1 + MESSAGES.length) % MESSAGES.length
  const nextIdx = (i + 1) % MESSAGES.length

  return (
    <section className="section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ucf-stage" role="img" aria-label="A single message bubble cycling through a marketing text, an alert, a reminder and an OTP code, all sent through the same gateway">
          <div className="ucf-dots" aria-hidden="true">
            {MESSAGES.map((msg, idx) => (
              <span key={msg.tag} className={idx === i ? 'ucf-dot-active' : ''} />
            ))}
          </div>

          <div className="ucf-track">
            <div className="ucf-bubble ucf-bubble--side ucf-bubble--prev" aria-hidden="true">
              <span className={`ucf-tag ucf-tag--${prevIdx}`}>{MESSAGES[prevIdx].tag}</span>
              <p className="ucf-msg">{MESSAGES[prevIdx].text}</p>
            </div>

            <div className="ucf-bubble ucf-bubble--main" key={i}>
              <span className={`ucf-tag ucf-tag--${i}`}>{m.tag}</span>
              <p className="ucf-msg">{m.text}</p>
              <span className="ucf-meta">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4 4L19 6" />
                </svg>
                Delivered in {m.time}
              </span>
            </div>

            <div className="ucf-bubble ucf-bubble--side ucf-bubble--next" aria-hidden="true">
              <span className={`ucf-tag ucf-tag--${nextIdx}`}>{MESSAGES[nextIdx].tag}</span>
              <p className="ucf-msg">{MESSAGES[nextIdx].text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BulkUseCaseFeed
