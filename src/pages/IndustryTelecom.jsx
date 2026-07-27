import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import StatBand from '../components/StatBand.jsx'
import ProblemFlipDeck from '../components/ProblemFlipDeck.jsx'
import FeatureGlow from '../components/FeatureGlow.jsx'
import BuildJourneyStepper from '../components/BuildJourneyStepper.jsx'
import WhyUsUnderline from '../components/WhyUsUnderline.jsx'
import { IconPhone, IconBell, IconReceipt, IconCheck, IconClock, IconChart, IconBolt, IconGlobe, IconPlug, IconGear, IconRocket } from '../components/icons.jsx'
import VoiceOmniInboxMock from '../components/VoiceOmniInboxMock.jsx'

const STEPS = [
  { icon: <IconPlug />, title: 'Connect billing & OSS/BSS', desc: 'Link your billing platform and network systems along with every channel.' },
  { icon: <IconGear />, title: 'Train on your plans', desc: 'The agent learns your plan catalogue, billing logic and outage data.' },
  { icon: <IconRocket />, title: 'Go live across channels', desc: 'Launch on SMS, RCS, WhatsApp and voice from a single, consistent brain.' },
  { icon: <IconCheck />, title: 'Alerts run automatically', desc: 'Outage and maintenance broadcasts start the moment network data updates.' },
]

const STATS = [
  { value: '60%', label: 'Fewer billing tickets', desc: 'Automated billing lookups and plan questions resolve without reaching a live agent.' },
  { value: '24/7', label: 'Support coverage', desc: 'Outages, billing and plan questions answered instantly, any hour.' },
  { value: '<1s', label: 'First response time', desc: 'No IVR maze — instant replies across SMS, RCS, WhatsApp and voice.' },
  { value: '5', label: 'Channels, one agent', desc: 'SMS, RCS, WhatsApp, voice and web chat answered from a single, consistent brain.' },
]

const FEATURES = [
  { icon: <IconReceipt />, title: 'Billing questions resolved instantly', desc: 'Looks up real account balance, plan details and charges, and explains them clearly inside the chat.' },
  { icon: <IconBell />, title: 'Proactive outage notifications', desc: 'Broadcasts outage and maintenance alerts to affected customers before the support queue floods.' },
  { icon: <IconPhone />, title: 'Voice AI for phone support', desc: 'Handles inbound calls with natural speech, routing to a human only when the request truly needs one.' },
  { icon: <IconGlobe />, title: 'Omnichannel by default', desc: 'SMS, RCS, WhatsApp and voice all answer from the same account data, so nothing contradicts.' },
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
        title="Agentic AI for Telecom Customer Support and Billing"
        description="Handle support, billing and outage notifications at scale with agentic AI for telecom, plus omnichannel broadcasting across SMS, RCS, WhatsApp and voice."
        keywords={['AI for telecom', 'agentic AI telecom', 'telecom customer support AI', 'telecom AI agent']}
      />

      <Hero
        eyebrow="Telecom"
        title={<>Agentic AI for telecom that ends the <span className="grad-word">IVR maze</span></>}
        subtitle="Resolve billing, plan and outage questions instantly across SMS, RCS, WhatsApp and voice — with proactive alerts that deflect the flood before it hits your queue."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        secondaryCta={{ label: 'Voice AI Agent', href: '/voice-ai-agents' }}
        visual={<VoiceOmniInboxMock />}
      />

      <StatBand items={STATS} />

      <ProblemFlipDeck
        eyebrow="The problem"
        heading="Nobody calls a telecom provider for fun — the IVR shouldn't make it worse."
        paragraph="Every outage, billing cycle and plan promotion sends the same wave of questions into a queue built for average, not peak, volume. Flip the switch to see what changes."
        pairs={[
          { before: 'Billing questions mean five IVR menus', after: 'Billing answered instantly, in the chat' },
          { before: 'Outages flood the queue with the same question', after: 'Outage alerts go out before anyone has to ask' },
          { before: 'Every channel sees a different account view', after: 'Voice and chat share the same account data' },
        ]}
        alt
      />

      <FeatureGlow
        eyebrow="Features"
        title="Covers billing, outages and everything between"
        subtitle="From a plan question to an outage notification, one agent handles it across every channel."
        items={FEATURES}
      />

      <BuildJourneyStepper
        eyebrow="How it works"
        title="Live across every channel in four steps"
        subtitle="From connecting your billing and OSS/BSS systems to alerts that run themselves."
        steps={STEPS}
        alt
      />

      <WhyUsUnderline
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
