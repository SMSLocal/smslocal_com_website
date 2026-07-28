import { useState } from 'react'
import './AnalyticsFunnel.css'
import { IconMegaphone, IconChat, IconDollar, IconBell, IconSearch, IconCheck } from './icons.jsx'

const TABS = [
  {
    key: 'marketing', icon: <IconMegaphone />, label: 'Marketing teams', color: 'blue',
    tagline: 'Campaign performance, per channel, per send.',
    challenge: 'Campaign performance is scattered across four different tools, and none of them agree.',
    solution: 'One dashboard shows delivery, opens, clicks and revenue per campaign — updated live, no exports.',
  },
  {
    key: 'support', icon: <IconChat />, label: 'Support teams', color: 'teal',
    tagline: 'Know what the bot resolved, and what needed a human.',
    challenge: 'No visibility into what the AI resolved versus what needed an agent to step in.',
    solution: 'Agent and AI performance sit side by side, with resolution time and CSAT per conversation.',
  },
  {
    key: 'finance', icon: <IconDollar />, label: 'Finance & leadership', color: 'coral',
    tagline: 'Tie every dollar spent to the revenue it drove.',
    challenge: 'Messaging spend and the revenue it drives live in two different spreadsheets.',
    solution: 'Revenue attribution ties every conversion back to the exact message, campaign and channel behind it.',
  },
  {
    key: 'ops', icon: <IconBell />, label: 'Ops teams', color: 'pink',
    tagline: 'Catch a delivery drop before customers do.',
    challenge: 'A delivery or funnel drop goes unnoticed until customers start complaining.',
    solution: 'Real-time anomaly alerts flag a delivery dip or funnel drop the moment it starts.',
  },
  {
    key: 'data', icon: <IconSearch />, label: 'Data teams', color: 'mint',
    tagline: 'One source every tool downstream can trust.',
    challenge: 'Exports from five tools never reconcile, so nobody fully trusts the numbers.',
    solution: 'One metrics API feeds your warehouse and BI tools the same numbers the dashboard shows.',
  },
]

function AnalyticsFunnel() {
  const [active, setActive] = useState(0)
  const tab = TABS[active]

  return (
    <section className="section akr-section">
      <div className="container">
        <span className="section-kicker">Built for every team</span>
        <h2 className="section-title">Five teams. One analytics layer.</h2>
        <p className="section-subtitle">Pick your team to see the problem it solves.</p>

        <div className="afn-shell">
          <div className="afn-tabs">
            <span className="afn-tabs-track" aria-hidden="true" />
            {TABS.map((t, i) => (
              <button
                type="button"
                key={t.key}
                className={`afn-tab${i === active ? ' is-active' : ''} afn-tab--${t.color}`}
                onClick={() => setActive(i)}
              >
                <span className="afn-tab-ic">{t.icon}</span>
                <span className="afn-tab-label">{t.label}</span>
              </button>
            ))}
          </div>

          <div className={`afn-panel afn-panel--${tab.color}`} key={tab.key}>
            <span className="afn-panel-watermark">{String(active + 1).padStart(2, '0')}</span>
            <span className="afn-panel-ic">{tab.icon}</span>
            <div className="afn-panel-progress">
              <span>{String(active + 1).padStart(2, '0')} / {String(TABS.length).padStart(2, '0')}</span>
              <span className="afn-dots">
                {TABS.map((t, i) => <i key={t.key} className={i === active ? 'is-active' : ''} />)}
              </span>
            </div>
            <h3>{tab.label}</h3>
            <p>{tab.tagline}</p>
          </div>

          <div className="afn-compare">
            <div className="afn-card afn-card--bad">
              <span className="afn-card-tag">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                The challenge
              </span>
              <p>{tab.challenge}</p>
            </div>

            <div className="afn-card afn-card--good">
              <span className="afn-card-tag">
                <IconCheck />
                SMSLocal solves it
              </span>
              <p>{tab.solution}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnalyticsFunnel
