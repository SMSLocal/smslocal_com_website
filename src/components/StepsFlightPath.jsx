import './StepsFlightPath.css'

/**
 * "How it works" section for the WhatsApp Broadcasting page.
 * Renders the four steps as labelled stops along a dashed, curved SVG flight
 * path. A glowing brand-gradient dot travels stop-to-stop along the curve, and
 * each stop's label column sits centered beneath its node. Base (and
 * reduced-motion) state shows the whole path assembled with the dot resting at
 * the final stop; motion only sets the dot travelling.
 */
const NODES = [
  [125, 60],
  [375, 60],
  [625, 60],
  [875, 60],
]

function StepsFlightPath({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt sfp-section' : 'section sfp-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="sfp-flow">
          <svg className="sfp-path" viewBox="0 0 1000 120" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="sfpGrad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#4f5bd5" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
              <radialGradient id="sfpGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#4f5bd5" stopOpacity="0.55" />
                <stop offset="1" stopColor="#4f5bd5" stopOpacity="0" />
              </radialGradient>
            </defs>

            <path
              className="sfp-curve"
              d="M125 60 L 875 60"
              stroke="url(#sfpGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1 9"
            />

            {NODES.map(([x, y], i) => (
              <g key={i} className="sfp-node" style={{ '--sfp-i': i }}>
                <circle cx={x} cy={y} r="11" fill="#fff" stroke="url(#sfpGrad)" strokeWidth="2.5" />
                <circle cx={x} cy={y} r="5" fill="url(#sfpGrad)" />
              </g>
            ))}

            <g className="sfp-glow" transform="translate(875 60)">
              <circle r="17" fill="url(#sfpGlow)" />
              <circle r="7" fill="url(#sfpGrad)" />
            </g>
          </svg>

          <div className="sfp-labels">
            {steps.map((step, i) => (
              <div className="sfp-label" key={step.title}>
                <span className="sfp-num">Step {i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepsFlightPath
