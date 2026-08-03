import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import AgentDirectory from '../components/AgentDirectory.jsx'
import AgentRunConsole from '../components/AgentRunConsole.jsx'
import ChannelContinuity from '../components/ChannelContinuity.jsx'
import AgentAfternoonAscent from '../components/AgentAfternoonAscent.jsx'
import AgentGroundingProof from '../components/AgentGroundingProof.jsx'
import {
  IconBrain, IconLink, IconRefresh, IconCheck, IconChat, IconChart, IconMic,
  IconCursor, IconCalendar, IconUsers, IconMail, IconBolt, IconShield, IconReceipt, IconSearch,
} from '../components/icons.jsx'
import AgentOrbitVisual from '../components/AgentOrbitVisual.jsx'

const CAPABILITIES = [
  { icon: <IconBrain />, title: 'Answers grounded in your content', desc: 'Replies from your FAQs, policies and catalog — in your tone, only from sources you approve. When it doesn\'t know, it says so and offers a human.' },
  { icon: <IconLink />, title: 'Takes real action across your apps', desc: 'Looks up orders and invoices, issues a refund, updates a record or raises a ticket — resolving the request end to end, not just describing it.' },
  { icon: <IconRefresh />, title: 'Reads intent, routes and escalates', desc: 'Detects frustration and churn signals, scores risk, routes each conversation to the right team, and escalates the instant your rules say so.' },
  { icon: <IconCheck />, title: 'Summarizes, logs and hands off', desc: 'Turns a long thread into a one-line recap with the next best action, saves it to the customer\'s profile, and briefs your team fully.' },
]

const AGENT_TYPES = [
  { group: 'Build & assist', icon: <IconCursor />, title: 'AI agent builder', desc: 'Draw the flow, connect your apps and publish — no engineering ticket.', channels: ['Visual builder', 'No-code'], href: '/products/ai-agents/agent-builder/' },
  { group: 'Build & assist', icon: <IconUsers />, title: 'Agent assist', desc: 'Drafts the reply, pulls the order and summarises the thread for your team.', channels: ['Inbox', 'Copilot'], href: '/ai-agents/agent-assist/' },

  { group: 'Support', icon: <IconChat />, title: 'Customer service agent', desc: 'Resolves tickets end to end and escalates with a full handoff summary.', channels: ['WhatsApp', 'SMS', 'Email'], href: '/products/ai-agents/customer-service/' },
  { group: 'Support', icon: <IconChat />, title: 'WhatsApp AI agent', desc: 'Answers, verifies and completes requests on your verified number.', channels: ['WhatsApp'], href: '/ai-agents/whatsapp/' },
  { group: 'Support', icon: <IconLink />, title: 'Omnichannel agents', desc: 'One agent that keeps the same context as the customer switches channel.', channels: ['All channels'], href: '/ai-agents/omnichannel-agent/' },
  { group: 'Support', icon: <IconMic />, title: 'Voice AI agent', desc: 'Picks up the call already knowing the chat history and account state.', channels: ['Voice', 'IVR'], href: '/products/ai-agents/voice/' },

  { group: 'Revenue', icon: <IconChart />, title: 'Sales & SDR agent', desc: 'Recovers carts, answers product questions and guides shoppers to checkout.', channels: ['WhatsApp', 'SMS'], href: '/products/ai-agents/sales/' },
  { group: 'Revenue', icon: <IconSearch />, title: 'Lead qualification agent', desc: 'Scores inbound leads against your criteria and routes them to the right rep.', channels: ['CRM', 'Email'], href: '/ai-agents/lead-qualification/' },

  { group: 'Industry', icon: <IconReceipt />, title: 'Ecommerce agents', desc: 'Tracks orders, processes returns and issues refunds inside the thread.', channels: ['Shopify', 'WhatsApp'], href: '/ai-agents/ecommerce/' },
  { group: 'Industry', icon: <IconShield />, title: 'Financial services agents', desc: 'Handles balance, card and KYC requests with every action audit-logged.', channels: ['Voice', 'SMS'], href: '/ai-agents/financial-services/' },
  { group: 'Industry', icon: <IconCalendar />, title: 'Healthcare agents', desc: 'Books, reschedules and reminds — without exposing patient data.', channels: ['Voice', 'SMS'], href: '/ai-agents/healthcare/' },
]

const CHANNELS = [
  { icon: <IconChat />, title: 'WhatsApp', desc: 'Official Business API — broadcasts, support and the AI agent on one verified number.' },
  { icon: <IconBolt />, title: 'SMS & RCS', desc: 'Compliant SMS and branded RCS from the same agent, knowledge and wallet.' },
  { icon: <IconMail />, title: 'Email', desc: 'Triage, draft and send email replies inside the same shared inbox.' },
  { icon: <IconMic />, title: 'Voice', desc: 'Hand a voice call the full context the chat agent already gathered.' },
]

