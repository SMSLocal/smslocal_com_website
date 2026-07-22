import './LineUsageRings.css'

/**
 * Bespoke "the opportunity" section for /line-business-messaging.
 * Usage donut rings: how much of each LINE capability actually gets used. One
 * ring (broadcast) is nearly full; the rest sit idle — showing "half the
 * platform unused" as data, not a bullet list. De-boxed, light.
 */
function LineUsageRings({ eyebrow, heading, paragraphs = [], caption, meters = [] }) {
  return (
    <section className="section lud-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraphs.map((p, i) => <p className="section-subtitle lud-lead" key={i}>{p}</p>)}

        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="ludGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--blue)" />
              <stop offset="1" stopColor="var(--cyan)" />
            </linearGradient>
          </defs>
        </svg>

        {caption && <span className="lud-caption">{caption}</span>}

        <div className="lud">
          {meters.map((m) => (
            <div className={m.pct >= 50 ? 'lud-item is-used' : 'lud-item'} key={m.name}>
              <div className="lud-ring">
                <svg viewBox="0 0 40 40">
                  <circle className="lud-track" cx="20" cy="20" r="16" />
                  <circle className="lud-prog" cx="20" cy="20" r="16" pathLength="100" style={{ strokeDasharray: `${m.pct} 100` }} />
                </svg>
                <span className="lud-pct">{m.pct}<i>%</i></span>
              </div>
              <span className="lud-name">{m.name}</span>
              <span className="lud-status">{m.pct >= 50 ? 'In use' : 'Idle'}</span>
            </div>
          ))}
        </div>

        <p className="lud-punch">
          Most accounts actively use just <strong>one</strong> of these. The rest is capability you already have — sitting idle.
        </p>
      </div>
    </section>
  )
}

export default LineUsageRings
