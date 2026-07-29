import './DeliverablesGroups.css'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DeliverablesGroups({ eyebrow, title, subtitle, groups, note }) {
  return (
    <section className="section dg-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="dg-grid">
          {groups.map((group, i) => (
            <div className="dg-card" key={group.name} style={{ '--dg-i': i }}>
              <span className="dg-icon">{group.icon}</span>
              <span className="dg-tag">{group.tag}</span>
              <h3>{group.name}</h3>
              <div className="dg-items">
                {group.items.map((item) => (
                  <div className="dg-item" key={item}>
                    <span className="dg-item-check"><CheckIcon /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {note && <p className="dg-note">{note}</p>}
      </div>
    </section>
  )
}

export default DeliverablesGroups
