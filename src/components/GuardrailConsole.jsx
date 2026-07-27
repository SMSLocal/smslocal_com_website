import { useEffect, useMemo, useRef, useState } from 'react'
import './GuardrailConsole.css'

/* One ticket, read left to right. The policy sentence above it is editable —
   click a chip, the track re-runs and lands somewhere else. */

const AMOUNT = 312.4
const CAPS = [0, 100, 250, 500, 1000]
const SCOPES = [
  { id: 'read', label: 'read-only' },
  { id: 'standard', label: 'standard' },
  { id: 'full', label: 'full-access' },
]

const money = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function buildRun(p) {
  const canAct = p.scope !== 'read'
  const clears = AMOUNT <= p.cap

  const stages = [
    { id: 'read', label: 'Reads', note: 'refund · 0.82 angry', tone: 'ok' },
    canAct
      ? { id: 'look', label: 'Looks up', note: `${money(AMOUNT)} · damaged`, tone: 'ok' }
      : { id: 'look', label: 'Looks up', note: 'sees it, can’t touch', tone: 'hold' },
    !canAct
      ? { id: 'act', label: 'Drafts', note: 'parked in your queue', tone: 'hold' }
      : clears
        ? { id: 'act', label: 'Refunds', note: `${money(AMOUNT)} sent`, tone: 'act' }
        : { id: 'act', label: 'Holds', note: `over your ${money(p.cap)} cap`, tone: 'hold' },
    p.escalate
      ? { id: 'esc', label: 'Escalates', note: 'Priya, with a recap', tone: 'ok' }
      : { id: 'esc', label: 'Closes', note: 'nobody is told', tone: 'warn' },
  ]

  const outcome = !canAct
    ? { verdict: 'held', text: 'Nothing moved without you — but nothing moved.' }
    : clears && p.escalate
      ? { verdict: 'resolved', text: 'Refunded in 11 seconds, and still handed to a person.' }
      : clears
        ? { verdict: 'resolved', text: 'Fast — but a third complaint never reached your team.' }
        : { verdict: 'held', text: 'Your cap caught it. Maya gets a person, not a wrong refund.' }

  return { stages, outcome }
}

function GuardrailConsole({ eyebrow, title, subtitle, alt }) {
  const [policy, setPolicy] = useState({ cap: 250, scope: 'standard', escalate: true })
  const { stages, outcome } = useMemo(() => buildRun(policy), [policy])
  const [shown, setShown] = useState(stages.length)
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    const reduce = typeof window !== 'undefined' && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setShown(stages.length); return undefined }

    setShown(0)
    for (let i = 1; i <= stages.length; i += 1) {
      timers.current.push(setTimeout(() => setShown(i), i * 320))
    }
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
  }, [policy, stages.length])

  const cycleCap = () => setPolicy((p) => ({ ...p, cap: CAPS[(CAPS.indexOf(p.cap) + 1) % CAPS.length] }))
  const cycleScope = () => setPolicy((p) => {
    const i = SCOPES.findIndex((s) => s.id === p.scope)
    return { ...p, scope: SCOPES[(i + 1) % SCOPES.length].id }
  })

  const scopeLabel = SCOPES.find((s) => s.id === policy.scope).label
  const running = shown < stages.length

  return (
    <section className={alt ? 'section section-alt gdc' : 'section gdc'}>
      <div className="container">
        <div className="gdc-wrap">
          <div className="gdc-head">
            {eyebrow && <span className="section-kicker">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>

          {/* the editable policy sentence */}
          <p className="gdc-rule">
            Refund on its own up to{' '}
            <button type="button" className="gdc-chip" onClick={cycleCap}>
              {policy.cap === 0 ? 'nothing' : `$${policy.cap}`}
            </button>{' '}
            with{' '}
            <button type="button" className="gdc-chip" onClick={cycleScope}>{scopeLabel}</button>{' '}
            rights, and{' '}
            <button
              type="button"
              className={policy.escalate ? 'gdc-chip gdc-chip--on' : 'gdc-chip gdc-chip--off'}
              onClick={() => setPolicy((p) => ({ ...p, escalate: !p.escalate }))}
              aria-pressed={policy.escalate}
            >
              {policy.escalate ? 'always escalate' : 'never escalate'}
            </button>{' '}
            when someone is upset.
            <span className="gdc-rule-hint">click any of them</span>
          </p>

          {/* the ticket */}
          <p className="gdc-ticket">
            <span className="gdc-avatar">MR</span>
            <span><b>Maya R.</b> “Order #48231 arrived damaged — I want my {money(AMOUNT)} back. Third time I’m writing.”</span>
          </p>

          {/* the track */}
          <div className="gdc-track">
            <span className="gdc-rail-bg" aria-hidden="true">
              <span className="gdc-rail-fill" style={{ width: `${(shown / stages.length) * 100}%` }} />
            </span>

            {stages.map((s, i) => (
              <div
                key={`${s.id}-${s.label}-${s.note}`}
                className={`gdc-stage gdc-stage--${s.tone}${i < shown ? ' is-in' : ''}`}
              >
                <span className="gdc-dot" />
                <span className="gdc-stage-label">{s.label}</span>
                <span className="gdc-stage-note">{s.note}</span>
              </div>
            ))}
          </div>

          <div className={`gdc-outcome gdc-outcome--${outcome.verdict}`} key={outcome.text}>
            <span className="gdc-flag">{outcome.verdict === 'resolved' ? 'Resolved' : 'Held'}</span>
            <span className="gdc-outcome-text">{outcome.text}</span>
            <span className={running ? 'gdc-live is-running' : 'gdc-live'} aria-hidden="true"><i /></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GuardrailConsole
