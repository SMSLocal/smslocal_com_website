import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import BuildingBlocksCarousel from '../components/BuildingBlocksCarousel.jsx'
import { IconCursor, IconBrain, IconRocket, IconFlask, IconClock, IconPlug, IconUsers, IconGear, IconLink, IconChat } from '../components/icons.jsx'
import BuilderCanvasVisual from '../components/BuilderCanvasVisual.jsx'
import ComparisonStrip from '../components/ComparisonStrip.jsx'
import FeatureSpotlight from '../components/FeatureSpotlight.jsx'
import StepsChevron from '../components/StepsChevron.jsx'

const FEATURES = [
  { icon: <IconCursor />, title: 'Drag-and-drop flows', desc: 'Build multi-step conversations visually on a canvas with a bird\'s-eye view of the whole bot — no code required.' },
  { icon: <IconBrain />, title: 'AI-generated answers', desc: 'Let AI handle open-ended questions your flow doesn\'t cover, grounded in your FAQs with a live-agent fallback.' },
  { icon: <IconRocket />, title: 'One-click deploy', desc: 'Publish the same bot to WhatsApp, website, SMS and social from a single flow.' },
  { icon: <IconFlask />, title: 'Built-in testing', desc: 'Preview and test the full conversation before publishing anything live.' },
]

const BLOCKS = [
  { icon: <IconGear />, title: 'Conditional logic', desc: 'Branch the conversation on tags, answers, order count or business hours — the right reply for every visitor.' },
  { icon: <IconLink />, title: 'Data capture & CRM sync', desc: 'Collect name, email and intent inside the chat, then push it to your CRM, Google Sheets or a webhook automatically.' },
  { icon: <IconClock />, title: 'Follow-up sequences', desc: 'Send timed nudges — immediately, after an hour or days later — to keep conversations alive without lifting a finger.' },
  { icon: <IconChat />, title: 'Rich media & quick replies', desc: 'Drop images, videos, documents and one-tap buttons into any step for faster, friendlier conversations.' },
  { icon: <IconUsers />, title: 'User variables', desc: 'Store customer attributes and reuse them to personalise every reply across the flow.' },
  { icon: <IconPlug />, title: 'API & webhooks', desc: 'Pull live data from your other tools mid-conversation so the bot always answers with the latest information.' },
]

const STEPS = [
  { icon: <IconCursor />, title: 'Start from a template', desc: 'Pick a template for support, sales or lead gen — or start blank.' },
  { icon: <IconGear />, title: 'Design your flow', desc: 'Add steps, conditions and AI-answer fallbacks visually.' },
  { icon: <IconRocket />, title: 'Deploy everywhere', desc: 'Publish to one or multiple channels with a single click.' },
]

const FAQS = [
  { q: 'What is a no-code chatbot builder?', a: 'It is a visual tool for designing chatbot conversations without writing code, using drag-and-drop steps, conditions and AI-answer fallbacks on a single canvas.' },
  { q: 'Can I deploy the same bot to multiple channels?', a: 'Yes, a single flow can be published to WhatsApp, your website, SMS and social channels — no separate rebuild per channel.' },
  { q: 'Can I collect customer details and send them to my CRM?', a: 'Yes. Ask qualifying questions in the flow and the answers save automatically — export them to Google Sheets or sync straight to your CRM via webhook.' },
  { q: 'Can the bot follow up automatically?', a: 'Yes, you can schedule timed follow-up messages — immediately, after an hour, or days later — to keep the conversation going without manual reminders.' },
  { q: 'Does the builder support AI-generated answers?', a: 'Yes, you can let AI handle questions outside your defined flow, grounded in your content, falling back to a live agent when needed.' },
  { q: 'Is there a free plan to try the builder?', a: 'Yes, you can start free — see the chatbot pricing page for plan details.' },
]

function ChatbotBuilder() {
  return (
    <>
      <Seo
        title="No-Code AI Chatbot Builder"
        description="Build a chatbot without code. Drag-and-drop flows, AI answers and one-click deploy to WhatsApp, website and more. Start free."
      />

      <Hero
        eyebrow="Chatbot Builder"
        title="Build a chatbot without writing a single line of code"
        subtitle="Drag-and-drop conversation flows, AI-generated answers, and one-click deploy to WhatsApp, your website and more."
        primaryCta={{ label: 'Start Free', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<BuilderCanvasVisual />}
      />

      <ComparisonStrip
        eyebrow="The problem"
        heading={<>Most bot builders lock you into one channel.</>}
        paragraph="A chatbot builder should be one flow, deployed anywhere — not a separate rebuild for every channel you add."
        pairs={[
          { before: 'Tied to one channel', after: 'One flow, every channel' },
          { before: 'Rebuild per channel', after: 'Reuse the same flow' },
          { before: 'Siloed analytics', after: 'Combined analytics' },
        ]}
        alt
      />

      <FeatureSpotlight eyebrow="Features" title={<>Everything you need to launch a bot</>} items={FEATURES} />

      <BuildingBlocksCarousel
        eyebrow="Building blocks"
        title={<>Everything you can drop into a flow</>}
        subtitle="Building blocks that turn a simple bot into a conversation that actually gets things done."
        items={BLOCKS}
        alt
      />

      <StepsChevron eyebrow="How it works" title={<>From idea to live bot in three steps</>} steps={STEPS} />

      <FAQ title={<>Chatbot builder — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Build your first chatbot free"
        subtitle="No credit card required to get started."
        cta={{ label: 'Start Free', href: '/contact' }}
      />
    </>
  )
}

export default ChatbotBuilder
