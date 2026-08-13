import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import IntegrationsTabs from '../components/IntegrationsTabs.jsx'
import IntgConnectHero from '../components/IntgConnectHero.jsx'
import IntgNumbers from '../components/IntgNumbers.jsx'
import IntgHandshake from '../components/IntgHandshake.jsx'
import IntgBuildYourOwn from '../components/IntgBuildYourOwn.jsx'

const FAQS = [
  { q: 'Is it really one-click?', a: 'For the 300+ listed apps, yes — you authorize with OAuth in a single click, so there are no API keys to copy or servers to configure. The connection is live in seconds and starts syncing right away.' },
  { q: 'Do integrations sync both ways?', a: 'Yes. Contacts and events sync in both directions, messages you trigger go out through SMSLocal, and delivery status flows straight back to your app — so both systems stay in sync automatically.' },
  { q: 'Can I connect a custom or internal tool?', a: 'Absolutely. If an app is not in the directory, build the connection yourself with the REST API and webhooks, or wire it up through Zapier and Make — the same platform every listed integration is built on.' },
  { q: 'How secure are these connections?', a: 'Connections use OAuth so SMSLocal never stores your passwords, access is scoped to only what each integration needs, and you can revoke any connection at any time. Data is encrypted in transit.' },
]

function IntegrationsPage() {
  return (
    <>
      <Seo
        title="Integrations — 300+ Apps"
        description="One-click OAuth to your CRM and helpdesk tools, plus a REST API and webhooks."
        keywords={['integrations', 'CRM integration', 'Zapier', 'webhooks', 'API integrations']}
      />

      <Hero
        eyebrow="Integrations"
        title={<>Connect SMSLocal to the tools you <span className="grad-word">already use</span></>}
        subtitle="One-click OAuth links your CRM, store, helpdesk and finance apps to SMSLocal. Sync contacts and events both ways, trigger messages from any tool, or build your own with the REST API and webhooks."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<IntgConnectHero />}
      />

      <IntgNumbers />

      <IntegrationsTabs
        title="Browse by category"
        subtitle="300+ apps across 16 categories - pick one to explore."
        alt
      />

      <IntgHandshake />

      <IntgBuildYourOwn />

      <CTABanner
        title="Connect your first app in minutes"
        subtitle="Authorize with one click and watch contacts, events and messages start flowing between your tools and SMSLocal."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
        variant="spotlight"
      />

      <FAQ title={<>Integrations &mdash; frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default IntegrationsPage
