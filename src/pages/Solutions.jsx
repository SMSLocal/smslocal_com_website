import Seo from '../components/Seo.jsx'
import { Hero, EcosystemGrid, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCart, IconCalendar, IconDollar, IconGlobe, IconLink, IconChart, IconUsers, IconShield } from '../components/icons.jsx'

const INDUSTRIES = [
  { icon: <IconCart />, title: 'Ecommerce & Retail', desc: 'Product discovery, order tracking and returns — automated across chat and voice.', href: '/chatbot/ecommerce' },
  { icon: <IconCalendar />, title: 'Healthcare', desc: 'Appointment booking, reminders and patient FAQs, handled securely.', href: '/chatbot/healthcare' },
  { icon: <IconDollar />, title: 'Banking & Financial Services', desc: 'Secure self-service for balances, alerts, KYC and support.', href: '/chatbot/banking-financial-services' },
  { icon: <IconGlobe />, title: 'Travel & Hospitality', desc: 'Bookings, itineraries and guest support, 24/7 in any language.', href: '/chatbot/travel-hospitality' },
]

const HOW_WE_HELP = [
  { icon: <IconLink />, title: 'Fits your existing stack', desc: 'Connects to the CRM, order system or core platform you already run on.' },
  { icon: <IconChart />, title: 'Reporting built in', desc: 'Delivery, resolution and satisfaction metrics for every industry use case.' },
  { icon: <IconUsers />, title: 'Human-in-the-loop', desc: 'Every solution escalates cleanly to your team when it needs to.' },
  { icon: <IconShield />, title: 'Compliant by design', desc: 'Built for privacy-conscious, auditable workflows in regulated industries.' },
]

const FAQS = [
  { q: 'Do you offer solutions for industries not listed here?', a: 'Yes — messaging, chatbots and AI agents can be configured for almost any industry. The pages above are our most requested starting points.' },
  { q: 'Can a solution combine chatbots and AI agents?', a: 'Yes, most industry solutions pair a chatbot for structured questions with an AI agent for anything that needs real judgment or action.' },
  { q: 'Do these solutions work across every channel?', a: 'Yes, each solution runs across WhatsApp, SMS, web chat, voice and other channels from the same account.' },
  { q: 'How do I get started with an industry solution?', a: 'Talk to us about your use case — we\'ll recommend the right mix of channels, chatbot flows and AI agents to start with.' },
]

function Solutions() {
  return (
    <>
      <Seo
        title="Solutions by Industry"
        description="Messaging, chatbots and AI agents tailored to your industry — ecommerce, healthcare, banking and travel — all on one platform."
        keywords={['messaging solutions by industry', 'industry chatbot solutions', 'AI agents by industry', 'business messaging solutions']}
      />

      <Hero
        eyebrow="Solutions"
        title="The same platform, tuned for your industry"
        subtitle="Messaging, chatbots and AI agents configured for how ecommerce, healthcare, banking and travel teams actually work."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Products', href: '/products' }}
      />

      <EcosystemGrid
        title={<>Solutions built for your industry</>}
        subtitle="Pick your industry to see the channels, chatbots and AI agents teams like yours use most."
        items={INDUSTRIES}
        alt
      />

      <WhyUs title={<>What every solution includes</>} items={HOW_WE_HELP} />

      <FAQ title={<>Solutions — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Find the right solution for your industry"
        subtitle="Tell us what you're trying to solve — we'll map it to the right setup."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default Solutions
