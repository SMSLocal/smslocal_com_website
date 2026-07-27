import { useMemo, useState } from 'react'
import './AgentBranchGraph.css'

/**
 * Capabilities section for /ai-agents — an SVG decision graph, not a layout.
 *
 * One message enters on the left, passes through the agent core, and fans out
 * along curved branches into the five things it can conclude. Four of them are
 * resolutions the agent completes itself; the fifth peels away in amber to a
 * human. Seeing four green branches and one deliberate amber one IS the
 * headline — thinks, acts, and knows when to step back — as a picture rather
 * than a paragraph.
 *
 * Graphic-forward and text-light on purpose: the previous attempts here were
 * all text arranged in columns, which kept getting rejected. This is the same
 * language as the approved dotted-map hero — a dense SVG scene with gradient
 * strokes, glowing nodes and travelling pulses.
 *
 * Interactive: hover or focus any branch to isolate it and read its evidence.
 * Base state is the fully-drawn graph; motion only adds travelling pulses, so
 * it reads correctly even with animation off.
 */

const W = 1100
const H = 400
const IN = { x: 66, y: H / 2 }
const CORE = { x: 340, y: H / 2 }
const OUT_X = 872

const BRANCHES = [
  {
    id: 'answer',
    y: 52,
    kind: 'ok',
    label: 'Answered from your content',
    cap: 'Grounded',
    evidence: 'Refund policy v4 · only sources you approved · says so when it doesn\'t know',
  },
  {
    id: 'act',
    y: 138,
    kind: 'ok',
    label: 'Refund issued',
    cap: 'Real action',
    evidence: 'issueRefund(SL-48219, £129.00) → payment provider · resolved end to end',
  },
  {
    id: 'route',
    y: 224,
    kind: 'ok',
    label: 'Routed by intent',
    cap: 'Reads intent',
    evidence: 'contract_dispute 0.88 · sentiment −0.62 · churn risk scored and routed',
  },
  {
    id: 'log',
    y: 310,
    kind: 'ok',
    label: 'Recap logged',
    cap: 'Summarizes',
    evidence: 'One-line recap + next best action saved to the customer profile',
  },
  {
    id: 'human',
    y: 384,
    kind: 'stop',
    label: 'Handed to a human',
    cap: 'Steps back',
    evidence: 'Guardrail: may not alter contracts — escalated with full transcript',
  },
]

function AgentBranchGraph({ eyebrow = 'Capabilities', title, subtitle }) {
  const [hot, setHot] = useState(null)

  const paths = useMemo(
    () =>
      BRANCHES.map((b) => {
        const c1 = CORE.x + 150
        const c2 = OUT_X - 170
        return { ...b, d: `M ${CORE.x} ${CORE.y} C ${c1} ${CORE.y}, ${c2} ${b.y}, ${OUT_X} ${b.y}` }
      }),
    []
  )

  const active = hot ? BRANCHES.find((b) => b.id === hot) : null

  return (
    <section className="abg">
      <span className="abg-glow" aria-hidden="true" />

      <div className="container abg-inner">
        <div className="abg-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="abg-stage" onMouseLeave={() => setHot(null)}>
          <svg
            className="abg-svg"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="One message enters the agent and fans out into four resolutions it completes itself, plus one branch that escalates to a human."
          >
            <defs>
              <linearGradient id="abgOk" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4f5bd5" />
                <stop offset="1" stopColor="#0ea5a5" />
              </linearGradient>
              <linearGradient id="abgStop" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="abgFeed" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#94a3b8" />
                <stop offset="1" stopColor="#4f5bd5" />
              </linearGradient>
              <radialGradient id="abgHalo">
                <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.34" />
                <stop offset="1" stopColor="#4f5bd5" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* halo behind the core */}
            <circle cx={CORE.x} cy={CORE.y} r="132" fill="url(#abgHalo)" />

            {/* feed into the core */}
            <line
              className="abg-feed"
              x1={IN.x + 26}
              y1={IN.y}
              x2={CORE.x - 30}
              y2={CORE.y}
            />
            <line
              className="abg-feed-pulse"
              x1={IN.x + 26}
              y1={IN.y}
              x2={CORE.x - 30}
              y2={CORE.y}
              pathLength="1"
            />

            {/* the branches — base layer, always drawn */}
            {paths.map((b) => (
              <path
                key={b.id}
                className={`abg-br abg-br--${b.kind}${hot && hot !== b.id ? ' is-dim' : ''}${hot === b.id ? ' is-hot' : ''}`}
                d={b.d}
              />
            ))}

            {/* travelling pulses — motion only */}
            {paths.map((b, i) => (
              <path
                key={`p-${b.id}`}
                className={`abg-pulse abg-pulse--${b.kind}${hot && hot !== b.id ? ' is-dim' : ''}`}
                d={b.d}
                pathLength="1"
                style={{ '--d': `${i * 0.62}s` }}
              />
            ))}

            {/* the core */}
            <circle className="abg-core-ring" cx={CORE.x} cy={CORE.y} r="34" />
            <circle className="abg-core" cx={CORE.x} cy={CORE.y} r="26" />

            {/* endpoint nodes */}
            {paths.map((b) => (
              <g
                key={`n-${b.id}`}
                className={`abg-node abg-node--${b.kind}${hot && hot !== b.id ? ' is-dim' : ''}${hot === b.id ? ' is-hot' : ''}`}
              >
                <circle cx={OUT_X} cy={b.y} r="8.5" />
                <circle className="abg-node-in" cx={OUT_X} cy={b.y} r="3.4" />
              </g>
            ))}

            {/* hit areas — thick invisible strokes so hover is easy */}
            {paths.map((b) => (
              <path
                key={`h-${b.id}`}
                className="abg-hit"
                d={b.d}
                onMouseEnter={() => setHot(b.id)}
                onFocus={() => setHot(b.id)}
                tabIndex={0}
                role="button"
                aria-label={b.label}
              />
            ))}
          </svg>

          {/* labels ride on top, positioned off the SVG geometry */}
          <span className="abg-tag abg-tag--in" style={{ left: `${(IN.x / W) * 100}%`, top: `${(IN.y / H) * 100}%` }}>
            <em>Incoming</em>
            one message
          </span>

          <span className="abg-tag abg-tag--core" style={{ left: `${(CORE.x / W) * 100}%`, top: `${(CORE.y / H) * 100}%` }}>
            <em>Agent</em>
            reasons over your data
          </span>

          {BRANCHES.map((b) => (
            <button
              key={`t-${b.id}`}
              type="button"
              className={`abg-out abg-out--${b.kind}${hot && hot !== b.id ? ' is-dim' : ''}${hot === b.id ? ' is-hot' : ''}`}
              style={{ left: `${(OUT_X / W) * 100}%`, top: `${(b.y / H) * 100}%` }}
              onMouseEnter={() => setHot(b.id)}
              onFocus={() => setHot(b.id)}
            >
              <em>{b.cap}</em>
              {b.label}
            </button>
          ))}
        </div>

        {/* one readout, driven by whichever branch is hot */}
        <p className={`abg-readout${active ? ' is-on' : ''}`}>
          {active ? (
            <>
              <strong className={active.kind === 'stop' ? 'is-stop' : undefined}>{active.label}</strong>
              {active.evidence}
            </>
          ) : (
            <>
              <strong>Four branches it closes itself. One it deliberately won&apos;t.</strong>
              Hover any branch to see the evidence behind it.
            </>
          )}
        </p>
      </div>
    </section>
  )
}

export default AgentBranchGraph
