import './WhyConsolidateColumns.css'
import { IconPackage, IconBolt, IconReceipt, IconRocket } from './icons.jsx'

// Bespoke pillars/reasons section: four reason columns planted on one shared
// baseline. Floats on the page background - no card wraps the columns.
const REASONS = [
  {
    icon: <IconPackage />,
    kicker: 'Consolidation',
    title: 'One platform, not five tools',
    desc: 'Your messaging API, chatbot builder, campaign tool, team inbox and numbers all live on one account - nothing to stitch together or keep in sync.',
  },
  {
    icon: <IconBolt />,
    kicker: 'Simplicity',
    title: 'Simple by default',
    desc: 'One login, one set of contacts, one place to build a flow. New teammates ship on their first afternoon instead of learning five tools.',
  },
  {
    icon: <IconReceipt />,
    kicker: 'Transparency',
    title: 'One bill you can read',
    desc: 'Every channel, seat and message on a single itemised invoice - no per-vendor contracts, hidden minimums or surprise line items.',
  },
  {
    icon: <IconRocket />,
    kicker: 'Speed',
    title: 'Live in days, not months',
    desc: 'Skip the integration project between vendors. Launch an API, a campaign and a shared inbox that already talk to each other.',
  },
]

function WhyConsolidateColumns() {
  return (
    <section className="section wcc-section">
      <div className="container">
        <span className="section-kicker">Why teams switch</span>
        <h2 className="section-title">Four reasons to run on one platform</h2>
        <p className="section-subtitle">
          Consolidation is not just tidier - it is simpler to run, cheaper to read and faster to launch.
        </p>

        <div className="wcc-row">
          <span className="wcc-base" aria-hidden="true" />
          {REASONS.map((r, i) => (
            <div className="wcc-col" key={r.title} style={{ '--i': i }}>
              <span className="wcc-medal">{r.icon}</span>
              <span className="wcc-kicker">{r.kicker}</span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <span className="wcc-stem" aria-hidden="true" />
              <span className="wcc-foot" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyConsolidateColumns
