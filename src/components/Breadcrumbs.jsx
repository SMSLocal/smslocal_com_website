import { Link, useLocation } from 'react-router-dom'
import JsonLd from './JsonLd.jsx'
import { SITE_ORIGIN } from './Canonical.jsx'
import { getPostBySlug } from '../lib/posts.js'
import './Breadcrumbs.css'

// Friendly labels for path segments that a naive "un-hyphenate + capitalize"
// wouldn't get right (abbreviations, brand names, acronyms).
const LABELS = {
  'ai-agents': 'AI Agents',
  'agentic-ai': 'Agentic AI',
  'voice-ai-agents': 'Voice AI Agents',
  rcs: 'RCS',
  'rcs-broadcasting': 'RCS Broadcasting',
  sms: 'SMS',
  'sms-broadcasting': 'SMS Broadcasting',
  whatsapp: 'WhatsApp',
  'whatsapp-broadcasting': 'WhatsApp Broadcasting',
  'web-chat': 'Web Chat',
  did: 'Virtual Numbers (DID)',
  numbers: 'Numbers',
  'apple-messages': 'Apple Messages',
  kakaotalk: 'KakaoTalk',
  line: 'LINE',
  api: 'API',
  'services': 'Services',
  'ai-consulting': 'AI Consulting',
  'agent-copilot': 'Agent Copilot',
  'agent-builder': 'Agent Builder',
  'omnichannel-inbox': 'Omnichannel Inbox',
  'why-smslocal': 'Why SMSLocal',
  'about-us': 'About Us',
  'contact-us': 'Contact Us',
  'privacy-policy': 'Privacy Policy',
  'terms-and-conditions': 'Terms and Conditions',
  'case-studies': 'Case Studies',
  'travel-and-hospitality': 'Travel & Hospitality',
  'media-entertainment': 'Media & Entertainment',
  'real-estate': 'Real Estate',
  'customer-service': 'Customer Service',
  'sales-sdr': 'Sales & SDR',
  'sales': 'Sales',
  'booking': 'Booking',
}

function titleize(segment) {
  if (LABELS[segment]) return LABELS[segment]
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * Auto-derived breadcrumb trail, rendered once in Layout.jsx so every routed
 * page gets one — no per-page wiring. Also emits a schema.org BreadcrumbList
 * JSON-LD block for search results. `lastLabel` lets a dynamic route (e.g.
 * /blog/:slug) override the auto-derived label for its final segment with
 * the actual post/page title.
 */
function Breadcrumbs({ lastLabel }) {
  const { pathname } = useLocation()

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  // On /blog/:slug and /resources/insights/:slug the final segment is a post
  // slug — titleizing it would put a mangled title in both the visible trail and
  // the JSON-LD below, where it wouldn't match the article's own schema.
  const isPost = /^\/(blog|resources\/insights)\/[^/]+$/.test(pathname)
  const postTitle = isPost ? getPostBySlug(segments[segments.length - 1])?.title : null
  const finalLabel = lastLabel ?? postTitle

  const crumbs = [{ label: 'Home', href: '/' }]
  let acc = ''
  segments.forEach((seg, i) => {
    acc += `/${seg}`
    const isLast = i === segments.length - 1
    crumbs.push({ label: isLast && finalLabel ? finalLabel : titleize(seg), href: acc })
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${SITE_ORIGIN}${c.href}`,
    })),
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <JsonLd data={jsonLd} />
      <ol className="breadcrumbs-list">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={c.href} className="breadcrumbs-item">
              {isLast ? (
                <span aria-current="page">{c.label}</span>
              ) : (
                <Link to={c.href}>{c.label}</Link>
              )}
              {!isLast && <span className="breadcrumbs-sep" aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
