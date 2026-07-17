import './ControlDials.css'

const R = 42
const CIRC = 2 * Math.PI * R
const ARCS = [0.68, 0.54, 0.8, 0.6]

function ControlDials({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section cdial-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="cdial-row">
          {items.map((item, i) => {
            const arc = ARCS[i % ARCS.length]
            const offset = CIRC * (1 - arc)
            return (
              <div className="cdial-item" key={item.title}>
                <div className="cdial">
                  <svg viewBox="0 0 100 100" className="cdial-svg" aria-hidden="true">
                    <circle className="cdial-track" cx="50" cy="50" r={R} />
                    <circle
                      className="cdial-arc"
                      cx="50"
                      cy="50"
                      r={R}
                      strokeDasharray={CIRC}
                      strokeDashoffset={offset}
                    />
                  </svg>
                  <span className="cdial-icon">{item.icon}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ControlDials
