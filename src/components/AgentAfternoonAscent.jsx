import './AgentAfternoonAscent.css'

/**
 * "How it works" for /ai-agents — four level stages, then the outcome.
 *
 * The four stages of one afternoon sit side by side at the SAME height on one
 * continuous rule, each pinned by a node and stamped with its real time
 * (2:04pm → 4:47pm). Beneath them, a full-width band carries the payoff — the
 * first ticket the agent closed on its own — so the sequence resolves into a
 * result rather than a fourth equal column.
 *
 * Structurally distinct from the rest of the page (the hero orbits,
 * capabilities fans out in SVG, channels is a bento grid) and from the two
 * previous vertical-agenda attempts here. Static: no scrubber, no timers.
 */

const STAGES = [
  {
    id: 'connect',
    time: '2:04',
    ampm: 'pm',
    name: 'Connect',
    line: 'Link the tools it may touch — read-only until you say otherwise.',
    chips: ['Shopify', 'Zendesk', 'Stripe', 'Calendly'],
    stat: { v: '4', k: 'apps connected' },
  },
  {
    id: 'train',
    time: '2:31',
    ampm: 'pm',
    name: 'Train',
    line: 'Point it at content you already have. No prompts to write.',
    chips: ['returns-policy.pdf', 'support-faq.md', 'product-catalog.csv'],
    stat: { v: '1,240', k: 'chunks indexed' },
  },
  {
    id: 'dry',
    time: '3:12',
    ampm: 'pm',
    name: 'Dry run',
    line: 'Replay real past tickets and read every answer first.',
    chips: ['40 replayed', '2 guardrails tightened', '1 answer rejected'],
    stat: { v: '0', k: 'sent to customers' },
  },
  {
    id: 'live',
    time: '4:47',
    ampm: 'pm',
    name: 'Live',
    line: 'Switched on for real traffic, with the guardrails you set.',
    chips: ['real traffic', 'guardrails armed'],
    stat: { v: '90s', k: 'to first resolution' },
  },
]

const PAYOFF = {
  ask: "Where's my order?",
  call: 'shopify.orders.get(#4821)',
  out: 'out for delivery · DHL 7741 9922 3',
  reply: "It's out for delivery today, arriving before 6pm. Want a text the moment it lands?",
  verdict: 'Resolved · no human involved',
}

function AgentAfternoonAscent({ eyebrow = 'How it works', title, subtitle }) {
  return (
    <section className="aaa">
      <div className="container">
        <div className="aaa-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {/* the ascent */}
        <div className="aaa-stairs">
          {STAGES.map((s, i) => (
            <div
              className={`aaa-step aaa-step--${i}${i === STAGES.length - 1 ? ' is-live' : ''}`}
              key={s.id}
            >
              <span className="aaa-node" aria-hidden="true" />

              <span className="aaa-when">
                <span className="aaa-time">
                  {s.time}
                  <em>{s.ampm}</em>
                </span>
                <span className="aaa-num">{String(i + 1).padStart(2, '0')}</span>
              </span>

              <h3 className="aaa-name">{s.name}</h3>
              <p className="aaa-line">{s.line}</p>

              <span className="aaa-chips">
                {s.chips.map((c) => (
                  <span className="aaa-chip" key={c}>{c}</span>
                ))}
              </span>

              <span className="aaa-stat">
                <b>{s.stat.v}</b>
                {s.stat.k}
              </span>
            </div>
          ))}
        </div>

        {/* the outcome the climb produced */}
        <div className="aaa-outcome">
          <span className="aaa-outcome-tag">First ticket after go-live</span>

          <div className="aaa-outcome-flow">
            <p className="aaa-ask">{PAYOFF.ask}</p>
            <span className="aaa-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
            <p className="aaa-call">
              <code>{PAYOFF.call}</code>
              <span>{PAYOFF.out}</span>
            </p>
            <span className="aaa-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
            <p className="aaa-reply">{PAYOFF.reply}</p>
          </div>

          <span className="aaa-verdict">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
            {PAYOFF.verdict}
          </span>
        </div>
      </div>
    </section>
  )
}

export default AgentAfternoonAscent
