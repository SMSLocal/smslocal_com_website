import './WhyUsReasonRows.css'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WhyUsReasonRows({ eyebrow, title, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wrr-section' : 'section wrr-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="wrr-panel">
          {items.map((item, i) => (
            <div
              className={item.highlighted ? 'wrr-row wrr-row--hot' : 'wrr-row'}
              key={item.title}
              style={{ '--wrr-i': i }}
            >
              {item.badge && <span className="wrr-badge">{item.badge}</span>}

              <div className="wrr-reason">
                <span className="wrr-num">Reason {String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
              </div>

              <div className="wrr-stat">
                <strong>{item.stat.value}</strong>
                <span>{item.stat.label}</span>
              </div>

              <div className="wrr-checks">
                <div className="wrr-check-list">
                  {item.checks.map((c) => (
                    <span className="wrr-check" key={c}><CheckIcon />{c}</span>
                  ))}
                </div>
                <p className="wrr-bestfor"><strong>Best for:</strong> {item.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsReasonRows
