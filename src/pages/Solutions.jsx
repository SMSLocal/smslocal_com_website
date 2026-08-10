import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import SolutionsSplitHero from '../components/SolutionsSplitHero.jsx'
import IndustrySolutionRows from '../components/IndustrySolutionRows.jsx'
import UseCaseTeamBranches from '../components/UseCaseTeamBranches.jsx'
import SolutionFoundationRail from '../components/SolutionFoundationRail.jsx'
import {
  IconCart, IconFlask, IconDollar, IconGlobe,
  IconChat, IconMegaphone, IconCalendar,
  IconRobot, IconMic, IconBriefcase, IconUsers,
  IconPlug, IconChart, IconShield, IconGear, IconBook, IconPhone, IconReceipt, IconHandshake,
} from '../components/icons.jsx'

const INDUSTRIES = [
  {
    icon: <IconCart />,
    title: 'Retail & eCommerce',
    blurb: 'Order updates, cart recovery and returns handled automatically across every channel your shoppers use.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Retail', href: '/solutions/industry/retail/' }],
  },
  {
    icon: <IconGlobe />,
    title: 'Travel & Hospitality',
    blurb: 'Bookings, itinerary changes and multilingual guest support, around the clock, on every channel.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Travel & Hospitality', href: '/solutions/industry/travel-and-hospitality/' }],
  },
  {
    icon: <IconDollar />,
    title: 'Fintech',
    blurb: 'Onboarding, transaction alerts and account support, backed by audit logs and access controls.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Fintech', href: '/solutions/industry/fintech/' }],
  },
  {
    icon: <IconBook />,
    title: 'Education',
    blurb: 'Admissions, fee reminders and round-the-clock multilingual student support from first enquiry to enrolment.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Education', href: '/solutions/industry/education/' }],
  },
  {
    icon: <IconMic />,
    title: 'Media & Entertainment',
    blurb: 'Ticketing, recommendations and subscriber support campaigns that hold up under peak volume.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Media & Entertainment', href: '/solutions/industry/media-entertainment/' }],
  },
  {
    icon: <IconFlask />,
    title: 'Healthcare',
    blurb: 'Appointments, reminders and patient questions handled with consent-aware, role-based access control.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Healthcare', href: '/solutions/industry/healthcare/' }],
  },
  {
    icon: <IconShield />,
    title: 'Insurance',
    blurb: 'Quotes, claims status and renewal reminders that lift retention and cross-sell performance.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Insurance', href: '/solutions/industry/insurance/' }],
  },
  {
    icon: <IconReceipt />,
    title: 'Mortgage',
    blurb: 'Pre-qualification, document reminders and status updates that move borrowers from enquiry to close.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Mortgage', href: '/solutions/industry/mortgage/' }],
  },
  {
    icon: <IconPhone />,
    title: 'Telecom',
    blurb: 'Support, billing and outage notifications at scale, across SMS, RCS, WhatsApp and voice.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Telecom', href: '/solutions/industry/telecom/' }],
  },
  {
    icon: <IconHandshake />,
    title: 'Real Estate',
    blurb: 'Lead capture, listing recommendations and viewing bookings that work around the clock.',
    links: [{ kind: 'Industry', tone: 'agent', label: 'AI for Real Estate', href: '/solutions/industry/real-estate/' }],
  },
]

const TEAMS = [
  {
    name: 'Customer support',
    icon: <IconChat />,
    items: [
      { icon: <IconRobot />, title: 'AI Customer Service Agent', tag: 'AI agent', href: '/products/ai-agents/customer-service/' },
      { icon: <IconMic />, title: 'AI Voice Agent', tag: 'Voice', href: '/products/ai-agents/voice/' },
      { icon: <IconChat />, title: 'Omnichannel Inbox', tag: 'Inbox', href: '/products/inbox-and-analytics/omnichannel-inbox/' },
    ],
  },
  {
    name: 'Sales & marketing',
    icon: <IconMegaphone />,
    items: [
      { icon: <IconBriefcase />, title: 'AI Sales / SDR Agent', tag: 'AI agent', href: '/products/ai-agents/sales/' },
      { icon: <IconMegaphone />, title: 'WhatsApp Broadcasting', tag: 'Broadcast', href: '/products/channels/whatsapp-broadcasting/' },
      { icon: <IconGlobe />, title: 'RCS Broadcasting', tag: 'Broadcast', href: '/products/channels/rcs-broadcasting/' },
    ],
  },
  {
    name: 'Bookings & scheduling',
    icon: <IconCalendar />,
    items: [
      { icon: <IconCalendar />, title: 'AI Booking Agent', tag: 'AI agent', href: '/products/ai-agents/booking/' },
      { icon: <IconGear />, title: 'Agent Builder', tag: 'Build your own', href: '/products/ai-agents/agent-builder/' },
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
        title="Business Messaging Solutions by Industry"
        description="SMSLocal solutions, organised by industry and by team — support, sales and bookings."
        keywords={['business messaging solutions', 'AI agent solutions by industry', 'chatbot solutions by team', 'customer support automation', 'sales automation solutions']}
      />

      <Hero
        eyebrow="Solutions"
        title={<>One platform, <span className="grad-word">many solutions</span></>}
        subtitle="Messaging, chatbots and AI agents, shaped for your industry and for the exact job your team is trying to do — all from one SMSLocal account."
        primaryCta={{ label: 'Get started', href: '/contact-us/' }}
        secondaryCta={{ label: 'Explore AI Agents', href: '/products/ai-agents/' }}
        visual={<SolutionsSplitHero />}
      />

      <IndustrySolutionRows
        eyebrow="By industry"
        title="Solutions built for your industry"
        subtitle="Each industry page shows how messaging, broadcasting and agentic AI come together for your sector."
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
        cta={{ label: 'Get started', href: '/contact-us/' }}
        secondaryCta={{ label: 'Explore AI agents', href: '/products/ai-agents/' }}
        variant="spotlight"
      />

      <FAQ title="Solutions — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default Solutions
