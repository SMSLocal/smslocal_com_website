import './PlatformFeatures.css'
import { hl } from '../utils/hl.jsx'

const CARDS = [
  {
    kicker: 'Bulk SMS',
    label: 'Mass texting',
    title: 'Send to thousands in one click',
    desc: 'Reach your whole audience instantly with bulk SMS delivered in seconds — no setup required.',
    badge: 'Most used',
  },
  {
    kicker: 'Campaigns',
    label: 'SMS marketing',
    title: 'Promotions, offers & campaigns',
    desc: 'Build, schedule, and track targeted promotional campaigns from a single dashboard.',
  },
  {
    kicker: 'Conversations',
    label: 'Two-way messaging',
    title: 'Real conversations, not blasts',
    desc: 'Let customers reply and manage every chat in one shared, real-time team inbox.',
  },
  {
    kicker: 'Audience',
    label: 'Contacts',
    title: 'Organize and segment with ease',
    desc: 'Import, group, and segment contacts so the right message reaches the right people.',
  },
  {
    kicker: 'Support',
    label: 'Helpdesk',
    title: 'Support that lives in SMS',
    desc: 'Resolve customer queries over text with ticketing and fast response tracking.',
  },
  {
    kicker: 'Analytics',
    label: 'Reporting',
    title: "Know exactly what's working",
    desc: 'Monitor delivery, clicks, and replies in real time with carrier-level analytics.',
  },
]

function PlatformFeatures() {
  return (
    <section className="section section-alt platform-features-section">
      <div className="container">
        <span className="section-kicker">Complete SMS Platform</span>
        <h2 className="section-title">{hl('Explore The Features That Make Messaging Seamless')}</h2>
        <p className="section-subtitle">
          Everything you need to reach customers — bulk sending, two-way conversations,
          automation, and analytics, all in one place with no technical setup.
        </p>

        <div className="platform-features-grid">
          {CARDS.map((c) => (
            <div className="platform-feature-card" key={c.title}>
              {c.badge && <span className="platform-feature-badge">{c.badge}</span>}
              <span className="platform-feature-kicker">{c.kicker}</span>
              <span className="platform-feature-label">{c.label}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PlatformFeatures
