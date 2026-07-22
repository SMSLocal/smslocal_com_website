import { Link } from 'react-router-dom'
import './EmailEcoHub.css'
import { IconMail } from './icons.jsx'

/**
 * Bespoke "ecosystem" for /email-api. A radial hub: email at the centre with the
 * paired channels in the corners and gradient spokes out to each. De-boxed.
 */
const POS = ['tl', 'tr', 'bl', 'br']

function EmailEcoHub({ eyebrow, title, subtitle, items = [] }) {
  return (
    <section className="section eeh-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="eeh">
          <svg className="eeh-spokes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="eehGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--blue)" />
                <stop offset="1" stopColor="var(--cyan)" />
              </linearGradient>
            </defs>
            <line x1="50" y1="50" x2="24" y2="27" />
            <line x1="50" y1="50" x2="76" y2="27" />
            <line x1="50" y1="50" x2="24" y2="73" />
            <line x1="50" y1="50" x2="76" y2="73" />
          </svg>

          {items.slice(0, 4).map((it, i) => (
            <Link className={`eeh-cell eeh-cell--${POS[i]}`} to={it.href || '/'} key={it.title}>
              <span className="eeh-ic">{it.icon}</span>
              <h3 className="eeh-title">{it.title}</h3>
              <p className="eeh-desc">{it.desc}</p>
            </Link>
          ))}

          <span className="eeh-hub">
            <span className="eeh-hub-aura" aria-hidden="true" />
            <IconMail />
            <strong>Email</strong>
          </span>
        </div>
      </div>
    </section>
  )
}

export default EmailEcoHub
