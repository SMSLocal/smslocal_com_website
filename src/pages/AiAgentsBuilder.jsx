import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, HowItWorks, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCode, IconLink, IconShield, IconRocket, IconCursor, IconChart, IconUsers, IconGear } from '../components/icons.jsx'
import AgentBuilderPrompt from '../components/AgentBuilderPrompt.jsx'
import FeatureFormula from '../components/FeatureFormula.jsx'
import WhyUsManifesto from '../components/WhyUsManifesto.jsx'

const FEATURES = [
  { icon: <IconCursor />, title: 'No-code flow builder', desc: 'Design agent behavior visually — steps, conditions and tools.' },
  { icon: <IconCode />, title: 'Code when you need it', desc: 'Drop into custom functions and API calls for advanced logic.' },
  { icon: <IconLink />, title: 'Connect your tools', desc: 'Wire up your CRM, order system or database as agent-callable tools.' },
  { icon: <IconShield />, title: 'Guardrails built in', desc: 'Define exactly what the agent can do autonomously, and what it can\'t.' },
]

const STEPS = [
  { title: 'Define the agent\'s job', desc: 'Describe what it should handle and connect the tools it needs.' },
  { title: 'Set guardrails & escalation', desc: 'Decide what it can do on its own, and when it hands off to a human.' },
  { title: 'Deploy across channels', desc: 'Publish the same agent to chat, WhatsApp and voice.' },
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
        title="Build a custom AI agent, no-code or code"
        subtitle="Connect your data and tools, set clear guardrails, and deploy the same agent across chat, WhatsApp and voice — from one builder."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<AgentBuilderPrompt />}
      />

      <NarrativeCompare
        eyebrow="The problem"
        heading={<>Most "AI agent builders" are really chatbot builders with a new name.</>}
        paragraphs={[
          "Rebrand a flow-chart chatbot tool as an \"agent builder\" and it still can't do the one thing that makes an agent different — reach into a real system and take an action, not just pick the next branch in a script.",
          "So teams end up building something that talks like an agent but works like a bot, and the gap only shows up once it's live and can't actually resolve anything real.",
          <>A real agent builder connects to <strong>your actual tools — CRM, database, internal APIs</strong> — so what it builds can genuinely act, not just answer.</>,
        ]}
        leftLabel="Chatbot builder, rebranded"
        leftItems={[
          'Flow charts and conditional branches only',
          'No way to call your own systems',
          'No guardrails beyond the flow itself',
          'Can\'t take an action, only reply',
        ]}
        rightLabel="A real agent builder"
        rightItems={[
          'Connect any tool, database or internal API',
          'Custom code for logic the visual builder can\'t express',
          'Guardrails that scope every autonomous action',
          'Full observability into every decision it makes',
        ]}
        alt
      />

      <FeatureFormula eyebrow="Features" title={<>Everything you need to build an agent</>} items={FEATURES} />

      <HowItWorks title={<>Deploy a custom agent in three steps</>} steps={STEPS} alt />

      <WhyUsManifesto eyebrow="Why us" title={<>Why teams build agents on SMSLocal</>} items={WHY_US} />

      <FAQ title={<>AI agent builder — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Build your first custom agent"
        subtitle="Connect your tools and set guardrails — live in days."
        cta={{ label: 'Get Started', href: '/contact' }}
        variant="spotlight"
      />
    </>
  )
}

export default AiAgentsBuilder
