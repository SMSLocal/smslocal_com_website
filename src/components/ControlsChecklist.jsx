import './ControlsChecklist.css'

function ControlsChecklist({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section cchk-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="cchk-grid">
          {items.map((item, i) => (
            <div className={`cchk-row cchk-row--${i % 4}`} key={item.title}>
              <span className="cchk-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="cchk-bullet">{item.icon}</span>
              <div className="cchk-copy">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ControlsChecklist
