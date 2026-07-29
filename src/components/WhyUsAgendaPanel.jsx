import './WhyUsAgendaPanel.css'

const TINTS = ['blue', 'cyan', 'coral', 'teal']

function WhyUsAgendaPanel({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section wap-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wap-panel">
          {items.map((item, i) => (
            <div className={`wap-row wap-row--${TINTS[i % TINTS.length]}`} key={item.title} style={{ '--wap-i': i }}>
              <span className="wap-accent" aria-hidden="true" />
              <span className="wap-icon-wrap">
                <span className="wap-icon-ring" aria-hidden="true" />
                <span className="wap-icon">{item.icon}</span>
              </span>
              <div className="wap-row-body">
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

export default WhyUsAgendaPanel
