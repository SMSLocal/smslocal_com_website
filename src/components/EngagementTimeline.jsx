import './EngagementTimeline.css'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EngagementTimeline({ eyebrow, title, subtitle, phases }) {
  return (
    <section className="section et-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="et-list">
          <span className="et-spine" aria-hidden="true" />
          {phases.map((phase, i) => (
            <div className={`et-row et-row--${i % 4}`} key={phase.title} style={{ '--et-i': i }}>
              <span className="et-dot" aria-hidden="true" />
              <div className="et-card">
                <div className="et-card-head">
                  <span className="et-duration">{phase.duration}</span>
                  <h3>{phase.title}</h3>
                </div>
                <p>{phase.desc}</p>
                <span className="et-exit"><CheckIcon />{phase.exit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EngagementTimeline
