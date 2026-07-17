import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { CTABanner } from '../components/sections/Sections.jsx'
import IntegrationsGrid from '../components/IntegrationsGrid.jsx'
import { getCategory } from '../data/appCategories.jsx'
import './AppCategory.css'

const LOGO_COLORS = ['#6d5ce7', '#ec4899', '#fb7185', '#10233f', '#8b5cf6']

// App name -> brand domain (used to fetch the real logo). Default is slug + ".com".
const LOGO_DOMAINS = {
  'Google Drive': 'google.com', 'Google Calendar': 'google.com', 'Google Analytics': 'google.com',
  'GA4': 'google.com', 'Gmail': 'google.com', 'BigQuery': 'google.com',
  'Microsoft Teams': 'microsoft.com', 'Outlook': 'microsoft.com', 'Outlook Calendar': 'microsoft.com',
  'OneDrive': 'microsoft.com', 'SharePoint': 'microsoft.com',
  'Amazon Seller': 'amazon.com', 'WhatsApp Business': 'whatsapp.com',
  'HubSpot Meetings': 'hubspot.com', 'HubSpot Marketing': 'hubspot.com',
  'Monday.com': 'monday.com', 'Monday CRM': 'monday.com', 'Cal.com': 'cal.com',
  'X (Twitter)': 'x.com', 'Zoho CRM': 'zoho.com', 'Wix Stores': 'wix.com', 'Help Scout': 'helpscout.com',
  'Front': 'frontapp.com', 'Notion': 'notion.so', 'Confluence': 'atlassian.com', 'Jira': 'atlassian.com',
  'Sentry': 'sentry.io', 'Linear': 'linear.app', 'Datadog': 'datadoghq.com', 'Bitbucket': 'bitbucket.org',
  'Zoom': 'zoom.us', 'Telegram': 'telegram.org', 'Greenhouse': 'greenhouse.io', 'Lever': 'lever.co',
  'Heap': 'heap.io', 'Neon': 'neon.tech', 'Redis': 'redis.io', 'Firecrawl': 'firecrawl.dev',
  'Pinecone': 'pinecone.io', 'ElevenLabs': 'elevenlabs.io', 'Stability AI': 'stability.ai',
  'LangSmith': 'langchain.com', 'n8n': 'n8n.io', 'Tray.io': 'tray.io', 'Temporal': 'temporal.io',
  'Customer.io': 'customer.io', 'Acuity Scheduling': 'acuityscheduling.com', 'Mindbody': 'mindbodyonline.com',
  'QuickBooks': 'quickbooks.intuit.com', 'Make': 'make.com', 'SendGrid': 'sendgrid.com',
  'Looker': 'looker.com', 'PostHog': 'posthog.com',
}

function logoDomain(name) {
  if (LOGO_DOMAINS[name]) return LOGO_DOMAINS[name]
  return name.replace(/\(.*?\)/g, '').trim().toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'
}

function initialsOf(name) {
  const clean = name.replace(/\(.*?\)/g, '').trim()
  const words = clean.split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return clean.slice(0, 2).toUpperCase()
}

// Real brand logo via the public favicon service, with a monogram fallback
function AppLogo({ name, color }) {
  const [err, setErr] = useState(false)
  if (err) {
    return <span className="appx-logo appx-logo--mono" style={{ background: color }}>{initialsOf(name)}</span>
  }
  return (
    <span className="appx-logo appx-logo--img">
      <img
        src={`https://www.google.com/s2/favicons?sz=64&domain=${logoDomain(name)}`}
        alt={`${name} logo`}
        width="24"
        height="24"
        onError={() => setErr(true)}
      />
    </span>
  )
}

function AppCategory() {
  const { slug } = useParams()
  const cat = getCategory(slug)

  if (!cat) {
    return (
      <section className="section">
        <div className="container appx-missing">
          <h1>Integration not found</h1>
          <p>We couldn't find that integration category.</p>
          <Link className="btn btn-primary" to="/agentic-ai">Back to Agentic AI</Link>
        </div>
      </section>
    )
  }

  const related = cat.related
    .map(getCategory)
    .filter(Boolean)
    .map((c) => ({
      icon: c.icon,
      title: c.title,
      count: c.count,
      desc: c.intro,
      tools: c.apps.slice(0, 3).map((a) => a.name),
      href: `/ai-agents/apps/${c.slug}`,
    }))

  return (
    <>
      <Seo
        title={`${cat.title} Integrations for AI Agents`}
        description={`Connect ${cat.title.toLowerCase()} apps to your SMSLocal AI agent. ${cat.intro}`}
        keywords={[`${cat.title} integration`, 'AI agent integrations', 'agentic AI apps', 'one-click OAuth']}
      />

      {/* Header */}
      <section className="section appx-hero">
        <div className="container">
          <Link to="/agentic-ai" className="appx-back">← All integrations</Link>
          <div className="appx-hero-top">
            <span className="appx-hero-icon">{cat.icon}</span>
            <span className="appx-hero-count">{cat.count} apps</span>
          </div>
          <span className="appx-eyebrow">Integrations</span>
          <h1>{cat.title}</h1>
          <p className="appx-intro">{cat.intro} Connect any app with one-click OAuth, and your AI agent can read live data and take real actions inside every conversation.</p>
          <div className="appx-hero-actions">
            <Link to="/contact" className="btn btn-primary">Connect {cat.title}</Link>
            <Link to="/agentic-ai" className="btn btn-ghost">See all integrations</Link>
          </div>
        </div>
      </section>

      {/* Apps grid */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Featured {cat.title.toLowerCase()} apps</h2>
          <div className="appx-grid">
            {cat.apps.map((app, i) => (
              <div className="appx-card" key={app.name}>
                <div className="appx-card-top">
                  <AppLogo name={app.name} color={LOGO_COLORS[i % LOGO_COLORS.length]} />
                  <span className="appx-actions">{app.actions} actions</span>
                </div>
                <h3>{app.name}</h3>
                <p>{app.desc}</p>
                <div className="appx-tags">
                  {app.tags.map((t) => (
                    <span className="appx-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect band */}
      <CTABanner
        title={`Connect ${cat.title} to your AI agent`}
        subtitle="One-click OAuth — no API keys to manage. The agent gets the right scopes and starts taking actions immediately."
        cta={{ label: 'Start Free', href: '/contact' }}
      />

      {/* Related categories */}
      <IntegrationsGrid
        title={<>More integrations</>}
        subtitle="One agent, connected to the whole stack your team already runs on."
        items={related}
        alt
      />
    </>
  )
}

export default AppCategory
