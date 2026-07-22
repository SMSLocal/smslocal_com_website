import './DeliverablesManifest.css'

// Bespoke NON-CONTAINER "what you get": three open workstream columns,
// each hanging tick-pill deliverables off a faint gradient spine.
function DeliverablesManifest({ eyebrow, title, subtitle, groups, note, alt }) {
  return (
    <section className={alt ? 'section section-alt dlm-section' : 'section dlm-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="dlm-cols">
          {groups.map((g, gi) => (
            <div className={`dlm-col dlm-col--${gi}`} key={g.name}>
              <span className="dlm-spine" aria-hidden="true" />
              <span className="dlm-badge">{g.icon}</span>
              <span className="dlm-tag">{g.tag}</span>
              <h3>{g.name}</h3>
              <ul className="dlm-list">
                {g.items.map((it) => (
                  <li className="dlm-item" key={it}>
                    <span className="dlm-check" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {note && <p className="dlm-note">{note}</p>}
      </div>
    </section>
  )
}

export default DeliverablesManifest
