import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import {
  IconMegaphone, IconChat, IconBolt, IconPhone, IconRobot, IconGlobe, IconLink, IconShield, IconMail,
  IconBrain, IconGear, IconUsers, IconChart, IconMic,
  IconNewspaper, IconBook, IconCode, IconInfo, IconHandshake, IconBriefcase, IconMenu,
} from './icons.jsx'

const CHANNELS = [
  { t: 'Bulk SMS', d: 'High-volume SMS campaigns', i: <IconMegaphone />, href: '/bulk-sms' },
  { t: 'WhatsApp Business API', d: 'Official WhatsApp messaging', i: <IconChat />, href: '/whatsapp-business-api' },
  { t: 'RCS', d: 'Rich cards & suggested replies', i: <IconBolt />, href: '/rcs-business-messaging' },
  { t: 'Viber', d: 'Reach Viber users directly', i: <IconPhone />, href: '/viber-business-messages' },
  { t: 'Telegram', d: 'Automated Telegram messaging', i: <IconRobot />, href: '/telegram-business' },
  { t: 'Instagram', d: 'DMs answered instantly', i: <IconGlobe />, href: '/instagram-messaging-api' },
  { t: 'Messenger', d: 'Facebook Messenger, 24/7', i: <IconLink />, href: '/facebook-messenger-api' },
  { t: 'Apple Messages', d: 'Native iMessage business chat', i: <IconShield />, href: '/apple-messages-for-business' },
  { t: 'LINE', d: 'Message LINE users at scale', i: <IconChat />, href: '/line-business-messaging' },
  { t: 'Email', d: 'Transactional & bulk email', i: <IconMail />, href: '/email-api' },
].map((item) => ({ ...item, highlight: true }))

const CHATBOT = [
  { t: 'Chatbot Platform', d: 'Build bots for every channel', i: <IconRobot />, href: '/chatbot' },
].map((item) => ({ ...item, highlight: true }))

const AI_AGENTS = [
  { t: 'AI Agents', d: 'AI agents for every conversation', i: <IconRobot />, href: '/ai-agents' },
  { t: 'Agentic AI', d: 'Takes action, not just answers', i: <IconBrain />, href: '/agentic-ai' },
].map((item) => ({ ...item, highlight: true }))

const PRODUCT_CATEGORIES = [
  {
    key: 'agents',
    label: 'AI Agents & Platform',
    sub: 'Agentic AI platform',
    icon: <IconBrain />,
    desc: 'One agentic platform — agents, copilot, voice, and no-code chatbots.',
    items: [...AI_AGENTS, ...CHATBOT],
    viewAllHref: '/ai-agents',
    viewAllLabel: 'View all AI Agents',
  },
  {
    key: 'channels',
    label: 'Channels & Broadcasting',
    sub: 'Messaging surfaces',
    icon: <IconGlobe />,
    desc: 'Every channel your customers use, from one number and one API.',
    items: CHANNELS,
    viewAllHref: '/channels',
    viewAllLabel: 'View all Channels',
  },
]

const RESOURCES = [
  { t: 'Blog / Articles', d: 'Guides, tips & product news', i: <IconNewspaper />, href: '/blog' },
  { t: 'Guides', d: 'Step-by-step setup guides', i: <IconBook />, href: '/resources/guides' },
  { t: 'Docs', d: 'API & developer reference', i: <IconCode />, href: '/resources/docs' },
  { t: 'Case studies', d: 'Real customer results', i: <IconChart />, href: '/resources/case-studies' },
]

const COMPANY = [
  { t: 'About', d: 'Our story & mission', i: <IconInfo />, href: '/about' },
  { t: 'Contact', d: 'Talk to our team', i: <IconPhone />, href: '/contact' },
  { t: 'Partners', d: 'Partner & reseller program', i: <IconHandshake />, href: '/partners' },
  { t: 'Careers', d: "We're hiring", i: <IconBriefcase />, href: '/careers' },
]

