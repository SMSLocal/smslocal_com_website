import { useEffect, useState } from 'react'
import './WhyUsStatBars.css'
import { IconCheck } from './icons.jsx'

/**
 * "Why us" section for the Voice channel page — replaces every stat-grid/
 * bar/card attempt with a two-column layout: a plain, unboxed list of the
 * headline numbers on the left, and a live-ticking network activity feed
 * on the right that makes the reliability claim concrete instead of
 * abstract.
 */

const EVENTS = [
  { loc: 'Mumbai', text: 'call connected in 31ms' },
  { loc: 'London', text: 'IVR menu answered, routed to Support' },
  { loc: 'São Paulo', text: 'outbound call placed via Voice API' },
  { loc: 'Singapore', text: 'carrier failover triggered — zero drops' },
  { loc: 'Nairobi', text: 'new local number provisioned' },
  { loc: 'Dubai', text: 'call recording started, consent logged' },
  { loc: 'Toronto', text: 'queue cleared, wait time 4s' },
  { loc: 'Manila', text: 'call connected in 28ms' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function WhyUsStatBars({ eyebrow, title, subtitle, items, alt }) {
  const [feed, setFeed] = useState(() => EVENTS.slice(0, 5))

  useEffect(() => {
    if (REDUCED) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setFeed(Array.from({ length: 5 }, (_, k) => EVENTS[(i + k) % EVENTS.length]))
    }, 1900)
    return () => clearInterval(id)
  }, [])

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wsb-split">
          <div className="wsb-nums">
            {items.map((item) => (
              <div className="wsb-num-row" key={item.heading}>
                <span className="wsb-figure">
                  {item.figure}
                  {item.unit && <span className="wsb-unit">{item.unit}</span>}
                </span>
                <span className="wsb-num-text">
                  <strong>{item.heading}</strong>
                  <p>{item.desc}</p>
                </span>
              </div>
            ))}
          </div>

          <div className="wsb-feed">
            <span className="wsb-feed-title">
              <span className="wsb-live-dot" />
              Live network activity
            </span>
            {feed.map((e, i) => (
              <div className="wsb-feed-row" key={`${e.loc}-${i}`}>
                <IconCheck />
                <span><b>{e.loc}</b> — {e.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsStatBars
