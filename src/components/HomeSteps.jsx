import './HomeSteps.css'

function SignupMock() {
  return (
    <div className="step-mock">
      <span className="mock-label">Business email</span>
      <div className="mock-input">name@yourbusiness.com</div>
      <div className="mock-btn">Create free account</div>
      <span className="mock-note">✓ Trial credits included · Ready in minutes</span>
    </div>
  )
}

function ConfigureMock() {
  const rows = [
    { icon: '🟢', label: 'WhatsApp' },
    { icon: '✉️', label: 'Email' },
    { icon: '💬', label: 'SMS' },
  ]
  return (
    <div className="step-mock">
      {rows.map((r) => (
        <div className="mock-row" key={r.label}>
          <span className="mock-row-icon">{r.icon}</span>
          <span className="mock-row-label">{r.label}</span>
          <span className="mock-row-status">✓ Linked</span>
        </div>
      ))}
    </div>
  )
}

function SendMock() {
  return (
    <div className="step-mock">
      <span className="mock-label">Campaign · Diwali Sale</span>
      <div className="mock-bubble user">Can I use this code twice?</div>
      <div className="mock-bubble bot">One use per customer — enjoy 20% off! 🎉</div>
      <span className="mock-note">Broadcast to 4,820 contacts · 98% delivered</span>
    </div>
  )
}

const STEPS = [
  { number: '01', accent: 'blue', title: 'Sign up', desc: 'Create your account in minutes — no credit card required to start.', Mock: SignupMock },
  { number: '02', accent: 'cyan', title: 'Configure', desc: 'Connect a channel, import contacts, and pick a template or build your own flow.', Mock: ConfigureMock },
  { number: '03', accent: 'teal', title: 'Send', desc: 'Launch your first campaign, bot, or agent and track results in real time.', Mock: SendMock },
]

function HomeSteps() {
  return (
    <section className="section home-steps-section">
      <div className="container">
        <h2 className="section-title">Get started in three steps</h2>
        <div className="home-steps-row">
          {STEPS.map((step) => (
            <div className={`home-step-card accent-${step.accent}`} key={step.number}>
              <span className="home-step-badge">{step.number}</span>
              <span className="home-step-ghost">{step.number}</span>
              <step.Mock />
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeSteps
