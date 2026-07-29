import { useEffect, useRef, useState } from 'react'
import './ProblemTicketStack.css'

const TICKETS = [
  'A flight delay means calls',
  'Same question, every time',
  'Rebooking stuck at check-in',
  'Gate changes reach guests too late',
]

const AI_ITEMS = [
  'Itinerary status answered instantly',
  'Rebookings and cancellations handled end to end',
  'Guests guided in their own language',
  'Delays and gate changes alerted automatically',
]

const RESOLVED_TARGET = 2140

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProblemTicketStack({ eyebrow, heading, paragraph, alt }) {
  const [count, setCount] = useState(REDUCED ? RESOLVED_TARGET : 0)
  const started = useRef(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (REDUCED || started.current) return undefined
    const el = sectionRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const duration = 1100
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1)
              setCount(Math.round(RESOLVED_TARGET * (1 - (1 - progress) ** 3)))
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={alt ? 'section section-alt pts-section' : 'section pts-section'} ref={sectionRef}>
      <div className="container pts-inner">
        <div className="pts-copy">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          <h2 className="pts-heading">{heading}</h2>
          <p className="pts-paragraph">{paragraph}</p>
        </div>

        <div className="pts-visual">
          <div className="pts-stack-col">
            <span className="pts-alert">
              <span className="pts-alert-dot" />
              Ticket queue growing
            </span>
            <span className="pts-manual-label">Manual booking support</span>

            <div className="pts-stack">
              {TICKETS.map((t, i) => (
                <div className={`pts-card pts-card--${i}`} key={t}>
                  <span className="pts-card-dot" />
                  <span className="pts-card-text">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <svg className="pts-arrow" viewBox="0 0 90 60" fill="none" aria-hidden="true">
            <path d="M4 8c30 4 50 20 60 42" stroke="var(--blue)" strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />
            <circle cx="64" cy="50" r="3" fill="var(--blue)" />
          </svg>

          <div className="pts-agent">
            <span className="pts-agent-label">Travel AI agent</span>
            <ul className="pts-agent-list">
              {AI_ITEMS.map((item) => (
                <li key={item}>
                  <span className="pts-agent-check"><CheckIcon /></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="pts-agent-footer">
              <span className="pts-agent-live" />
              <strong>{count.toLocaleString()}</strong> resolved today
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemTicketStack
