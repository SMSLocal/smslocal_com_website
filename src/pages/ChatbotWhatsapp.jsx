import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import WhatsappCompareSlider from '../components/WhatsappCompareSlider.jsx'
import { IconPlug, IconClock, IconUsers, IconCart, IconBolt, IconLink, IconChart, IconGlobe } from '../components/icons.jsx'
import WhatsappLiveDemo from '../components/WhatsappLiveDemo.jsx'
import FeatureChatConsole from '../components/FeatureChatConsole.jsx'
import StepsSignal from '../components/StepsSignal.jsx'
import WhyUsSpotlight from '../components/WhyUsSpotlight.jsx'

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
  { icon: <IconBolt />, title: 'Instant responses', desc: 'Never leave a customer waiting on WhatsApp again.', stat: { value: 11, suffix: 's avg first reply' } },
  { icon: <IconLink />, title: 'Built on official API', desc: 'Runs on the WhatsApp Business API — no workarounds.', stat: { value: 100, suffix: '% API compliant' } },
  { icon: <IconChart />, title: 'Conversion tracking', desc: 'See how many chats turn into leads or completed orders.', stat: { value: 1204, suffix: ' conversions tracked' } },
  { icon: <IconGlobe />, title: 'Multilingual replies', desc: 'Serve customers in their preferred language automatically.', stat: { value: 38, suffix: ' languages supported' } },
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
        title={<>Automate WhatsApp conversations with a <span className="grad-word">no-code chatbot</span></>}
        subtitle="24/7 answers, lead capture and order updates — built on the official WhatsApp Business API, no coding required."
        primaryCta={{ label: 'Build a Chatbot', href: '/contact-us' }}
        secondaryCta={{ label: 'Explore Builder', href: '/chatbot/builder' }}
        visual={<WhatsappLiveDemo />}
      />

      <WhatsappCompareSlider
        eyebrow="The problem"
        heading={<>A WhatsApp bot that only replies isn't really automating support.</>}
        paragraphs={[
          <>Plenty of WhatsApp bots can send a canned reply to a keyword — far fewer <strong>resolve what they can and hand off cleanly</strong> for the rest.</>,
        ]}
        leftLabel="Keyword auto-reply"
        leftChat={{ in: 'Do you have this in blue?', out: "Sorry, I didn't understand that. Reply MENU for options." }}
        leftItems={[
          'Answers only exact keyword matches',
          'No memory of earlier messages in the chat',
          'Escalations arrive with no context',
          'Same script, every conversation',
        ]}
        rightLabel="Built to resolve"
        rightChat={{ in: 'Do you have this in blue?', out: 'Yes! It comes in blue, size M–XL, ₹1,850 — want me to add it to your cart?' }}
        rightItems={[
          'Multi-step flows with real branching logic',
          'AI fallback for questions outside the script',
          'Clean handoff with full chat history attached',
          'Templates for support, leads and orders',
        ]}
        alt
      />

      <FeatureChatConsole
        eyebrow="Features"
        title={<>Everything you need to automate WhatsApp</>}
        description="Try it yourself — tap a question on the tablet and watch the bot answer live, exactly how it responds to a real customer on WhatsApp. Every reply below is the same flow logic running on your WhatsApp number, not a scripted demo."
        items={FEATURES}
      />

      <StepsSignal eyebrow="How it works" title={<>Launch a WhatsApp chatbot in three steps</>} steps={STEPS} alt />

      <WhyUsSpotlight eyebrow="Why us" title={<>Why teams automate WhatsApp with us</>} items={WHY_US} />

      <CTABanner
        title="Automate your WhatsApp today"
        subtitle="Build your first flow free — no credit card required."
        cta={{ label: 'Build a Chatbot', href: '/contact-us' }}
      />

      <FAQ title={<>WhatsApp chatbot — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ChatbotWhatsapp
