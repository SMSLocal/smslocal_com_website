import { useEffect, useRef, useState } from 'react'
import './AgentRunConsole.css'

/* Each run is a real ticket the agent works through, step by step.
   Two it closes on its own, two it deliberately hands to a human. */
const RUNS = [
  {
    id: 'order',
    chip: 'Order status',
    channel: 'WhatsApp',
    customer: 'Hey — where is my order #4821? It was supposed to arrive Tuesday.',
    intent: 'Order tracking',
    confidence: 96,
    steps: [
      { kind: 'read', label: 'Intent detected', value: 'Order tracking · neutral tone', tag: '96%' },
      { kind: 'source', label: 'Looked up order #4821', value: 'Shopify · fulfilled 2 days ago' },
      { kind: 'source', label: 'Pulled live courier status', value: 'DHL · out for delivery, 6:40pm' },
      { kind: 'guard', label: 'Checked identity rules', value: 'Number matches order — safe to share' },
      { kind: 'act', label: 'Sent tracking link + new ETA', value: 'Delivered to the same thread' },
    ],
    outcome: {
      type: 'resolved',
      label: 'Resolved by the agent',
      reply: 'Good news — #4821 is out for delivery and arrives by 6:40pm today. Here\'s live tracking: dhl.com/t/4821. Want a text when the driver is 10 minutes away?',
    },
  },
  {
    id: 'refund',
    chip: 'Refund request',
    channel: 'Email',
    customer: 'The jacket doesn\'t fit. I\'d like a refund please — ordered it 9 days ago.',
    intent: 'Refund request',
    confidence: 93,
    steps: [
      { kind: 'read', label: 'Intent detected', value: 'Refund request · polite tone', tag: '93%' },
      { kind: 'source', label: 'Read your returns policy', value: '30-day window · unworn items' },
      { kind: 'source', label: 'Checked the order', value: '9 days old · eligible' },
      { kind: 'guard', label: 'Refund cap check', value: '$89 is under your $250 auto-limit' },
      { kind: 'act', label: 'Issued refund + return label', value: 'Stripe · $89.00 refunded' },
    ],
    outcome: {
      type: 'resolved',
      label: 'Resolved by the agent',
      reply: 'Sorted — I\'ve refunded $89.00 to your original card (3–5 working days) and emailed a prepaid return label. No need to repack it in the original box.',
    },
  },
  {
    id: 'pricing',
    chip: 'Bulk discount',
    channel: 'SMS',
    customer: 'If we commit to 200 units a month, can you do 40% off list price?',
    intent: 'Custom pricing',
    confidence: 41,
    steps: [
      { kind: 'read', label: 'Intent detected', value: 'Custom pricing · high value', tag: '41%' },
      { kind: 'source', label: 'Searched approved sources', value: 'No published rate for 200+ units' },
      { kind: 'guard', label: 'Guardrail hit', value: 'Never negotiate price — your rule' },
      { kind: 'stop', label: 'Held the answer back', value: 'Would have had to guess — it didn\'t' },
      { kind: 'hand', label: 'Routed to Enterprise Sales', value: 'With volume, intent and history attached' },
    ],
    outcome: {
      type: 'escalated',
      label: 'Handed to a human — on purpose',
      reply: 'That volume qualifies for custom pricing, so I\'m bringing in our enterprise team rather than quoting you a number I can\'t stand behind. Priya will reply here within the hour.',
    },
  },
  {
    id: 'billing',
    chip: 'Angry billing issue',
    channel: 'Voice',
    customer: 'You\'ve charged my card TWICE this month. This is the second time. Fix it now.',
    intent: 'Billing dispute',
    confidence: 88,
    steps: [
      { kind: 'read', label: 'Intent + sentiment', value: 'Billing dispute · frustrated, repeat issue', tag: '88%' },
      { kind: 'source', label: 'Pulled payment history', value: '2 charges, 14 Jul · same amount' },
      { kind: 'guard', label: 'Risk policy triggered', value: 'Duplicate charge + churn signal' },
      { kind: 'stop', label: 'Stopped short of refunding', value: 'Disputes need a human sign-off' },
      { kind: 'hand', label: 'Escalated with a full brief', value: 'Both charge IDs + recap queued' },
    ],
    outcome: {
      type: 'escalated',
      label: 'Handed to a human — on purpose',
      reply: 'I can see both charges from 14 July and I\'ve flagged them as a duplicate. I\'m putting a billing specialist on this now — they have the charge IDs and your history, so you won\'t repeat any of it.',
    },
  },
]