const STEPS = [
  { title: 'Connect your apps and data', desc: 'One-click OAuth to your CRM, payments, store and helpdesk — the agent inherits the right scopes to read and act.' },
  { title: 'Train on your knowledge', desc: 'Drop in your FAQ docs, policies, catalog and past transcripts. Indexed in minutes, every answer tracing back to a source.' },
  { title: 'Set guardrails and go live', desc: 'Scope roles, set SLAs and handoff rules, then plug into your existing WhatsApp, SMS, email and voice inbox.' },
]

const TESTIMONIALS = [
  { quote: 'We connected our order system and helpdesk in an afternoon — the agent was resolving real tickets by the next morning.', name: 'Priya Menon', role: 'Head of Customer Ops' },
  { quote: 'What sold us was the escalation — it hands off with a full summary instead of dumping a cold transcript on our team.', name: 'Daniel Cross', role: 'Support Director' },
  { quote: 'Same agent, same guardrails, across chat and voice — we stopped maintaining two separate automations.', name: 'Fatima Al-Sayed', role: 'Operations Lead' },
]

const FAQS = [
  { q: 'What is an AI agent?', a: 'An autonomous assistant that understands intent, looks up live data and takes real actions across your connected apps to resolve a request end to end — not just a chatbot that replies with scripted text.' },
  { q: 'How is it different from a chatbot?', a: 'A chatbot follows a script and can only reply. An agent reasons over the conversation, pulls real information from your tools, and completes the task — issuing a refund, updating an order or booking a slot — inside the same thread.' },
  { q: 'Will it answer things it shouldn\'t?', a: 'No. It answers only from the sources you approve, and every reply traces back to a source document. When it isn\'t confident, it says so and offers a human instead of inventing an answer.' },
  { q: 'What apps can it connect to?', a: 'CRM, payments, e-commerce, helpdesk, communication and developer tools — 300+ apps across 16 categories, connected with one-click OAuth.' },
  { q: 'How does the human handoff work?', a: 'When the agent escalates, your teammate opens the same thread with the full transcript pinned, the intent summarised and the next best action queued — so nobody starts cold or asks the customer to repeat themselves.' },
  { q: 'How long does it take to launch?', a: 'Connect your apps and data, set your guardrails, and go live across channels in a day — no engineering team required.' },
]

function AiAgentsOverview() {
  return (
    <>
      <Seo
        title="AI Agents for Every Business Conversation"
        description="Deploy AI agents that resolve support, close sales and qualify leads — grounded in your data, taking action across 300+ apps, with human handoff."
        keywords={['AI agents', 'agentic AI', 'autonomous AI agents', 'AI agent for support and sales']}
      />

      <Hero
        eyebrow="AI Agents"
        title={<>AI agents for <span className="grad-word">every conversation</span></>}
        subtitle="Deploy agents that resolve support, close sales, fill your calendar and qualify leads — grounded in your data, taking real action across your apps, and handing off to a human the moment it's needed."
        primaryCta={{ label: 'Start Free', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<AgentOrbitVisual />}
      />

      <AgentRunConsole
        eyebrow="Capabilities"
        title={<>An agent that thinks, acts, and knows when to step back</>}
        subtitle="Pick a real ticket and watch it run — reading intent, checking your data, taking action, or stopping and calling a human."
      />

      <AgentDirectory
        eyebrow="Agent types"
        title={<>An agent for every job</>}
        subtitle="Support, sales, voice and more — sharing the same inbox, data and guardrails."
        items={AGENT_TYPES}
        alt
      />

      <ChannelContinuity
        eyebrow="Channels"
        title={<>One thread. Four channels. <span className="grad-word">Nothing repeated.</span></>}
        subtitle="One customer, four channels, one week — and the agent never starts over."
      />

      <AgentAfternoonAscent
        eyebrow="How it works"
        title={<>From connected apps to first resolution, in an afternoon</>}
        subtitle="One real afternoon, 2:04pm to 4:47pm — from zero connected apps to a ticket the agent closed by itself."
        alt
      />

      <AgentGroundingProof
        eyebrow="Grounding"
        title={<>Every answer traces back to a file <span className="grad-word">you approved</span></>}
        subtitle="And when nothing in your content covers the question, it says so instead of inventing an answer."
      />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Give your agent the keys to your stack"
        subtitle="Connect your first app, train it on your content, and watch it resolve conversations end to end."
        cta={{ label: 'Start Free', href: '/contact-us/' }}
        variant="spotlight"
      />

      <FAQ title={<>AI agents — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default AiAgentsOverview
