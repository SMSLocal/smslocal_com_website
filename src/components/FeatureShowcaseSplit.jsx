import './FeatureShowcaseSplit.css'

function FeatureShowcaseSplit({ eyebrow, title, subtitle, featured, items }) {
  return (
    <section className="section fss-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fss-grid">
          <div className="fss-featured">
            <span className="fss-icon">{featured.icon}</span>
            <span className="fss-featured-label">Featured</span>
            <h3>{featured.title}</h3>
            <p>{featured.desc}</p>

            <div className="fss-panel">
              <div className="fss-panel-head">
                <span>{featured.panel.title}</span>
                <span className="fss-panel-badge">{featured.panel.badge}</span>
              </div>
              <div className="fss-panel-rows">
                {featured.panel.rows.map((row) => (
                  <div className="fss-panel-row" key={row.label}>
                    <span>{row.label}</span>
                    <strong className={row.valueTone ? `fss-panel-value fss-panel-value--${row.valueTone}` : 'fss-panel-value'}>{row.value}</strong>
                  </div>
                ))}
              </div>
              {featured.panel.footerLabel && (
                <div className="fss-panel-footer">
                  <span>{featured.panel.footerLabel}</span>
                  <span>{featured.panel.footerValue}</span>
                </div>
              )}
            </div>

            <div className="fss-channels">
              <span>Available on</span>
              <div className="fss-channel-pills">
                {featured.channels.map((c) => (
                  <span className="fss-channel-pill" key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="fss-side">
            {items.map((item) => (
              <div className="fss-card" key={item.title}>
                <span className="fss-icon fss-icon--sm">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {item.tags && (
                  <div className="fss-tags">
                    {item.tags.map((tag) => (
                      <span className="fss-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureShowcaseSplit
