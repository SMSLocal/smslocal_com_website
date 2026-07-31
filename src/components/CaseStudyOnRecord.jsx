import './CaseStudyOnRecord.css'

/**
 * Platform-coverage ledger — the same three customers on the other parts of
 * SMSLocal they use day to day. Each row is anchored by the product area the
 * statement is about, so the section carries structure and meaning while
 * staying clearly secondary to the focal customer quote above it.
 */
function CaseStudyOnRecord({ eyebrow, title, subtitle, items, footnote, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="csor">
          {items.map((it, i) => (
            <figure className="csor-row" key={it.company}>
              <span className="csor-idx" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="csor-main">
                <span className="csor-area">{it.area}</span>
                <blockquote className="csor-quote">&ldquo;{it.quote}&rdquo;</blockquote>
                {it.note && <p className="csor-note">{it.note}</p>}
              </div>

              <figcaption className="csor-src">
                <img
                  className="csor-logo"
                  src={it.logo}
                  alt={`${it.company} logo`}
                  loading="lazy"
                  width="165"
                  height="48"
                />
                <span className="csor-who">
                  <strong>{it.company}</strong>
                  <span>{it.industry}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {footnote && <p className="csor-foot">{footnote}</p>}
      </div>
    </section>
  )
}

export default CaseStudyOnRecord
