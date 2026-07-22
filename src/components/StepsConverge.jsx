import './StepsConverge.css'

/**
 * Bespoke "How it works" section for the Social media inbox page.
 * A converging-lanes diagram: several channel lanes fan in from the left and
 * merge into one central line that runs through the unified-inbox, assigned
 * and replied nodes. A pulse travels down each lane into the merge (pure CSS
 * stroke-dash flow, gated behind prefers-reduced-motion). Reduced motion shows
 * the fully-drawn static merge. Distinct converging-lanes metaphor — not a
 * chevron row, timeline, ribbon or equalizer.
 */

// lane start Y positions (channels feeding in) → all merge at (330,100)
const LANES = [
  { y: 34, tint: 'var(--cyan)' },
  { y: 78, tint: 'var(--blue)' },
  { y: 122, tint: 'var(--teal)' },
  { y: 166, tint: 'var(--coral)' },
]

const lanePath = (y) => `M40 ${y} C 170 ${y} 235 100 330 100 L 912 100`

const NODES = [330, 621, 912]

function StepsConverge({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt scv-section' : 'section scv-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="scv-merge" aria-hidden="true">
          <svg className="scv-svg" viewBox="0 0 952 200" preserveAspectRatio="xMidYMid meet">
            {/* faint base lanes — the assembled state */}
            {LANES.map((l, i) => (
              <path key={`base-${i}`} className="scv-lane" d={lanePath(l.y)} />
            ))}
            {/* travelling pulses — motion only */}
            {LANES.map((l, i) => (
              <path
                key={`pulse-${i}`}
                className={`scv-pulse scv-pulse--${i}`}
                d={lanePath(l.y)}
                pathLength="100"
                style={{ stroke: l.tint }}
              />
            ))}
            {/* channel source dots on the left */}
            {LANES.map((l, i) => (
              <circle key={`src-${i}`} className="scv-src" cx="40" cy={l.y} r="5.5" style={{ fill: l.tint }} />
            ))}
            {/* merge + downstream nodes */}
            {NODES.map((x, i) => (
              <g key={`node-${i}`}>
                <circle className="scv-node-ring" cx={x} cy="100" r="12" />
                <circle className="scv-node" cx={x} cy="100" r="6" />
              </g>
            ))}
          </svg>
        </div>

        <div className="scv-steps">
          {steps.map((step, i) => (
            <div className={`scv-step scv-step--${i}`} key={step.title}>
              <span className="scv-step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsConverge
