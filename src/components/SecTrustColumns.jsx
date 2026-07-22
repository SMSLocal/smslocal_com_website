import './SecTrustColumns.css'
import { IconShield, IconUsers } from './icons.jsx'

const GROUPS = [
  {
    icon: <IconShield />,
    title: 'Data protection',
    items: [
      { label: 'Encryption in transit', note: 'TLS 1.2+ on every connection' },
      { label: 'Encryption at rest', note: 'AES-256 across all stored data' },
      { label: 'Data residency options', note: 'Pin storage to the EU, US and more' },
      { label: 'Automated backups', note: 'Point-in-time recovery, tested regularly' },
    ],
  },
  {
    icon: <IconUsers />,
    title: 'Access & governance',
    items: [
      { label: 'Role-based access control', note: 'Scope every team member precisely' },
      { label: 'SSO / SAML', note: 'Okta, Azure AD, Google and more' },
      { label: 'Full audit logs', note: 'Every action, timestamped and exportable' },
      { label: 'Least-privilege API scopes', note: 'Token-level limits on what code can touch' },
    ],
  },
]

function Check() {
  return (
    <span className="sec-depth-check" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="12" height="12">
        <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function SecTrustColumns() {
  return (
    <section className="section section-alt sec-depth">
      <div className="container">
        <span className="section-kicker">Defense in depth</span>
        <h2 className="section-title">Security in <span className="grad-word">depth</span></h2>
        <p className="section-subtitle">
          Protection layered from the wire to the database to the API — each control working
          independently so no single failure exposes your customers.
        </p>

        <div className="sec-depth-cols">
          {GROUPS.map((g, gi) => (
            <div className="sec-depth-col" key={g.title}>
              <div className="sec-depth-head">
                <span className="sec-depth-head-ic">{g.icon}</span>
                <h3>{g.title}</h3>
              </div>
              <ul className="sec-depth-list">
                {g.items.map((it) => (
                  <li className="sec-depth-item" key={it.label}>
                    <Check />
                    <span className="sec-depth-text">
                      <strong>{it.label}</strong>
                      <span>{it.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
              {gi === 0 && <span className="sec-depth-divider" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SecTrustColumns
