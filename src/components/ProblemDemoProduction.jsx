import './ProblemDemoProduction.css'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProblemDemoProduction({ eyebrow, headingLines, checklist, leftItems, rightItems, caption, alt }) {
  const [headerItem, ...restRight] = rightItems

  return (
    <section className={alt ? 'section section-alt pdp-section' : 'section pdp-section'}>
      <div className="container pdp-inner">
        <div className="pdp-copy">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          <h2 className="pdp-heading">
            {headingLines.map((line, i) => (
              <span className={i === 1 ? 'pdp-heading-grad' : ''} key={i}>{line}<br /></span>
            ))}
          </h2>
          <div className="pdp-checklist">
            {checklist.map((item, i) => (
              <div className="pdp-check-row" key={item} style={{ '--pdp-ci': i }}>
                <span className="pdp-check-mark"><CheckIcon /></span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="pdp-diagram">
          <div className="pdp-col pdp-col--left">
            {leftItems.map((item) => (
              <span className="pdp-pill pdp-pill--demo" key={item}>{item}</span>
            ))}
          </div>

          <span className="pdp-divider">
            <span className="pdp-divider-text">Production</span>
          </span>

          <div className="pdp-col pdp-col--right">
            <span className="pdp-pill pdp-pill--header">{headerItem}</span>
            {restRight.map((item) => (
              <span className="pdp-pill pdp-pill--prod" key={item}>{item}</span>
            ))}
          </div>
        </div>

        {caption && <p className="pdp-caption">{caption}</p>}
      </div>
    </section>
  )
}

export default ProblemDemoProduction
