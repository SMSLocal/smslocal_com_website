import './BroadcastShift.css'
import { IconCheck } from './icons.jsx'

/**
 * Bespoke "old blast vs WhatsApp broadcast" section for /channels/whatsapp-broadcasting.
 * Keeps the narrative, then shows the four pains as a 2x2 of "old -> new"
 * transformations: each muted, struck pain morphs through a gradient arrow into
 * its upgrade. NOT a boxed table, NOT stacked rows. De-boxed, light, spatial.
 */
function BroadcastShift({ heading, paragraphs = [], leftLabel, leftItems = [], rightLabel, rightItems = [] }) {
  const pairs = leftItems.map((old, i) => ({ old, next: rightItems[i] }))

  return (
    <section className="section section-alt bsh-section">
      <div className="container">
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraphs.map((p, i) => (
          <p className="section-subtitle bsh-lead" key={i}>{p}</p>
        ))}

        <div className="bsh-legend">
          <span className="bsh-legend-old"><span className="bsh-x" aria-hidden="true">✕</span> {leftLabel}</span>
          <span className="bsh-legend-new">{rightLabel} <span className="bsh-tick" aria-hidden="true"><IconCheck /></span></span>
        </div>

        <div className="bsh-grid">
          {pairs.map((p) => (
            <div className="bsh-tile" key={p.old}>
              <span className="bsh-old">{p.old}</span>
              <span className="bsh-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 4v16M12 20l6-6M12 20l-6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="bsh-new">
                <span className="bsh-new-tick" aria-hidden="true"><IconCheck /></span>
                {p.next}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BroadcastShift
