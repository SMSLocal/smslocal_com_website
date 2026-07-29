import './ProblemReceiptSwap.css'

function ProblemReceiptSwap({ eyebrow, heading, paragraph, before, after, alt }) {
  return (
    <section className={alt ? 'section section-alt prs-section' : 'section prs-section'}>
      <div className="container prs-inner">
        <div className="prs-copy">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          <h2 className="prs-heading">{heading}</h2>
          <p className="prs-paragraph">{paragraph}</p>
        </div>

        <div className="prs-visual">
          <div className="prs-ticket prs-ticket--before">
            <span className="prs-ticket-title">{before.title}</span>
            <div className="prs-ticket-rows">
              {before.rows.map((row) => (
                <div className="prs-ticket-row" key={row}>
                  <span>{row}</span>
                  <span className="prs-pending">Pending</span>
                </div>
              ))}
            </div>
          </div>

          <div className="prs-arrow">
            <span className="prs-arrow-label">Automated</span>
            <svg viewBox="0 0 60 24" fill="none" aria-hidden="true">
              <path d="M2 12h50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M44 5l10 7-10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="prs-ticket prs-ticket--after">
            <span className="prs-ticket-title">{after.title}</span>
            <div className="prs-ticket-row prs-ticket-row--done">
              <span>{after.row}</span>
              <span className="prs-done-check">
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none"><path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
            <span className="prs-resolved">Resolved · {after.time}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemReceiptSwap
