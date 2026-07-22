import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import {
  IconMegaphone, IconChat, IconBolt, IconPhone, IconRobot, IconGlobe, IconLink, IconShield, IconMail,
  IconBrain, IconUsers, IconChart, IconMic, IconGear, IconCart, IconCalendar, IconDollar, IconReceipt, IconSearch,
  IconNewspaper, IconBook, IconCode, IconInfo, IconHandshake, IconBriefcase, IconMenu,
} from './icons.jsx'
import { CompareLogo } from './CompareLogo.jsx'
import BrandLogo from './BrandLogo.jsx'

// --- Product mega: three sub-divisions -----------------------------------
const CHANNELS = [
  { t: 'Bulk SMS', d: 'High-volume SMS campaigns', i: <IconMegaphone />, href: '/bulk-sms' },
  { t: 'WhatsApp Business API', d: 'Official WhatsApp messaging', i: <IconChat />, href: '/channels/whatsapp' },
  { t: 'WhatsApp Broadcasting', d: 'One broadcast, thousands of chats', i: <IconMegaphone />, href: '/channels/whatsapp-broadcasting' },
  { t: 'RCS Messaging', d: 'Rich cards & suggested replies', i: <IconBolt />, href: '/channels/rcs' },
  { t: 'RCS Broadcasting', d: 'Branded rich messages at scale', i: <IconBolt />, href: '/channels/rcs-broadcasting' },
  { t: 'Voice', d: 'IVR, routing, recording & numbers', i: <IconPhone />, href: '/channels/voice' },
  { t: 'Virtual Numbers (DID)', d: 'Local & toll-free, 100+ countries', i: <IconGlobe />, href: '/numbers/did' },
]

const SOCIAL_APPS = [
  { t: 'Social Inbox', d: 'Every social DM in one inbox', i: <IconUsers />, href: '/channels/social' },
  { t: 'Instagram', d: 'DMs answered instantly', i: <IconGlobe />, href: '/channels/instagram' },
  { t: 'Messenger', d: 'Facebook Messenger, 24/7', i: <IconLink />, href: '/channels/messenger' },
  { t: 'Viber', d: 'Reach Viber users directly', i: <IconPhone />, href: '/viber-business-messages' },
  { t: 'Telegram', d: 'Automated Telegram messaging', i: <IconRobot />, href: '/telegram-business' },
  { t: 'Apple Messages', d: 'Native iMessage business chat', i: <IconShield />, href: '/apple-messages-for-business' },
  { t: 'LINE', d: 'Message LINE users at scale', i: <IconChat />, href: '/line-business-messaging' },
  { t: 'Email', d: 'Transactional & bulk email', i: <IconMail />, href: '/email-api' },
]

const CHATBOTS = [
  { t: 'Chatbot Platform', d: 'Build bots for every channel', i: <IconRobot />, href: '/chatbot' },
  { t: 'No-Code Builder', d: 'Drag-and-drop chatbot builder', i: <IconGear />, href: '/chatbot/builder' },
  { t: 'WhatsApp Chatbot', d: '24/7 answers & lead capture', i: <IconChat />, href: '/chatbot/whatsapp' },
  { t: 'Website Chatbot', d: 'FAQs & live-agent handoff', i: <IconCode />, href: '/chatbot/website' },
  { t: 'SMS Chatbot', d: 'Two-way automated SMS', i: <IconMegaphone />, href: '/chatbot/sms' },
  { t: 'RCS Chatbot', d: 'Rich interactive chatbot', i: <IconBolt />, href: '/chatbot/rcs' },
  { t: 'Instagram Chatbot', d: 'Automate Instagram DMs', i: <IconGlobe />, href: '/chatbot/instagram-messenger' },
]

