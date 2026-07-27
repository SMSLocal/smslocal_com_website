import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCode, IconLink, IconShield, IconRocket, IconCursor, IconChart, IconUsers, IconGear } from '../components/icons.jsx'
import AgentBuilderPrompt from '../components/AgentBuilderPrompt.jsx'
import FeatureFormula from '../components/FeatureFormula.jsx'
import WhyUsManifesto from '../components/WhyUsManifesto.jsx'
import AgentBuildBlueprint from '../components/AgentBuildBlueprint.jsx'
import AgentStatStrip from '../components/AgentStatStrip.jsx'

const FEATURES = [
  { icon: <IconCursor />, title: 'No-code flow builder', desc: 'Design agent behavior visually — steps, conditions and tools.' },
  { icon: <IconCode />, title: 'Code when you need it', desc: 'Drop into custom functions and API calls for advanced logic.' },
  { icon: <IconLink />, title: 'Connect your tools', desc: 'Wire up your CRM, order system or database as agent-callable tools.' },
  { icon: <IconShield />, title: 'Guardrails built in', desc: 'Define exactly what the agent can do autonomously, and what it can\'t.' },
]

const WHY_US = [
  { icon: <IconRocket />, title: 'Fast to build', desc: 'Most custom agents go from idea to live in days, not months.' },
  { icon: <IconGear />, title: 'Flexible by design', desc: 'Mix no-code flows with custom code wherever logic gets complex.' },
  { icon: <IconChart />, title: 'Full observability', desc: 'See every decision, tool call and handoff the agent makes.' },
  { icon: <IconUsers />, title: 'Safe by default', desc: 'Guardrails and human-in-the-loop review before anything ships.' },
]

const FAQS = [
  { q: 'Do I need to code to build an agent?', a: 'No — the visual builder covers most use cases. Custom code is available for advanced logic, but it\'s optional, not required.' },
  { q: 'Can an agent call our own systems?', a: 'Yes, connect your CRM, order system, database or any API as a callable tool the agent can use to complete tasks.' },
  { q: 'How do I control what the agent is allowed to do?', a: 'Guardrails let you define exactly which actions the agent can take autonomously and which require human approval or handoff.' },
  { q: 'Can I deploy the same agent to multiple channels?', a: 'Yes, a single agent definition can be deployed across chat, WhatsApp and voice from the same builder.' },
]

function AiAgentsBuilder() {
  return (
    <>
      <Seo
        title="AI Agent Builder — Build & Deploy Agents"
        description="Build custom AI agents with no-code and code. Connect your data and tools, set guardrails and deploy across channels in one platform."
        keywords={['build AI agents', 'no-code AI agent builder', 'custom AI agent', 'deploy AI agents']}
      />

      <Hero
        eyebrow="Agent Builder"
        title={<>Build a <span className="grad-word">custom AI agent</span>, no-code or code</>}
        subtitle="Connect your data and tools, set clear guardrails, and deploy the same agent across chat, WhatsApp and voice — from one builder."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<AgentBuilderPrompt />}
      />

      <FeatureFormula eyebrow="Features" title={<>Everything you need to build an agent</>} items={FEATURES} />

      <AgentStatStrip eyebrow="At a glance" title={<>One agent, built once</>} />

      <AgentBuildBlueprint eyebrow="How it works" title={<>Deploy a custom agent in three steps</>} alt />

      <WhyUsManifesto eyebrow="Why us" title={<>Why teams build agents on SMSLocal</>} items={WHY_US} />

      <CTABanner
        title="Build your first custom agent"
        subtitle="Connect your tools and set guardrails — live in days."
        cta={{ label: 'Get Started', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>AI agent builder — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default AiAgentsBuilder
