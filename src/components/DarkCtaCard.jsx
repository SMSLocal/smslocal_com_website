import { Link } from 'react-router-dom'
import './DarkCtaCard.css'

function DarkCtaCard({ title, subtitle, primaryCta, secondaryCta }) {
  let heading = title
  if (typeof title === 'string') {
    const words = title.trim().split(' ')
    const last = words.pop()
    heading = (
      <>
        {words.join(' ')} <span className="grad-word">{last}</span>
      </>
    )
  }

  return (
    <section className="dark-cta-section">
      <div className="container">
        <div className="dark-cta-card">
          <div className="dark-cta-grid" aria-hidden="true" />
          <div className="dark-cta-glow" aria-hidden="true" />
          <div className="dark-cta-content">
            <h2 className="dark-cta-title">{heading}</h2>
            <p className="dark-cta-subtitle">{subtitle}</p>
            <div className="dark-cta-actions">
              <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label} →</Link>
              {secondaryCta && (
                <Link to={secondaryCta.href} className="dark-cta-secondary">{secondaryCta.label} →</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DarkCtaCard
