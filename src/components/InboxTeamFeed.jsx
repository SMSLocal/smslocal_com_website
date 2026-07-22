import './InboxTeamFeed.css'
import { IconRobot, IconCheck } from './icons.jsx'

const CHIPS = ['Assignment', '@mentions', 'Private notes', 'Collision detection', 'Canned replies']

const EVENTS = [
  { kind: 'av', who: 'SR', tint: 'a', text: <><b>Sara</b> assigned this conversation to you</>, tag: 'Inbound · WhatsApp', time: '2m' },
  { kind: 'av', who: 'YOU', tint: 'd', text: <>You left a <b>private note</b> · <span className="itfeed-at">@Marcus</span> can you confirm?</>, tag: 'Internal', time: '1m' },
  { kind: 'icon', icon: <IconRobot />, text: <>Bot <b>drafted a reply</b> for your review</>, tag: 'AI draft', time: '44s' },
  { kind: 'esc', text: <>Escalated to <b>Tier 2</b> — billing dispute</>, tag: 'Priority', time: '30s' },
  { kind: 'done', icon: <IconCheck />, text: <>Marked <b>resolved</b></>, tag: 'CSAT 5 / 5', time: 'now' },
]

const EscGlyph = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 15l6-6 6 6" />
    <path d="M6 9l6-6 6 6" />
  </svg>
)

function InboxTeamFeed() {
  return (
    <section className="section section-alt itfeed">
      <div className="container itfeed-inner">
        <div className="itfeed-copy reveal">
          <span className="section-kicker">Collaboration</span>
          <h2>Your team, in sync</h2>
          <p>
            Every conversation is a shared workspace. Assign it, @mention a teammate, drop a private
            note only your team can see, and let a bot draft the reply — while collision detection
            makes sure two people never answer the same customer at once.
          </p>
          <div className="itfeed-chips">
            {CHIPS.map((c) => (
              <span className="itfeed-chip" key={c}>{c}</span>
            ))}
          </div>
        </div>

        <div className="itfeed-panel reveal">
          <div className="itfeed-live">
            <span className="itfeed-live-dot" />
            Sara is viewing this too
          </div>
          <ol className="itfeed-feed">
            {EVENTS.map((e, i) => (
              <li className="itfeed-event" key={i}>
                <span className={`itfeed-node node-${e.kind}${e.tint ? ` tint-${e.tint}` : ''}`}>
                  {e.kind === 'av' ? e.who : e.kind === 'esc' ? <EscGlyph /> : e.icon}
                </span>
                <div className="itfeed-body">
                  <p className="itfeed-text">{e.text}</p>
                  <div className="itfeed-meta">
                    <span className="itfeed-tag">{e.tag}</span>
                    <time className="itfeed-time">{e.time}</time>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default InboxTeamFeed
