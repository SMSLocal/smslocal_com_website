import './ChannelCatalog.css'
import { Link } from 'react-router-dom'

/**
 * Bespoke channel catalog for the /channels hub.
 * A de-boxed directory grouped into labelled categories — each category is a
 * heading with a hairline rule and a count, followed by clean icon → name →
 * one-line → arrow rows separated by dividers. No shadowed card grid. Distinct
 * from the flat ChannelDirectory (used on the omnichannel page) via the grouped
 * category structure and the two-column row grid inside each group.
 */
function ChannelCatalog({ eyebrow, title, subtitle, groups, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="chcat">
          {groups.map((group) => (
            <div className="chcat-group" key={group.label}>
              <div className="chcat-head">
                <span className="chcat-head-label">{group.label}</span>
                <span className="chcat-head-rule" aria-hidden="true" />
                <span className="chcat-head-count">{String(group.items.length).padStart(2, '0')}</span>
              </div>

              <div className="chcat-rows">
                {group.items.map((item) => (
                  <Link to={item.href} className="chcat-row" key={item.title}>
                    <span className="chcat-icon">{item.icon}</span>
                    <span className="chcat-text">
                      <span className="chcat-name">{item.title}</span>
                      <span className="chcat-desc">{item.desc}</span>
                    </span>
                    <span className="chcat-go" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChannelCatalog
