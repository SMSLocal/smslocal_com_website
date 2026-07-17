import './Integrations.css'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const TOOLS = [
  {
    name: 'Shopify',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...stroke}>
        <path d="M6 8l1-4h10l1 4M5 8h14l1 12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M9 12a3 3 0 0 0 6 0" />
      </svg>
    ),
  },
  {
    name: 'Salesforce',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...stroke}>
        <path d="M8 13a4 4 0 1 1 7.4-2.1A3.5 3.5 0 1 1 16 18H7a3 3 0 0 1-1-5.8" />
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...stroke}>
        <circle cx="7" cy="17" r="3" />
        <circle cx="17" cy="7" r="3" />
        <path d="M9 15l6-6" />
      </svg>
    ),
  },
  {
    name: 'Zapier',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...stroke}>
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: 'Slack',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...stroke}>
        <rect x="9" y="2" width="6" height="9" rx="2.5" />
        <rect x="9" y="13" width="6" height="9" rx="2.5" />
      </svg>
    ),
  },
  {
    name: 'Google Sheets',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" {...stroke}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M4 9h16M4 15h16M10 9v12" />
      </svg>
    ),
  },
]

function Integrations() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Connects with the tools you already use</h2>
        <p className="section-subtitle">Sync contacts, trigger messages from workflows, and keep every tool in step with your campaigns.</p>
        <div className="integrations-grid">
          {TOOLS.map((tool) => (
            <div className="integration-card" key={tool.name}>
              <span className="integration-icon">{tool.icon}</span>
              <span className="integration-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Integrations
