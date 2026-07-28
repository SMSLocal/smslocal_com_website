import './ImmersivePhoneSection.css'
import ImmersivePhoneCall from './ImmersivePhoneCall.jsx'

function ImmersivePhoneSection({ eyebrow, title, subtitle, stats, bullets, cards }) {
  return (
    <div className="ips-grid">
      <div className="ips-copy">
        {eyebrow && <span className="ips-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}

        {stats && (
          <div className="ips-stats">
            {stats.map((s) => (
              <div className="ips-stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {bullets && (
          <ul className="ips-bullets">
            {bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        )}
      </div>

      <div className="ips-visual">
        <ImmersivePhoneCall cards={cards} />
      </div>
    </div>
  )
}

export default ImmersivePhoneSection
