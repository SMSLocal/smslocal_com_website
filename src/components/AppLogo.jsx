import { useState } from 'react'

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

export function initialsOf(name) {
  const clean = name.replace(/\(.*?\)/g, '').trim()
  const words = clean.split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return clean.slice(0, 2).toUpperCase()
}

export function colorFor(i) {
  return LOGO_COLORS[i % LOGO_COLORS.length]
}

// Real brand logo via the public favicon service, with a monogram fallback
function AppLogo({ name, color, size = 24, className = '' }) {
  const [err, setErr] = useState(false)
  if (err) {
    return (
      <span className={`applogo applogo--mono ${className}`} style={{ background: color }}>
        {initialsOf(name)}
      </span>
    )
  }
  return (
    <span className={`applogo applogo--img ${className}`}>
      <img
        src={`https://www.google.com/s2/favicons?sz=64&domain=${logoDomain(name)}`}
        alt={`${name} logo`}
        width={size}
        height={size}
        onError={() => setErr(true)}
      />
    </span>
  )
}

export default AppLogo
