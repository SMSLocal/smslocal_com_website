import { useState } from 'react'
import './GuardrailDeskControls.css'

/**
 * "Built-in controls" for /ai-agents — real controls, live outcome.
 *
 * Left: the three guardrails as actual working inputs — a refund cap slider, a
 * segmented control for customer rights, and a switch for escalate-on-upset.
 * Right: one real ticket that re-decides itself the moment any control moves.
 *
 * The logic is genuine, not scripted: drag the cap past the ticket amount and
 * the verdict flips from held-and-escalated to refunded automatically. That is
 * a far stronger proof than a static list of policy features, because the
 * visitor can try to break it.
 *
 * No timers or autoplay — everything is driven by the visitor's input, so
 * there is nothing to get stuck mid-animation.
 */

const TICKET = {
  who: 'Megan Whitfield',
  initials: 'MW',
  order: '#48231',
  amount: 312.4,
  text: 'Order #48231 arrived damaged — I want my $312.40 back. Third time I\'m writing.',
  upset: true,
  sentiment: 0.82,
}

const RIGHTS = [
  { id: 'standard', label: 'Standard', note: '30-day returns' },
  { id: 'extended', label: 'Extended', note: '90-day returns, damage always covered' },
]

const money = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function GuardrailDeskControls({ eyebrow = 'Built-in controls', title, subtitle }) {
  const [cap, setCap] = useState(250)
  const [rights, setRights] = useState('standard')
  const [escalateUpset, setEscalateUpset] = useState(true)

  // --- the actual decision -------------------------------------------------
  const overCap = TICKET.amount > cap
  const heldByUpset = escalateUpset && TICKET.upset

  let verdict
  if (overCap) {
    verdict = {
      kind: 'held',
      tag: 'Held',
      line: `Your ${money(cap)} cap caught it. ${TICKET.who.split(' ')[0]} gets a person, not a wrong refund.`,
      reason: `$${TICKET.amount.toFixed(2)} is over the ${money(cap)} cap`,
    }
  } else if (heldByUpset) {
    verdict = {
      kind: 'escalated',
      tag: 'Escalated',
      line: `Within the cap, but they're upset — so a human takes it with the full history attached.`,
      reason: `sentiment ${TICKET.sentiment} exceeded your upset threshold`,
    }
  } else {
    verdict = {
      kind: 'auto',
      tag: 'Refunded',
      line: `Inside the ${money(cap)} cap and no escalation rule tripped — refunded and closed on its own.`,
      reason: `$${TICKET.amount.toFixed(2)} is within the ${money(cap)} cap`,
    }
  }

  const steps = [
    { k: 'Reads', v: `refund · ${TICKET.sentiment} angry`, on: true },
    { k: 'Looks up', v: `$${TICKET.amount.toFixed(2)} · damaged`, on: true },
    {
      k: overCap ? 'Holds' : 'Clears',
      v: overCap ? `over your ${money(cap)} cap` : `within your ${money(cap)} cap`,
      on: true,
      flag: overCap,
    },
    {
      k: verdict.kind === 'auto' ? 'Refunds' : 'Escalates',
      v: verdict.kind === 'auto' ? 'closed by itself' : 'to Sarah, with a recap',
      on: true,
      flag: verdict.kind !== 'auto',
    },
  ]

  return (
    <section className="gdc">
      <div className="container">
        <div className="gdc-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="gdc-split">
          {/* ---------- LEFT: the controls ---------- */}
          <div className="gdc-panel">
            <span className="gdc-panel-tag">Your policy</span>

            {/* cap slider */}
            <div className="gdc-ctrl">
              <label className="gdc-label" htmlFor="gdc-cap">
                Refund on its own up to
                <b>{money(cap)}</b>
              </label>
              <input
                id="gdc-cap"
                className="gdc-range"
                type="range"
                min="0"
                max="500"
                step="10"
                value={cap}
                onChange={(e) => setCap(Number(e.target.value))}
              />
              <span className="gdc-scale">
                <span>$0</span>
                <span className="gdc-scale-mark">this ticket · $312.40</span>
                <span>$500</span>
              </span>
            </div>

            {/* rights segmented control */}
            <div className="gdc-ctrl">
              <span className="gdc-label">Customer rights</span>
              <div className="gdc-seg" role="radiogroup" aria-label="Customer rights">
                {RIGHTS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    role="radio"
                    aria-checked={rights === r.id}
                    className={`gdc-seg-btn${rights === r.id ? ' is-on' : ''}`}
                    onClick={() => setRights(r.id)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <span className="gdc-hint">{RIGHTS.find((r) => r.id === rights).note}</span>
            </div>

            {/* escalate switch */}
            <div className="gdc-ctrl">
              <button
                type="button"
                role="switch"
                aria-checked={escalateUpset}
                className={`gdc-switch${escalateUpset ? ' is-on' : ''}`}
                onClick={() => setEscalateUpset((v) => !v)}
              >
                <span className="gdc-switch-track"><span className="gdc-switch-knob" /></span>
                <span className="gdc-switch-text">
                  Always escalate when someone is upset
                  <em>{escalateUpset ? 'on' : 'off'}</em>
                </span>
              </button>
            </div>
          </div>

          {/* ---------- RIGHT: the ticket re-deciding ---------- */}
          <div className="gdc-result">
            <div className="gdc-ticket">
              <span className="gdc-avatar">{TICKET.initials}</span>
              <span className="gdc-ticket-body">
                <strong>{TICKET.who}</strong>
                <span>&ldquo;{TICKET.text}&rdquo;</span>
              </span>
            </div>

            <ol className="gdc-steps">
              {steps.map((s) => (
                <li className={`gdc-step${s.flag ? ' is-flag' : ''}`} key={s.k}>
                  <span className="gdc-step-dot" aria-hidden="true" />
                  <span className="gdc-step-k">{s.k}</span>
                  <span className="gdc-step-v">{s.v}</span>
                </li>
              ))}
            </ol>

            <div className={`gdc-verdict gdc-verdict--${verdict.kind}`}>
              <span className="gdc-verdict-tag">{verdict.tag}</span>
              <span className="gdc-verdict-body">
                <strong>{verdict.line}</strong>
                <em>{verdict.reason}</em>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GuardrailDeskControls
