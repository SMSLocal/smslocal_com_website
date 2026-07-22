import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import {
  IconBrain, IconGlobe, IconCheck, IconUsers, IconClock, IconChart, IconBolt,
  IconRefresh, IconCart, IconDollar, IconPackage, IconBook, IconShield, IconBriefcase,
} from '../components/icons.jsx'
import AgentWorkflowMock from '../components/AgentWorkflowMock.jsx'
import IndustryCarousel from '../components/IndustryCarousel.jsx'

const STATS = [
  { value: '24/7', label: 'Always-on coverage', desc: 'Resolves queries around the clock, with no shift gaps or holiday queues.' },
  { value: '7', label: 'Channels, one agent', desc: 'WhatsApp, SMS, email, voice, web, Instagram and Messenger from one brain.' },
  { value: '<1s', label: 'First response', desc: 'Sub-second replies at any volume — no customer waits in line for a bot.' },
  { value: '100%', label: 'Context on handoff', desc: 'Every escalation carries the full conversation history to your human team.' },
]

const FEATURES = [
  { icon: <IconGlobe />, title: 'Answers across every channel', desc: 'Handles chat, email, voice and social from one place — grounded in your knowledge base, so every customer gets the same accurate answer.' },
  { icon: <IconCheck />, title: 'Resolves, not just routes', desc: 'Completes multi-step tasks like order lookups and status changes. It closes the conversation instead of opening yet another ticket.' },
  { icon: <IconUsers />, title: 'Escalates with full context', desc: 'When a human is needed, it hands off inside the same thread with the entire history attached — nobody repeats themselves.' },
  { icon: <IconBrain />, title: 'Learns your business', desc: 'Trained on your help center, PDFs and website, so answers match your policies, your tone and your edge cases.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'Always on', desc: 'Full coverage day and night with no shift gaps, so response quality never dips after hours.' },
  { icon: <IconRefresh />, title: 'Consistent answers', desc: 'Every customer receives the same accurate reply, drawn from a single source of truth.' },
  { icon: <IconBolt />, title: 'Instant first reply', desc: 'Sub-second first response at any volume — no queue for simple, common questions.' },
  { icon: <IconChart />, title: 'Higher CSAT', desc: 'Faster resolutions and zero waiting on routine issues lift satisfaction scores measurably.' },
]

const INDUSTRIES = [
  { icon: <IconCart />, title: 'E-commerce & D2C', desc: 'Order status, returns and delivery questions resolved without a ticket.' },
  { icon: <IconDollar />, title: 'Banking & Fintech', desc: 'Account lookups and servicing with a full, auditable action trail.' },
  { icon: <IconPackage />, title: 'Logistics & Delivery', desc: 'Live tracking, reschedules and address changes handled end to end.' },
  { icon: <IconUsers />, title: 'Healthcare', desc: 'Appointment scheduling and patient follow-up, safely within your rules.' },
  { icon: <IconBook />, title: 'Education & EdTech', desc: 'Admissions, enrolment and student queries answered instantly at scale.' },
  { icon: <IconGlobe />, title: 'Travel & Hospitality', desc: 'Bookings, itineraries and support in the traveller\'s own language.' },
  { icon: <IconShield />, title: 'Insurance', desc: 'Policy questions and claim status handled with clear, logged actions.' },
  { icon: <IconBriefcase />, title: 'SaaS & B2B', desc: 'Onboarding help and account troubleshooting deflected from your team.' },
]

const FAQS = [
  { q: 'How is an AI agent different from a chatbot?', a: 'Chatbots follow scripted flows and reply; AI agents autonomously take actions — like issuing a refund or updating an order — to resolve a request end to end. See our chatbot vs AI agent comparison for details.' },
  { q: 'Does it replace my support team?', a: 'No. It handles routine volume so your team can focus on the conversations that genuinely need human judgement. Think of it as a first line that never gets tired.' },
  { q: 'Can it take actions, not just answer questions?', a: 'Yes. Once connected to your tools it completes multi-step tasks — looking up orders, updating statuses and checking account details — within the guardrails you set.' },
  { q: 'How fast can it go live?', a: 'Connect your channels and data, and go live in days — no code required. Most teams are resolving real conversations within their first week.' },
  { q: 'What happens if the agent cannot resolve a request?', a: 'It hands off to a human agent in the same thread with the full conversation context attached, so nothing is lost and the customer never has to repeat themselves.' },
  { q: 'Is pricing based on seats or resolutions?', a: 'We offer both per-resolution and per-seat pricing — see the AI agent pricing page for details.' },
]

function AiAgentsCustomerService() {
  return (
    <>
      <Seo
        title="AI Customer Service Agent"
        description="Resolve customer queries autonomously with an AI customer service agent. 24/7 resolutions across chat, email, voice and social — with full-context human handoff."
        keywords={['AI customer service agent', 'agentic AI support', 'autonomous customer support', 'AI support agent']}
      />

      <Hero
        eyebrow="AI Agents"
        title={<>An AI agent that <span className="grad-word">resolves</span>, not just replies</>}
        subtitle="Deflect repetitive tickets across every channel with an agent that answers from your data, takes real action, and escalates the rest with full context."
        primaryCta={{ label: 'Deploy an Agent', href: '/contact-us' }}
        secondaryCta={{ label: 'Chatbot vs AI Agent', href: '/chatbot-vs-ai-agent' }}
        visual={<AgentWorkflowMock />}
      />

      <StatBand items={STATS} />

      <NarrativeCompare
        variant="statement"
        eyebrow="The problem"
        heading={<>Most "AI support" still just replies. It doesn't resolve.</>}
        paragraphs={[
          "A lot of AI customer service tools are really a chatbot with a better vocabulary — they can explain your refund policy fluently, but they can't actually issue the refund.",
          'So the conversation still ends the same way it always did: a ticket, a wait, a human doing the part that actually mattered.',
          <>An AI agent worth deploying <strong>takes the action, not just explains it</strong> — checking the order, issuing the refund, updating the record, inside the conversation itself.</>,
        ]}
        leftLabel="AI that replies"
        leftItems={[
          'Explains policy, can\'t act on it',
          'Escalates to a ticket for anything real',
          'No memory of the account or order',
          'Same canned answer every time',
        ]}
        rightLabel="AI agent that resolves"
        rightItems={[
          'Looks up real orders and account data',
          'Takes the action — refund, update, resolve',
          'Escalates only when it truly should',
          'Every action logged for review',
        ]}
        alt
      />

      <FeatureGrid
        title={<>Four things that separate an agent from a bot</>}
        subtitle="A bot answers the easy questions. An agent finishes the job — across every channel, grounded in your data."
        items={FEATURES}
        variant="divided"
      />

      <WhyUs
        variant="split"
        eyebrow="Why it works"
        title={<>Speed and accuracy, together</>}
        subtitle="Customers get fast, accurate answers at any hour — and your team focuses on the conversations that genuinely need a person."
        items={BENEFITS}
        alt
      />

      <IndustryCarousel
        eyebrow="Industries"
        title={<>Built for every support-heavy team</>}
        subtitle="One agent, tuned to the workflows and policies of your industry."
        items={INDUSTRIES}
      />

      <CTABanner
        title="Resolve more tickets without adding headcount"
        subtitle="Connect your channels, train the agent on your data, and go live in days. Your team handles what needs a person — the agent handles everything else."
        cta={{ label: 'Deploy an Agent', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>AI customer service agent — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default AiAgentsCustomerService
