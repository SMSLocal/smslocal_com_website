import { useEffect, useRef, useState } from 'react'
import './RolloutTimeline.css'

/**
 * Bespoke section for /resources/case-studies.
 * A horizontal rollout rail: a gradient line threaded through milestone nodes
 * that light up in sequence as it scrolls into view, showing how a typical
 * engagement moves from scoping to measurable results.
 * Distinct from every other section on the page — no cards, no boxes, no dark
 * fills. Horizontal timeline orientation used nowhere else here.
 */

const MILESTONES = [
  {
    when: 'Day 1',
    head: 'Scope the one metric',
    body: 'We pick a single number worth moving — reply time, no-shows, recovered carts — and the channel to move it.',
  },
  {
    when: 'Week 1',
    head: 'Connect & configure',
    body: 'Plug into your inbox, catalogue and CRM, then set up the AI agent, templates and routing on one platform.',
  },
  {
    when: 'Week 2',
    head: 'Go live',
    body: 'Start sending on SMS, WhatsApp or RCS — the AI agent takes the front line, humans stay on standby.',
  },
  {
    when: 'Week 6',
    head: 'Read the results',
    body: 'By about week six the numbers have shifted — and you scale the same setup to the next use case.',
  },
]

function RolloutTimeline() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          obs.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section rollout">
      <div className="container">
        <span className="section-kicker">How a rollout goes</span>
        <h2 className="section-title">From first message to measurable result</h2>
        <p className="section-subtitle">
          Most teams don’t wait a quarter to see movement — here’s the arc a typical rollout follows.
        </p>

        <div className={on ? 'rollout-rail is-on' : 'rollout-rail'} ref={ref}>
          <span className="rollout-track" aria-hidden="true" />
          <span className="rollout-progress" aria-hidden="true" />
          {MILESTONES.map((m, i) => (
            <div className="rollout-stop" style={{ '--i': i }} key={m.when}>
              <span className="rollout-node" aria-hidden="true" />
              <span className="rollout-when">{m.when}</span>
              <h3 className="rollout-head">{m.head}</h3>
              <p className="rollout-body">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RolloutTimeline
