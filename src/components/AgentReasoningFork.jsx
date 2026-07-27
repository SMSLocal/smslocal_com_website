import { useEffect, useRef, useState } from 'react'
import './AgentReasoningFork.css'

/**
 * Hero visual for /ai-agents.
 *
 * Motif: the agent's REASONING PATH, ending in a fork. A request enters, the
 * agent walks three real steps (understand → look up live data → check policy),
 * then reaches a decision point that branches two ways — resolve autonomously,
 * or hand to a human with context. A pulse travels the path and takes whichever
 * branch that run chose, so you watch the agent decide rather than read that it
 * can.
 *
 * That fork is the page's own headline ("thinks, acts, and knows when to step
 * back") made literal, and it's a motif nothing else on the site uses — orbit
 * (AgentOrbitVisual), tool pipeline (ActionPipelineVisual), action log
 * (AgenticWorkflowMock) and agent-type cards (AgentBuilderPrompt) are all taken.
 *
 * Container-free: nodes, labels and counters float on the page background — no
 * cards, panels or chips. The fully-walked path is the CSS base state; motion is
 * a separate travelling-pulse layer on top, so it reads correctly even when
 * animation never runs.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// scene coords — 520 x 300
const STEPS = [
  { x: 96, y: 150, label: 'Understands intent', sub: '"where is my refund?"', up: true },
  { x: 208, y: 150, label: 'Looks up live data', sub: 'order #4821 · returned 14th', up: false },
  { x: 320, y: 150, label: 'Checks your policy', sub: 'refunds: 7–10 working days', up: true },
]

const FORK = { x: 396, y: 150 }
const RESOLVE = { x: 486, y: 74 }
const HUMAN = { x: 486, y: 226 }

// which branch each run takes — mostly resolved, occasionally escalated
const RUNS = [
  { branch: 'resolve', note: 'Answered from your own policy' },
  { branch: 'resolve', note: 'Refund issued, record updated' },
  { branch: 'human', note: 'Low confidence — passed to Meera' },
  { branch: 'resolve', note: 'Confirmation sent to the customer' },
]

const CYCLE = 3400

function AgentReasoningFork() {
  const [run, setRun] = useState(0)
  const t = useRef(null)

  useEffect(() => {
    if (REDUCED) return undefined
    t.current = setInterval(() => setRun((r) => (r + 1) % RUNS.length), CYCLE)
    return () => clearInterval(t.current)
  }, [])

  const current = RUNS[run]
  const toHuman = current.branch === 'human'

  const spine = `M 20 150 L ${FORK.x} ${FORK.y}`
  const armUp = `M ${FORK.x} ${FORK.y} Q ${FORK.x + 44} ${FORK.y} ${RESOLVE.x} ${RESOLVE.y}`
  const armDown = `M ${FORK.x} ${FORK.y} Q ${FORK.x + 44} ${FORK.y} ${HUMAN.x} ${HUMAN.y}`

  const pos = (p) => ({ left: `${(p.x / 520) * 100}%`, top: `${(p.y / 300) * 100}%` })

  return (
    <div
      className="arf"
      role="img"
      aria-label="An AI agent reasoning path: it understands the intent, looks up live order data, checks your refund policy, then reaches a decision point where it either resolves the request autonomously or hands it to a human with full context."
    >
      <div className="arf-scene">
        <svg className="arf-wires" viewBox="0 0 520 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="arfG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4f5bd5" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* BASE — the whole path, always drawn */}
          <g className="arf-base">
            <path d={spine} />
            <path d={armUp} />
            <path d={armDown} />
          </g>

          {/* MOTION — a pulse walking the spine, then the chosen arm */}
          {!REDUCED && (
            <g className="arf-flow" key={run}>
              <path className="arf-pulse arf-pulse--spine" d={spine} pathLength="1" />
              <path
                className={`arf-pulse arf-pulse--arm${toHuman ? ' is-human' : ''}`}
                d={toHuman ? armDown : armUp}
                pathLength="1"
              />
            </g>
          )}
        </svg>

        {/* the request entering */}
        <span className="arf-in" style={pos({ x: 20, y: 150 })}>
          <span className="arf-in-dot" aria-hidden="true" />
          <span className="arf-in-tx">Request in</span>
        </span>

        {/* reasoning steps */}
        {STEPS.map((s, i) => (
          <span
            key={s.label}
            className={`arf-step${s.up ? ' is-up' : ' is-down'}`}
            style={{ ...pos(s), '--i': i }}
          >
            <span className="arf-node" aria-hidden="true" />
            <span className="arf-step-tx">
              <strong>{s.label}</strong>
              <em>{s.sub}</em>
            </span>
          </span>
        ))}

        {/* the decision point */}
        <span className="arf-fork" style={pos(FORK)}>
          <span className="arf-fork-ring" aria-hidden="true" />
          <span className="arf-fork-core" aria-hidden="true" />
          <span className="arf-fork-tx">decides</span>
        </span>

        {/* outcome A — resolve */}
        <span className={`arf-out arf-out--resolve${toHuman ? '' : ' is-on'}`} style={pos(RESOLVE)}>
          <span className="arf-out-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
          </span>
          <span className="arf-out-tx">
            <strong>Resolves it</strong>
            <em>end to end</em>
          </span>
        </span>

        {/* outcome B — step back */}
        <span className={`arf-out arf-out--human${toHuman ? ' is-on' : ''}`} style={pos(HUMAN)}>
          <span className="arf-out-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20a8 8 0 0 1 16 0" /><circle cx="12" cy="8" r="4" /></svg>
          </span>
          <span className="arf-out-tx">
            <strong>Steps back</strong>
            <em>hands over with context</em>
          </span>
        </span>
      </div>

      {/* naked readout */}
      <p className="arf-readout">
        <span className={`arf-live${toHuman ? ' is-human' : ''}`}>{current.note}</span>
        <span className="arf-sep" aria-hidden="true" />
        <strong>78%</strong> resolved autonomously
      </p>
    </div>
  )
}

export default AgentReasoningFork
