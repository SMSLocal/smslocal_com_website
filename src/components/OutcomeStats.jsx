import './OutcomeStats.css'

/**
 * Bespoke outcome-stats section for /services/ai-consulting.
 * Asymmetric: the first metric is featured large on the left, the rest stack as
 * a supporting list on the right — not a flat number strip. Gradient figures,
 * de-boxed, light.
 */
function OutcomeStats({ title, subtitle, items = [] }) {
  const [lead, ...rest] = items
  return (
    <section className="section section-alt ostat-section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ostat">
          {lead && (
            <div className="ostat-lead">
              <span className="ostat-lead-value">{lead.value}</span>
              <span className="ostat-lead-label">{lead.label}</span>
              <p className="ostat-lead-desc">{lead.desc}</p>
            </div>
          )}

          <div className="ostat-rest">
            {rest.map((s) => (
              <div className="ostat-item" key={s.label}>
                <span className="ostat-value">{s.value}</span>
                <div className="ostat-text">
                  <span className="ostat-label">{s.label}</span>
                  <p className="ostat-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OutcomeStats
