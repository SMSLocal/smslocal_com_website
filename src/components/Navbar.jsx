import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import {
  IconMegaphone, IconChat, IconBolt, IconPhone, IconRobot, IconGlobe, IconLink, IconShield,
  IconBrain, IconUsers, IconChart, IconMic, IconGear, IconCalendar, IconReceipt, IconCart, IconDollar,
  IconNewspaper, IconBook, IconCode, IconHandshake, IconBriefcase, IconMenu, IconMail,
  IconSearch, IconPlug, IconRocket, IconCursor, IconRefresh, IconPackage, IconBell, IconInfo,
} from './icons.jsx'
import BrandLogo from './BrandLogo.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { stripSlash } from '../lib/url.js'

// --- Product mega: three sub-divisions -----------------------------------
const CHANNELS = [
  { t: 'SMS Broadcasting', d: 'A2P bulk SMS at scale', i: <IconMegaphone />, href: '/products/channels/sms-broadcasting/' },
  { t: 'WhatsApp Business API', d: 'Official WhatsApp messaging', i: <IconChat />, href: '/products/channels/whatsapp/' },
  { t: 'WhatsApp Broadcasting', d: 'One broadcast, thousands of chats', i: <IconMegaphone />, href: '/products/channels/whatsapp-broadcasting/' },
  { t: 'RCS Messaging', d: 'Rich cards & suggested replies', i: <IconBolt />, href: '/products/channels/rcs/' },
  { t: 'RCS Broadcasting', d: 'Branded rich messages at scale', i: <IconBolt />, href: '/products/channels/rcs-broadcasting/' },
  { t: 'Voice', d: 'IVR, routing, recording & numbers', i: <IconPhone />, href: '/products/channels/voice/' },
  { t: 'Virtual Numbers (DID)', d: 'Local & toll-free, 100+ countries', i: <IconGlobe />, href: '/products/channels/did/' },
  { t: 'Email', d: 'Transactional & bulk email, one API', i: <IconMail />, href: '/products/channels/email/' },
]

const SOCIAL_APPS = [
  { t: 'Social Inbox', d: 'Every social DM in one inbox', i: <IconUsers />, href: '/products/social-and-apps/' },
  { t: 'Instagram', d: 'DMs answered instantly', i: <IconGlobe />, href: '/products/social-and-apps/instagram/' },
  { t: 'Messenger', d: 'Facebook Messenger, 24/7', i: <IconLink />, href: '/products/social-and-apps/messenger/' },
  { t: 'Web Chat', d: 'Customisable widget, answered by AI', i: <IconCode />, href: '/products/social-and-apps/web-chat/' },
  { t: 'Viber', d: 'Verified broadcasts & two-way chat', i: <IconChat />, href: '/products/social-and-apps/viber/' },
  { t: 'Telegram', d: 'Bots & business messaging at scale', i: <IconRobot />, href: '/products/social-and-apps/telegram/' },
  { t: 'LINE', d: 'Official Account, rich messages & menus', i: <IconMenu />, href: '/products/social-and-apps/line/' },
  { t: 'Apple Messages', d: 'Rich links, Apple Pay & reactions', i: <IconMic />, href: '/products/social-and-apps/apple-messages/' },
  { t: 'KakaoTalk', d: 'AlimTalk notices & FriendTalk broadcasts', i: <IconBolt />, href: '/products/social-and-apps/kakaotalk/' },
]

const AI_AGENTS = [
  { t: 'AI Agents', d: 'AI agents for every conversation', i: <IconRobot />, href: '/products/ai-agents/' },
  { t: 'Agentic AI', d: 'Takes action, not just answers', i: <IconBrain />, href: '/products/ai-agents/agentic-ai/' },
  { t: 'AI Support Agent', d: 'Tier-one ticket deflection', i: <IconBook />, href: '/products/ai-agents/support/' },
  { t: 'Voice AI Agent', d: 'Natural phone agent that resolves calls', i: <IconMic />, href: '/products/ai-agents/voice/' },
  { t: 'Agent Builder', d: 'Build once, deploy everywhere', i: <IconGear />, href: '/products/ai-agents/agent-builder/' },
]

