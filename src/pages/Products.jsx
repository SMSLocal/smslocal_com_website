import Seo from '../components/Seo.jsx'
import { Hero, EcosystemGrid, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconMail, IconChat, IconBrain, IconGlobe, IconLink, IconChart, IconUsers } from '../components/icons.jsx'

const CHANNELS = [
  { icon: <IconMail />, title: 'Messaging channels', desc: 'SMS, WhatsApp, RCS, Instagram, Messenger, Viber, Telegram, Apple Messages, LINE and email — one platform, every inbox.', href: '/products/channels/' },
  { icon: <IconChat />, title: 'No-code chatbots', desc: 'Design bot flows visually and deploy the same bot to WhatsApp, your website, SMS and social.' },
  { icon: <IconBrain />, title: 'Agentic AI agents', desc: 'Autonomous agents that resolve requests end to end — not just reply — across every channel.', href: '/products/ai-agents/' },
]

const WHY_US = [
  { icon: <IconGlobe />, title: 'One platform, every channel', desc: 'Stop stitching together separate tools for SMS, WhatsApp, chatbots and AI agents.' },
  { icon: <IconLink />, title: 'One customer record', desc: 'Order history, past chats and notes follow the customer across every channel.' },
  { icon: <IconChart />, title: 'One set of reports', desc: 'Delivery, replies and resolutions across channels, in a single dashboard.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Agents, bots and AI agents all work from the same shared inbox.' },
]

const FAQS = [
  { q: 'What does SMSLocal actually offer?', a: 'Three product lines that work together: messaging channels (SMS, WhatsApp, RCS and more), a no-code chatbot builder, and agentic AI agents — all sharing one inbox and customer record.' },
  { q: 'Do I have to use all three product lines?', a: 'No — start with a single channel like bulk SMS or WhatsApp, and add chatbots or AI agents whenever you need them. Everything shares the same account.' },
  { q: 'Is pricing different per product?', a: 'Pricing is unified across the platform — see the pricing page for current plans covering messaging, chatbots and AI agents.' },
  { q: 'Can I migrate from another provider?', a: 'Yes, our team can help migrate contacts, templates and existing automations from most messaging and chatbot providers.' },
]

function Products() {
  return (
    <>
      <Seo
        title="Products — Messaging, Chatbot & AI Agents"
        description="Explore SMSLocal: messaging channels, no-code chatbots and autonomous AI agents in one account."
        keywords={['business messaging platform', 'customer engagement platform', 'CPaaS products', 'messaging chatbot AI agents', 'conversational platform']}
      />

      <Hero
        eyebrow="Products"
        title={<>One platform for <span className="grad-word">messaging, chatbots and AI agents</span></>}
        subtitle="Reach customers on any channel, automate conversations with no-code bots, and deploy autonomous AI agents that resolve requests — all from one account."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />

      <EcosystemGrid
        title={<>Three products, one platform</>}
        subtitle="Start with any one of them — they all share the same inbox and customer record."
        items={CHANNELS}
        alt
      />

      <WhyUs title={<>Why teams run their whole stack on SMSLocal</>} items={WHY_US} />

      <CTABanner
        title="See the whole platform in one call"
        subtitle="We'll walk through messaging, chatbots and AI agents for your use case."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>Products — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default Products