const AI_AGENTS = [
  { t: 'AI Agents', d: 'AI agents for every conversation', i: <IconRobot />, href: '/ai-agents' },
  { t: 'Agentic AI', d: 'Takes action, not just answers', i: <IconBrain />, href: '/agentic-ai' },
  { t: 'Voice AI Agent', d: 'Natural phone agent that resolves calls', i: <IconMic />, href: '/voice-ai-agents' },
  { t: 'Agent Assist', d: 'Copilot that drafts replies', i: <IconUsers />, href: '/ai-agents/agent-assist' },
  { t: 'Agent Builder', d: 'Build once, deploy everywhere', i: <IconGear />, href: '/ai-agents/agent-builder' },
  { t: 'Omnichannel Agent', d: 'One agent across every channel', i: <IconGlobe />, href: '/ai-agents/omnichannel-agent' },
  { t: 'WhatsApp AI Agent', d: 'Autonomous agent on WhatsApp', i: <IconChat />, href: '/ai-agents/whatsapp' },
]

const PRODUCT_CATEGORIES = [
  {
    key: 'channels',
    label: 'Channels & Broadcasting',
    sub: 'SMS, WhatsApp, RCS & voice',
    icon: <IconGlobe />,
    desc: 'Your core broadcasting channels, from one number and one API.',
    items: CHANNELS,
    viewAllHref: '/channels',
    viewAllLabel: 'View all Channels',
  },
  {
    key: 'social',
    label: 'Social & Apps',
    sub: 'Chat & social channels',
    icon: <IconChat />,
    desc: 'Instagram, Messenger, Viber, Telegram, Apple Messages, LINE and email.',
    items: SOCIAL_APPS,
    viewAllHref: '/channels',
    viewAllLabel: 'View all Channels',
  },
  {
    key: 'chatbots',
    label: 'Chatbots',
    sub: 'No-code chatbots',
    icon: <IconRobot />,
    desc: 'Build no-code chatbots and deploy them across every channel.',
    items: CHATBOTS,
    viewAllHref: '/chatbot',
    viewAllLabel: 'View all Chatbots',
  },
  {
    key: 'agents',
    label: 'AI Agents',
    sub: 'Agentic AI',
    icon: <IconBrain />,
    desc: 'Autonomous AI agents that connect to your tools and take action.',
    items: AI_AGENTS,
    viewAllHref: '/ai-agents',
    viewAllLabel: 'View all AI Agents',
  },
]

// --- Solutions mega: three sub-divisions ---------------------------------
const SOL_INDUSTRY = [
  { t: 'Ecommerce & Retail', d: 'Shopping, order status & returns', i: <IconCart />, href: '/ai-agents/ecommerce' },
  { t: 'Healthcare', d: 'Scheduling, reminders & patient Q&A', i: <IconCalendar />, href: '/ai-agents/healthcare' },
  { t: 'Financial Services', d: 'Auditable self-service by role', i: <IconDollar />, href: '/ai-agents/financial-services' },
  { t: 'Banking', d: 'Balances, alerts & KYC help', i: <IconReceipt />, href: '/chatbot/banking-financial-services' },
  { t: 'Travel & Hospitality', d: 'Bookings & 24/7 guest support', i: <IconGlobe />, href: '/chatbot/travel-hospitality' },
]

const SOL_TEAM = [
  { t: 'Customer Support', d: 'Deflect & resolve tickets 24/7', i: <IconChat />, href: '/ai-agents/customer-service' },
  { t: 'Sales & SDR', d: 'Research, outreach & book meetings', i: <IconBriefcase />, href: '/ai-agents/sales' },
  { t: 'Lead Qualification', d: 'Score intent & route leads', i: <IconSearch />, href: '/ai-agents/lead-qualification' },
  { t: 'Marketing & Sales', d: 'Recover carts & run promotions', i: <IconMegaphone />, href: '/chatbot/marketing-sales' },
  { t: 'Booking & Scheduling', d: 'Book against live availability', i: <IconCalendar />, href: '/ai-agents/booking' },
]

const SOL_SERVICES = [
  { t: 'AI Consulting & Onboarding', d: 'Scope, build & scale to production', i: <IconBrain />, href: '/services/ai-consulting' },
  { t: 'Talk to an Expert', d: 'Map your use case with our team', i: <IconPhone />, href: '/contact-us' },
]

const SOLUTION_CATEGORIES = [
  {
    key: 'industry',
    label: 'By industry',
    sub: 'Shaped for your sector',
    icon: <IconGlobe />,
    desc: 'Messaging, chatbots and AI agents tuned to how your industry works.',
    items: SOL_INDUSTRY,
    viewAllHref: '/solutions',
    viewAllLabel: 'All Solutions',
  },
  {
    key: 'team',
    label: 'By team / use case',
    sub: 'Shaped for the job',
    icon: <IconUsers />,
    desc: 'Start from the job to be done — support, sales, bookings and more.',
    items: SOL_TEAM,
    viewAllHref: '/solutions',
    viewAllLabel: 'All Solutions',
  },
  {
    key: 'services',
    label: 'Services',
    sub: 'Get hands-on help',
    icon: <IconBriefcase />,
    desc: 'Expert help to take an AI use case from proof of concept to production.',
    items: SOL_SERVICES,
    viewAllHref: '/services/ai-consulting',
    viewAllLabel: 'AI Consulting',
  },
]

// --- Simple dropdowns ----------------------------------------------------
const PLATFORM = [
  { t: 'Why SMSLocal', d: 'One platform, not a stitched stack', i: <IconBolt />, href: '/why-smslocal' },
  { t: 'Platform overview', d: 'One platform, every layer', i: <IconGlobe />, href: '/platform' },
  { t: 'Omnichannel inbox', d: 'One shared team inbox', i: <IconChat />, href: '/products/omnichannel-inbox' },
  { t: 'Analytics & insights', d: 'Metrics across every channel', i: <IconChart />, href: '/products/analytics' },
  { t: 'Integrations', d: 'Connect 300+ apps', i: <IconLink />, href: '/integrations' },
  { t: 'Enterprise security', d: 'SOC 2, GDPR & RBAC', i: <IconShield />, href: '/platform/security' },
]

const RESOURCES = [
  { t: 'Pricing', d: 'Plans & transparent pricing', i: <IconReceipt />, href: '/pricing' },
  { t: 'Blog / Articles', d: 'Guides, tips & product news', i: <IconNewspaper />, href: '/blog' },
  { t: 'Guides', d: 'Step-by-step setup guides', i: <IconBook />, href: '/resources/guides' },
  { t: 'Docs', d: 'API & developer reference', i: <IconCode />, href: '/resources/docs' },
  { t: 'Case studies', d: 'Real customer results', i: <IconChart />, href: '/resources/case-studies' },
]

const COMPARE = [
  { name: 'Haptik', domain: 'haptik.ai', href: '/compare/haptik', d: 'Enterprise conversational AI' },
  { name: 'Twilio', domain: 'twilio.com', href: '/compare/twilio', d: 'Developer communications APIs' },
  { name: 'Twixor', domain: 'twixor.com', href: '/compare/twixor', d: 'CX & process automation' },
  { name: 'Infobip', domain: 'infobip.com', href: '/compare/infobip', d: 'Global omnichannel CPaaS' },
]