// These sat in the Platform dropdown while carrying /products/ slugs. Moved to
// Products, and now under their own division like every other product page.
const PRODUCT_TOOLS = [
  { t: 'Omnichannel inbox', d: 'One shared team inbox', i: <IconChat />, href: '/products/inbox-and-analytics/omnichannel-inbox/' },
  { t: 'Agent Copilot', d: 'Drafts replies, summarises threads', i: <IconGear />, href: '/products/inbox-and-analytics/agent-copilot/' },
  { t: 'Analytics & insights', d: 'Metrics across every channel', i: <IconChart />, href: '/products/inbox-and-analytics/analytics/' },
]

// CPaaS & APIs — the developer-facing building blocks. The channel entries
// link to the existing channel pages, so each product still has one home URL.
const CPAAS_APIS = [
  { t: 'CPaaS Platform', d: 'One platform, every channel API', i: <IconPlug />, href: '/products/cpaas/' },
  { t: 'SMS API', d: 'Send, track & receive over REST', i: <IconBolt />, href: '/products/cpaas/sms-api/' },
  { t: 'Verify API', d: 'OTP & verification codes', i: <IconShield />, href: '/products/cpaas/verify-api/' },
  { t: 'Number Lookup API', d: 'Find the carrier behind a number', i: <IconSearch />, href: '/products/cpaas/lookup-api/' },
  { t: 'WhatsApp Business API', d: 'Official WhatsApp messaging', i: <IconChat />, href: '/products/channels/whatsapp/' },
  { t: 'Voice API', d: 'Calls, IVR, routing & recording', i: <IconPhone />, href: '/products/channels/voice/' },
  { t: 'Email API', d: 'Transactional & bulk, REST or SMTP', i: <IconMail />, href: '/products/channels/email/' },
  { t: 'Virtual Numbers', d: 'Local & toll-free, 100+ countries', i: <IconGlobe />, href: '/products/channels/did/' },
]

const CAMPAIGNS = [
  { t: 'Campaign Manager', d: 'Plan, send & measure campaigns', i: <IconMegaphone />, href: '/products/campaigns/campaign-manager/' },
  { t: 'Journey Builder', d: 'Automated multichannel flows', i: <IconRefresh />, href: '/products/campaigns/journey-builder/' },
  { t: 'Click-to-WhatsApp Ads', d: 'Turn ad clicks into chats', i: <IconCursor />, href: '/products/campaigns/click-to-whatsapp-ads/' },
]

export const PRODUCT_CATEGORIES = [
  {
    key: 'cpaas',
    label: 'CPaaS & APIs',
    sub: 'Build with our APIs',
    icon: <IconPlug />,
    desc: 'Messaging, voice, email and verification APIs behind one account, one key and one wallet.',
    items: CPAAS_APIS,
    viewAllHref: '/products/cpaas/',
    viewAllLabel: 'View the CPaaS Platform',
  },
  {
    key: 'agents',
    label: 'AI Agents',
    sub: 'Agentic AI',
    icon: <IconBrain />,
    desc: 'Autonomous AI agents that connect to your tools and take action.',
    items: AI_AGENTS,
    viewAllHref: '/products/ai-agents/',
    viewAllLabel: 'View all AI Agents',
  },
  {
    key: 'channels',
    label: 'Channels & Broadcasting',
    sub: 'SMS, WhatsApp, RCS & voice',
    icon: <IconGlobe />,
    desc: 'Your core broadcasting channels, from one number and one API.',
    items: CHANNELS,
    viewAllHref: '/products/channels/',
    viewAllLabel: 'View all Channels',
  },
  {
    key: 'campaigns',
    label: 'Campaigns & Journeys',
    sub: 'Engage & automate',
    icon: <IconMegaphone />,
    desc: 'Plan campaigns, automate follow-ups and turn ad clicks into conversations.',
    items: CAMPAIGNS,
    viewAllHref: '/products/campaigns/',
    viewAllLabel: 'View Campaigns & Journeys',
  },
  {
    key: 'social',
    label: 'Social & Apps',
    sub: 'Chat & social channels',
    icon: <IconChat />,
    desc: 'Instagram, Messenger and a customisable web chat widget, answered by AI.',
    items: SOCIAL_APPS,
    // Social & Apps now has its own hub (the old Social Inbox page), so the two
    // divisions no longer share /channels/ as a "view all" target.
    viewAllHref: '/products/social-and-apps/',
    viewAllLabel: 'View all Social & Apps',
  },
  {
    key: 'workspace',
    label: 'Inbox & Analytics',
    sub: 'Where your team works',
    icon: <IconChart />,
    desc: 'The shared inbox your team replies from, the copilot that drafts for them, and the reporting across every channel.',
    items: PRODUCT_TOOLS,
    viewAllHref: '/products/',
    viewAllLabel: 'View all Products',
  },
]

