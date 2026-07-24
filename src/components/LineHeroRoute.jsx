import './LineHeroRoute.css'

/**
 * Hero visual for the LINE Business Messaging page.
 *
 * Referenced from an acepeak.com inner-page pattern: a greeting bubble at
 * the top, two dashed branch lines fanning down to tappable option cards,
 * a small live route label under each, and a "skip it, let AI handle it"
 * pill at the bottom. Re-skinned here as a LINE rich-menu tap-through
 * instead of a phone-keypad IVR.
 */

const CARDS = [
  { key: 'shop', label: 'TAP', title: '🛍️ Shop', cls: 'is-teal', route: '→ Flex catalog' },
  { key: 'support', label: 'TAP', title: '🎧 Support', cls: 'is-coral', route: 'routing…', routing: true },
  { key: 'rewards', label: 'TAP', title: '🎁 Rewards', cls: 'is-purple', route: '→ 1,240 pts' },
]

function LineHeroRoute() {
  return (
    <div className="lnr" aria-hidden="true">
      <span className="lnr-dots" />

      <div className="lnr-bubble">
        <span className="lnr-bubble-icon">💬</span>
        <span className="lnr-bubble-text">“Hi, this is SMSLocal 👋”</span>
      </div>

      <svg className="lnr-branches" viewBox="0 0 460 150" preserveAspectRatio="none">
        <path d="M 230 6 L 230 22" fill="none" stroke="url(#lnr-line)" strokeWidth="2" strokeLinecap="round" />
        <path className="lnr-branch-line" d="M 230 22 L 37 130" fill="none" stroke="url(#lnr-line)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 7" />
        <path className="lnr-branch-line" d="M 230 22 L 424 130" fill="none" stroke="url(#lnr-line)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 7" />
        <path d="M 222 14 L 230 6 L 238 14" fill="none" stroke="url(#lnr-line)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="lnr-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4f5bd5" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="lnr-cards">
        {CARDS.map((c) => (
          <div className="lnr-card-col" key={c.key}>
            <div className={`lnr-card ${c.cls}`}>
              <span className="lnr-card-label">{c.label}</span>
              <span className="lnr-card-title">{c.title}</span>
            </div>
            <span className={`lnr-route${c.routing ? ' lnr-route--live' : ''}`}>{c.route}</span>
          </div>
        ))}
      </div>

      <span className="lnr-skip">✨ or skip the menu — the chat routes itself</span>
    </div>
  )
}

export default LineHeroRoute
