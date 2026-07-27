import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import FeatureVerticalIndex from '../components/FeatureVerticalIndex.jsx'
import StepsSignal from '../components/StepsSignal.jsx'
import WhyUsSplitGrid from '../components/WhyUsSplitGrid.jsx'
import { IconBook, IconGlobe, IconUsers, IconClock, IconChart, IconBolt, IconCheck, IconRefresh } from '../components/icons.jsx'
import HeroPhoneMock from '../components/HeroPhoneMock.jsx'

const STEPS = [
  { title: 'Connect your help centre', desc: 'Point the agent at your knowledge base, docs or existing help centre content.' },
  { title: 'Set escalation rules', desc: 'Define what counts as tier-one versus what should hand off to a human agent.' },
  { title: 'Go live on every channel', desc: 'Launch on your help widget, WhatsApp, SMS and email from a single deployment.' },
  { title: 'Watch deflection climb', desc: 'Track resolution rate and escalation reasons from day one, and tune as you go.' },
]

const STATS = [
  { value: '70%', label: 'Tier-one deflection', desc: 'Routine, repetitive questions resolve themselves without ever reaching a human queue.' },
  { value: '24/7', label: 'Coverage', desc: 'The same accurate answers at 3am as at 3pm, with no shift handoff gaps.' },
  { value: '<1s', label: 'First response time', desc: 'No ticket sits unacknowledged — every question gets an instant first reply.' },
  { value: '100%', label: 'Context on handoff', desc: 'Every escalation carries the full conversation and knowledge-base lookup with it.' },
]

const FEATURES = [
  { icon: <IconBook />, title: 'Reads your help centre', desc: 'Grounded in your actual knowledge base and docs, so tier-one answers match your real policies, not a guess.' },
  { icon: <IconGlobe />, title: 'Replies on every channel', desc: 'The same agent answers on your help widget, WhatsApp, SMS and email, so the queue never depends on which channel a customer picked.' },
  { icon: <IconRefresh />, title: 'Deflects, then escalates cleanly', desc: 'Resolves what it can and hands off the rest to a human agent inside the same thread, with full context attached.' },
  { icon: <IconChart />, title: 'Ticket volume you can see', desc: 'Track deflection rate, resolution time and escalation reasons, so support leadership can see exactly where the agent is helping.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'No queue for the routine stuff', desc: 'Password resets, order status and FAQ-shaped tickets stop clogging the queue meant for the hard cases.' },
  { icon: <IconBolt />, title: 'Faster resolution for everyone', desc: 'Tier-one deflection means your human agents spend their time on tickets that actually need judgement.' },
  { icon: <IconUsers />, title: 'Escalates with respect for context', desc: 'A human picking up an escalated ticket sees the full thread — nobody makes the customer repeat themselves.' },
  { icon: <IconCheck />, title: 'Consistent tier-one answers', desc: 'Every customer gets the same accurate answer, sourced from the same help centre, every time.' },
]

const FAQS = [
  { q: 'How is an AI support agent different from an AI customer service agent?', a: 'The support agent focuses specifically on tier-one deflection — reading your help centre and resolving the repetitive, FAQ-shaped tickets fast. See our AI customer service agent for the broader, action-taking version that can also look up orders and issue refunds.' },
  { q: 'What counts as a "tier-one" question it can resolve?', a: 'Password resets, account status, policy questions, basic troubleshooting and anything your help centre already documents an answer for.' },
  { q: 'Does it replace my support team?', a: 'No — it absorbs the repetitive volume so your team spends their time on tickets that genuinely need a person\'s judgement.' },
  { q: 'How does escalation work?', a: 'When a question is outside its scope, it hands off to a human agent inside the same thread, with the full conversation and any help-centre lookups attached.' },
  { q: 'How fast can we connect our help centre?', a: 'Point it at your existing knowledge base, docs or help centre and it starts answering from that content — most teams are live within days.' },
]

function AiAgentsSupport() {
  return (
    <>
      <Seo
        title="AI Support Agent for Ticket Deflection and Escalation"
        description="Deflect and resolve tier-one questions with an AI support agent that reads your help centre, replies on every channel and escalates the rest with context."
        keywords={['AI support agent', 'tier-one ticket deflection', 'AI helpdesk agent', 'support ticket automation']}
      />

      <Hero
        eyebrow="AI Agents"
        title={<>An AI support agent that <span className="grad-word">clears the queue</span>, not just watches it</>}
        subtitle="Deflect and resolve tier-one questions by reading your help centre directly, replying on every channel, and escalating only what genuinely needs a person — with full context attached."
        primaryCta={{ label: 'Deploy an Agent', href: '/contact-us' }}
        secondaryCta={{ label: 'AI Customer Service Agent', href: '/ai-agents/customer-service' }}
        visual={<HeroPhoneMock />}
      />

      <StatBand items={STATS} />

      <NarrativeCompare
        variant="rows"
        eyebrow="The problem"
        heading={<>Most support queues are full of questions that already have a documented answer.</>}
        paragraphs={[
          'A help centre article exists for a reason — but customers still open a ticket instead of finding it, and agents still spend their morning answering the same three questions.',
          "An AI support agent reads the help centre and answers directly — deflecting the routine volume so your team's queue is actually the hard cases.",
        ]}
        leftLabel="Routing problem"
        leftItems={[
          'The answer already exists in the help centre',
          'Customer opens a ticket anyway',
          'Agent answers the same question again',
          'Queue fills with routine, documented answers',
        ]}
        rightLabel="AI support agent"
        rightItems={[
          'Reads the help centre directly',
          'Answers the question on the spot',
          'Escalates only what genuinely needs a person',
          'Queue becomes the hard cases only',
        ]}
        alt
      />

      <FeatureVerticalIndex
        eyebrow="Features"
        title="Built specifically for tier-one deflection"
        subtitle="Grounded in your real help centre, answering on every channel, and escalating cleanly when it should."
        items={FEATURES}
      />

      <StepsSignal
        eyebrow="How it works"
        title="Live and deflecting tickets in four steps"
        subtitle="From connecting your help centre to a deflection rate you can watch climb."
        steps={STEPS}
        alt
      />

      <WhyUsSplitGrid
        eyebrow="Why it works"
        title="A shorter queue, not a bigger team"
        subtitle="Deflecting the repetitive tickets frees your human agents for the ones that actually need them."
        items={BENEFITS}
      />

      <CTABanner
        title="Clear the routine tickets automatically"
        subtitle="Connect your help centre and go live in days — the agent handles the repetitive volume, your team handles the rest."
        cta={{ label: 'Deploy an Agent', href: '/contact-us' }}
      />

      <FAQ title="AI support agent — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default AiAgentsSupport
