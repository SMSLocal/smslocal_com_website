import './ProblemTicketOutcome.css'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProblemTicketOutcome({ eyebrow, heading, paragraphs, leftLabel, leftItems, rightLabel, rightItems, alt }) {
  return (
    <section className={alt ? 'section section-alt pto-section' : 'section pto-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="pto-heading">{heading}</h2>}
        {paragraphs && (
          <div className="pto-paragraphs">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        )}

        <div className="pto-tickets">
          <div className="pto-ticket pto-ticket--open">
            <div className="pto-ticket-head">
              <span>{leftLabel}</span>
              <span className="pto-status pto-status--open">Open <span className="pto-spinner" /></span>
            </div>
            <div className="pto-ticket-rows">
              {leftItems.map((item) => (
                <div className="pto-row pto-row--bad" key={item}>
                  <span className="pto-row-mark"><XIcon /></span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="pto-ticket pto-ticket--resolved">
            <div className="pto-ticket-head">
              <span>{rightLabel}</span>
              <span className="pto-status pto-status--resolved">Resolved <CheckIcon /></span>
            </div>
            <div className="pto-ticket-rows">
              {rightItems.map((item, i) => (
                <div className="pto-row pto-row--good" key={item} style={{ '--pto-i': i }}>
                  <span className="pto-row-mark"><CheckIcon /></span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemTicketOutcome
