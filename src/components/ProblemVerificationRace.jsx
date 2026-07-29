import { useEffect, useRef, useState } from 'react'
import './ProblemVerificationRace.css'

const MANUAL_STEPS = [
  'Confirm your full name',
  'Confirm date of birth',
  'Confirm last 4 of SSN',
  'Confirm billing address',
  'Confirm account number',
]

const MANUAL_TIMER = ['0:14', '0:47', '1:22', '2:05', '2:43']
const AI_CONFIRM_AT = 1
const STEP_HOLD_MS = 750
const END_HOLD_MS = 2400
const RESET_HOLD_MS = 450

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path d="M9 15l6-6M10 6l1-1a4 4 0 0 1 5.7 5.7l-1.4 1.4M14 18l-1 1a4 4 0 0 1-5.7-5.7l1.4-1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const BULLETS = [
  { icon: <LinkIcon />, text: 'Core banking and CRM systems hold fragmented, out-of-sync account records.' },
  { icon: <ClockIcon />, text: 'Agents burn minutes cross-checking one customer across three separate systems.' },
]

function ProblemVerificationRace({ eyebrow, heading, alt }) {
  const [manualIndex, setManualIndex] = useState(REDUCED ? MANUAL_STEPS.length - 1 : 0)
  const [aiConfirmed, setAiConfirmed] = useState(REDUCED)
  const timer = useRef(null)

  useEffect(() => {
    if (REDUCED) return undefined

    if (manualIndex === AI_CONFIRM_AT && !aiConfirmed) {
      setAiConfirmed(true)
    }

    const isLast = manualIndex === MANUAL_STEPS.length - 1
    const holdMs = manualIndex === -1 ? RESET_HOLD_MS : isLast ? END_HOLD_MS : STEP_HOLD_MS

    timer.current = setTimeout(() => {
      if (manualIndex === -1) {
        setManualIndex(0)
      } else if (isLast) {
        setAiConfirmed(false)
        setManualIndex(-1)
      } else {
        setManualIndex((i) => i + 1)
      }
    }, holdMs)

    return () => clearTimeout(timer.current)
  }, [manualIndex, aiConfirmed])

  return (
    <section className={alt ? 'section section-alt pvr-section' : 'section pvr-section'}>
      <div className="container pvr-inner">
        <div className="pvr-copy">
          {eyebrow && <span className="pvr-kicker">{eyebrow}</span>}
          <h2 className="pvr-heading">{heading}</h2>
          <div className="pvr-rule" />
          <ul className="pvr-bullets">
            {BULLETS.map((b) => (
              <li key={b.text}>
                <span className="pvr-bullet-ic">{b.icon}</span>
                {b.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="pvr-race">
          <div className="pvr-card">
            <div className="pvr-card-head">
              <span className="pvr-dot pvr-dot--bad" />
              Manual verification
              <span className="pvr-timer">{manualIndex === -1 ? '0:00' : MANUAL_TIMER[manualIndex]}</span>
            </div>
            <div className="pvr-checklist">
              {MANUAL_STEPS.map((step, i) => (
                <span className={`pvr-check-row${i === manualIndex ? ' is-current' : ''}`} key={step}>
                  {step}
                </span>
              ))}
            </div>
          </div>

          <span className="pvr-vs">vs</span>

          <div className="pvr-card">
            <div className="pvr-card-head">
              <span className="pvr-dot pvr-dot--good" />
              AI agent
              <span className="pvr-timer pvr-timer--good">{aiConfirmed ? '0:04' : '0:00'}</span>
            </div>
            <div className="pvr-checklist">
              <span className={`pvr-ai-row${aiConfirmed ? ' is-visible' : ''}`}>
                <span className="pvr-ai-check"><CheckIcon /></span>
                Identity confirmed across every system
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemVerificationRace
