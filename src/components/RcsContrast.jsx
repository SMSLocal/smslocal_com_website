import './RcsContrast.css'

/**
 * Bespoke SMS -> RCS contrast for /rcs-business-messaging.
 * A diagonal split: Plain SMS anchored in the top-left (muted), Branded RCS in
 * the bottom-right (gradient), divided by a diagonal seam. De-boxed, spatial.
 */
function RcsContrast({ heading, paragraphs = [], leftLabel, leftItems = [], rightLabel, rightItems = [] }) {
  return (
    <section className="section section-alt rcon-section">
      <div className="container">
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraphs.map((p, i) => (
          <p className="section-subtitle rcon-lead" key={i}>{p}</p>
        ))}

        <div className="rcon-split">
          <div className="rcon-corner rcon-corner--sms">
            <span className="rcon-label">{leftLabel}</span>
            <ul>{leftItems.slice(0, 3).map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
          <div className="rcon-corner rcon-corner--rcs">
            <span className="rcon-label rcon-label--new">{rightLabel}</span>
            <ul>{rightItems.slice(0, 3).map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RcsContrast
