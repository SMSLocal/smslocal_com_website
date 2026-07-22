import './CaseStudySpotlight.css'

/**
 * Featured case-study spotlight — a de-boxed editorial story arc.
 * Left: company identity + oversized outcome metric. Right: Challenge ->
 * Approach -> Result on a dashed vertical spine, closed by a customer quote.
 * Non-container; distinct from all Steps and WhyUs layouts.
 */
function CaseStudySpotlight({ eyebrow, title, subtitle, study, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="csspot">
          <div className="csspot-id">
            <span className="csspot-tag">
              <span className="csspot-tag-dot" aria-hidden="true" />
              {study.tag}
            </span>
            <h3 className="csspot-company">{study.company}</h3>
            <p className="csspot-sector">{study.sector}</p>

            <div className="csspot-metric">
              <span className="csspot-metric-val">{study.metric.value}</span>
              <span className="csspot-metric-label">{study.metric.label}</span>
            </div>

            <div className="csspot-sub">
              {study.sub.map((s) => (
                <div className="csspot-sub-item" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="csspot-arc">
            {study.stages.map((st) => (
              <div className="csspot-stage" key={st.kicker}>
                <span className="csspot-stage-mark" aria-hidden="true" />
                <span className="csspot-stage-kicker">{st.kicker}</span>
                <h4 className="csspot-stage-head">{st.head}</h4>
                <p className="csspot-stage-body">{st.body}</p>
              </div>
            ))}

            {study.quote && (
              <blockquote className="csspot-quote">
                <p>&ldquo;{study.quote.text}&rdquo;</p>
                <cite>{study.quote.author}</cite>
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudySpotlight
