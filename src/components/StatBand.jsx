import './StatBand.css'

function StatBand({ title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt stat-band' : 'section stat-band'}>
      <div className="container">
        {(title || subtitle) && (
          <div className="stat-band-header">
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
        <div className="stat-band-panel">
          {items.map((item) => (
            <div className="stat-band-col" key={item.label}>
              {item.icon && <span className="stat-band-icon">{item.icon}</span>}
              <strong className="stat-band-value">{item.value}</strong>
              <span className="stat-band-label">{item.label}</span>
              <p className="stat-band-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatBand
