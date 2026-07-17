import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import AgentTypesGrid from '../components/AgentTypesGrid.jsx'
import {
  IconCursor, IconBrain, IconRocket, IconUsers, IconGlobe, IconChart, IconClock, IconPlug,
  IconChat, IconMegaphone,
} from '../components/icons.jsx'
import DeployFanVisual from '../components/DeployFanVisual.jsx'
import FeatureGlow from '../components/FeatureGlow.jsx'
import BuildStepsFlow from '../components/BuildStepsFlow.jsx'
import WhyUsQuadrant from '../components/WhyUsQuadrant.jsx'

const FEATURES = [
  { icon: <IconCursor />, title: 'Drag-and-drop builder', desc: 'Design multi-step conversations visually, no code required.' },
  { icon: <IconBrain />, title: 'AI-generated answers', desc: 'Let AI handle open-ended questions your flow does not cover.' },
  { icon: <IconRocket />, title: 'Deploy everywhere', desc: 'Publish one bot to WhatsApp, your website, SMS and social.' },
  { icon: <IconUsers />, title: 'Human handoff', desc: 'Escalate to a live agent inbox whenever a conversation needs one.' },
]

const USE_CASES = [
  { icon: <IconCursor />, title: 'No-code builder', desc: 'Design multi-step conversation flows visually, with conditions and AI fallbacks — no code required.', href: '/chatbot/builder' },
  { icon: <IconChat />, title: 'WhatsApp chatbot', desc: 'Automate WhatsApp conversations end to end on the verified Business API.', href: '/chatbot/whatsapp' },
  { icon: <IconGlobe />, title: 'Website chatbot', desc: 'Answer visitors, capture leads and route to a human, right on your site.', href: '/chatbot/website' },
  { icon: <IconMegaphone />, title: 'SMS chatbot', desc: 'Two-way automated conversations over plain SMS, wherever your customers are.', href: '/chatbot/sms' },
]

const STEPS = [
  { icon: <IconCursor />, title: 'Start from a template', desc: 'Pick a template for support, sales or lead gen — or start blank.', chips: ['Support', 'Sales', 'Lead gen'] },
  { icon: <IconBrain />, title: 'Design your flow', desc: 'Add steps, conditions and AI-answer fallbacks visually.', chips: ['Steps', 'Conditions', 'AI fallback'] },
  { icon: <IconRocket />, title: 'Deploy everywhere', desc: 'Publish to one or multiple channels with a single click.', chips: ['WhatsApp', 'Website', 'SMS', 'Social'] },
]

const WHY_US = [
  { icon: <IconClock />, title: 'Launch in a day', desc: 'Most teams publish their first bot in under a day.' },
  { icon: <IconPlug />, title: 'Channel-agnostic', desc: 'One flow, deployed across WhatsApp, web, SMS and social.' },
  { icon: <IconUsers />, title: 'Human handoff built-in', desc: 'Escalate to a live agent inbox whenever needed.' },
  { icon: <IconChart />, title: 'Flow analytics', desc: 'See drop-off points and completion rates per flow.' },
]

const TESTIMONIALS = [
  { quote: 'We built and deployed our first bot to WhatsApp and our website in the same afternoon — no developer involved.', name: 'Ritu Sharma', role: 'Support Lead, D2C brand' },
  { quote: 'When the bot can\'t answer, it hands off to a human with full context. Our team never has to ask the customer to repeat themselves.', name: 'Owen Park', role: 'Customer Experience Manager' },
  { quote: 'Flow analytics showed us exactly where customers were dropping off — we fixed it in a day and conversions jumped.', name: 'Isabela Costa', role: 'Growth Lead' },
]

const FAQS = [
  { q: 'What is a no-code chatbot platform?', a: 'A visual tool for designing chatbot conversations without writing code, using drag-and-drop steps, conditions and AI-answer fallbacks.' },
  { q: 'Can I deploy the same bot to multiple channels?', a: 'Yes, a single flow can be published to WhatsApp, your website, SMS and social channels from one builder.' },
  { q: 'Does the platform support AI-generated answers?', a: 'Yes, you can let AI handle questions outside your defined flow, falling back to a live agent if needed.' },
  { q: 'Is there a free plan to try the builder?', a: 'Yes — start free and see the chatbot pricing page for plan details as you scale.' },
]

function ChatbotPlatform() {
  return (
    <>
      <Seo
        title="AI Chatbot Platform for Business"
        description="Build and deploy AI chatbots across WhatsApp, web, SMS and social from one platform. No-code builder, live-agent handoff and analytics."
        keywords={['AI chatbot platform', 'conversational AI platform', 'chatbot software', 'enterprise chatbot platform']}
      />

      <Hero
        eyebrow="Chatbot Platform"
        title="Build a chatbot once, deploy it on every channel"
        subtitle="Drag-and-drop conversation flows, AI-generated answers, and one-click deploy to WhatsApp, your website, SMS and social."
        primaryCta={{ label: 'Start Free', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<DeployFanVisual />}
      />

      <FeatureGlow title={<>Everything you need to launch a bot</>} items={FEATURES} alt />

      <AgentTypesGrid
        eyebrow="Explore"
        title={<>Built for every use case</>}
        subtitle="The same builder, tuned for how your team actually uses it."
        items={USE_CASES}
      />

      <BuildStepsFlow title={<>From idea to live bot in three steps</>} steps={STEPS} alt />

      <WhyUsQuadrant title={<>Why teams build with our platform</>} items={WHY_US} />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} alt />

      <FAQ title={<>Chatbot platform — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="Build your first chatbot free"
        subtitle="No credit card required to get started."
        cta={{ label: 'Start Free', href: '/contact' }}
      />
    </>
  )
}

export default ChatbotPlatform
