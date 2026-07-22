import './PlatformHub.css'
import { IconPackage, IconBolt, IconReceipt, IconRocket } from './icons.jsx'

/**
 * Bespoke, spatial "four reasons" section for /why-smslocal.
 * A radial hub: a central "One platform" node with the four reasons anchored in
 * the corners and gradient spokes radiating out to each. NOT a list, NOT a
 * column strip. De-boxed, light — the composition itself carries the "one
 * platform, everything around it" message.
 */
const REASONS = [
  { icon: <IconPackage />, kicker: 'Consolidation', title: 'One platform, not five tools', desc: 'Your messaging API, chatbot builder, campaign tool, team inbox and numbers all live on one account — nothing to stitch together or keep in sync.', pos: 'tl' },
  { icon: <IconBolt />, kicker: 'Simplicity', title: 'Simple by default', desc: 'One login, one set of contacts, one place to build a flow. New teammates ship on their first afternoon instead of learning five tools.', pos: 'tr' },
  { icon: <IconReceipt />, kicker: 'Transparency', title: 'One bill you can read', desc: 'Every channel, seat and message on a single itemised invoice — no per-vendor contracts, hidden minimums or surprise line items.', pos: 'bl' },
  { icon: <IconRocket />, kicker: 'Speed', title: 'Live in days, not months', desc: 'Skip the integration project between vendors. Launch an API, a campaign and a shared inbox that already talk to each other.', pos: 'br' },
]

function PlatformHub() {
  return (
    <section className="section phub-section">
      <div className="container">
        <span className="section-kicker">Why teams switch</span>
        <h2 className="section-title">Four reasons to run on one platform</h2>
        <p className="section-subtitle">
          Consolidation is not just tidier — it is simpler to run, cheaper to read and faster to launch.
        </p>

        <div className="phub">
          <svg className="phub-spokes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="phubGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--blue)" />
                <stop offset="1" stopColor="var(--cyan)" />
              </linearGradient>
            </defs>
            <line x1="50" y1="50" x2="24" y2="27" />
            <line x1="50" y1="50" x2="76" y2="27" />
            <line x1="50" y1="50" x2="24" y2="73" />
            <line x1="50" y1="50" x2="76" y2="73" />
          </svg>

          {REASONS.map((r) => (
            <div className={`phub-cell phub-cell--${r.pos}`} key={r.title}>
              <div className="phub-content">
                <span className="phub-medal">{r.icon}</span>
                <span className="phub-kicker">{r.kicker}</span>
                <h3 className="phub-title">{r.title}</h3>
                <p className="phub-desc">{r.desc}</p>
              </div>
            </div>
          ))}

          <span className="phub-hub">
            <span className="phub-hub-aura" aria-hidden="true" />
            <strong>One</strong>
            <span>platform</span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default PlatformHub