const STEP_MS = 1150
const HOLD_MS = 4600

const KIND_ICON = {
  read: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a4 4 0 0 0-4 4v1a3 3 0 0 0 0 6v1a4 4 0 0 0 8 0v-1a3 3 0 0 0 0-6V7a4 4 0 0 0-4-4Z" /></svg>
  ),
  source: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>
  ),
  guard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z" /></svg>
  ),
  act: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" /></svg>
  ),
  stop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9 9h6v6H9z" /></svg>
  ),
  hand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>
  ),
}

function AgentRunConsole({ eyebrow, title, subtitle, alt }) {
  const [runIdx, setRunIdx] = useState(0)
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const stageRef = useRef(null)

  const run = RUNS[runIdx]
  const finished = step >= run.steps.length

  useEffect(() => {
    if (paused) return undefined
    if (!finished) {
      const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 700 : STEP_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setRunIdx((i) => (i + 1) % RUNS.length)
      setStep(0)
    }, HOLD_MS)
    return () => clearTimeout(t)
  }, [step, paused, runIdx, finished])

  const pick = (i) => {
    setRunIdx(i)
    setStep(0)
  }

  const doneSteps = run.steps.slice(0, step)
  const sources = doneSteps.filter((s) => s.kind === 'source').length
  const actions = doneSteps.filter((s) => s.kind === 'act' || s.kind === 'hand').length
  const elapsed = (step * 0.6).toFixed(1)

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="arc-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div
          className="arc-shell"
          ref={stageRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* run picker */}
          <div className="arc-tabs">
            <span className="arc-tabs-label">
              <span className="arc-live-dot" />
              Live run
            </span>
            {RUNS.map((r, i) => (
              <button
                type="button"
                key={r.id}
                className={i === runIdx ? 'arc-tab is-active' : 'arc-tab'}
                onClick={() => pick(i)}
              >
                {r.chip}
              </button>
            ))}
            <span className="arc-hint">{paused ? 'paused' : 'auto-playing'}</span>
          </div>

          <div className="arc-body">
            {/* left: the conversation */}
            <div className="arc-thread">
              <div className="arc-thread-head">
                <span className="arc-ch">{run.channel}</span>
                <span className="arc-thread-meta">inbound · unassigned</span>
              </div>

              <div className="arc-msg arc-msg--in" key={`${run.id}-msg`}>
                <span className="arc-avatar">C</span>
                <p>{run.customer}</p>
              </div>

              {!finished && (
                <div className="arc-typing">
                  <span /><span /><span />
                  <em>agent working…</em>
                </div>
              )}

              {finished && (
                <div className={`arc-msg arc-msg--out arc-msg--${run.outcome.type}`} key={`${run.id}-out`}>
                  <span className="arc-outcome-label">
                    {run.outcome.type === 'resolved' ? (
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    )}
                    {run.outcome.label}
                  </span>
                  <p>{run.outcome.reply}</p>
                </div>
              )}
            </div>

            {/* right: the reasoning stack */}
            <div className="arc-stack">
              <div className="arc-stack-head">
                <span>Reasoning trace</span>
                <span className="arc-conf">
                  intent confidence
                  <b>{step > 0 ? `${run.confidence}%` : '—'}</b>
                </span>
              </div>

              <div className="arc-rail">
                <span
                  className="arc-rail-fill"
                  style={{ height: `${(Math.min(step, run.steps.length) / run.steps.length) * 100}%` }}
                />

                {run.steps.map((s, i) => {
                  const state = i < step ? 'done' : i === step ? 'live' : 'idle'
                  return (
                    <div className={`arc-step is-${state} arc-step--${s.kind}`} key={`${run.id}-${s.label}`}>
                      <span className="arc-node">{KIND_ICON[s.kind]}</span>
                      <span className="arc-step-body">
                        <span className="arc-step-label">
                          {s.label}
                          {s.tag && <b>{s.tag}</b>}
                        </span>
                        <span className="arc-step-value">{s.value}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* footer meters */}
          <div className="arc-meters">
            <span className="arc-meter"><b>{elapsed}s</b>elapsed</span>
            <span className="arc-meter"><b>{sources}</b>sources checked</span>
            <span className="arc-meter"><b>{actions}</b>actions taken</span>
            <span className="arc-meter arc-meter--verdict">
              <b>{finished ? (run.outcome.type === 'resolved' ? 'Closed' : 'Escalated') : 'Running'}</b>
              verdict
            </span>
            <button type="button" className="arc-replay" onClick={() => setStep(0)}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" /></svg>
              Replay
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentRunConsole
