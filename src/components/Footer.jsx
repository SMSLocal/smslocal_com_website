import { Link } from 'react-router-dom'
import { useFooterMeta } from '../hooks/useFooterMeta'
import BrandLogo from './BrandLogo.jsx'
import './Footer.css'

const iconProps = { viewBox: '0 0 24 24', width: 16, height: 16, fill: 'currentColor' }

const SOCIALS = [
  {
    label: 'Facebook',
    icon: (
      <svg {...iconProps}>
        <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.55.45-1 1-1z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8" cy="8.5" r="1.3" />
        <path d="M7 11h2v7H7zM11 11h2v1.2c.5-.8 1.3-1.4 2.5-1.4 2 0 3 1.3 3 3.7V18h-2v-3c0-1.2-.5-1.9-1.5-1.9s-1.5.7-1.5 1.9v3h-2z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path d="M10.5 9.8v4.4l3.8-2.2z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { t: 'Mass texting', href: '/bulk-sms' },
      { t: 'SMS marketing', href: '/promotional-sms' },
      { t: 'Two-way messaging', href: '/channels/social' },
      { t: 'API & Developers', href: '/sms-api' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { t: 'Sales & Marketing', href: '/promotional-sms' },
      { t: 'Appointment reminders', href: '/transactional-sms' },
      { t: 'School & campus', href: '/resources/case-studies' },
      { t: 'Alerts & notifications', href: '/otp-sms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { t: 'Blog', href: '/blog' },
      { t: 'Help Center', href: '/resources/docs' },
      { t: 'Pricing', href: '/pricing' },
      { t: 'Support', href: '/contact-us' },
    ],
  },
  {
    title: 'Company',
    links: [
      { t: 'About Us', href: '/about-us' },
      { t: 'Careers', href: '/careers' },
      { t: 'Contact', href: '/contact-us' },
      { t: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
]

function Footer() {
  const { active: metaOn, label: metaLabel, onProbe } = useFooterMeta()

  return (
    <footer className="site-footer">
      <span className="footer-glow" aria-hidden="true" />
      <span className="footer-dotgrid" aria-hidden="true" />

      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <BrandLogo size={32} />
              SMSLocal
            </Link>
            <p>Launch SMS campaigns, alerts, and promotions in seconds — no apps, no coding, no integration needed.</p>
            <div className="footer-social">
              {SOCIALS.map((s) => (
                <a href="#" aria-label={s.label} key={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.t}>
                    <Link to={l.href}>
                      {l.t}
                      {l.badge && <span className="footer-badge">{l.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p onClick={onProbe} className="footer-note">
            © {new Date().getFullYear()} SMSLocal. All rights reserved.
            {metaOn && <span className="footer-note-x">{' '}{metaLabel}</span>}
          </p>
          <div className="footer-legal">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/privacy-policy">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
