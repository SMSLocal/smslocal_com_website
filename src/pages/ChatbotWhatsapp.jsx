import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconPlug, IconClock, IconUsers, IconCart, IconBolt, IconLink, IconChart, IconGlobe } from '../components/icons.jsx'
import WhatsappConversationFloat from '../components/WhatsappConversationFloat.jsx'
import FeatureChatQA from '../components/FeatureChatQA.jsx'
import StepsSignal from '../components/StepsSignal.jsx'
import WhyUsBadges from '../components/WhyUsBadges.jsx'

const FEATURES = [
  { icon: <IconPlug />, question: 'Do I need a developer for this?', title: 'No-code flow builder', desc: 'Design conversation flows visually — no developer needed.' },
  { icon: <IconClock />, question: 'What happens if they message at 2am?', title: '24/7 answers', desc: 'Respond instantly to FAQs, orders and support requests any time.' },
  { icon: <IconUsers />, question: 'What if it gets complicated?', title: 'Live-agent handoff', desc: 'Escalate complex conversations to a human without losing context.' },
  { icon: <IconCart />, question: 'Can it actually take an order?', title: 'Order & lead capture', desc: 'Qualify leads and share order updates directly inside WhatsApp.' },
]

const STEPS = [
  { title: 'Connect your number', desc: 'Link your WhatsApp Business API number to the chatbot builder.' },
  { title: 'Build your flow', desc: 'Drag and drop conversation steps, or start from a template.' },
  { title: 'Publish & monitor', desc: 'Go live and track conversations, resolutions and handoffs.' },
]

const WHY_US = [
  { icon: <IconBolt />, title: 'Instant responses', desc: 'Never leave a customer waiting on WhatsApp again.' },
  { icon: <IconLink />, title: 'Built on official API', desc: 'Runs on the WhatsApp Business API — no workarounds.' },
  { icon: <IconChart />, title: 'Conversion tracking', desc: 'See how many chats turn into leads or completed orders.' },
  { icon: <IconGlobe />, title: 'Multilingual replies', desc: 'Serve customers in their preferred language automatically.' },
]

const FAQS = [
  { q: 'Do I need coding skills to build a WhatsApp chatbot?', a: 'No — the drag-and-drop builder lets anyone design a flow without writing code.' },
  { q: 'Can the bot hand off to a human agent?', a: 'Yes, any conversation can be escalated to a live agent inbox with full chat history.' },
  { q: 'Does this work with the official WhatsApp Business API?', a: 'Yes, the chatbot runs on top of the official WhatsApp Business API, not an unofficial workaround.' },
  { q: 'Can I use templates to get started faster?', a: 'Yes, pre-built templates for support, lead gen and order updates are available in the builder.' },
]

function ChatbotWhatsapp() {
  return (
    <>
      <Seo
        title="WhatsApp Chatbot Builder for Business"
        description="Automate WhatsApp with an AI chatbot — 24/7 answers, lead capture and order updates. Build on the official WhatsApp Business API, no code."
      />

      <Hero
        eyebrow="WhatsApp Chatbot"
        title="Automate WhatsApp conversations with a no-code chatbot"
        subtitle="24/7 answers, lead capture and order updates — built on the official WhatsApp Business API, no coding required."
        primaryCta={{ label: 'Build a Chatbot', href: '/contact' }}
        secondaryCta={{ label: 'Explore Builder', href: '/chatbot/builder' }}
        visual={<WhatsappConversationFloat />}
      />

      <NarrativeCompare
        eyebrow="The problem"
        heading={<>A WhatsApp bot that only replies isn't really automating support.</>}
        paragraphs={[
          "Plenty of WhatsApp bots can send a canned reply to a keyword. Far fewer can actually carry a conversation — ask a follow-up, check an order, or know when to stop and bring in a person.",
          'So the bot handles the easy 20% and the rest still lands on a human, except now it\'s buried under bot noise instead of arriving clean.',
          <>A WhatsApp chatbot worth building is one that <strong>resolves what it can and hands off cleanly</strong> for the rest — not one that just replies faster.</>,
        ]}
        leftLabel="Keyword auto-reply"
        leftItems={[
          'Answers only exact keyword matches',
          'No memory of earlier messages in the chat',
          'Escalations arrive with no context',
          'Same script, every conversation',
        ]}
        rightLabel="Built to resolve"
        rightItems={[
          'Multi-step flows with real branching logic',
          'AI fallback for questions outside the script',
          'Clean handoff with full chat history attached',
          'Templates for support, leads and orders',
        ]}
        alt
        variant="flanked"
      />

      <FeatureChatQA eyebrow="Features" title={<>Everything you need to automate WhatsApp</>} items={FEATURES} />

      <StepsSignal eyebrow="How it works" title={<>Launch a WhatsApp chatbot in three steps</>} steps={STEPS} alt />

      <WhyUsBadges eyebrow="Why us" title={<>Why teams automate WhatsApp with us</>} items={WHY_US} />

      <FAQ title={<>WhatsApp chatbot — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Automate your WhatsApp today"
        subtitle="Build your first flow free — no credit card required."
        cta={{ label: 'Build a Chatbot', href: '/contact' }}
      />
    </>
  )
}

export default ChatbotWhatsapp
