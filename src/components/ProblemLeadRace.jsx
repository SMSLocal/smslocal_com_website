import './ProblemLeadRace.css'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProblemLeadRace({ eyebrow, heading, paragraph, alt }) {
  return (
    <section className={alt ? 'section section-alt plr-section' : 'section plr-section'}>
      <div className="container plr-inner">
        <div className="plr-copy">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          <h2 className="plr-heading">{heading}</h2>
          <p className="plr-paragraph">{paragraph}</p>
        </div>

        <div className="plr-tracks">
          <div className="plr-track plr-track--slow">
            <div className="plr-track-head">
              <span>Manual follow-up</span>
              <span className="plr-time">4h 20m</span>
            </div>
            <div className="plr-rail">
              <span className="plr-marker" aria-hidden="true" />
            </div>
            <div className="plr-result plr-result--cold">
              <XIcon />
              Lead already messaged another agent
            </div>
          </div>

          <div className="plr-track plr-track--fast">
            <div className="plr-track-head">
              <span>Agentic AI</span>
              <span className="plr-time">&lt;1s</span>
            </div>
            <div className="plr-rail">
              <span className="plr-marker" aria-hidden="true" />
            </div>
            <div className="plr-result plr-result--booked">
              <CheckIcon />
              Qualified &amp; viewing booked instantly
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemLeadRace
