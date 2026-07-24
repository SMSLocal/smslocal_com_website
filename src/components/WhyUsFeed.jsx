import './WhyUsFeed.css'

/**
 * "Why us" for the social inbox page.
 * A split layout: the heading sits left-aligned in its own column (every other
 * section on this page centres its heading) beside a 2x2 bento of reasons.
 * Each tile carries a numbered rule, a tag and a gradient accent bar that
 * fills on hover.
 */

function WhyUsFeed({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt wfd-section' : 'section wfd-section'}>
      <div className="container wfd-split">
        <header className="wfd-intro">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="wfd-title">{title}</h2>}
          {subtitle && <p className="wfd-subtitle">{subtitle}</p>}
          <span className="wfd-rule" aria-hidden="true" />
          <p className="wfd-note">Instagram, Messenger, WhatsApp, Telegram, LINE, Viber and Apple Messages — one queue, one record, one reply.</p>
        </header>

        <div className="wfd-bento">
          {items.map((item, i) => (
            <article className="wfd-tile" key={item.title}>
              <span className="wfd-bar" aria-hidden="true" />
              <div className="wfd-tile-top">
                <span className="wfd-avatar" aria-hidden="true">{item.icon}</span>
                <span className="wfd-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="wfd-tile-title">{item.title}</h3>
              <p className="wfd-tile-desc">{item.desc}</p>
              {item.handle && <span className="wfd-tag">{item.handle}</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsFeed
