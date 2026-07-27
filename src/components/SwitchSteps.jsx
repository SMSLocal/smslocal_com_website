import './SwitchSteps.css'

const STEPS = [
  { n: '01', title: 'Connect your accounts', desc: 'Link your existing messaging API, chatbot and inbox providers — no downtime while we read your setup.' },
  { n: '02', title: 'Import contacts & history', desc: 'Contacts, opt-ins, templates and past conversations move over so nothing resets.' },
  { n: '03', title: 'Rebuild flows on SMSLocal', desc: 'Our team ports your chatbot flows, campaigns and numbers into one workspace.' },
  { n: '04', title: 'Cut over and go live', desc: 'Switch your API keys and numbers to SMSLocal, then close out the old vendor contracts.' },
]

function SwitchSteps() {
  return (
    <section className="section section-alt sws-section">
      <div className="container">
        <span className="section-kicker">Switching over</span>
        <h2 className="section-title">What actually happens when you switch</h2>
        <p className="section-subtitle">
          Most teams are fully migrated inside a week, without a gap in service.
        </p>

        <div className="sws-grid">
          {STEPS.map((s) => (
            <div className="sws-step" key={s.n}>
              <span className="sws-num">{s.n}</span>
              <h3 className="sws-title">{s.title}</h3>
              <p className="sws-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SwitchSteps
