import { useEffect, useRef, useState } from 'react'
import './DeploymentTimeline.css'
import { IconLink, IconGear, IconBrain, IconRefresh, IconRocket } from './icons.jsx'

const STEPS = [
  {
    icon: <IconLink />,
    title: 'Connect your systems',
    day: 'Day 0',
    desc: 'Link your core banking, payments and CRM within roles that scope what the agent can touch.',
  },
  {
    icon: <IconGear />,
    title: 'Set the guardrails',
    day: 'Day 0',
    desc: 'Define allowed actions, verification steps and when a case must escalate to a person.',
  },
  {
    icon: <IconBrain />,
    title: 'Go live with oversight',
    day: 'Day 1',
    desc: 'Deploy across channels with every action logged and auditable from day one.',
    badge: 'Deployed to WhatsApp, web, SMS',
  },
  {
    icon: <IconRefresh />,
    title: 'Monitor & review',
    day: 'Ongoing',
    desc: 'Risk and compliance teams review the audit trail and tune guardrails as needed.',
  },
]

const BULLETS = [
  'Every action scoped by role before go-live',
  'Sensitive cases auto-escalate with full context',
]

const STAT_TARGET = 12480
const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DeploymentTimeline({ eyebrow, title, alt }) {
  const [count, setCount] = useState(REDUCED ? STAT_TARGET : 0)
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
            const duration = 1200
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1)
              setCount(Math.round(STAT_TARGET * (1 - (1 - progress) ** 3)))
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
    <section className={alt ? 'section section-alt dtl-section' : 'section dtl-section'} ref={sectionRef}>
      <div className="container dtl-inner">
        <div className="dtl-copy">
          {eyebrow && (
            <span className="dtl-kicker">
              <IconRocket />
              {eyebrow}
            </span>
          )}
          {title && <h2 className="dtl-heading">{title}</h2>}

          <div className="dtl-stat">
            <span className="dtl-stat-label">Actions logged this month</span>
            <div className="dtl-stat-row">
              <strong className="dtl-stat-value">{count.toLocaleString()}</strong>
              <span className="dtl-stat-badge">100% audited</span>
            </div>
          </div>

          <ul className="dtl-bullets">
            {BULLETS.map((b) => (
              <li key={b}><span className="dtl-bullet-ic"><CheckIcon /></span>{b}</li>
            ))}
          </ul>
        </div>

        <div className="dtl-timeline">
          {STEPS.map((step, i) => (
            <div className="dtl-row" key={step.title} style={{ '--i': i }}>
              <span className={`dtl-node dtl-node--${i}`}>{step.icon}</span>
              <div className="dtl-card">
                {step.badge && <span className="dtl-card-badge"><CheckIcon /> {step.badge}</span>}
                <div className="dtl-card-head">
                  <h3>{step.title}</h3>
                  <span className="dtl-card-day">{step.day}</span>
                </div>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DeploymentTimeline
