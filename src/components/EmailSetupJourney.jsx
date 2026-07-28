import { useEffect, useRef, useState } from 'react'
import './EmailSetupJourney.css'

/**
 * "How it works" for /email-api — a clickable step list on the left
 * drives a live checklist-progress panel on the right (not a code/typing
 * terminal — that pattern already exists on another page). Each step's
 * sub-tasks tick off one at a time, ending in a completion badge.
 */

const CHECKLIST = [
  { tasks: ['Add the SPF record', 'Add the DKIM record', 'Add the DMARC record'], done: 'Domain verified' },
  { tasks: ['Pick a starting template', 'Customize your branding', 'Preview across inboxes'], done: 'Template ready' },
  { tasks: ['Connect the SMS fallback', 'Set the retry rule', 'Flip it live'], done: 'Sending — fallback on' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function EmailSetupJourney({ eyebrow, title, steps = [] }) {
  const [active, setActive] = useState(0)
  const [checked, setChecked] = useState(0) // how many tasks ticked for the active step
  const [complete, setComplete] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setChecked(0)
    setComplete(false)

    const total = CHECKLIST[active].tasks.length

    if (REDUCED) {
      setChecked(total)
      setComplete(true)
      const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), 2200)
      timers.current.push(t)
      return () => timers.current.forEach(clearTimeout)
    }

    for (let i = 1; i <= total; i += 1) {
      const t = setTimeout(() => setChecked(i), 350 + i * 500)
      timers.current.push(t)
    }
    const completeT = setTimeout(() => setComplete(true), 350 + total * 500 + 250)
    timers.current.push(completeT)
    const advanceT = setTimeout(() => setActive((a) => (a + 1) % steps.length), 350 + total * 500 + 1500)
    timers.current.push(advanceT)

    return () => timers.current.forEach(clearTimeout)
  }, [active, steps.length])

  const list = CHECKLIST[active]

  return (
    <section className="section section-alt esj-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="esj">
          <div className="esj-steps">
            {steps.slice(0, 3).map((s, i) => (
              <button
                type="button"
                key={s.title}
                className={`esj-step${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="esj-step-num">{i === active && !complete ? '…' : i + 1}</span>
                <span className="esj-step-text">
                  <strong>{s.title}</strong>
                  <span>{s.desc}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="esj-panel">
            <span className="esj-panel-label">{steps[active]?.title}</span>
            <ul className="esj-checklist" key={active}>
              {list.tasks.map((task, i) => (
                <li key={task} className={i < checked ? 'is-checked' : ''} style={{ '--d': `${i * 0.08}s` }}>
                  <span className="esj-check">{i < checked ? '✓' : ''}</span>
                  {task}
                </li>
              ))}
            </ul>
            <div className={`esj-complete${complete ? ' is-shown' : ''}`}>
              <span className="esj-complete-dot" />
              {list.done}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailSetupJourney
