import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, HowItWorks, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconChat, IconSearch, IconCheck, IconGlobe, IconBolt, IconUsers, IconShield, IconChart } from '../components/icons.jsx'
import AgentWorkflowMock from '../components/AgentWorkflowMock.jsx'
import FeatureVerticalIndex from '../components/FeatureVerticalIndex.jsx'
import WhyUsSplitGrid from '../components/WhyUsSplitGrid.jsx'

const FEATURES = [
  { icon: <IconChat />, title: 'Suggested replies', desc: 'Drafts a ready-to-send reply in your tone that the agent can edit and send in one click.' },
  { icon: <IconSearch />, title: 'Knowledge at hand', desc: 'Surfaces the exact policy, doc or past answer for the question, right inside the reply box.' },
  { icon: <IconCheck />, title: 'Auto-summaries', desc: 'Turns a long thread into a one-line recap so anyone picking it up is instantly up to speed.' },
  { icon: <IconGlobe />, title: 'Tone & translation', desc: 'Rewrites, shortens or translates a reply on the fly, so every message reads clearly.' },
]

const STEPS = [
  { title: 'Connect your helpdesk', desc: 'Assist plugs into the inbox and tools your agents already work in.' },
  { title: 'Train on your content', desc: 'Point it at your help center and past conversations so suggestions match your answers.' },
  { title: 'Turn on assist', desc: 'Agents get suggestions, context and summaries in the reply box from day one.' },
]

const WHY_US = [
  { icon: <IconBolt />, title: 'Lower handle time', desc: 'Agents stop searching and retyping — the answer is already drafted.' },
  { icon: <IconCheck />, title: 'Consistent answers', desc: 'Every agent replies from the same source of truth, in the same tone.' },
  { icon: <IconUsers />, title: 'Faster onboarding', desc: 'New agents perform like veterans with the right context surfaced automatically.' },
  { icon: <IconShield />, title: 'Human stays in control', desc: 'Nothing sends on its own — the agent reviews and approves every reply.' },
]

const FAQS = [
  { q: 'What is agent assist?', a: 'An AI copilot inside your support inbox that drafts replies, surfaces the right knowledge and summarizes threads — helping human agents resolve faster without replacing them.' },
  { q: 'Does it send messages automatically?', a: 'No. Assist suggests; your agent reviews, edits and sends. The human stays in control of every reply.' },
  { q: 'Where do its answers come from?', a: 'From your help center, policies and past conversations — the same approved sources your team relies on.' },
  { q: 'Which helpdesks does it work with?', a: 'It plugs into common helpdesks and shared inboxes, working right inside the reply box your agents already use.' },
]

function AiAgentsAgentAssist() {
  return (
    <>
      <Seo
        title="AI Agent Assist — Copilot for Support Agents"
        description="Give your support agents an AI copilot. Agent assist drafts replies, surfaces knowledge and summarizes threads so your team resolves faster."
        keywords={['agent assist', 'AI copilot for support', 'reply suggestions', 'support agent AI']}
      />

      <Hero
        eyebrow="AI Agents"
        title="An AI copilot for your support agents"
        subtitle="Agent assist drafts replies, surfaces the right knowledge and summarizes threads — so your human agents resolve faster, in their own words."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents' }}
        visual={<AgentWorkflowMock />}
      />

      <NarrativeCompare
        variant="stat"
        eyebrow="The problem"
        heading={<>Your best agents spend half their time searching and retyping.</>}
        paragraphs={[
          'A customer asks a question, and the agent opens three tabs — the help center, the order system, an old ticket — to piece together an answer they then type from scratch.',
          <>Agent assist removes that busywork — <strong>drafting the reply and surfacing the context</strong> right in the inbox, so the agent just reviews, tweaks and sends.</>,
        ]}
        rightLabel="The problem, in numbers"
        stat={{
          value: '60%',
          desc: 'of a support agent\'s handle time goes to searching for context and retyping answers — not talking to the customer.',
        }}
        alt
      />

      <FeatureVerticalIndex eyebrow="Features" title={<>An assistant that sits in the reply box</>} items={FEATURES} />

      <HowItWorks title={<>Live for your team in three steps</>} steps={STEPS} alt variant="compact" />

      <WhyUsSplitGrid eyebrow="Why us" title={<>Why teams turn on agent assist</>} items={WHY_US} />

      <FAQ title={<>Agent assist — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Give every agent a copilot"
        subtitle="Turn on agent assist and cut handle time without adding headcount."
        cta={{ label: 'Get Started', href: '/contact' }}
        variant="spotlight"
      />
    </>
  )
}

export default AiAgentsAgentAssist
