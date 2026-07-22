import './WhyUsCoverageMap.css'

/**
 * Bespoke "Why us" section for the DID / virtual numbers page.
 * A lightweight, abstract coverage motif — two dotted great-circle arcs with a
 * few pulsing location pins in the brand palette (no literal world map) — sits
 * above four centered pin-style callout cards. The pins pulse under motion only;
 * the base state is a clean, fully-rendered map band.
 */
const PIN_TINTS = ['blue', 'cyan', 'teal', 'coral']

function WhyUsCoverageMap({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wcm-section' : 'section wcm-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        {/* Abstract coverage motif */}
        <div className="wcm-motif" aria-hidden="true">
          <svg viewBox="0 0 800 200" fill="none" preserveAspectRatio="xMidYMid meet">
            <path className="wcm-arc wcm-arc--a" d="M30 150 Q 400 24 770 128" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 9" />
            <path className="wcm-arc wcm-arc--b" d="M30 84 Q 410 196 770 66" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 9" />

            <g className="wcm-pin wcm-pin--blue">
              <circle className="wcm-pin-ring" cx="150" cy="120" r="6" strokeWidth="1.6" />
              <circle className="wcm-pin-core" cx="150" cy="120" r="4" />
            </g>
            <g className="wcm-pin wcm-pin--cyan">
              <circle className="wcm-pin-ring" cx="360" cy="150" r="6" strokeWidth="1.6" />
              <circle className="wcm-pin-core" cx="360" cy="150" r="4" />
            </g>
            <g className="wcm-pin wcm-pin--teal">
              <circle className="wcm-pin-ring" cx="560" cy="96" r="6" strokeWidth="1.6" />
              <circle className="wcm-pin-core" cx="560" cy="96" r="4" />
            </g>
            <g className="wcm-pin wcm-pin--coral">
              <circle className="wcm-pin-ring" cx="690" cy="110" r="6" strokeWidth="1.6" />
              <circle className="wcm-pin-core" cx="690" cy="110" r="4" />
            </g>
          </svg>
        </div>

        {/* De-boxed coverage points — each led by a map-style pin marker in the
            matching tint, tying the callouts back to the motif above. No cards. */}
        <div className="wcm-points">
          {items.map((item, i) => (
            <div className={`wcm-point wcm-point--${PIN_TINTS[i % PIN_TINTS.length]}`} key={item.title}>
              <span className="wcm-point-pin" aria-hidden="true">
                <span className="wcm-point-ring" />
                <span className="wcm-point-core" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsCoverageMap
