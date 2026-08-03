import { Link } from 'react-router-dom'
import './AgentRoster.css'
import { IconChat, IconMic, IconGlobe, IconBrain } from './icons.jsx'

/* Four agents on one band, split by hairlines rather than boxed into cards.
   Each carries the one number a buyer actually asks about. */
const AGENTS = [
  {
    icon: <IconChat />,
    name: 'Customer service',
    line: 'Resolves support conversations end to end, across every channel.',
    example: 'Refunds a delivered order and closes the ticket.',
    stat: '62%',
    statLabel: 'tickets resolved with no human',
    href: '/products/ai-agents/customer-service/',
  },
  {
    icon: <IconMic />,
    name: 'Voice',
    line: 'Answers the phone and handles the call on its own.',
    example: 'Takes an after-hours booking and confirms by SMS.',
    stat: '<1s',
    statLabel: 'to pick up, any hour',
    href: '/products/ai-agents/voice/',
  },
  {
    icon: <IconGlobe />,
    name: 'Sales & SDR',
    line: 'Qualifies inbound leads and books the meeting while they are still reading.',
    example: 'Checks the CRM, then offers three real calendar slots.',
    stat: '4×',
    statLabel: 'faster first response',
    href: '/products/ai-agents/sales/',
  },
  {
    icon: <IconBrain />,
    name: 'Your own',
    line: 'Build a custom agent on the same engine, no-code or in code.',
    example: 'A renewals agent that reads your billing database.',
    stat: '1 day',
    statLabel: 'from prompt to live',
    href: '/products/ai-agents/agent-builder/',
  },
]

function AgentRoster() {
  return (
    <section className="agr">
      <div className="container">
        <div className="agr-head">
          <span className="agr-kicker">Use cases</span>
          <h2 className="agr-h2">Four agents, one engine</h2>
          <p className="agr-lede">
            Same reasoning, same connections, same controls — pointed at a different job.
          </p>
        </div>

        <div className="agr-band">
          {AGENTS.map((a) => (
            <Link className="agr-col" to={a.href} key={a.name}>
              <span className="agr-ic">{a.icon}</span>
              <span className="agr-name">{a.name}</span>
              <span className="agr-line">{a.line}</span>
              <span className="agr-example">{a.example}</span>
              <span className="agr-stat">
                <b>{a.stat}</b>
                <i>{a.statLabel}</i>
              </span>
              <span className="agr-go">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AgentRoster
