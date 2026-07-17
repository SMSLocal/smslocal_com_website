import './CapabilitiesFlow.css'
import { IconRobot } from './icons.jsx'

function CapabilitiesFlow({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section cflow-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="cflow">
          <svg className="cflow-lines" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <path className="cflow-line" d="M500 310 C 400 310, 340 200, 210 150" />
            <path className="cflow-line" d="M500 310 C 620 260, 700 200, 790 150" />
            <path className="cflow-line" d="M500 310 C 400 340, 320 420, 210 470" />
            <path className="cflow-line" d="M500 310 C 620 360, 700 420, 790 470" />
          </svg>

          <div className="cflow-hub">
            <span className="cflow-hub-ic"><IconRobot /></span>
            <span className="cflow-hub-ring" />
            <span className="cflow-hub-label">Your AI agent</span>
          </div>

          {items.map((item, i) => (
            <div className={`cflow-item cflow-item--${i}`} key={item.title}>
              <span className="cflow-icon">{item.icon}</span>
              <div className="cflow-copy">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CapabilitiesFlow
