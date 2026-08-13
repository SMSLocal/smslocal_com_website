import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import BroadcastCapabilityOrbit from '../components/BroadcastCapabilityOrbit.jsx'
import FeatureVerticalIndex from '../components/FeatureVerticalIndex.jsx'
import StepsSignal from '../components/StepsSignal.jsx'
import WhyShorterQueue from '../components/WhyShorterQueue.jsx'
import {
  IconBook, IconGlobe, IconChart, IconRefresh, IconBrain, IconSearch, IconCheck, IconHandshake, IconChat,
} from '../components/icons.jsx'
import SupportQueueDrainHero from '../components/SupportQueueDrainHero.jsx'

const DECISION_STEPS = [
  { icon: <IconChat />, title: 'Reads the exact question', desc: 'No paraphrasing — it works from what the customer actually typed.' },
  { icon: <IconSearch />, title: 'Searches your help centre', desc: 'Matched against your published articles, never a generic guess.' },
  { icon: <IconCheck />, title: 'Answers only on a match', desc: 'If nothing in your help centre covers it, it won’t invent one.' },
  { icon: <IconHandshake />, title: 'Escalates with the thread attached', desc: 'A person picks it up mid-conversation — the customer never repeats themselves.' },
]

const STEPS = [
  { title: 'Connect your help centre', desc: 'Point the agent at your knowledge base, docs or existing help centre content.' },
  { title: 'Set escalation rules', desc: 'Define what counts as tier-one versus what should hand off to a human agent.' },
  { title: 'Go live on every channel', desc: 'Launch on your help widget, WhatsApp, SMS and email from a single deployment.' },
  { title: 'Watch deflection climb', desc: 'Track resolution rate and escalation reasons from day one, and tune as you go.' },
]

const FEATURES = [
  { icon: <IconBook />, title: 'Reads your help centre', desc: 'Grounded in your actual knowledge base and docs, so tier-one answers match your real policies, not a guess.' },
  { icon: <IconGlobe />, title: 'Replies on every channel', desc: 'The same agent answers on your help widget, WhatsApp, SMS and email, so the queue never depends on which channel a customer picked.' },
  { icon: <IconRefresh />, title: 'Deflects, then escalates cleanly', desc: 'Resolves what it can and hands off the rest to a human agent inside the same thread, with full context attached.' },
  { icon: <IconChart />, title: 'Ticket volume you can see', desc: 'Track deflection rate, resolution time and escalation reasons, so support leadership can see exactly where the agent is helping.' },
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
        title="AI Support Agent"
        description="Deflect tier-one questions with an AI agent that reads your help centre and escalates the rest."
        keywords={['AI support agent', 'tier-one ticket deflection', 'AI helpdesk agent', 'support ticket automation']}
      />

      <Hero
        eyebrow="AI Agents"
        title={<>An AI support agent that <span className="grad-word">clears the queue</span>, not just watches it</>}
        subtitle="Deflect and resolve tier-one questions by reading your help centre directly, replying on every channel, and escalating only what genuinely needs a person — with full context attached."
        primaryCta={{ label: 'Deploy an Agent', href: '/contact-us/' }}
        secondaryCta={{ label: 'AI Customer Service Agent', href: '/products/ai-agents/customer-service/' }}
        visual={<SupportQueueDrainHero />}
      />

      <BroadcastCapabilityOrbit
        eyebrow="How it decides"
        title="It answers when your help centre has the answer. Otherwise, it hands you the thread."
        subtitle="No guessing, no generic replies — every response is checked against your real articles first, and escalated with full context when it isn't there."
        items={DECISION_STEPS}
        hubIcon={<IconBrain />}
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

      <WhyShorterQueue />

      <CTABanner
        title="Clear the routine tickets automatically"
        subtitle="Connect your help centre and go live in days — the agent handles the repetitive volume, your team handles the rest."
        cta={{ label: 'Deploy an Agent', href: '/contact-us/' }}
      />

      <FAQ title="AI support agent — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default AiAgentsSupport