const COMPANY = [
  { t: 'About', d: 'Our story & mission', i: <IconInfo />, href: '/about-us' },
  { t: 'Contact', d: 'Talk to our team', i: <IconPhone />, href: '/contact-us' },
  { t: 'Partners', d: 'Partner & reseller program', i: <IconHandshake />, href: '/partnerships' },
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

// Sidebar-mega shared by Products and Solutions: a category rail + a body grid.
function CategoryMega({ categories, activeKey, setActiveKey, onNavigate }) {
  const active = categories.find((c) => c.key === activeKey) ?? categories[0]
  return (
    <div className="mega-menu-wrapper">
      <div className="product-menu">
        <div className="product-menu-nav">
          <span className="product-menu-eyebrow">Explore</span>
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={cat.key === activeKey ? 'product-nav-item active' : 'product-nav-item'}
              onMouseEnter={() => setActiveKey(cat.key)}
              onFocus={() => setActiveKey(cat.key)}
              onClick={() => setActiveKey(cat.key)}
            >
              <span className="product-nav-icon">{cat.icon}</span>
              <span className="product-nav-text">
                <strong>{cat.label}</strong>
                <span>{cat.sub}</span>
              </span>
            </button>
          ))}
          <Link to={active.viewAllHref} className="view-all product-menu-viewall" onClick={onNavigate}>{active.viewAllLabel} →</Link>
        </div>

        <div className="product-menu-body">
          <span className="product-menu-eyebrow">{active.label}</span>
          <p className="product-menu-desc">{active.desc}</p>
          <div className="product-menu-grid">
            {active.items.map((item) => (
              <Link key={item.t} to={item.href} className="product-grid-item" onClick={onNavigate}>
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
  )
}

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeProductCat, setActiveProductCat] = useState(PRODUCT_CATEGORIES[0].key)
  const [activeSolutionCat, setActiveSolutionCat] = useState(SOLUTION_CATEGORIES[0].key)
  const navRef = useRef(null)

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
          <BrandLogo size={26} />
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
          {/* Products — sidebar mega with 3 sub-divisions */}
          <div className="nav-item has-mega" onMouseEnter={() => setOpenMenu('products')}>
            <button type="button" className="nav-trigger" onClick={() => toggleMenu('products')}>
              Products <span className="caret">▾</span>
            </button>
            {openMenu === 'products' && (
              <CategoryMega
                categories={PRODUCT_CATEGORIES}
                activeKey={activeProductCat}
                setActiveKey={setActiveProductCat}
                onNavigate={closeAll}
              />
            )}
          </div>

          {/* Platform — simple grid dropdown */}
          <div className="nav-item has-dropdown" onMouseEnter={() => setOpenMenu('platform')}>
            <button type="button" className="nav-trigger" onClick={() => toggleMenu('platform')}>
              Platform <span className="caret">▾</span>
            </button>
            {openMenu === 'platform' && (
              <div className="dropdown-wrapper">
                <div className="dropdown dropdown--grid">
                  <ul>
                    {PLATFORM.map((item) => (
                      <li key={item.t}><ItemLink item={item} onNavigate={closeAll} /></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Solutions — sidebar mega with 3 sub-divisions */}
          <div className="nav-item has-mega" onMouseEnter={() => setOpenMenu('solutions')}>
            <button type="button" className="nav-trigger" onClick={() => toggleMenu('solutions')}>
              Solutions <span className="caret">▾</span>
            </button>
            {openMenu === 'solutions' && (
              <CategoryMega
                categories={SOLUTION_CATEGORIES}
                activeKey={activeSolutionCat}
                setActiveKey={setActiveSolutionCat}
                onNavigate={closeAll}
              />
            )}
          </div>

          {/* Resources — two-panel flyout (now includes Pricing) */}
          <div className="nav-item has-dropdown" onMouseEnter={() => setOpenMenu('resources')}>
            <button type="button" className="nav-trigger" onClick={() => toggleMenu('resources')}>
              Resources <span className="caret">▾</span>
            </button>
            {openMenu === 'resources' && (
              <div className="dropdown-wrapper">
                <div className="dropdown resources-mega">
                  <div className="resources-mega-panel">
                    <span className="resources-mega-eyebrow">Resources</span>
                    <ul>
                      {RESOURCES.map((item) => (
                        <li key={item.t}><ItemLink item={item} onNavigate={closeAll} /></li>
                      ))}
                    </ul>
                  </div>
                  <div className="resources-mega-panel resources-mega-panel--compare">
                    <span className="resources-mega-eyebrow">Compare SMSLocal</span>
                    <ul>
                      {COMPARE.map((c) => (
                        <li key={c.name}>
                          <Link to={c.href} onClick={closeAll} className="compare-menu-link">
                            <CompareLogo name={c.name} domain={c.domain} className="compare-menu-logo" />
                            <span className="item-text">
                              <span className="item-title">SMSLocal vs {c.name}</span>
                              <span className="item-desc">{c.d}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to="/compare" className="view-all compare-menu-all" onClick={closeAll}>See all comparisons →</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Company — simple dropdown */}
          <div className="nav-item has-dropdown" onMouseEnter={() => setOpenMenu('company')}>
            <button type="button" className="nav-trigger" onClick={() => toggleMenu('company')}>
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
          <Link to="/contact-us" className="btn btn-primary" onClick={closeAll}>Get Started</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
