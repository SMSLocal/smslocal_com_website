import './EmailBadges.css'

/**
 * Bespoke hero badge cluster for /email-api. Four proof points in a compact 2x2,
 * de-boxed. Non-horizontal.
 */
function EmailBadges({ items = [] }) {
  return (
    <section className="section ebg-section">
      <div className="container">
        <div className="ebg">
          {items.map((b) => (
            <div className="ebg-item" key={b.word}>
              <span className="ebg-ic">{b.icon}</span>
              <div className="ebg-text">
                <strong>{b.word}</strong>
                <span>{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailBadges
