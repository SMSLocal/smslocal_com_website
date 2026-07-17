import './ComparisonStrip.css'
import { IconCheck } from './icons.jsx'

function ComparisonStrip({ eyebrow, heading, paragraph, pairs, alt }) {
  return (
    <section className={alt ? 'section section-alt cps-section' : 'section cps-section'}>
      <div className="container cps-inner">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraph && <p className="section-subtitle">{paragraph}</p>}

        <div className="cps-row">
          {pairs.map((pair) => (
            <div className="cps-pair" key={pair.before}>
              <span className="cps-before">{pair.before}</span>
              <span className="cps-arrow">↓</span>
              <span className="cps-after">
                <span className="cps-after-ic"><IconCheck /></span>
                {pair.after}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ComparisonStrip
