import './StepsKeypad.css'

/**
 * "How it works" section for the Voice channel page — four steps, each
 * shown with a small realistic mockup of the actual screen for that step
 * (number picker, flow builder, agent/SIP connect, live dashboard) instead
 * of numbered nodes, a timeline, or an icon. Deliberately different from
 * the interactive tab explorer used for Capabilities on this same page.
 */

function NumberMock() {
  return (
    <div className="kpad-mock kpad-mock--number">
      <span className="kpad-mock-flag">🇺🇸</span>
      <span className="kpad-mock-number">+1 415 555 0134</span>
      <span className="kpad-mock-btn">Get number</span>
    </div>
  )
}

function FlowMock() {
  return (
    <div className="kpad-mock kpad-mock--flow">
      <span className="kpad-mock-node">Greeting</span>
      <span className="kpad-mock-arrow" />
      <span className="kpad-mock-node">Menu</span>
      <span className="kpad-mock-arrow" />
      <span className="kpad-mock-node kpad-mock-node--on">Route</span>
    </div>
  )
}

function ConnectMock() {
  return (
    <div className="kpad-mock kpad-mock--connect">
      <span className="kpad-mock-pill">Agent · Priya</span>
      <span className="kpad-mock-link" />
      <span className="kpad-mock-pill">SIP trunk</span>
    </div>
  )
}

function DashMock() {
  return (
    <div className="kpad-mock kpad-mock--dash">
      <span className="kpad-mock-stat">1,240<small>calls today</small></span>
      <span className="kpad-mock-bars">
        {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
          <i key={i} style={{ '--h': `${h}%` }} />
        ))}
      </span>
    </div>
  )
}

const MOCKS = [NumberMock, FlowMock, ConnectMock, DashMock]

function StepsKeypad({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="kpad-grid">
          {steps.map((step, i) => {
            const Mock = MOCKS[i]
            return (
              <div className="kpad-card" key={step.title}>
                {Mock && <Mock />}
                <span className="kpad-step-label">Step {i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StepsKeypad
