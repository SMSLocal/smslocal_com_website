import { useState } from 'react'
import './SwitchSteps.css'
import { IconPlug, IconCart, IconGear, IconRocket, IconCheck } from './icons.jsx'

const STEPS = [
  {
    n: '01', icon: <IconPlug />, title: 'Connect your accounts',
    desc: 'Link your existing messaging API, chatbot and inbox providers — no downtime while we read your setup.',
    moves: ['Messaging API', 'Chatbot flows', 'Inbox users'],
  },
  {
    n: '02', icon: <IconCart />, title: 'Import contacts & history',
    desc: 'Contacts, opt-ins, templates and past conversations move over so nothing resets.',
    moves: ['Contacts', 'Opt-ins', 'Templates', 'Past conversations'],
  },
  {
    n: '03', icon: <IconGear />, title: 'Rebuild flows on SMSLocal',
    desc: 'Our team ports your chatbot flows, campaigns and numbers into one workspace.',
    moves: ['Chatbot flows', 'Campaigns', 'Numbers'],
  },
  {
    n: '04', icon: <IconRocket />, title: 'Cut over and go live',
    desc: 'Switch your API keys and numbers to SMSLocal, then close out the old vendor contracts.',
    moves: ['API keys', 'Numbers', 'Old vendor contracts'],
  },
]

function SwitchSteps() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <section className="section section-alt sws-section">
      <div className="container">
        <span className="section-kicker">Switching over</span>
        <h2 className="section-title">What actually happens when you switch</h2>
        <p className="section-subtitle">
          Most teams are fully migrated inside a week, without a gap in service.
        </p>

        <div className="sws-console">
          <div className="sws-rail">
            {STEPS.map((s, i) => (
              <button
                type="button"
                key={s.n}
                className={`sws-rail-item${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="sws-rail-track" aria-hidden="true">
                  <span className="sws-rail-badge">
                    {i < active ? <IconCheck /> : s.n}
                  </span>
                  {i < STEPS.length - 1 && <span className="sws-rail-line" />}
                </span>
                <span className="sws-rail-title">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="sws-pane">
            <span className="sws-pane-glow" aria-hidden="true" />
            <div className="sws-pane-bar">
              <span className="sws-pane-dot" />
              Migration · Step {step.n} of 04
              <div className="sws-pane-progress">
                <span style={{ width: `${((active + 1) / STEPS.length) * 100}%` }} />
              </div>
            </div>
            <div className="sws-pane-body">
              <span className="sws-pane-icon">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>

              <div className="sws-migrate">
                <span className="sws-migrate-chip sws-migrate-chip--old">Old stack</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                <span className="sws-migrate-chip sws-migrate-chip--new">SMSLocal</span>
              </div>

              <span className="sws-pane-label">What moves in this step</span>
              <div className="sws-chips">
                {step.moves.map((m) => <span className="sws-chip" key={m}>{m}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SwitchSteps