function ItemLink({ item, onNavigate }) {
  return (
    <Link to={item.href} onClick={onNavigate}>
      <span className="item-icon">{item.i}</span>
      <span className="item-text">
        <span className={item.highlight ? 'item-title grad-word' : 'item-title'}>{item.t}</span>
        <span className="item-desc">{item.d}</span>
      </span>
    </Link>
  )
}

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeProductCat, setActiveProductCat] = useState(PRODUCT_CATEGORIES[0].key)
  const navRef = useRef(null)
  const activeCat = PRODUCT_CATEGORIES.find((c) => c.key === activeProductCat) ?? PRODUCT_CATEGORIES[0]

  const toggleMenu = (name) => {
    setOpenMenu((current) => (current === name ? null : name))
  }

  const closeAll = () => {
    setOpenMenu(null)
    setMobileOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar-inner" onMouseLeave={() => setOpenMenu(null)}>
        <Link to="/" className="brand" onClick={closeAll}>
          <span className="brand-mark" aria-hidden="true" />
          SMSLocal
        </Link>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <IconMenu />
        </button>

        <nav className={mobileOpen ? 'nav-links open' : 'nav-links'}>
          <div
            className="nav-item has-mega"
            onMouseEnter={() => setOpenMenu('products')}
          >
            <button
              type="button"
              className="nav-trigger"
              onClick={() => toggleMenu('products')}
            >
              Products <span className="caret">▾</span>
            </button>

            {openMenu === 'products' && (
              <div className="mega-menu-wrapper">
                <div className="product-menu">
                  <div className="product-menu-nav">
                    <span className="product-menu-eyebrow">Explore</span>
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        className={cat.key === activeProductCat ? 'product-nav-item active' : 'product-nav-item'}
                        onMouseEnter={() => setActiveProductCat(cat.key)}
                        onFocus={() => setActiveProductCat(cat.key)}
                        onClick={() => setActiveProductCat(cat.key)}
                      >
                        <span className="product-nav-icon">{cat.icon}</span>
                        <span className="product-nav-text">
                          <strong>{cat.label}</strong>
                          <span>{cat.sub}</span>
                        </span>
                      </button>
                    ))}
                    <Link to={activeCat.viewAllHref} className="view-all product-menu-viewall" onClick={closeAll}>{activeCat.viewAllLabel} →</Link>
                  </div>

                  <div className="product-menu-body">
                    <span className="product-menu-eyebrow">{activeCat.label}</span>
                    <p className="product-menu-desc">{activeCat.desc}</p>
                    <div className="product-menu-grid">
                      {activeCat.items.map((item) => (
                        <Link key={item.t} to={item.href} className="product-grid-item" onClick={closeAll}>
                          <span className="item-icon">{item.i}</span>
                          <span className="item-text">
                            <span className="item-title">{item.t}</span>
                            <span className="item-desc">{item.d}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/solutions" className="nav-item-link" onClick={closeAll}>Solutions</Link>
          <Link to="/pricing" className="nav-item-link" onClick={closeAll}>Pricing</Link>

          <div
            className="nav-item has-dropdown"
            onMouseEnter={() => setOpenMenu('resources')}
          >
            <button
              type="button"
              className="nav-trigger"
              onClick={() => toggleMenu('resources')}
            >
              Resources <span className="caret">▾</span>
            </button>
            {openMenu === 'resources' && (
              <div className="dropdown-wrapper">
                <div className="dropdown dropdown--grid">
                  <ul>
                    {RESOURCES.map((item) => (
                      <li key={item.t}><ItemLink item={item} onNavigate={closeAll} /></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div
            className="nav-item has-dropdown"
            onMouseEnter={() => setOpenMenu('company')}
          >
            <button
              type="button"
              className="nav-trigger"
              onClick={() => toggleMenu('company')}
            >
              Company <span className="caret">▾</span>
            </button>
            {openMenu === 'company' && (
              <div className="dropdown-wrapper">
                <div className="dropdown">
                  <ul>
                    {COMPANY.map((item) => (
                      <li key={item.t}><ItemLink item={item} onNavigate={closeAll} /></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="nav-auth mobile-only">
            <Link to="/login" className="nav-login" onClick={closeAll}>Log in</Link>
            <Link to="/signup" className="btn btn-primary" onClick={closeAll}>Get Started</Link>
          </div>
        </nav>

        <div className="nav-auth desktop-only">
          <Link to="/login" className="nav-login" onClick={closeAll}>Log in</Link>
          <Link to="/contact" className="btn btn-primary" onClick={closeAll}>Get Started</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
