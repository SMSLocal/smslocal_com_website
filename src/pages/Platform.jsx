import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import PlatformStackHero from '../components/PlatformStackHero.jsx'
import PlatformAccountOrbit from '../components/PlatformAccountOrbit.jsx'
import PlatformOneRecord from '../components/PlatformOneRecord.jsx'
import PlatformModules from '../components/PlatformModules.jsx'

const FAQS = [
  { q: 'What does the SMSLocal platform include?', a: 'Six layers on one account: messaging channels (SMS, WhatsApp, RCS, Voice, Email and more), a shared team inbox, AI and automation, integrations, analytics, and enterprise security. They are designed to stack together but each works on its own.' },
  { q: 'Do I have to use every layer?', a: 'No. Start with a single channel like bulk SMS or WhatsApp and turn on the shared inbox, AI agents, integrations or analytics whenever you need them. Nothing else has to change.' },
  { q: 'Is it really one customer record and one bill?', a: 'Yes. Every channel and every touchpoint resolves to the same customer profile, and everything is billed on one account — no separate tools, logins or invoices per channel.' },
  { q: 'Can I migrate from the tools I use today?', a: 'Our team helps migrate contacts, templates, opt-in lists and existing automations from most messaging, chatbot and helpdesk providers, so you keep your history.' },
  { q: 'How do the layers connect to my other systems?', a: 'The integrations layer links your CRM, helpdesk and store through one-click connectors and webhooks, so customer data stays in sync across the whole stack.' },
]

function Platform() {
  return (
    <>
      <Seo
        title="SMSLocal Platform Overview and Feature Guide"
        description="SMSLocal unifies messaging, a shared inbox, AI automation and analytics in one platform."
        keywords={['customer engagement platform', 'CPaaS platform', 'unified messaging platform', 'omnichannel platform', 'one customer record']}
      />

      <Hero
        eyebrow="Platform overview"
        title={<>One platform, stacked <span className="grad-word">layer by layer</span></>}
        subtitle="Messaging channels, a shared inbox, AI and automation, integrations, analytics and enterprise security — every layer on one account, resolving to one customer record."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<PlatformStackHero />}
      />

      <PlatformAccountOrbit />

      <PlatformOneRecord />

      <PlatformModules />

      <CTABanner
        title="See the whole platform in one call"
        subtitle="We'll map your channels, inbox, automation and reporting onto a single SMSLocal account — and migrate what you already have."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'View pricing', href: '/pricing/' }}
        variant="spotlight"
      />

      <FAQ title={<>Platform — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default Platform
