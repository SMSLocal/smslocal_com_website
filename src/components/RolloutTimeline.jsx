import { useEffect, useRef, useState } from 'react'
import './RolloutTimeline.css'

/**
 * Rollout stepper for /resources/case-studies.
 *
 * An orbital counter dial on the left — a static dashed ring with the marker
 * dot travelling between step positions, and an "N of 4" count at the centre —
 * paired with a single milestone panel on the right. Advances itself every 5s
 * and is steerable with the arrows or the step dots. Only one step is ever on
 * screen, so the reader has exactly one thing to take in.
 */

const ROTATE_MS = 5000
const R = 120

const MILESTONES = [
  {
    when: 'Day 1',
    head: 'Scope the one metric',
    body: 'We pick a single number worth moving — reply time, no-shows, recovered carts — and the channel to move it.',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.4" />
        <path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6" />
      </>
    ),
  },
  {
    when: 'Week 1',
    head: 'Connect & configure',
    body: 'Plug into your inbox, catalogue and CRM, then set up the AI agent, templates and routing on one platform.',
    icon: (
      <>
        <path d="M8.5 2.6v5.2M15.5 2.6v5.2" />
        <path d="M5.6 7.8h12.8v3.4a6.4 6.4 0 0 1-6.4 6.4 6.4 6.4 0 0 1-6.4-6.4z" />
        <path d="M12 17.6v3.8" />
      </>
    ),
  },
  {
    when: 'Week 2',
    head: 'Go live',
    body: 'Start sending on SMS, WhatsApp or RCS — the AI agent takes the front line, humans stay on standby.',
    icon: (
      <>
        <path d="M21.4 2.6 10.8 13.2" />
        <path d="M21.4 2.6 14.6 21.4l-3.8-8.2-8.2-3.8z" />
      </>
    ),
  },
  {
    when: 'Week 6',
    head: 'Read the results',
    body: 'By about week six the numbers have shifted — and you scale the same setup to the next use case.',
    icon: (
      <>
        <path d="M3 20.4h18" />
        <path d="M6.4 20.4v-6.8M11.4 20.4V7.6M16.4 20.4v-9.6" />
      </>
    ),
  },
]

function RolloutTimeline() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [tick, setTick] = useState(0)
  const [angle, setAngle] = useState(0)
  const timer = useRef(null)
  const spun = useRef(0)
  const n = MILESTONES.length

  /* Accumulate rotation so the marker always takes the short way round —
     without this, wrapping from the last step to the first rewinds 270deg. */
  useEffect(() => {
    const target = (360 / n) * i
    const delta = (((target - (spun.current % 360)) % 360) + 540) % 360 - 180
    spun.current += delta
    setAngle(spun.current)
  }, [i, n])

  useEffect(() => {
    if (paused) return undefined
    timer.current = setTimeout(() => setI((v) => (v + 1) % n), ROTATE_MS)
    return () => clearTimeout(timer.current)
  }, [i, paused, tick, n])

  const go = (next) => {
    setI((next + n) % n)
    setTick((t) => t + 1) // restart the dwell timer on manual steering
  }

  const step = MILESTONES[i]

  return (
    <section className="section rollout">
      <div className="container">
        <span className="section-kicker">How a rollout goes</span>
        <h2 className="section-title">From first message to measurable result</h2>
        <p className="section-subtitle">
          Most teams don&rsquo;t wait a quarter to see movement — here&rsquo;s the arc a typical rollout follows.
        </p>

        <div
          className="rt"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* orbital counter */}
          <div className="rt-dial" aria-hidden="true">
            <svg className="rt-ring" viewBox="0 0 280 280">
              <circle className="rt-ring-base" cx="140" cy="140" r={R} />
            </svg>

            {MILESTONES.map((m, k) => (
              <span
                className={`rt-orbit${k === i ? ' is-active' : ''}`}
                key={m.when}
                style={{ transform: `rotate(${(360 / n) * k}deg)` }}
              >
                <span className="rt-orbit-dot" />
              </span>
            ))}

            <span className="rt-arm" style={{ transform: `rotate(${angle}deg)` }}>
              <span className="rt-arm-dot" />
            </span>

            <div className="rt-count">
              <strong key={i}>{i + 1}</strong>
              <span>of {n}</span>
            </div>
          </div>

          {/* one step at a time */}
          <div className="rt-panel">
            <div className="rt-panel-in" key={i}>
              <span className="rt-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">{step.icon}</svg>
              </span>
              <span className="rt-when">{step.when}</span>
              <h3 className="rt-head">{step.head}</h3>
              <p className="rt-body">{step.body}</p>
            </div>

            <div className="rt-controls">
              <div className="rt-dots" role="tablist" aria-label="Rollout steps">
                {MILESTONES.map((m, k) => (
                  <button
                    key={m.when}
                    type="button"
                    role="tab"
                    aria-selected={k === i}
                    aria-label={`${m.when} — ${m.head}`}
                    className={`rt-dot${k === i ? ' is-active' : ''}`}
                    onClick={() => go(k)}
                  />
                ))}
              </div>

              <div className="rt-arrows">
                <button
                  type="button"
                  className="rt-arrow"
                  aria-label="Previous step"
                  onClick={() => go(i - 1)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
                </button>
                <button
                  type="button"
                  className="rt-arrow"
                  aria-label="Next step"
                  onClick={() => go(i + 1)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RolloutTimeline
