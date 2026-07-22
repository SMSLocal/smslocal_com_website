import './GetStartedSection.css'
import { hl } from '../utils/hl.jsx'

const STEPS = [
  { title: 'Sign up free', desc: 'Account ready in 2 minutes — no credit card required.' },
  { title: 'Import your contacts', desc: 'Upload a CSV or sync your CRM in seconds.' },
  { title: 'Send your first campaign', desc: 'Upload, pick a template, and launch in seconds.' },
  { title: 'Measure & optimise', desc: 'Live delivery, clicks and carrier-level breakdown.' },
]

const MOCK_CARDS = [
  {
    title: 'Sign up free',
    lines: ['you@company.com', 'Free trial credit added'],
  },
  {
    title: 'Import your contacts',
    lines: ['CSV uploaded', 'CRM synced', 'Groups created'],
  },
  {
    title: 'Send first campaign',
    lines: ['Sending to 2,418 recipients', 'campaign launched'],
  },
  {
    title: 'Measure & optimise',
    lines: ['98.4% delivered'],
  },
]

function GetStartedSection() {
  return (
    <section className="section section-alt get-started-section">
      <div className="container get-started-inner">
        <div className="get-started-copy">
          <span className="section-kicker" style={{ margin: 0 }}>Get Started</span>
          <h2>{hl("It's Easy To Get Started")}</h2>
          <p>From sign-up to your first delivered campaign, SMSLocal gets you live in minutes — secure and fully compliant.</p>

          <ol className="get-started-list">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="get-started-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="get-started-stack">
          {MOCK_CARDS.map((c, i) => (
            <div className={`get-started-card gs-card-${i}`} key={c.title}>
              <strong>{c.title}</strong>
              {c.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GetStartedSection
