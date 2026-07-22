import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import AgentDirectory from '../components/AgentDirectory.jsx'
import CapabilitiesFlow from '../components/CapabilitiesFlow.jsx'
import ChannelsThread from '../components/ChannelsThread.jsx'
import JourneyAscent from '../components/JourneyAscent.jsx'
import ControlDials from '../components/ControlDials.jsx'
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
  { icon: <IconCursor />, title: 'AI agent builder', desc: 'Build agents visually, no code.', href: '/ai-agents/agent-builder' },
  { icon: <IconChat />, title: 'Customer service agent', desc: 'Resolves tickets on every channel.', href: '/ai-agents/customer-service' },
  { icon: <IconChart />, title: 'Sales & SDR agent', desc: 'Guides shoppers to checkout.', href: '/ai-agents/sales' },
  { icon: <IconSearch />, title: 'Lead qualification agent', desc: 'Scores and routes inbound leads.', href: '/ai-agents/lead-qualification' },
  { icon: <IconUsers />, title: 'Agent assist', desc: 'Drafts replies for your team.', href: '/ai-agents/agent-assist' },
  { icon: <IconMic />, title: 'Voice AI agent', desc: 'Handles calls with full context.', href: '/voice-ai-agents' },
  { icon: <IconChat />, title: 'WhatsApp AI agent', desc: 'Resolves chats on WhatsApp.', href: '/ai-agents/whatsapp' },
  { icon: <IconLink />, title: 'Omnichannel agents', desc: 'One agent, every channel.', href: '/ai-agents/omnichannel-agent' },
  { icon: <IconReceipt />, title: 'Ecommerce agents', desc: 'Handles orders, returns and refunds.', href: '/ai-agents/ecommerce' },
  { icon: <IconShield />, title: 'Financial services agents', desc: 'Audited banking and fintech support.', href: '/ai-agents/financial-services' },
  { icon: <IconCalendar />, title: 'Healthcare agents', desc: 'Scheduling and reminders, done safely.', href: '/ai-agents/healthcare' },
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

const CONTROLS = [
  { icon: <IconCursor />, title: 'Macros & canned replies', desc: 'One-click multi-step actions and saved replies, available to both the agent and your team.' },
  { icon: <IconChart />, title: 'SLA policies', desc: 'Set first-response and resolution targets; the agent works to them and escalates before they breach.' },
  { icon: <IconShield />, title: 'Custom roles', desc: 'Scope exactly which apps, actions and conversations each teammate — and the agent — can access.' },
  { icon: <IconReceipt />, title: 'Audit logs', desc: 'Every lookup, action and handoff is logged — who, what, when and why — and exportable for compliance.' },
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
        title="AI Agents for Every Conversation"
        description="Deploy AI agents that resolve support, close sales, book appointments and qualify leads — grounded in your data, taking real action across 300+ apps, with clean human handoff."
        keywords={['AI agents', 'agentic AI', 'autonomous AI agents', 'AI agent for support and sales']}
      />

      <Hero
        eyebrow="AI Agents"
        title={<>AI agents for <span className="grad-word">every conversation</span></>}
        subtitle="Deploy agents that resolve support, close sales, fill your calendar and qualify leads — grounded in your data, taking real action across your apps, and handing off to a human the moment it's needed."
        primaryCta={{ label: 'Start Free', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<AgentOrbitVisual />}
      />

      <CapabilitiesFlow
        eyebrow="Capabilities"
        title={<>An agent that thinks, acts, and knows when to step back</>}
        subtitle="Not a scripted bot — an agent that answers from your data, takes real action, and escalates cleanly."
        items={CAPABILITIES}
      />

      <AgentDirectory
        eyebrow="Agent types"
        title={<>An agent for every job</>}
        subtitle="Support, sales, voice and more — sharing the same inbox, data and guardrails."
        items={AGENT_TYPES}
        alt
      />

      <ChannelsThread
        eyebrow="Channels"
        title={<>One agent, every channel</>}
        subtitle="The same agent, knowledge and actions everywhere your customers message — on your existing numbers, billed from one wallet."
        items={CHANNELS}
      />

      <JourneyAscent
        eyebrow="How it works"
        title={<>From connected apps to first resolution, in an afternoon</>}
        steps={STEPS}
        alt
      />

      <ControlDials
        eyebrow="Built-in controls"
        title={<>A real help desk, not just a bot</>}
        subtitle="Autonomy never means a loss of oversight — the agent works inside the guardrails your team already relies on."
        items={CONTROLS}
      />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Give your agent the keys to your stack"
        subtitle="Connect your first app, train it on your content, and watch it resolve conversations end to end."
        cta={{ label: 'Start Free', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>AI agents — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default AiAgentsOverview
