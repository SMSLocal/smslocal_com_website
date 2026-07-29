import './ProblemStalledInbox.css'

const TIMES = ['1d', '2d', '3d', '4d']

function ProblemStalledInbox({ eyebrow, heading, paragraph, whyItems, symptomItems, alt }) {
  return (
    <section className={alt ? 'section section-alt psi-section' : 'section psi-section'}>
      <div className="container psi-inner">
        <div className="psi-inbox">
          <div className="psi-inbox-head">
            <span>Inbox</span>
            <span className="psi-stalled">6 stalled</span>
          </div>
          <div className="psi-inbox-list">
            {symptomItems.map((item, i) => (
              <div className={`psi-row${i === 0 ? ' is-active' : ''}`} key={item.label}>
                <span className="psi-row-dot" />
                <span className="psi-row-icon">{item.icon}</span>
                <span className="psi-row-label">{item.label}</span>
                <span className="psi-row-time">{TIMES[i % TIMES.length]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="psi-copy">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          <h2 className="psi-heading">{heading}</h2>
          <p className="psi-paragraph">{paragraph}</p>

          <div className="psi-why-list">
            {whyItems.map((w) => (
              <div className="psi-why-row" key={w}>
                <span className="psi-why-dot" />
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemStalledInbox
