import './EmailBadges.css'

/**
 * Proof-point strip for /email-api — redesigned from the 2x2 icon-tile grid
 * into a single horizontal row divided by hairlines, each item a small
 * circular icon over stacked text, in the same boxless language as the
 * hero's nodes. Wraps to a 2x2 grid only on small screens.
 */
function EmailBadges({ items = [] }) {
  return (
    <section className="section ebg-section">
      <div className="container">
        <div className="ebg-strip">
          {items.map((b, i) => (
            <div className="ebg-cell" key={b.word} style={{ '--d': `${i * 0.08}s` }}>
              <span className="ebg-ic">{b.icon}</span>
              <strong className="ebg-word">{b.word}</strong>
              <span className="ebg-desc">{b.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmailBadges
