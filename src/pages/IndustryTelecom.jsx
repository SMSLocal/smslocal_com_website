import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import ProblemIvrMaze from '../components/ProblemIvrMaze.jsx'
import FeatureBroadcastShowcase from '../components/FeatureBroadcastShowcase.jsx'
import StepsAnimatedPanel from '../components/StepsAnimatedPanel.jsx'
import WhyUsDashList from '../components/WhyUsDashList.jsx'
import { IconCheck, IconClock, IconChart, IconBolt } from '../components/icons.jsx'
import TelecomNetworkHeroMock from '../components/TelecomNetworkHeroMock.jsx'

const STEPS = [
  { title: 'Connect billing & OSS/BSS', desc: 'Link your billing platform and network systems along with every channel.' },
  { title: 'Train on your plans', desc: 'The agent learns your plan catalogue, billing logic and outage data.' },
  { title: 'Go live across channels', desc: 'Launch on SMS, RCS, WhatsApp and voice from a single, consistent brain.' },
  { title: 'Alerts run automatically', desc: 'Outage and maintenance broadcasts start the moment network data updates.' },
]

const FEATURE_TYPES = [
  { title: 'Billing questions resolved instantly', desc: 'Real balance, plan and charges, explained in the chat' },
  { title: 'Proactive outage notifications', desc: 'Broadcasts before the support queue floods' },
  { title: 'Voice AI for phone support', desc: 'Natural speech, routed to a human only when needed' },
  { title: 'Omnichannel by default', desc: 'SMS, RCS, WhatsApp and voice share one account view' },
]

const FEATURE_MESSAGES = [
  { sender: 'NOVA MOBILE', time: '14:02', text: 'Your balance is $84.20 — $12 of that is a roaming charge from March 2. Full breakdown: smsl.co/bill' },
  { sender: 'NOVA MOBILE', time: '19:45', text: "We're aware of an issue affecting sign-ins in your area. Live updates: smsl.co/status" },
  { sender: 'NOVA MOBILE', time: '11:20', text: "Confirmed by phone — you're switched to the Unlimited Plus plan, effective next cycle." },
  { sender: 'NOVA MOBILE', time: '09:15', text: 'Picking up where you left off on chat — your request is already up to date here on WhatsApp.' },
]

const FEATURE_STATS = [
  { value: '60%', label: 'fewer billing tickets' },
  { value: '9s', label: 'to reach the whole base' },
  { value: '<1s', label: 'first response time' },
  { value: '5', label: 'channels, one agent' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'No IVR fatigue', desc: 'Customers get a direct answer instead of navigating a phone menu to reach a human.' },
  { icon: <IconBolt />, title: 'Fewer outage-driven ticket floods', desc: 'Proactive alerts deflect the wave of "is the network down" contacts before they hit your queue.' },
  { icon: <IconChart />, title: 'Lower cost to serve', desc: 'Routine billing and plan questions resolve automatically, cutting call centre volume at scale.' },
  { icon: <IconCheck />, title: 'Consistent across every channel', desc: 'The same accurate account answer whether the customer calls, texts or messages on WhatsApp.' },
]

const FAQS = [
  { q: 'Can it handle billing disputes and plan changes directly?', a: 'Connected to your billing and OSS/BSS systems, it can look up real charges and process straightforward plan changes inside the conversation.' },
  { q: 'Does it work over voice, not just chat?', a: 'Yes — the same agent powers natural phone conversations with speech-to-text and text-to-speech, and routes to a human when needed.' },
  { q: 'Can it notify customers proactively about an outage?', a: 'Yes, broadcasting sends targeted outage and maintenance alerts to affected areas automatically, reducing inbound volume.' },
  { q: 'How does it handle a request beyond its authority, like a contract dispute?', a: 'It escalates to a human agent with full context and call or chat history attached, so nothing has to be repeated.' },
  { q: 'How fast can a telecom operator deploy this across channels?', a: 'Most telecom teams connect their billing and OSS systems and go live across SMS, RCS, WhatsApp and voice within weeks.' },
]

function IndustryTelecom() {
  return (
    <>
      <Seo
        title="Agentic AI for Telecom Support & Billing"
        description="Handle support, billing and outage notifications at scale with agentic AI for telecom, plus omnichannel broadcasting across SMS, RCS, WhatsApp and voice."
        keywords={['AI for telecom', 'agentic AI telecom', 'telecom customer support AI', 'telecom AI agent']}
      />

      <Hero
        eyebrow="Telecom"
        title={<>Agentic AI for telecom that ends the <span className="grad-word">IVR maze</span></>}
        subtitle="Resolve billing, plan and outage questions instantly across SMS, RCS, WhatsApp and voice — with proactive alerts that deflect the flood before it hits your queue."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        secondaryCta={{ label: 'Voice AI Agent', href: '/voice-ai-agents' }}
        visual={<TelecomNetworkHeroMock />}
      />

      <ProblemIvrMaze
        eyebrow="The problem"
        heading={<>Nobody calls a telecom provider for fun — the IVR shouldn&rsquo;t make it worse.</>}
        paragraph="Every outage, billing cycle and plan promotion sends the same wave of questions into a queue built for average, not peak, volume. Agentic AI answers before the call even needs to happen."
        menu={[
          'Press 1 for billing',
          'Press 2 to report an outage',
          'Press 3 for plans & upgrades',
          'Press 0 to repeat this menu',
        ]}
        resolved={'"Why is my bill $12 higher this month?" — Answered in 4 seconds, no hold music.'}
        alt
      />

      <FeatureBroadcastShowcase
        eyebrow="Features"
        title="Covers billing, outages and everything between"
        subtitle="From a plan question to an outage notification, one agent handles it across every channel."
        typesLabel="Feature"
        types={FEATURE_TYPES}
        messagesLabel="Conversation"
        messagesCountLabel="moments"
        messages={FEATURE_MESSAGES}
        statsLabel="What it drives"
        stats={FEATURE_STATS}
        caption="Four different moments, one consistent account view — across SMS, RCS, WhatsApp and voice."
      />

      <StepsAnimatedPanel
        eyebrow="How it works"
        title="Live across every channel in four steps"
        steps={STEPS}
        alt
      />

      <WhyUsDashList
        eyebrow="Why it works"
        title="Lower cost to serve, higher satisfaction"
        subtitle="Instant, accurate answers across every channel reduce both ticket volume and customer frustration."
        items={BENEFITS}
      />

      <CTABanner
        title="Retire the IVR maze"
        subtitle="Deploy an agentic AI telecom agent across SMS, RCS, WhatsApp and voice in weeks."
        cta={{ label: 'Talk to Sales', href: '/contact-us' }}
      />

      <FAQ title="Agentic AI for telecom — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryTelecom
