import { useState } from 'react'
import './CaseStudyShowcase.css'

/**
 * Bespoke "more case studies" section for /resources/case-studies.
 * An interactive showcase: pick an industry and its story is featured large —
 * headline and narrative on the left, a single big result metric on the right.
 * NOT a stacked list, NOT boxed, and one metric at a time (not a stat strip).
 */
function CaseStudyShowcase({ eyebrow, title, subtitle, items = [], alt }) {
  const [active, setActive] = useState(0)
  const study = items[active] || {}

  return (
    <section className={alt ? 'section section-alt csw-section' : 'section csw-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="csw-pills" role="tablist" aria-label="Case studies by industry">
          {items.map((s, i) => (
            <button
              key={s.tag}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={active === i ? 'csw-pill is-active' : 'csw-pill'}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              {s.tag}
            </button>
          ))}
        </div>

        <div className="csw-feature" role="tabpanel" key={study.tag}>
          <div className="csw-story">
            <span className="csw-tag">{study.tag}</span>
            <h3 className="csw-head">{study.head}</h3>
            <p className="csw-desc">{study.desc}</p>
          </div>
          <div className="csw-result">
            <span className="csw-value">{study.value}</span>
            <span className="csw-label">{study.label}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudyShowcase
