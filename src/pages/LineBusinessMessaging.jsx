import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconPackage, IconMenu, IconReceipt, IconChat } from '../components/icons.jsx'
import LineHeroRoute from '../components/LineHeroRoute.jsx'
import LineUsageRings from '../components/LineUsageRings.jsx'
import {
  CapabilitySpotlight,
  StepTracker,
  CompareVS,
} from '../components/LineSections.jsx'

const METERS = [
  { name: 'Broadcast blasts', pct: 92 },
  { name: 'Flex messages', pct: 12 },
  { name: 'Rich menu', pct: 15 },
  { name: 'Loyalty & coupons', pct: 8 },
  { name: 'Two-way chat', pct: 18 },
]

const CAPABILITIES = [
  { icon: <IconPackage />, title: 'Flex messages', desc: 'Design rich, branded message cards — images, buttons and custom layouts — from templates or your own assets, with no developer needed each time.' },
  { icon: <IconMenu />, title: 'Rich menu', desc: 'An always-on, tappable menu pinned to the bottom of the chat that sends people straight to shop, orders, rewards or support in a single tap.' },
  { icon: <IconReceipt />, title: 'Loyalty & coupons', desc: 'Issue points and coupons right inside the conversation, so rewards live in the same thread as the chat and the order — not a separate app.' },
  { icon: <IconChat />, title: 'Two-way chat', desc: 'Real conversations, not one-way blasts — every reply lands in your shared inbox with full history, assignment and AI handoff.' },
]

const STEPS = [
  { title: 'Connect your Official Account', desc: 'Link your LINE Official Account in a few clicks — no code required.' },
  { title: 'Design flex messages & menus', desc: 'Build rich message cards and a rich menu from templates or your own assets.' },
  { title: 'Go live in one inbox', desc: 'Every LINE conversation lands beside your other channels.' },
]

const COMPARE_ROWS = [
  { feature: 'Team access', left: 'One login at a time', right: 'Unlimited team seats', why: 'One shared login means one agent replying at a time — everyone else waits. Unlimited seats let your whole team answer at once.' },
  { feature: 'Automation', left: 'Manual replies only', right: 'Auto-replies, flows & AI handoff', why: 'Every message typed by hand doesn’t scale past a few chats a day. Automated flows and AI handoff cover the repetitive 80% for you.' },
  { feature: 'Rich messages', left: 'Basic templates only', right: 'Custom flex messages & rich menus', why: 'Stock templates look like everyone else’s account. Custom flex messages and rich menus carry your own branding and layout.' },
  { feature: 'Integrations', left: 'None', right: 'CRM, helpdesk & store integrations', why: 'With no integrations, every reply starts from zero context. Connected to your CRM or store, agents see the order and history instantly.' },
  { feature: 'Reporting', left: 'Basic message counts', right: 'Delivery, read & reply analytics', why: 'A raw message count can’t tell you what worked. Delivery, read and reply analytics show exactly where customers drop off.' },
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
        title="LINE Business Messaging"
        description="Engage customers on LINE with two-way chat and rich flex messages, integrated with WhatsApp and SMS."
        keywords={['LINE Messaging API', 'LINE Official Account', 'LINE for business', 'LINE bot API']}
      />

      <Hero
        eyebrow="LINE"
        title={<>Your LINE Official Account, run like <span className="grad-word">a real channel</span></>}
        subtitle="Two-way chat, flex messages and a rich menu — integrated with WhatsApp, SMS and the rest of your channels, not run in isolation."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<LineHeroRoute />}
      />

      <LineUsageRings
        eyebrow="The opportunity"
        heading="A broadcast-only LINE account leaves half the platform unused."
        paragraphs={[
          <>Most businesses use LINE for one thing — blasting followers. Flex messages, a rich menu, loyalty and two-way chat all sit on the same Official Account, mostly untouched. Run LINE as a real channel beside your SMS and <Link to="/products/ai-agents/customer-service/">AI</Link>, and it stops being just a broadcast list.</>,
        ]}
        caption="What a broadcast-only account actually uses"
        meters={METERS}
      />

      <CapabilitySpotlight
        eyebrow="Capabilities"
        title="Everything a LINE Official Account can really do"
        subtitle="Four things a broadcast list can't — all in the same conversation."
        items={CAPABILITIES}
        alt
      />

      <StepTracker eyebrow="How it works" title="Go live on LINE in three steps" steps={STEPS} />

      <CompareVS
        eyebrow="Comparison"
        title="Official Account app vs the Messaging API"
        subtitle="The native app works for one person. The API is built for a team and for scale."
        leftLabel="Official Account App"
        rightLabel="SMSLocal API"
        rows={COMPARE_ROWS}
        alt
      />

      <Testimonials
        eyebrow="Experience Their Journey"
        title={<>Why brands run LINE with <span className="grad-word">SMSLocal</span></>}
        subtitle="From ecommerce to support teams, growing brands use SMSLocal to turn their LINE Official Account into a real channel."
        items={TESTIMONIALS}
      />

      <CTABanner
        eyebrow="Get Started"
        title="Turn your LINE account into a real channel"
        subtitle="Flex messages, rich menu and one shared inbox — live in days."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
      />

      <FAQ
        eyebrow="Answers To Your Questions"
        title={<>LINE business messaging <span className="grad-word">questions</span></>}
        subtitle="Everything about running your LINE Official Account at scale — flex messages, rich menus, shared inbox and the Messaging API."
        items={FAQS}
        alt
      />
    </>
  )
}

export default LineBusinessMessaging
