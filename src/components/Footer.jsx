import { Link } from 'react-router-dom'
import { useFooterMeta } from '../hooks/useFooterMeta'
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
    label: 'Pinterest',
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 17c1-3 1.5-5.5 1.5-7.2A2.2 2.2 0 0 1 13 7.6c1.6 0 2.4 1 2.4 2.5 0 1.7-1 4.3-1.6 5.3a1.6 1.6 0 0 0 1.6 2.5c2 0 3.4-2.3 3.4-5.2 0-2.7-2-4.7-5-4.7-3.6 0-5.7 2.5-5.7 5.2 0 1 .4 2.1 1 2.7" />
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
    title: 'Channels',
    links: [
      { t: 'Bulk SMS', href: '/bulk-sms' },
      { t: 'SMS API', href: '/sms-api' },
      { t: 'OTP SMS', href: '/otp-sms' },
      { t: 'Transactional SMS', href: '/transactional-sms' },
      { t: 'Promotional SMS', href: '/promotional-sms' },
      { t: 'WhatsApp Business API', href: '/whatsapp-business-api' },
      { t: 'RCS Messaging', href: '/rcs-business-messaging' },
      { t: 'Email API', href: '/email-api' },
      { t: 'All channels', href: '/channels' },
    ],
  },
  {
    title: 'Chatbot',
    links: [
      { t: 'Chatbot Platform', href: '/chatbot', badge: 'New' },
      { t: 'No-Code Builder', href: '/chatbot/builder' },
      { t: 'WhatsApp Chatbot', href: '/chatbot/whatsapp' },
      { t: 'Website Chatbot', href: '/chatbot/website' },
      { t: 'Customer Support Bot', href: '/chatbot/customer-support' },
      { t: 'Lead Generation Bot', href: '/chatbot/lead-generation' },
      { t: 'Ecommerce Chatbot', href: '/chatbot/ecommerce' },
      { t: 'Chatbot vs AI Agent', href: '/chatbot-vs-ai-agent' },
    ],
  },
  {
    title: 'AI Agents',
    links: [
      { t: 'Agentic AI Platform', href: '/agentic-ai', badge: 'New' },
      { t: 'AI Customer Service', href: '/ai-agents/customer-service' },
      { t: 'Voice AI Agent', href: '/ai-agents/voice' },
      { t: 'AI Sales / SDR', href: '/ai-agents/sales-sdr' },
      { t: 'AI Agent Builder', href: '/ai-agents/builder' },
      { t: 'WhatsApp AI Agent', href: '/ai-agents/whatsapp' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { t: 'Blog', href: '/blog' },
      { t: 'Guides', href: '/resources/guides' },
      { t: 'Developer Docs', href: '/resources/docs' },
      { t: 'Case Studies', href: '/resources/case-studies' },
      { t: 'All Products', href: '/products' },
    ],
  },
  {
    title: 'Company',
    links: [
      { t: 'About', href: '/about' },
      { t: 'Contact', href: '/contact' },
      { t: 'Partners', href: '/partners' },
      { t: 'Careers', href: '/careers' },
      { t: 'Log in', href: '/login' },
      { t: 'Get Started', href: '/signup' },
    ],
  },
]

function Footer() {
  const { active: metaOn, label: metaLabel, onProbe } = useFooterMeta()

  return (
    <footer className="site-footer">
      <div className="footer-top-bar" />

      <div className="container footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="brand-mark" aria-hidden="true" />
            SmsLocal
          </Link>
          <p>A leading provider of business messaging solutions, empowering companies worldwide with reliable SMS, chatbot and AI agent services.</p>
          <div className="footer-social">
            {SOCIALS.map((s) => (
              <a href="#" aria-label={s.label} key={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-grid">
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

      <div className="container footer-bottom">
        <p onClick={onProbe} className="footer-note">
          © {new Date().getFullYear()} SmsLocal. All rights reserved.
          {metaOn && <span className="footer-note-x">{' '}{metaLabel}</span>}
        </p>
        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms and Conditions</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
