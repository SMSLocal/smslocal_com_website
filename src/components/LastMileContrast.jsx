import './LastMileContrast.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke "last-mile problem" section for /services/ai-consulting.
 * A narrative lead over a two-column contrast: where projects stall (muted,
 * struck) vs how we finish (gradient checks), split by a center gap marker.
 * De-boxed, light. Distinct from the other inner sections on the page.
 */
function LastMileContrast({ eyebrow, heading, paragraphs = [], leftLabel, leftItems = [], rightLabel, rightItems = [] }) {
  return (
    <section className="section lmc-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraphs.map((p, i) => (
          <p className="section-subtitle lmc-lead" key={i}>{p}</p>
        ))}

        <div className="lmc">
          <div className="lmc-side lmc-side--stall">
            <span className="lmc-side-label">{leftLabel}</span>
            <ul className="lmc-list">
              {leftItems.map((it) => (
                <li className="lmc-item lmc-item--bad" key={it}>
                  <span className="lmc-mark" aria-hidden="true">✕</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>

          <div className="lmc-divide" aria-hidden="true">
            <span className="lmc-arrow">→</span>
          </div>

          <div className="lmc-side lmc-side--finish">
            <span className="lmc-side-label lmc-side-label--good">{rightLabel}</span>
            <ul className="lmc-list">
              {rightItems.map((it) => (
                <li className="lmc-item lmc-item--good" key={it}>
                  <span className="lmc-check" aria-hidden="true"><IconCheck /></span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LastMileContrast
