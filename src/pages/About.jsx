import Seo from '../components/Seo.jsx'
import './About.css'
import { Hero, WhyUs, EcosystemGrid, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import {
  IconGlobe, IconShield, IconUsers, IconRefresh, IconMegaphone, IconRobot, IconBrain, IconGear,
} from '../components/icons.jsx'

const STATS = [
  { value: 'One', label: 'Unified platform', desc: 'Messaging, chatbots and AI agents in a single place.' },
  { value: '190+', label: 'Countries reached', desc: 'Direct carrier routes for reliable global delivery.' },
  { value: '10+', label: 'Channels supported', desc: 'SMS, WhatsApp, RCS, email, voice and more.' },
  { value: '99.9%', label: 'Uptime SLA', desc: 'Carrier-grade infrastructure, monitored continuously.' },
]

const VALUES = [
  { icon: <IconUsers />, title: 'Customer-first, always', desc: 'The people who actually answer the messages shape what we build next.' },
  { icon: <IconShield />, title: 'Compliant by default', desc: 'Verification, opt-in handling and audit trails built in, not bolted on later.' },
  { icon: <IconRefresh />, title: 'Reliable at scale', desc: 'Carrier-grade routing and uptime you can plan a launch around.' },
  { icon: <IconGlobe />, title: 'Open and honest', desc: 'Clear pricing, clear docs, and no surprises hidden in the fine print.' },
]

const SERVICES = [
  { icon: <IconMegaphone />, title: 'Messaging channels', desc: 'Bulk SMS, WhatsApp, RCS, email and more — one API for every channel your customers use.', href: '/products/channels/' },
  { icon: <IconRobot />, title: 'No-code chatbots', desc: 'Drag-and-drop bots that answer, qualify and convert across every channel, 24/7.' },
  { icon: <IconBrain />, title: 'Agentic AI agents', desc: 'Autonomous agents that resolve support, sales and voice conversations end to end.', href: '/products/ai-agents/' },
  { icon: <IconGear />, title: 'Developer API', desc: 'A documented REST API and SDKs to wire messaging straight into your own product.' },
]

const FAQS = [
  { q: 'What does SMSLocal do?', a: 'We run a messaging platform covering SMS, WhatsApp, RCS and more channels, plus no-code chatbots and agentic AI agents — all sharing one inbox and customer record.' },
  { q: 'Who is SMSLocal built for?', a: 'Businesses that need to reach customers across multiple channels — from a single SMS campaign to a full multi-channel support and sales operation.' },
  { q: 'Do I need a long-term contract?', a: 'No. You can start on a flexible plan and scale up or down as your volume changes — no lock-in required to try the platform.' },
  { q: 'Does it integrate with our existing tools?', a: 'Yes. Connect your CRM, store or helpdesk so every reply is backed by real order and customer data, or build directly on the REST API.' },
  { q: 'How is our data handled?', a: 'Messages run over privacy-conscious, auditable workflows with encryption in transit, and opt-in and opt-out handling built into the platform.' },
  { q: 'Where can I learn more about a specific product?', a: 'Visit our Products page for an overview, or Channels, Chatbot and AI Agents for specifics on each part of the platform.' },
]

function About() {
  return (
    <>
      <Seo
        title="About SMSLocal — Our Story and Our Mission"
        description="SMSLocal is one platform for SMS, WhatsApp, RCS, chatbots and agentic AI. Learn our story and values."
      />

      <Hero
        eyebrow="About"
        title={<>One platform to reach customers, <span className="grad-word">everywhere they are</span></>}
        subtitle="We build messaging infrastructure, chatbot tooling and agentic AI so businesses can run every conversation from one place, not five."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Products', href: '/products/' }}
      />

      <StatBand
        title="Built to carry the whole conversation"
        subtitle="One platform behind millions of messages a day, across every channel your customers reach for."
        items={STATS}
        alt
      />

      <section className="section">
        <div className="container about-prose">
          <h2 className="section-title">Our story</h2>
          <p>
            SMSLocal started with a simple frustration: reaching customers meant stitching together one
            vendor for SMS, another for WhatsApp, a third for a chatbot, and glue code to hold it all
            together. A growing team shouldn't need five tools and an integration project just to answer
            a message.
          </p>
          <p>
            So we built one platform — messaging across every channel, no-code chatbots, and agentic AI —
            <strong> sharing a single inbox and one customer record</strong>. Today teams around the world
            use it to run campaigns, resolve support and qualify sales from the same place.
          </p>
          <p>
            We're still shipping. New channels, better automation, and tooling shaped by the people who
            actually answer the messages.
          </p>
        </div>
      </section>

      <WhyUs title={<>What we believe</>} items={VALUES} alt />

      <EcosystemGrid
        title={<>What we build</>}
        subtitle="Four products, designed to work together around one customer record."
        items={SERVICES}
      />

      <section className="section section-alt">
        <div className="container about-vision">
          <span className="about-vision-eyebrow">Our vision</span>
          <blockquote>
            Every business — not just the ones with a platform team — should hold one continuous
            conversation with their customers, on whatever channel they prefer, backed by automation
            that actually resolves.
          </blockquote>
        </div>
      </section>

      <CTABanner
        title="See the platform for yourself"
        subtitle="Talk to us about what you're trying to build."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>About us — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default About
