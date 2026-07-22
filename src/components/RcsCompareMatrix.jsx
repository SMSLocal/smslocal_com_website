import './RcsCompareMatrix.css'

/**
 * Bespoke "RCS vs plain SMS" for /rcs-business-messaging.
 * Each feature is a slider that has moved from SMS (left, muted) all the way to
 * RCS (right, gradient) along a short gradient track. Not a table. De-boxed.
 */
function RcsCompareMatrix({ title, subtitle, rows = [] }) {
  return (
    <section className="section rcm-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="rcm">
          {rows.map((r) => (
            <div className="rcm-row" key={r.feature}>
              <span className="rcm-feature">{r.feature}</span>
              <span className="rcm-sms">{r.left}</span>
              <span className="rcm-track" aria-hidden="true">
                <span className="rcm-knob" />
              </span>
              <span className="rcm-rcs">{r.right}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RcsCompareMatrix