// --- Solutions mega: three sub-divisions ----------------------------------
const SOL_INDUSTRY = [
  { t: 'Retail & eCommerce', d: 'Orders, cart recovery & returns', i: <IconCart />, href: '/solutions/industry/retail/' },
  { t: 'Travel & Hospitality', d: 'Bookings & 24/7 guest support', i: <IconGlobe />, href: '/solutions/industry/travel-and-hospitality/' },
  { t: 'Fintech', d: 'Onboarding, alerts & auditable actions', i: <IconDollar />, href: '/solutions/industry/fintech/' },
  { t: 'Education', d: 'Admissions & student support', i: <IconBook />, href: '/solutions/industry/education/' },
  { t: 'Media & Entertainment', d: 'Ticketing & subscriber care', i: <IconMic />, href: '/solutions/industry/media-entertainment/' },
  { t: 'Healthcare', d: 'Scheduling, reminders & patient Q&A', i: <IconCalendar />, href: '/solutions/industry/healthcare/' },
  { t: 'Insurance', d: 'Quotes, claims & renewals', i: <IconShield />, href: '/solutions/industry/insurance/' },
  { t: 'Mortgage', d: 'Pre-qualification & borrower updates', i: <IconReceipt />, href: '/solutions/industry/mortgage/' },
  { t: 'Telecom', d: 'Support, billing & outage alerts', i: <IconPhone />, href: '/solutions/industry/telecom/' },
  { t: 'Real Estate', d: 'Leads, listings & viewings', i: <IconHandshake />, href: '/solutions/industry/real-estate/' },
]

const SOL_USE_CASE = [
  { t: 'OTP & Authentication', d: 'Passcodes that arrive in time', i: <IconShield />, href: '/solutions/use-case/otp-authentication/' },
  { t: 'Transactional Alerts', d: 'Orders, shipping & account notices', i: <IconBell />, href: '/solutions/use-case/transactional-alerts/' },
  { t: 'Promotions & Campaigns', d: 'Offers that reach and convert', i: <IconMegaphone />, href: '/solutions/use-case/promotions-campaigns/' },
  { t: 'Payment Collection', d: 'Turn reminders into payments', i: <IconDollar />, href: '/solutions/use-case/payment-collection/' },
  { t: 'Conversational Commerce', d: 'Turn conversations into orders', i: <IconCart />, href: '/solutions/use-case/conversational-commerce/' },
  { t: 'Appointment Reminders', d: 'Fewer no-shows, fuller calendars', i: <IconCalendar />, href: '/solutions/use-case/appointment-reminders/' },
]

// Team/use-case and Services share one category — Services was a single link,
// too thin to hold its own rail entry.
const SOL_TEAM = [
  { t: 'Customer Support', d: 'Deflect & resolve tickets 24/7', i: <IconChat />, href: '/products/ai-agents/customer-service/' },
  { t: 'Sales & SDR', d: 'Research, outreach & book meetings', i: <IconBriefcase />, href: '/products/ai-agents/sales/' },
  { t: 'Booking & Scheduling', d: 'Book against live availability', i: <IconCalendar />, href: '/products/ai-agents/booking/' },
  { t: 'AI Consulting & Onboarding', d: 'Scope, build & scale to production', i: <IconBrain />, href: '/solutions/services/ai-consulting/' },
]

export const SOLUTION_CATEGORIES = [
  {
    key: 'industry',
    label: 'By industry',
    sub: 'Shaped for your sector',
    icon: <IconGlobe />,
    desc: 'Messaging, AI agents and broadcasting tuned to how your industry works.',
    items: SOL_INDUSTRY,
    viewAllHref: '/solutions/',
    viewAllLabel: 'All Solutions',
  },
  {
    key: 'usecase',
    label: 'By use case',
    sub: 'Start from the job',
    icon: <IconBolt />,
    desc: 'The messages every business sends, set up end to end.',
    items: SOL_USE_CASE,
    viewAllHref: '/solutions/',
    viewAllLabel: 'All Solutions',
  },
  {
    key: 'team',
    label: 'By team & services',
    sub: 'Shaped for the job',
    icon: <IconUsers />,
    desc: 'Start from the job to be done — support, sales, bookings — or get hands-on help taking an AI use case to production.',
    items: SOL_TEAM,
    viewAllHref: '/solutions/',
    viewAllLabel: 'All Solutions',
  },
]

// --- Simple dropdowns ----------------------------------------------------
// Platform-level pages only. The /products/* entries that used to sit here moved
// to the Products mega (PRODUCT_TOOLS), so each menu now matches its URL prefix.
export const PLATFORM = [
  { t: 'Why SMSLocal', d: 'One platform, not a stitched stack', i: <IconBolt />, href: '/platform/why-smslocal/' },
  { t: 'Platform overview', d: 'One platform, every layer', i: <IconGlobe />, href: '/platform/' },
  { t: 'Integrations', d: 'Connect 300+ apps', i: <IconLink />, href: '/platform/integrations/' },
  { t: 'Enterprise security', d: 'SOC 2, GDPR & RBAC', i: <IconShield />, href: '/platform/security/' },
  { t: 'Compliance & DLT', d: 'DLT, sender IDs & TRAI rules', i: <IconReceipt />, href: '/platform/compliance/' },
  { t: 'Trust Center', d: 'Security, privacy & policies', i: <IconInfo />, href: '/platform/trust-center/' },
  { t: 'Enterprise', d: 'Messaging at scale for large teams', i: <IconBriefcase />, href: '/platform/enterprise/' },
]

// New top-level menu. Developer Docs moved here from Resources so each page
// lives under exactly one menu (and the footer never repeats an href).
export const DEVELOPERS = [
  { t: 'Developer Hub', d: 'APIs, webhooks & docs in one place', i: <IconCode />, href: '/developers/' },
  { t: 'Quickstart', d: 'Your first message in three steps', i: <IconRocket />, href: '/developers/quickstart/' },
  { t: 'API Reference', d: 'Endpoints & request formats', i: <IconBook />, href: '/developers/api-reference/' },
  { t: 'SDKs & Code Samples', d: 'cURL, Node.js, Python & mobile', i: <IconPackage />, href: '/developers/sdks/' },
  { t: 'Webhooks', d: 'Delivery reports & inbound replies', i: <IconPlug />, href: '/developers/webhooks/' },
  { t: 'Developer Docs', d: 'The complete API reference', i: <IconNewspaper />, href: '/resources/docs/' },
]

export const RESOURCES_LEFT = [
  { t: 'Free tools', d: 'WhatsApp link generator, carrier lookup & more', i: <IconGear />, href: '/resources/tools/' },
  { t: 'Guides', d: 'Step-by-step setup guides', i: <IconBook />, href: '/resources/guides/' },
  { t: 'Case studies', d: 'Real customer results', i: <IconChart />, href: '/resources/case-studies/' },
]

export const RESOURCES_RIGHT = [
  { t: 'Blog / Articles', d: 'Guides, tips & product news', i: <IconNewspaper />, href: '/blog/' },
  { t: 'Contact Us', d: 'Talk to our team', i: <IconMail />, href: '/contact-us/' },
  { t: 'Compare SMSLocal', d: 'SMSLocal vs Twilio, Bird & more', i: <IconGlobe />, href: '/compare/' },
]

// Every route reachable from each top-level menu, so a trigger can highlight
// itself while you are on one of its pages. Derived from the same arrays the
// menus render, so adding a link to a menu keeps the highlight in sync.
const categoryRoutes = (cats) => cats.flatMap((c) => [c.viewAllHref, ...c.items.map((i) => i.href)])

const MENU_ROUTES = {
  products: categoryRoutes(PRODUCT_CATEGORIES),
  platform: PLATFORM.map((i) => i.href),
  developers: DEVELOPERS.map((i) => i.href),
  solutions: categoryRoutes(SOLUTION_CATEGORIES),
  resources: [...RESOURCES_LEFT, ...RESOURCES_RIGHT].map((i) => i.href),
}

// startsWith so nested pages count too — /blog/a-post lights up Resources, and
// /ai-agents/support lights up Products. Both sides are compared without their
// trailing slash: hrefs carry one now, so `${href}/` would build a double slash
// and never match anything nested.
function isMenuActive(menu, pathname) {
  const here = stripSlash(pathname)
  return (MENU_ROUTES[menu] ?? []).some((href) => {
    const base = stripSlash(href)
    return here === base || here.startsWith(`${base}/`)
  })
}

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
  const { pathname } = useLocation()

  // A trigger is "current" when the page you are on lives inside its menu.
  const triggerClass = (menu) =>
    isMenuActive(menu, pathname) ? 'nav-trigger is-current' : 'nav-trigger'

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
          <BrandLogo />
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
            <button type="button" className={triggerClass('products')} onClick={() => toggleMenu('products')} aria-haspopup="true" aria-expanded={openMenu === 'products'}>
              Products
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
            <button type="button" className={triggerClass('platform')} onClick={() => toggleMenu('platform')} aria-haspopup="true" aria-expanded={openMenu === 'platform'}>
              Platform
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
            <button type="button" className={triggerClass('solutions')} onClick={() => toggleMenu('solutions')} aria-haspopup="true" aria-expanded={openMenu === 'solutions'}>
              Solutions
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

          {/* Developers — simple grid dropdown */}
          <div className="nav-item has-dropdown" onMouseEnter={() => setOpenMenu('developers')}>
            <button type="button" className={triggerClass('developers')} onClick={() => toggleMenu('developers')} aria-haspopup="true" aria-expanded={openMenu === 'developers'}>
              Developers
            </button>
            {openMenu === 'developers' && (
              <div className="dropdown-wrapper">
                <div className="dropdown dropdown--grid">
                  <ul>
                    {DEVELOPERS.map((item) => (
                      <li key={item.t}><ItemLink item={item} onNavigate={closeAll} /></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Resources — two-panel flyout (now includes Pricing) */}
          <div className="nav-item has-dropdown" onMouseEnter={() => setOpenMenu('resources')}>
            <button type="button" className={triggerClass('resources')} onClick={() => toggleMenu('resources')} aria-haspopup="true" aria-expanded={openMenu === 'resources'}>
              Resources
            </button>
            {openMenu === 'resources' && (
              <div className="dropdown-wrapper">
                <div className="dropdown resources-mega">
                  <div className="resources-mega-panel">
                    <span className="resources-mega-eyebrow">Resources</span>
                    <ul>
                      {RESOURCES_LEFT.map((item) => (
                        <li key={item.t}><ItemLink item={item} onNavigate={closeAll} /></li>
                      ))}
                    </ul>
                  </div>
                  <div className="resources-mega-panel">
                    <span className="resources-mega-eyebrow">&nbsp;</span>
                    <ul>
                      {RESOURCES_RIGHT.map((item) => (
                        <li key={item.t}><ItemLink item={item} onNavigate={closeAll} /></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pricing — plain link (Company links now live in the footer only) */}
          <div className="nav-item" onMouseEnter={() => setOpenMenu(null)}>
            <Link
              to="/pricing/"
              className={pathname === '/pricing' ? 'nav-item-link is-current' : 'nav-item-link'}
              onClick={closeAll}
            >Pricing</Link>
          </div>

          <div className="nav-auth mobile-only">
            <a href="https://secure.smslocal.com" className="nav-login" onClick={closeAll}>Log in</a>
            <Link to="/signup/" className="btn btn-primary" onClick={closeAll}>Sign up</Link>
          </div>
        </nav>

        <div className="nav-auth desktop-only">
          <LanguageSwitcher />
          <a href="https://secure.smslocal.com" className="nav-login" onClick={closeAll}>Log in</a>
          <Link to="/signup/" className="btn btn-primary" onClick={closeAll}>Sign up</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
