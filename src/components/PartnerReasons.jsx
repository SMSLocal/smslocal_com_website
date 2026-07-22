import './PartnerReasons.css'

/**
 * Bespoke "why partner with us" section for /services/ai-consulting.
 * Four reasons in a de-boxed 2x2, each led by a gradient icon tile, separated
 * by hairline cross-rules rather than card borders. Light.
 */
function PartnerReasons({ eyebrow, title, subtitle, items = [] }) {
  return (
    <section className="section preas-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="preas">
          {items.map((r) => (
            <div className="preas-item" key={r.title}>
              <span className="preas-icon">{r.icon}</span>
              <div className="preas-text">
                <h3 className="preas-title">{r.title}</h3>
                <p className="preas-desc">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerReasons
