import './DeliverablesRows.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke "what you walk away with" section for /services/ai-consulting.
 * Three stacked full-width rows: a gradient icon tile + tag + name on the left,
 * the deliverable items as wrapped gradient-check chips on the right. A "yours
 * to keep" note closes it. De-boxed rows on hairlines, light.
 */
function DeliverablesRows({ eyebrow, title, subtitle, groups = [], note }) {
  return (
    <section className="section drows-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="drows">
          {groups.map((g) => (
            <div className="drow" key={g.name}>
              <div className="drow-head">
                <span className="drow-icon">{g.icon}</span>
                <div>
                  <span className="drow-tag">{g.tag}</span>
                  <h3 className="drow-name">{g.name}</h3>
                </div>
              </div>
              <ul className="drow-items">
                {g.items.map((it) => (
                  <li className="drow-chip" key={it}>
                    <span className="drow-check" aria-hidden="true"><IconCheck /></span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {note && (
          <p className="drows-note">
            <span className="drows-note-dot" aria-hidden="true" />
            {note}
          </p>
        )}
      </div>
    </section>
  )
}

export default DeliverablesRows
