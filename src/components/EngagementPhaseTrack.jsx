import './EngagementPhaseTrack.css'

// Bespoke NON-CONTAINER engagement-phases steps: an animated gradient
// "maturity meter" — a rail with a fill that grows scope -> production,
// numbered nodes riding on it, and open centred columns beneath.
function EngagementPhaseTrack({ eyebrow, title, subtitle, phases, alt }) {
  return (
    <section className={alt ? 'section section-alt ept-section' : 'section ept-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ept-track">
          <div className="ept-meter" aria-hidden="true">
            <span className="ept-rail" />
            <span className="ept-fill" />
            {phases.map((p, i) => (
              <span className={`ept-node ept-node--${i}`} key={p.title}>
                {String(i + 1).padStart(2, '0')}
              </span>
            ))}
          </div>

          <div className="ept-cols">
            {phases.map((p) => (
              <div className="ept-col" key={p.title}>
                <span className="ept-dur">{p.duration}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="ept-exit">
                  <i className="ept-exit-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                  </i>
                  {p.exit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EngagementPhaseTrack
