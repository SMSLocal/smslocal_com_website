import './FeatureCapabilityScroll.css'

function ArrowIcon() {
  return (
    <svg className="fcs-arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg className="fcs-chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeatureCapabilityScroll({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section fcs-section">
      <div className="container fcs-inner">
        <div className="fcs-sticky">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="fcs-heading">{title}</h2>}
          {subtitle && <p className="fcs-sub">{subtitle}</p>}
        </div>

        <div className="fcs-list">
          {items.map((item, i) => (
            <div className="fcs-row" key={item.title}>
              <div className="fcs-icon-col">
                <span className="fcs-icon">{item.icon}</span>
                {i < items.length - 1 && <span className="fcs-connector"><ChevronDown /></span>}
              </div>
              <div className="fcs-row-body">
                <h3>{item.title}<ArrowIcon /></h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureCapabilityScroll
