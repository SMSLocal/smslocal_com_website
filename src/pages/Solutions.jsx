import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import SolutionsSplitHero from '../components/SolutionsSplitHero.jsx'
import IndustrySolutionRows from '../components/IndustrySolutionRows.jsx'
import UseCaseTeamBranches from '../components/UseCaseTeamBranches.jsx'
import SolutionFoundationRail from '../components/SolutionFoundationRail.jsx'
import {
  IconCart, IconFlask, IconDollar, IconGlobe,
  IconChat, IconMegaphone, IconCalendar,
  IconRobot, IconBrain, IconMic, IconBriefcase, IconSearch, IconUsers,
  IconPlug, IconChart, IconShield,
} from '../components/icons.jsx'

const INDUSTRIES = [
  {
    icon: <IconCart />,
    title: 'Ecommerce & Retail',
    blurb: 'Product discovery, order tracking (WISMO) and returns across WhatsApp, web and SMS.',
    links: [
      { kind: 'Chatbot', tone: 'bot', label: 'Ecommerce Chatbot', href: '/chatbot/ecommerce' },
      { kind: 'AI agent', tone: 'agent', label: 'AI Agent for Ecommerce', href: '/ai-agents/ecommerce' },
    ],
  },
  {
    icon: <IconFlask />,
    title: 'Healthcare',
    blurb: 'Appointment booking, reminders, refill and lab-result alerts and multilingual patient Q&A.',
    links: [
      { kind: 'Chatbot', tone: 'bot', label: 'Healthcare Chatbot', href: '/chatbot/healthcare' },
      { kind: 'AI agent', tone: 'agent', label: 'AI Agent for Healthcare', href: '/ai-agents/healthcare' },
    ],
  },
  {
    icon: <IconDollar />,
    title: 'Banking & Financial Services',
    blurb: 'Compliant self-service for balances, alerts and KYC help, with a full audit trail.',
    links: [
      { kind: 'Chatbot', tone: 'bot', label: 'Banking & Finance Chatbot', href: '/chatbot/banking-financial-services' },
      { kind: 'AI agent', tone: 'agent', label: 'AI Agent for Financial Services', href: '/ai-agents/financial-services' },
    ],
  },
  {
    icon: <IconGlobe />,
    title: 'Travel & Hospitality',
    blurb: 'Bookings, itineraries and guest support, 24/7 in any language across every channel.',
    links: [
      { kind: 'Chatbot', tone: 'bot', label: 'Travel & Hospitality Chatbot', href: '/chatbot/travel-hospitality' },
    ],
  },
]

const TEAMS = [
  {
    name: 'Customer support',
    icon: <IconChat />,
    items: [
      { icon: <IconRobot />, title: 'AI Customer Service Agent', tag: 'AI agent', href: '/ai-agents/customer-service' },
      { icon: <IconBrain />, title: 'AI Agent Assist', tag: 'Copilot', href: '/ai-agents/agent-assist' },
      { icon: <IconChat />, title: 'Customer Support Chatbot', tag: 'Chatbot', href: '/chatbot/customer-support' },
      { icon: <IconMic />, title: 'AI Voice Agent', tag: 'Voice', href: '/voice-ai-agents' },
    ],
  },
  {
    name: 'Sales & marketing',
    icon: <IconMegaphone />,
    items: [
      { icon: <IconBriefcase />, title: 'AI Sales / SDR Agent', tag: 'AI agent', href: '/ai-agents/sales' },
      { icon: <IconSearch />, title: 'AI Lead Qualification Agent', tag: 'AI agent', href: '/ai-agents/lead-qualification' },
      { icon: <IconUsers />, title: 'Lead Generation Chatbot', tag: 'Chatbot', href: '/chatbot/lead-generation' },
      { icon: <IconMegaphone />, title: 'Marketing & Sales Chatbot', tag: 'Chatbot', href: '/chatbot/marketing-sales' },
    ],
  },
  {
    name: 'Bookings & scheduling',
    icon: <IconCalendar />,
    items: [
      { icon: <IconCalendar />, title: 'AI Booking Agent', tag: 'AI agent', href: '/ai-agents/booking' },
    ],
  },
]

const FOUNDATION = [
  { icon: <IconPlug />, title: 'Fits your stack', desc: 'Connects to the CRM, order system or core platform you already run on.' },
  { icon: <IconChart />, title: 'Reporting built in', desc: 'Delivery, resolution and satisfaction metrics for every use case.' },
  { icon: <IconUsers />, title: 'Human-in-the-loop', desc: 'Every solution escalates cleanly to your team when it needs to.' },
  { icon: <IconShield />, title: 'Compliant by design', desc: 'Privacy-conscious, auditable workflows built for regulated work.' },
]

const FAQS = [
  { q: 'How is Solutions different from the Products page?', a: 'Products are the building blocks — channels, chatbots and AI agents. Solutions show how those blocks come together for a specific industry or team.' },
  { q: 'Should I choose by industry or by use-case?', a: 'Either works. Pick your industry for a pre-shaped starting point, or pick by team if a specific job — support, sales or bookings — is what you are solving first.' },
  { q: 'Can one solution span multiple teams and channels?', a: 'Yes. Every solution runs across WhatsApp, SMS, web, voice and social from one account, and can route work between support, sales and operations.' },
  { q: 'Do I have to pick a chatbot or an AI agent?', a: 'No. Most solutions pair a chatbot for structured flows with an AI agent for open-ended, multi-step requests, with clean handoff to your team.' },
  { q: 'How do I get started?', a: 'Tell us the industry or the job to be done and we will map it to the right channels, flows and agents.' },
]

function Solutions() {
  return (
    <>
      <Seo
        title="Solutions"
        description="SMSLocal solutions, organised two ways — by industry (ecommerce, healthcare, banking, travel) and by team (support, sales, bookings). One platform, many solutions."
        keywords={['business messaging solutions', 'AI agent solutions by industry', 'chatbot solutions by team', 'customer support automation', 'sales automation solutions']}
      />

      <Hero
        eyebrow="Solutions"
        title={<>One platform, <span className="grad-word">many solutions</span></>}
        subtitle="Messaging, chatbots and AI agents, shaped for your industry and for the exact job your team is trying to do — all from one SMSLocal account."
        primaryCta={{ label: 'Get started', href: '/contact-us' }}
        secondaryCta={{ label: 'Chatbot vs AI agent', href: '/chatbot-vs-ai-agent' }}
        visual={<SolutionsSplitHero />}
      />

      <IndustrySolutionRows
        eyebrow="By industry"
        title="Solutions built for your industry"
        subtitle="Each industry pairs a ready-made chatbot for structured tasks with an AI agent for the judgment calls."
        items={INDUSTRIES}
        alt
      />

      <UseCaseTeamBranches
        eyebrow="By use-case"
        title="Solutions organised by team"
        subtitle="Start from the job to be done — every branch links to a solution built for that team."
        teams={TEAMS}
      />

      <SolutionFoundationRail
        eyebrow="Included"
        title="What every solution includes"
        subtitle="Different shapes on top, the same dependable foundation underneath."
        items={FOUNDATION}
        alt
      />

      <NarrativeCompare
        eyebrow="Chatbot or AI agent"
        heading="One platform, two ways to automate"
        paragraphs={[
          'Every SMSLocal solution is assembled from the same parts — the difference is how much reasoning the job needs. Structured, predictable tasks run beautifully on a chatbot. Open-ended requests that touch live data are where an AI agent earns its place.',
          'You do not have to choose up front. Most teams run both side by side and let each handle what it does best.',
        ]}
        leftLabel="Chatbot"
        leftItems={[
          'Guided, rule-based flows',
          'Best for FAQs and structured tasks',
          'Fast to launch on a known script',
          'Deflects high-volume, repetitive questions',
        ]}
        rightLabel="AI agent"
        rightItems={[
          'Reasons over live data and tools',
          'Handles open-ended, multi-step requests',
          'Takes actions, not just answers',
          'Hands off to a human with full context',
        ]}
      />

      <CTABanner
        title="Find your solution"
        subtitle="Tell us the industry or the job to be done — we will map it to the right channels, flows and agents."
        cta={{ label: 'Get started', href: '/contact-us' }}
        secondaryCta={{ label: 'Explore AI agents', href: '/ai-agents' }}
        variant="spotlight"
      />

      <FAQ title="Solutions — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default Solutions
