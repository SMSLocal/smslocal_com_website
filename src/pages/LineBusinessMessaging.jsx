import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, CompareTable, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconPackage, IconUsers, IconMail, IconBrain, IconLink, IconShield, IconChat, IconBolt, IconPencil } from '../components/icons.jsx'
import LineHeroMock from '../components/LineHeroMock.jsx'
import LineCapabilityGrid from '../components/LineCapabilityGrid.jsx'
import LineStepsList from '../components/LineStepsList.jsx'
import WhyUsCenterDivider from '../components/WhyUsCenterDivider.jsx'
import EcosystemAccentList from '../components/EcosystemAccentList.jsx'

const HERO_BADGES = [
  { icon: <IconPackage />, word: 'Flex', desc: 'custom rich message cards' },
  { icon: <IconUsers />, word: 'Loyalty', desc: 'points & coupons in-chat' },
  { icon: <IconMail />, word: 'Shared', desc: 'inbox with your other channels' },
  { icon: <IconBrain />, word: 'AI', desc: 'answers folded into one inbox' },
]

const STEPS = [
  { title: 'Connect your Official Account', desc: 'Link your LINE Official Account in a few clicks — no code required.' },
  { title: 'Design flex messages & menus', desc: 'Build rich message cards and a rich menu from templates or your own assets.' },
  { title: 'Go live in one inbox', desc: 'Every LINE conversation lands beside your other channels.' },
]

const COMPARE_ROWS = [
  { feature: 'Team access', left: 'One login at a time', right: 'Unlimited team seats' },
  { feature: 'Automation', left: 'Manual replies only', right: 'Auto-replies, flows & AI handoff' },
  { feature: 'Rich messages', left: 'Basic templates only', right: 'Custom flex messages & rich menus' },
  { feature: 'Integrations', left: 'None', right: 'CRM, helpdesk & store integrations' },
  { feature: 'Reporting', left: 'Basic message counts', right: 'Delivery, read & reply analytics' },
]

const WHY_US = [
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Multiple agents work the same LINE inbox without stepping on each other.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connect your CRM, helpdesk or store so every reply has real context.' },
  { icon: <IconShield />, title: 'Official Messaging API', desc: 'Runs on the official LINE Messaging API — not a workaround that risks your account.' },
  { icon: <IconMail />, title: 'One inbox, every channel', desc: 'LINE sits beside WhatsApp, SMS and email in the same shared inbox.' },
]

const ECOSYSTEM = [
  { icon: <IconChat />, title: 'WhatsApp, too', desc: 'Run LINE alongside WhatsApp Business API from the same shared inbox.', href: '/whatsapp-business-api' },
  { icon: <IconBolt />, title: 'SMS fallback', desc: 'Keep a universal channel in reach for customers outside LINE.', href: '/bulk-sms' },
  { icon: <IconBrain />, title: 'Agentic AI', desc: 'The same AI that answers LINE messages can carry a conversation across every channel.', href: '/ai-agents/customer-service' },
  { icon: <IconPencil />, title: 'Chatbot builder', desc: 'Design flex messages and reply flows visually, without writing code.', href: '/chatbot/builder' },
]

const TESTIMONIALS = [
  { quote: 'Our LINE Official Account used to be a broadcast list. Now it runs loyalty, orders and support in the same thread.', name: 'Haruka Ito', role: 'Ecommerce Lead' },
  { quote: 'Building rich flex messages used to need a developer every time. Now our marketing team builds them directly.', name: 'Somchai Wattana', role: 'Marketing Manager' },
  { quote: 'Having LINE sit beside WhatsApp in one inbox changed how fast our support team actually replies.', name: 'Mei Lin Tan', role: 'Customer Experience Lead' },
]

const FAQS = [
  { q: 'What is LINE Business Messaging?', a: 'It is the official way for businesses to run a LINE Official Account at scale — sending flex messages, managing a rich menu, and handling two-way chats through the LINE Messaging API.' },
  { q: 'Can I build my own rich menu and flex messages?', a: 'Yes, both are built visually from templates or your own assets — no code required, though the Messaging API is available if you want to build custom flows.' },
  { q: 'Can multiple team members share one LINE inbox?', a: 'Yes, the full conversation history and inbox is shared across your team, with assignment and handoff between agents and bots.' },
  { q: 'Can I manage LINE alongside WhatsApp and SMS?', a: 'Yes, LINE sits beside WhatsApp, SMS and other channels in the same shared inbox, with one customer record across all of them.' },
]

function LineBusinessMessaging() {
  return (
    <>
      <Seo
        title="LINE Business Messaging & API"
        description="Engage customers on LINE with your Official Account — two-way chat, rich messages and automation integrated across your channels."
        keywords={['LINE Messaging API', 'LINE Official Account', 'LINE for business', 'LINE bot API']}
      />

      <Hero
        eyebrow="LINE"
        title="Your LINE Official Account, run like a real channel"
        subtitle="Two-way chat, flex messages and a rich menu — integrated with WhatsApp, SMS and the rest of your channels, not run in isolation."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<LineHeroMock />}
      />

      <div className="hero-badges-wrap">
        <div className="container">
          <div className="hero-badges">
            {HERO_BADGES.map((b) => (
              <div className="hero-badge" key={b.word}>
                <span className="hero-badge-icon">{b.icon}</span>
                <div className="hero-badge-text">
                  <strong>{b.word}</strong>
                  <span>{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NarrativeCompare
        heading={<>A LINE Official Account that only broadcasts is leaving half the platform unused.</>}
        paragraphs={[
          "Most businesses use LINE for one thing: blasting a message to every follower. That's a fraction of what an Official Account can actually do — flex messages, a rich menu, loyalty points, and two-way conversations all live on the same platform, mostly untouched.",
          'So replies pile up in a generic inbox nobody owns, loyalty programs stay disconnected from chat, and the same customer messaging you on WhatsApp starts from zero again on LINE.',
          <>Run LINE as a real channel — <strong>flex messages, rich menu and replies in the same inbox as everything else</strong> — and it stops being just a broadcast list.</>,
        ]}
        leftLabel="LINE, broadcast-only"
        leftItems={[
          'One-way blasts to every follower',
          'Replies land in a separate, unowned inbox',
          'Loyalty and orders disconnected from chat',
          'Starts from zero versus your other channels',
        ]}
        rightLabel="LINE, on SMSLocal"
        rightItems={[
          'Flex messages, rich menu and two-way chat',
          'Every reply lands in your shared inbox',
          'Points, orders and chat in one conversation',
          'One record across LINE, WhatsApp and SMS',
        ]}
        alt
      />

      <LineCapabilityGrid />

      <LineStepsList eyebrow="How it works" title={<>Go live on LINE in three steps</>} steps={STEPS} alt />

      <CompareTable
        title={<>Official Account app vs the Messaging API</>}
        subtitle="The native app works for one person. The API is built for a team and for scale."
        leftLabel="Official Account App"
        rightLabel="SMSLocal API"
        rows={COMPARE_ROWS}
      />

      <WhyUsCenterDivider eyebrow="Why us" title={<>Why brands run LINE on SMSLocal</>} items={WHY_US} alt />

      <EcosystemAccentList
        eyebrow="Ecosystem"
        title={<>LINE fits right into your messaging stack</>}
        subtitle="Pair LINE with WhatsApp, SMS fallback and agentic AI across the same conversations."
        items={ECOSYSTEM}
      />

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} alt />

      <FAQ title={<>LINE business messaging — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="Turn your LINE account into a real channel"
        subtitle="Flex messages, rich menu and one shared inbox — live in days."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default LineBusinessMessaging
