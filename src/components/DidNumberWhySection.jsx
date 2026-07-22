import './DidNumberWhySection.css'
import DidNumberWhy from './DidNumberWhy.jsx'

/**
 * "Why virtual numbers" section for /numbers/did — a centered header above
 * one full-width "one number routes everywhere" strip, instead of the
 * left-copy / right-card two-column layout. Uses its own classnames
 * (dnws-*), not the shared narrative--stacked-section styles, since those
 * are still used by the NarrativeCompare "stacked" variant elsewhere.
 */
function DidNumberWhySection({ eyebrow, heading, paragraphs, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container dnws-inner">
        <div className="dnws-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          <h2>{heading}</h2>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <DidNumberWhy />
      </div>
    </section>
  )
}

export default DidNumberWhySection
