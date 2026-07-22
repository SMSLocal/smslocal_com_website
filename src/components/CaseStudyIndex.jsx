import './CaseStudyIndex.css'

/**
 * Case-study directory — a de-boxed magazine index. Numbered full-width rows
 * on hairline dividers with a ghost numeral, industry tag, headline story and
 * an emphasised outcome metric pinned right. Structurally distinct from the
 * grouped icon-row ChannelCatalog.
 */
function CaseStudyIndex({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="csidx">
          {items.map((item, i) => (
            <div className="csidx-row" key={item.head}>
              <span className="csidx-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="csidx-main">
                <span className="csidx-tag">{item.tag}</span>
                <h3 className="csidx-head">{item.head}</h3>
                <p className="csidx-desc">{item.desc}</p>
              </div>
              <div className="csidx-metric">
                <span className="csidx-metric-val">{item.value}</span>
                <span className="csidx-metric-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudyIndex
