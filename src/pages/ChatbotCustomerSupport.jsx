import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconClock, IconBrain, IconUsers, IconChart, IconGlobe, IconShield, IconRefresh, IconMail } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconClock />, title: '24/7 first response', desc: 'Answer common questions instantly, any time of day.' },
  { icon: <IconBrain />, title: 'AI ticket deflection', desc: 'Resolve routine tickets automatically, before they reach an agent.' },
  { icon: <IconUsers />, title: 'Clean agent handoff', desc: 'Escalate with full conversation history, no repeated questions.' },
  { icon: <IconGlobe />, title: 'Every channel covered', desc: 'WhatsApp, website, SMS and social, all backed by the same bot.' },
]

const STEPS = [
  { title: 'Connect your help content', desc: 'Point the bot at your help center, macros or FAQ docs.' },
  { title: 'Set escalation rules', desc: 'Define what the bot resolves and when it hands off to a human.' },
  { title: 'Go live across channels', desc: 'Deploy the same support bot to WhatsApp, web, SMS and social.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Lower ticket volume', desc: 'Deflect routine questions so agents focus on what actually needs a human.' },
  { icon: <IconRefresh />, title: 'Faster resolutions', desc: 'Instant first response cuts average resolution time significantly.' },
  { icon: <IconMail />, title: 'One shared inbox', desc: 'Bot and human replies live in the same inbox as your other channels.' },
  { icon: <IconShield />, title: 'Consistent answers', desc: 'The bot never gives a different answer to the same question twice.' },
]

const TESTIMONIALS = [
  { quote: 'Ticket volume dropped noticeably in the first month — the bot handles everything routine before it reaches an agent.', name: 'Daniel Osei', role: 'Support Ops Lead' },
  { quote: 'Escalations now arrive with the full conversation attached. Our agents stopped asking customers to repeat themselves.', name: 'Meera Krishnan', role: 'Customer Experience Manager' },
  { quote: 'We deployed the same support bot to WhatsApp and our website in one afternoon.', name: 'Lukas Hoffman', role: 'Head of Support' },
]

const FAQS = [
  { q: 'What is a customer support chatbot?', a: 'A bot that answers common support questions instantly and escalates anything it can\'t resolve to a live agent, with full context attached.' },
  { q: 'Can it reduce our support ticket volume?', a: 'Yes, it deflects routine questions before they become tickets, so agents spend time only on issues that actually need a human.' },
  { q: 'Does it work across multiple channels?', a: 'Yes, the same support bot can run on WhatsApp, your website, SMS and social channels from one setup.' },
  { q: 'How does escalation to a human work?', a: 'When the bot can\'t resolve something, it hands off to your live agent inbox with the full conversation history already attached.' },
]

function ChatbotCustomerSupport() {
  return (
    <>
      <Seo
        title="Customer Support Chatbot — 24/7 Service"
        description="Deflect tickets and answer instantly with a customer support chatbot. FAQ automation, live-agent handoff and multichannel coverage."
        keywords={['customer service chatbot', 'support automation chatbot', 'FAQ chatbot', '24/7 chatbot support']}
      />

      <Hero
        eyebrow="Customer Support"
        title={<>A support chatbot that <span className="grad-word">deflects tickets</span>, not just chats</>}
        subtitle="Answer common questions instantly, escalate the rest with full context, and cover WhatsApp, web, SMS and social from one bot."
        primaryCta={{ label: 'Start Free', href: '/contact-us' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents/customer-service' }}
      />

      <NarrativeCompare
        heading={<>Most support bots deflect only the easiest questions.</>}
        paragraphs={[
          "A support bot that only handles \"what are your hours\" isn't really reducing ticket volume — it's just automating the requests that were never going to take an agent long anyway.",
          'Meanwhile the requests that actually pile up — order status, account issues, anything needing real data — still land untouched in the queue.',
          <>A support chatbot worth deploying <strong>deflects the requests that actually take time</strong>, not just the ones that were already easy.</>,
        ]}
        leftLabel="Basic FAQ bot"
        leftItems={[
          'Handles only pre-written FAQ answers',
          'No access to order or account data',
          'Escalates anything remotely complex',
          'Ticket volume barely moves',
        ]}
        rightLabel="Support chatbot, built to deflect"
        rightItems={[
          'Trained on your actual help content and macros',
          'Looks up real account and order data',
          'Escalates only what genuinely needs a human',
          'Measurable drop in routine ticket volume',
        ]}
        alt
      />

      <FeatureGrid title={<>Built for support teams</>} items={FEATURES} />

      <HowItWorks title={<>Deflect your first ticket in minutes</>} steps={STEPS} alt />

      <WhyUs title={<>Why support teams choose our chatbot</>} items={WHY_US} />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Start deflecting tickets today"
        subtitle="Connect your help content and go live in minutes."
        cta={{ label: 'Start Free', href: '/contact-us' }}
      />

      <FAQ title={<>Customer support chatbot — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default ChatbotCustomerSupport
