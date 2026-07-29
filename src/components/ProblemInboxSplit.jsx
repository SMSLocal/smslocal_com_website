import './ProblemInboxSplit.css'

function ProblemInboxSplit({ eyebrow, heading, paragraph, badge, rows, alt }) {
  return (
    <section className={alt ? 'section section-alt pis-section' : 'section pis-section'}>
      <div className="container pis-inner">
        <div className="pis-inbox">
          <div className="pis-inbox-head">
            <span>Inbox</span>
            {badge && <span className="pis-inbox-badge">{badge}</span>}
          </div>
          <div className="pis-inbox-list">
            {rows.map((row, i) => (
              <div
                className={`pis-row${i === rows.length - 1 ? ' pis-row--active' : ''}`}
                key={row.title}
                style={{ '--pis-i': i }}
              >
                <span className="pis-row-dot" />
                <span className="pis-row-icon">{row.icon}</span>
                <span className="pis-row-title">{row.title}</span>
                <span className="pis-row-time">{row.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pis-copy">
          {eyebrow && <span className="section-kicker pis-kicker">{eyebrow}</span>}
          <h2 className="pis-heading">{heading}</h2>
          <p className="pis-paragraph">{paragraph}</p>
        </div>
      </div>
    </section>
  )
}

export default ProblemInboxSplit
