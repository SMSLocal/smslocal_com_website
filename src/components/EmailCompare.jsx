import './EmailCompare.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke "email-only vs combined" comparison for /email-api.
 * A de-boxed verdict matrix — the SMSLocal column wins every row (gradient wash
 * + checks); the email-only column is muted. Not a boxed table.
 */
function EmailCompare({ title, subtitle, leftLabel, rightLabel, rows = [] }) {
  return (
    <section className="section emc-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="emc">
          <div className="emc-row emc-head">
            <span className="emc-feature" />
            <span className="emc-col emc-col--old">{leftLabel}</span>
            <span className="emc-col emc-col--us">{rightLabel}</span>
          </div>
          {rows.map((r) => (
            <div className="emc-row" key={r.feature}>
              <span className="emc-feature">{r.feature}</span>
              <span className="emc-col emc-col--old">{r.left}</span>
              <span className="emc-col emc-col--us">
                <span className="emc-check" aria-hidden="true"><IconCheck /></span>{r.right}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailCompare
