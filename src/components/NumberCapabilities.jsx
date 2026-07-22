import './NumberCapabilities.css'

/**
 * Bespoke capabilities section for the DID / virtual numbers page.
 * A staggered two-column feature list: the right column is offset downward so
 * items interleave (masonry-style) rather than snapping into a rigid grid.
 * No cards, no boxes, no dividers. Different from the alternating reason rows,
 * the provisioning steps and the narrative compare elsewhere on the page.
 */
function NumberCapabilities({ eyebrow, title, subtitle, items }) {
  const left = items.filter((_, i) => i % 2 === 0)
  const right = items.filter((_, i) => i % 2 === 1)

  const renderItem = (item) => (
    <div className="ncap-item" key={item.title}>
      <span className="ncap-ic">{item.icon}</span>
      <h3 className="ncap-title">{item.title}</h3>
      <p className="ncap-desc">{item.desc}</p>
    </div>
  )

  return (
    <section className="section ncap-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="ncap">
          <div className="ncap-col">{left.map(renderItem)}</div>
          <div className="ncap-col ncap-col--offset">{right.map(renderItem)}</div>
        </div>
      </div>
    </section>
  )
}

export default NumberCapabilities
