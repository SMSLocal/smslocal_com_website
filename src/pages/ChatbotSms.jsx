import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, WhyUs, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import {
  IconCode, IconBell, IconRefresh, IconUsers, IconGlobe, IconChart, IconShield,
  IconCalendar, IconLink, IconDollar, IconChat,
} from '../components/icons.jsx'
import SmsDashboardFloat from '../components/SmsDashboardFloat.jsx'
import FeatureReveal from '../components/FeatureReveal.jsx'
import WhyUsChecks from '../components/WhyUsChecks.jsx'

const FEATURES = [
  { icon: <IconCode />, title: 'Keyword replies', desc: 'Trigger automated responses and flows from specific words or phrases.' },
  { icon: <IconRefresh />, title: 'Auto-reply templates', desc: 'Reusable message templates answer common questions instantly.' },
  { icon: <IconBell />, title: 'Two-way alerts', desc: 'Let customers reply to alerts and confirmations over plain SMS.' },
  { icon: <IconCalendar />, title: 'Scheduled sends', desc: 'Queue reminders and follow-ups for the right moment.' },
  { icon: <IconLink />, title: 'CRM integration', desc: 'Connect your CRM so replies are backed by real customer data.' },
  { icon: <IconUsers />, title: 'Human handoff', desc: 'Escalate to a live agent whenever a reply needs a person.' },
]

const WHY_US = [
  { icon: <IconGlobe />, title: 'Reaches everyone', desc: 'No app or smartphone required — SMS works on any device.' },
  { icon: <IconChart />, title: 'High open & response rates', desc: 'Texts get read and replied to far more than email or calls.' },
  { icon: <IconDollar />, title: 'Lower support cost', desc: 'Automating routine replies trims the volume that reaches an agent.' },
  { icon: <IconChat />, title: 'Builds real relationships', desc: 'Two-way conversations feel personal, not like a broadcast.' },
  { icon: <IconShield />, title: 'Compliant by default', desc: 'STOP/HELP handling and opt-out suppression built in.' },
  { icon: <IconRefresh />, title: 'Scales with you', desc: 'Handle a handful of replies or a flood of them on the same setup.' },
]

const TESTIMONIALS = [
  { quote: 'Customers reply to our alerts now instead of calling in — support volume dropped noticeably in the first month.', name: 'David Term', role: 'Operations Director' },
  { quote: 'Keyword flows handle the repetitive questions, so the team only ever sees what actually needs a person.', name: 'Sarah Jain', role: 'Support Lead' },
  { quote: 'It runs on the same number we already text from, and every reply lands in one inbox. No new tool to learn.', name: 'John Meyer', role: 'CX Manager' },
]

const FAQS = [
  { q: 'What is an SMS chatbot?', a: 'A bot that automates two-way SMS conversations — keyword-triggered replies, alerts customers can respond to, and escalation to a human when needed.' },
  { q: 'Do customers need an app to use it?', a: 'No, SMS chatbots work on any phone with no app, download or data connection required.' },
  { q: 'Can I automate replies to common questions?', a: 'Yes. Use message templates and keyword triggers to answer frequently asked questions instantly, so customers get an immediate reply.' },
  { q: 'What happens if a customer replies after hours?', a: 'You can set an auto-reply that tells them when to expect a response, or let automated flows handle common questions even when your team is offline.' },
  { q: 'Can I use my existing SMS number?', a: 'Yes, connect your existing number or get a dedicated inbound number for your automated flows.' },
  { q: 'Can it hand off to a live agent?', a: 'Yes, any conversation can escalate to a human with the full message history attached.' },
]

function ChatbotSms() {
  return (
    <>
      <Seo
        title="SMS Chatbot & Text Automation"
        description="Automate two-way SMS conversations with an AI text chatbot. Keyword replies, alerts and support over plain SMS — no app needed."
        keywords={['text message chatbot', 'SMS bot', 'automated SMS replies', 'two-way SMS chatbot']}
      />

      <Hero
        eyebrow="SMS Chatbot"
        title={<>Two-way SMS automation, <span className="grad-word">no app required</span></>}
        subtitle="Keyword-triggered replies, alerts customers can respond to, and clean handoff to a human — all over plain text."
        primaryCta={{ label: 'Start Free', href: '/contact-us' }}
        secondaryCta={{ label: 'See Bulk SMS', href: '/bulk-sms' }}
        visual={<SmsDashboardFloat />}
      />

      <NarrativeCompare
        eyebrow="The problem"
        heading={<>A plain SMS auto-reply still leaves the customer stuck.</>}
        paragraphs={[
          "Most SMS automation stops at one message — an auto-reply confirming receipt, with no way for the customer to actually get what they came for.",
          'So the conversation ends right where it should have started, and the customer either gives up or finds another way to reach a human.',
          <>An SMS chatbot should carry the <strong>whole exchange, not just the first reply</strong> — keyword flows, follow-up questions, and a clean handoff when it's needed.</>,
        ]}
        leftLabel="One-way auto-reply"
        leftItems={[
          'A single canned confirmation message',
          'No way to continue the conversation',
          'Keywords match exactly or not at all',
          'No path to a human if it\'s needed',
        ]}
        rightLabel="SMS chatbot, two-way"
        rightItems={[
          'Multi-step flows triggered by keywords',
          'Customers can reply and keep the thread going',
          'Handles variations, not just exact matches',
          'Escalates to a human with full history',
        ]}
        alt
      />

      <FeatureReveal eyebrow="Features" title={<>Built for SMS automation</>} items={FEATURES} />

      <WhyUsChecks eyebrow="Why us" title={<>Why teams automate SMS with SMSLocal</>} items={WHY_US} alt />

      <Testimonials title={<>Teams that switched to two-way SMS</>} items={TESTIMONIALS} />

      <CTABanner
        title="Automate your first SMS keyword flow"
        subtitle="Connect your number and go live in minutes."
        cta={{ label: 'Start Free', href: '/contact-us' }}
      />

      <FAQ title={<>SMS chatbot — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ChatbotSms
