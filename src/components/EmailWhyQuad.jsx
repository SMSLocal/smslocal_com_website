import './EmailWhyQuad.css'

/**
 * Bespoke "why us" for /email-api. Four reasons in a 2x2 quadrant around a faint
 * gradient cross. De-boxed, light. Grid (non-horizontal) composition.
 */
const Q = ['tl', 'tr', 'bl', 'br']

function EmailWhyQuad({ eyebrow, title, subtitle, items = [] }) {
  return (
    <section className="section section-alt ewq-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ewq">
          <span className="ewq-v" aria-hidden="true" />
          <span className="ewq-h" aria-hidden="true" />
          {items.slice(0, 4).map((r, i) => (
            <div className={`ewq-cell ewq-cell--${Q[i]}`} key={r.title}>
              <span className="ewq-ic">{r.icon}</span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailWhyQuad
