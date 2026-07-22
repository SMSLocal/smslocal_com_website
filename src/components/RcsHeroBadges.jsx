import './RcsHeroBadges.css'

/**
 * Bespoke badge strip for /rcs-business-messaging — laid out as an EQUATION:
 * each proof badge joined by a "+", summing to the result. Not a divider row.
 * De-boxed, light.
 */
function RcsHeroBadges({ items = [] }) {
  return (
    <section className="section rhb-section">
      <div className="container">
        <div className="rhb-eq">
          {items.map((b, i) => (
            <div className="rhb-term" key={b.word}>
              <span className="rhb-plus" aria-hidden="true">{i === 0 ? '' : '+'}</span>
              <span className="rhb-icon">{b.icon}</span>
              <span className="rhb-word">{b.word}</span>
              <span className="rhb-desc">{b.desc}</span>
            </div>
          ))}
          <span className="rhb-equals" aria-hidden="true">=</span>
          <span className="rhb-result">every Android inbox, branded</span>
        </div>
      </div>
    </section>
  )
}

export default RcsHeroBadges
