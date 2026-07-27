import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './AgentLiveRunHero.css'
import {
  IconChat, IconBrain, IconCheck, IconCart, IconDollar, IconCalendar,
  IconMail, IconReceipt, IconUsers, IconShield,
} from './icons.jsx'

/* Each run is a real request the agent can finish (or hand off) end to end.
   The trace below plays out one run at a time; the chips let the visitor
   pick which one, which is the hook — they drive the agent themselves. */
const RUNS = [
  {
    chip: 'Refund my order',
    msg: 'Can I get a refund for order #48219?',
    who: 'Ana · WhatsApp',
    thought: 'Delivered 3 days ago — inside the 30-day window, so a refund is allowed.',
    tools: [
      { icon: <IconCart />, call: 'shopify.getOrder("48219")', ms: '240ms' },
      { icon: <IconDollar />, call: 'stripe.createRefund(82.40)', ms: '610ms' },
    ],
    result: 'Refunded $82.40 to card •• 4242',
    note: 'Logged to audit trail · policy: 30-day returns',
  },
  {
    chip: 'Move my appointment',
    msg: 'Move my appointment to Friday morning.',
    who: 'Devon · SMS',
    thought: 'Two slots open Friday. Taking 10:30 AM — the earliest one.',
    tools: [
      { icon: <IconCalendar />, call: 'calendar.findSlots("Fri")', ms: '180ms' },
      { icon: <IconCalendar />, call: 'calendar.reschedule(#7741)', ms: '350ms' },
    ],
    result: 'Moved to Friday, 10:30 AM',
    note: 'Confirmation + reminder sent on the same thread',
  },
  {
    chip: 'Resend my invoice',
    msg: "Where's my invoice for March?",
    who: 'Priya · Email',
    thought: 'One invoice for March on this account, already paid. Safe to resend.',
    tools: [
      { icon: <IconReceipt />, call: 'billing.getInvoice("2026-03")', ms: '150ms' },
      { icon: <IconMail />, call: 'email.send(INV-1042.pdf)', ms: '320ms' },
    ],
    result: 'Sent invoice INV-1042 to priya@northwind.co',
    note: 'Logged to audit trail · no card data exposed',
  },
  {
    chip: 'Dispute a charge',
    msg: 'I want to dispute a chargeback with a manager.',
    who: 'Marco · Voice',
    thought: 'Chargebacks sit outside my scoped role. Handing this to a human.',
    tools: [
      { icon: <IconUsers />, call: 'crm.getCustomer("marco@…")', ms: '210ms' },
      { icon: <IconShield />, call: 'inbox.assign("Billing")', ms: '90ms' },
    ],
    result: 'Handed to Marcus in Billing',
    note: 'Full transcript + context attached — nothing repeated',
    handoff: true,
  },
]

const RESOLVED_BASE = 2938
const TYPE_SPEED = 26
const STEP_AT = [1150, 1950, 2600, 3350] // thought, tool 1, tool 2, result
const RUN_MS = 6400

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function AgentLiveRunHero() {
  const [runIndex, setRunIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [resolved, setResolved] = useState(RESOLVED_BASE)
  const holdRef = useRef(false)
  const run = RUNS[runIndex]
  const reduced = prefersReducedMotion()

  // Type the incoming message out character by character, then walk the run
  // through its steps and roll on to the next one.
  useEffect(() => {
    setStep(0)
    setTyped(reduced ? run.msg : '')
    const timers = []

    if (!reduced) {
      let i = 0
      const typer = setInterval(() => {
        i += 1
        setTyped(run.msg.slice(0, i))
        if (i >= run.msg.length) clearInterval(typer)
      }, TYPE_SPEED)
      timers.push(() => clearInterval(typer))
    }

    STEP_AT.forEach((at, i) => {
      const t = setTimeout(() => {
        setStep(i + 1)
        if (i === STEP_AT.length - 1 && !run.handoff) setResolved((n) => n + 1)
      }, reduced ? 0 : at)
      timers.push(() => clearTimeout(t))
    })

    // Pointer or keyboard focus inside the trace holds the current run open.
    let advance
    const queueAdvance = (delay) => {
      advance = setTimeout(() => {
        if (holdRef.current) return queueAdvance(1200)
        setRunIndex((n) => (n + 1) % RUNS.length)
      }, delay)
    }
    queueAdvance(RUN_MS)
    timers.push(() => clearTimeout(advance))

    return () => timers.forEach((clear) => clear())
  }, [runIndex, reduced, run.msg, run.handoff])

  const hold = () => { holdRef.current = true }
  const release = () => { holdRef.current = false }

  return (
    <section className="alrh">
      <div className="container alrh-inner">
        <div className="alrh-copy">
          <span className="alrh-eyebrow">
            <span className="alrh-eyebrow-dot" />
            Agentic AI
          </span>

          <h1 className="alrh-title">
            The AI agent that actually{' '}
            <em className="alrh-title-em">does the work</em>
          </h1>

          <p className="alrh-sub">
            It doesn&apos;t just reply — it reads the request, pulls live data from your
            business tools, and takes the real action inside the conversation. When it
            shouldn&apos;t act, it hands off cleanly.
          </p>

          <div className="alrh-ctas">
            <Link to="/contact-us" className="btn btn-primary">Get Started</Link>
            <Link to="/pricing" className="btn btn-ghost">See Pricing</Link>
          </div>

          <div className="alrh-picker">
            <span className="alrh-picker-label">Send it a request</span>
            <div className="alrh-chips" role="tablist" aria-label="Pick a request for the AI agent">
              {RUNS.map((r, i) => (
                <button
                  type="button"
                  key={r.chip}
                  role="tab"
                  aria-selected={i === runIndex}
                  className={`alrh-chip${i === runIndex ? ' is-active' : ''}`}
                  onClick={() => setRunIndex(i)}
                >
                  {r.chip}
                  {i === runIndex && <span className="alrh-chip-timer" key={runIndex} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`alrh-trace${run.handoff ? ' is-handoff' : ''}`}
          onMouseEnter={hold}
          onMouseLeave={release}
          onFocus={hold}
          onBlur={release}
          aria-live="polite"
        >
          <span className="alrh-spine" />

          {/* 1 — the request lands */}
          <div className="alrh-node alrh-node--in is-on">
            <span className="alrh-dot is-on"><IconChat /></span>
            <div className="alrh-card alrh-card--msg">
              <span className="alrh-who">{run.who}</span>
              <p className="alrh-msg">
                {typed}
                {typed.length < run.msg.length && <i className="alrh-caret" />}
              </p>
            </div>
          </div>

          {/* 2 — it reasons over live context */}
          <div className={`alrh-node alrh-node--think${step >= 1 ? ' is-on' : ''}`}>
            <span className={`alrh-dot alrh-dot--agent${step >= 1 ? ' is-on' : ''}`}>
              <span className="alrh-dot-ring" />
              <IconBrain />
            </span>
            <div className="alrh-card alrh-card--think">
              <span className="alrh-label">Agent reasoning</span>
              <p className="alrh-thought" key={`${runIndex}-thought`}>{run.thought}</p>
            </div>
          </div>

          {/* 3 — it calls the tools it is allowed to call */}
          <div className={`alrh-node alrh-node--tools${step >= 2 ? ' is-on' : ''}`}>
            <span className={`alrh-dot${step >= 2 ? ' is-on' : ''}`} aria-hidden="true">
              <IconCheck />
            </span>
            <div className="alrh-tools">
              {run.tools.map((t, i) => (
                <div
                  className={`alrh-tool${step >= i + 2 ? ' is-on' : ''}`}
                  key={`${runIndex}-${t.call}`}
                >
                  <span className="alrh-tool-ic">{t.icon}</span>
                  <code className="alrh-tool-call">{t.call}</code>
                  <span className="alrh-tool-ms">{t.ms}</span>
                  <span className="alrh-tool-ok"><IconCheck /></span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 — the outcome, not a reply */}
          <div className={`alrh-node alrh-node--done${step >= 4 ? ' is-on' : ''}`}>
            <span className={`alrh-dot alrh-dot--done${step >= 4 ? ' is-on' : ''}`}>
              <IconCheck />
            </span>
            <div className="alrh-card alrh-card--done">
              <strong className="alrh-result">{run.result}</strong>
              <span className="alrh-note">{run.note}</span>
            </div>
          </div>

          <div className="alrh-meter">
            <span className="alrh-meter-num" key={resolved}>{resolved.toLocaleString()}</span>
            <span className="alrh-meter-txt">actions resolved today</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentLiveRunHero
