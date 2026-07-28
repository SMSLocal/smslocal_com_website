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

        {caption && <span className="lud-caption">{caption}</span>}

        <div className="lub keeps-own-width">
          {meters.map((m, i) => (
            <div className={m.pct >= 50 ? 'lub-row is-used' : 'lub-row'} key={m.name} style={{ '--d': `${i * 0.09}s` }}>
              <span className="lub-name">{m.name}</span>
              <div className="lub-track">
                <span className="lub-fill" style={{ width: `${m.pct}%` }} />
              </div>
              <span className="lub-pct">{m.pct}<i>%</i></span>
              <span className="lub-status">{m.pct >= 50 ? 'In use' : 'Idle'}</span>
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
