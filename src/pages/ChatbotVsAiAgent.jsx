import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, CompareTable, EcosystemGrid, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconChat, IconBrain, IconCode, IconPencil } from '../components/icons.jsx'

const COMPARE_ROWS = [
  { feature: 'How it works', left: 'Follows a scripted, pre-built flow', right: 'Reasons over context and decides what to do' },
  { feature: 'Actions', left: 'Replies with text or menu options', right: 'Takes real actions — checks, updates, completes tasks' },
  { feature: 'Handles the unexpected', left: 'Falls back to "I didn\'t understand" or a human', right: 'Adapts and resolves outside the scripted path' },
  { feature: 'Setup', left: 'Visual flow builder, fast to launch', right: 'Connect tools and data, set guardrails' },
  { feature: 'Best for', left: 'FAQs, structured menus, simple routing', right: 'End-to-end resolution across complex requests' },
]

const WHEN_TO_USE = [
  { icon: <IconChat />, title: 'Use a chatbot when', desc: 'You need fast, predictable answers to well-defined questions — FAQs, order status, simple routing to a human.', href: '/chatbot' },
  { icon: <IconBrain />, title: 'Use an AI agent when', desc: 'The request needs judgment and real action — checking systems, resolving edge cases, completing multi-step tasks.', href: '/ai-agents' },
]

const FAQS = [
  { q: 'Is an AI agent just a smarter chatbot?', a: 'Not exactly — a chatbot follows a pre-built flow and replies, while an AI agent reasons over context and takes real actions like checking systems or updating records.' },
  { q: 'Can I use both together?', a: 'Yes, many teams use a chatbot for fast, structured answers and escalate anything complex to an AI agent — both share the same inbox.' },
  { q: 'Which one should I start with?', a: 'If your use case is mostly FAQs and simple routing, start with a chatbot. If requests need real judgment or actions, an AI agent is the better fit.' },
  { q: 'Do chatbots and AI agents cost the same?', a: 'Pricing differs by product — see the pricing page for current chatbot and AI agent plans.' },
]

function ChatbotVsAiAgent() {
  return (
    <>
      <Seo
        title="Chatbot vs AI Agent — What's the Difference?"
        description="Chatbots follow scripted flows; AI agents act autonomously to resolve tasks. Compare capabilities, cost and when to use each."
        keywords={['difference between chatbot and AI agent', 'AI agent vs chatbot', 'conversational AI vs agentic AI', 'when to use an AI agent']}
      />

      <Hero
        eyebrow="Comparison"
        title="Chatbot vs AI agent — what's actually different"
        subtitle="One follows a script and replies. The other reasons over context and takes action. Here's how to tell which one you need."
        primaryCta={{ label: 'Explore Chatbots', href: '/chatbot' }}
        secondaryCta={{ label: 'Explore AI Agents', href: '/ai-agents' }}
      />

      <NarrativeCompare
        heading={<>A chatbot answers. An AI agent resolves.</>}
        paragraphs={[
          'A chatbot is built around a flow — if the customer says X, show option Y. It\'s fast to build and predictable, but it only goes as far as the flow was designed to go.',
          "An AI agent doesn't follow a fixed script. It reasons over the conversation and your connected systems, decides what needs to happen, and takes the action — checking an order, updating a record, completing the task — not just replying with text.",
          <>Most teams don't have to choose one forever: <strong>start with a chatbot for structured questions, and add an AI agent for anything that needs real judgment</strong>.</>,
        ]}
        leftLabel="Chatbot"
        leftItems={[
          'Follows a pre-built, scripted flow',
          'Replies with text or menu options',
          'Falls back to a human outside the script',
          'Fast to build for FAQs and simple routing',
        ]}
        rightLabel="AI agent"
        rightItems={[
          'Reasons over context and your data',
          'Takes real actions to resolve a request',
          'Adapts to requests outside a fixed path',
          'Built for end-to-end resolution, not just replies',
        ]}
        alt
      />

      <CompareTable
        title={<>Side by side: chatbot vs AI agent</>}
        subtitle="Same goal — a resolved conversation — very different ways of getting there."
        leftLabel="Chatbot"
        rightLabel="AI Agent"
        rows={COMPARE_ROWS}
      />

      <EcosystemGrid
        title={<>Which one do you need?</>}
        subtitle="Both share the same inbox — you can run either, or both, from one account."
        items={WHEN_TO_USE}
        alt
      />

      <FAQ title={<>Chatbot vs AI agent — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="Not sure which one fits your use case?"
        subtitle="Tell us what you're trying to automate — we'll point you to the right one."
        cta={{ label: 'Talk to Us', href: '/contact' }}
      />
    </>
  )
}

export default ChatbotVsAiAgent
