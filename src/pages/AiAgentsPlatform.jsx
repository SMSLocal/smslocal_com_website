import Seo from '../components/Seo.jsx'
import { HowItWorks, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import AgentLiveRunHero from '../components/AgentLiveRunHero.jsx'
import AgentChecksActs from '../components/AgentChecksActs.jsx'
import ChannelHandoffTimeline from '../components/ChannelHandoffTimeline.jsx'
import ApproachMatrix from '../components/ApproachMatrix.jsx'
import {
  IconBrain, IconMic, IconChat, IconUsers, IconLink, IconShield, IconChart, IconGlobe,
  IconDollar, IconCart, IconMail, IconCode, IconCalendar, IconGear, IconPencil,
  IconRefresh, IconClock, IconReceipt, IconMegaphone,
} from '../components/icons.jsx'
import AgentRoster from '../components/AgentRoster.jsx'
import ControlsChecklist from '../components/ControlsChecklist.jsx'

const STEPS = [
  { title: 'Connect', desc: 'One-click connections to your CRM, helpdesk, store or internal tools.' },
  { title: 'Decide', desc: 'The agent reads the conversation, pulls live context, and plans what to do.' },
  { title: 'Act', desc: 'It executes the real action — not just a reply — inside the same thread.' },
]

const CONTROLS = [
  { icon: <IconShield />, title: 'Custom roles', desc: 'Scope exactly which apps and actions each agent is allowed to touch.' },
  { icon: <IconChart />, title: 'Audit logs', desc: 'Every action is recorded — who, what, when and why.' },
  { icon: <IconClock />, title: 'SLA & escalation', desc: 'Honor response-time targets and escalate to a human automatically.' },
  { icon: <IconPencil />, title: 'Macros & canned actions', desc: 'Save reusable one-click actions for your most common requests.' },
  { icon: <IconRefresh />, title: 'Usage-based billing', desc: 'Pay for what you use across channels, not a flat per-seat fee.' },
  { icon: <IconGear />, title: 'Conversation workflows', desc: 'Route, assign and automate the lifecycle of every conversation.' },
]

const TESTIMONIALS = [
  { quote: 'Our agent doesn\'t just answer questions — it actually checks the order system and updates the ticket. That\'s the difference from a chatbot.', name: 'Ananya Rao', role: 'Head of Support' },
  { quote: 'The same agent runs on WhatsApp and picks up phone calls after hours. One brain, every channel.', name: 'Ben Okafor', role: 'Operations Lead' },
  { quote: 'We set clear roles and the agent stays inside them — nothing autonomous that we didn\'t explicitly allow.', name: 'Camila Torres', role: 'VP Customer Experience' },
]

const FAQS = [
  { q: 'What is an agentic AI platform?', a: 'A platform for deploying autonomous AI agents that take real actions — checking records, updating systems, completing tasks in your connected apps — not just answering with text like a traditional chatbot.' },
  { q: 'How is this different from a chatbot?', a: 'A chatbot follows scripted flows and replies. An AI agent reasons over your data, connects to your real tools, and takes actions to actually resolve a request. See our chatbot vs AI agent comparison for details.' },
  { q: 'What tools can the agent connect to?', a: 'CRM, helpdesk, ecommerce, finance, communication and scheduling tools, plus your own internal systems via webhook or API — 180+ apps across 12 categories.' },
  { q: 'How much control do I have over what the agent can do?', a: 'Full control — custom roles scope exactly which apps and actions it can touch, every action is logged, and SLAs decide when it escalates to a human.' },
]

function AiAgentsPlatform() {
  return (
    <>
      <Seo
        title="Agentic AI Platform"
        description="Deploy autonomous AI agents that resolve, not just reply — support, sales and voice in one platform."
        keywords={['AI agent platform', 'autonomous AI agents', 'enterprise AI agents', 'AI agents for customer experience']}
      />

      <AgentLiveRunHero />

      <AgentChecksActs />

      <ChannelHandoffTimeline />

      <ApproachMatrix />

      <AgentRoster />

      <HowItWorks title={<>Connect, decide, act — on autopilot</>} steps={STEPS} alt variant="numbered" />

      <ControlsChecklist eyebrow="Controls" title={<>Built-in controls</>} items={CONTROLS} />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Give your AI agent the keys to your stack"
        subtitle="Connect your first app, scope it with a custom role, and watch it resolve conversations end to end."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
        variant="spotlight"
      />

      <FAQ title={<>Agentic AI — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default AiAgentsPlatform
