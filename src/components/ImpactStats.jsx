import './ImpactStats.css'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const STATS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
    value: '190+',
    label: 'Countries reached',
    desc: 'Direct carrier routes across 190+ countries for reliable global delivery.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" {...stroke}>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      </svg>
    ),
    value: '99.9%',
    label: 'Uptime SLA',
    desc: 'Platform uptime, monitored continuously across every channel.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
    value: '24/7',
    label: 'Support',
    desc: 'Real engineers on call around the clock for every account.',
  },
]

function ImpactStats() {
  return (
    <section className="impact-section">
      <div className="container">
        <div className="impact-badge">
          <span className="impact-dot" />WHAT WE&rsquo;VE BUILT
        </div>
        <h2 className="impact-title">Infrastructure tuned for global messaging.</h2>
        <p className="impact-subtitle">Delivery rates, uptime and support are solved at the platform layer so your team can ship.</p>

        <div className="impact-grid">
          {STATS.map((s) => (
            <div className="impact-card" key={s.label}>
              <span className="impact-icon">{s.icon}</span>
              <strong className="impact-value">{s.value}</strong>
              <span className="impact-label">{s.label}</span>
              <p className="impact-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactStats
