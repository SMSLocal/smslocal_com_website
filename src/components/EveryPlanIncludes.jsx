import './EveryPlanIncludes.css'

// Small success check used before every included item.
function Check() {
  return (
    <span className="epi-check" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
    </span>
  )
}

// Bespoke, frameless 'every plan includes' spread: dashed-divider checklist
// columns grouped by capability area. Floats on the page — no unifying card.
function EveryPlanIncludes({ eyebrow, title, subtitle, ribbon, groups, alt }) {
  return (
    <section className={alt ? 'section section-alt epi-section' : 'section epi-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        {ribbon && (
          <div className="epi-ribbon">
            <span className="epi-ribbon-line" aria-hidden="true" />
            <span className="epi-ribbon-chip">{ribbon}</span>
            <span className="epi-ribbon-line" aria-hidden="true" />
          </div>
        )}

        <div className="epi-groups">
          {groups.map((g) => (
            <div className="epi-group" key={g.label}>
              <span className="epi-group-label">
                <span className="epi-group-ic">{g.icon}</span>
                {g.label}
              </span>
              <ul className="epi-list">
                {g.items.map((it) => (
                  <li key={it}><Check />{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EveryPlanIncludes
