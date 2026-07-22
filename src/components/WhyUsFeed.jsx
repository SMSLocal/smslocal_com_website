import './WhyUsFeed.css'

/**
 * Bespoke "Why us" section for the Social media inbox page.
 * Each reason is styled as a post in a social FEED — a small source glyph, a
 * heading, a line of copy and a subtle reaction chip (heart + count) — the
 * posts separated by thin dividers with NO unifying card frame. A tiny accent
 * alternates row to row to keep the feed lively. The heart on accent posts
 * gives a gentle beat under motion; reduced motion shows the finished feed.
 * Centred single column (max-width ~720px). Distinct from zebra / numbered /
 * agenda rows via the feed + reaction treatment.
 */

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20s-7-4.4-9.2-8.4C1.3 8.9 2.6 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.7 3.4 3.2 6.1C19 15.6 12 20 12 20z" />
  </svg>
)

const ReplyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-4A8 8 0 1 1 21 11.5z" />
  </svg>
)

function WhyUsFeed({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wfd-feed">
          {items.map((item, i) => (
            <article className={`wfd-post wfd-post--${i % 2}`} key={item.title}>
              <div className="wfd-head">
                <span className="wfd-avatar" aria-hidden="true">{item.icon}</span>
                <span className="wfd-id">
                  <strong>{item.title}</strong>
                  <span className="wfd-handle">{item.handle}</span>
                </span>
                <span className="wfd-dot" aria-hidden="true" />
              </div>

              <p className="wfd-body">{item.desc}</p>

              <div className="wfd-foot" aria-hidden="true">
                <span className="wfd-react wfd-react--heart">
                  <HeartIcon />
                  <span>{item.count}</span>
                </span>
                <span className="wfd-react">
                  <ReplyIcon />
                  <span>{item.replies}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsFeed
