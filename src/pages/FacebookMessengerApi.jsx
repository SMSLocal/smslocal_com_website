import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, CompareTable, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconClock, IconBrain, IconChart, IconUsers, IconLink, IconShield, IconBolt, IconChat, IconPencil, IconCheck } from '../components/icons.jsx'
import MessengerHeroMock from '../components/MessengerHeroMock.jsx'
import MessengerStepsUnderline from '../components/MessengerStepsUnderline.jsx'
import WhyUsDiamonds from '../components/WhyUsDiamonds.jsx'
import EcosystemChipsRow from '../components/EcosystemChipsRow.jsx'

const HERO_BADGES = [
  { icon: <IconClock />, word: '24/7', desc: 'coverage on Messenger' },
  { icon: <IconBolt />, word: '<10s', desc: 'typical first reply' },
  { icon: <IconCheck />, word: 'Most', desc: 'questions handled by AI' },
  { icon: <IconUsers />, word: 'One', desc: 'record across every channel' },
]

const STEPS = [
  { title: 'Connect your Page', desc: 'Link your Facebook Page in a few clicks — no code required.' },
  { title: 'Set up automation', desc: 'Define your persistent menu, quick replies and routing rules.' },
  { title: 'Go live in one inbox', desc: 'Every Messenger conversation lands beside your other channels.' },
]

const COMPARE_ROWS = [
  { feature: 'Team access', left: 'One login at a time', right: 'Unlimited team seats' },
  { feature: 'Automation', left: 'Manual replies only', right: 'Persistent menu, quick replies & AI' },
  { feature: 'Messaging window', left: 'Tracked manually', right: 'Automatic 24-hour & tag compliance' },
  { feature: 'Integrations', left: 'None', right: 'CRM, helpdesk & store integrations' },
  { feature: 'Reporting', left: 'Basic activity log', right: 'Reply time & volume reporting' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Faster response times', desc: 'Auto-replies and a persistent menu cut average first-response time to seconds.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Multiple agents work the same Messenger inbox without stepping on each other.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connect your CRM, helpdesk or store so every reply has real context behind it.' },
  { icon: <IconShield />, title: 'Built on the official platform', desc: 'Runs on the official Messenger Platform API — not a workaround that risks your Page.' },
]

const ECOSYSTEM = [
  { icon: <IconChat />, title: 'Instagram, too', desc: 'Run Messenger alongside Instagram DMs from the same shared inbox.', href: '/instagram-messaging-api' },
  { icon: <IconBolt />, title: 'WhatsApp Business API', desc: 'Add WhatsApp as a verified, branded channel next to Messenger.', href: '/whatsapp-business-api' },
  { icon: <IconBrain />, title: 'Agentic AI', desc: 'The same AI that answers Messenger can carry a conversation across every channel.', href: '/ai-agents/customer-service' },
  { icon: <IconPencil />, title: 'Chatbot builder', desc: 'Design your persistent menu and reply flows visually, without writing code.', href: '/chatbot/builder' },
]

const TESTIMONIALS = [
  { quote: 'Our persistent menu now handles half our order-status questions before a human even sees them.', name: 'Devansh Rao', role: 'Founder, D2C brand' },
  { quote: 'We stopped worrying about the 24-hour window entirely — it just tags the message correctly on its own.', name: 'Lauren Pinto', role: 'Support Ops Lead' },
  { quote: 'One inbox for Messenger, Instagram and WhatsApp changed how fast our team actually replies.', name: 'Imran Sheikh', role: 'Customer Experience Manager' },
]

const FAQS = [
  { q: 'What is the Facebook Messenger API?', a: 'It is Meta’s official Messenger Platform API for sending and receiving messages from a Facebook Page at scale, letting businesses automate and manage conversations beyond the Messenger app.' },
  { q: 'What is the 24-hour messaging window?', a: 'It’s the window after a customer messages you in which you can send free-form replies. Outside it, messages must use an approved message tag — we track and apply this automatically.' },
  { q: 'Can multiple team members share one Messenger inbox?', a: 'Yes, the full conversation history and inbox is shared across your team, with assignment and handoff between agents and bots.' },
  { q: 'Do I need a Facebook Page to use this?', a: 'Yes — a Facebook Page connected to a Meta Business account is required to use the Messenger Platform API.' },
]

function FacebookMessengerApi() {
  return (
    <>
      <Seo
        title="Facebook Messenger API & Automation"
        description="Automate Facebook Messenger conversations with our Messenger API. Send, receive and route conversations for support, sales and social commerce — all from one inbox."
        keywords={['Facebook Messenger API', 'Messenger API', 'Messenger automation', 'Facebook Messenger business messaging', 'Messenger inbox API']}
      />

      <Hero
        eyebrow="Messenger"
        title="One Facebook Messenger API for support, sales and marketing"
        subtitle="Automate replies, stay inside Meta's messaging window rules, and route every conversation into one shared inbox — without ever leaving Messenger."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<MessengerHeroMock />}
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
        heading={<>Your Page gets messages all night. Your team clocks out.</>}
        paragraphs={[
          "Customers treat a Facebook Page like a text thread — they ask about stock at midnight, shipping on a Sunday, and where an order is stuck on a public holiday. Every hour that goes unanswered, the intent cools and the sale slips away.",
          "So the Page inbox turns into a second, disconnected queue. Someone checks it between other tasks, replies land hours late, and there's no link to the order, the past conversation, or the message the same customer sent on Instagram.",
          <>Agentic AI answering inside your main inbox closes that gap — <strong>instant replies around the clock</strong>, and a clean handoff to your team for anything that actually needs a human.</>,
        ]}
        leftLabel="Messenger, left alone"
        leftItems={[
          'Replies land hours after the question',
          'No coverage overnight or on weekends',
          'No link to the order or past conversation',
          'A separate inbox nobody really owns',
        ]}
        rightLabel="Messenger, with SMSLocal"
        rightItems={[
          'AI answers in seconds, 24/7',
          'Complex chats routed to the right person',
          'Order and history attached to every thread',
          'One inbox shared across the whole team',
        ]}
        alt
      />

      <MessengerStepsUnderline eyebrow="How it works" title={<>Go live on Messenger in three steps</>} steps={STEPS} />

      <CompareTable
        title={<>Meta Business Suite vs the Messenger API</>}
        subtitle="The native inbox works for one person. The API is built for a team and for scale."
        leftLabel="Business Suite"
        rightLabel="SMSLocal API"
        rows={COMPARE_ROWS}
        alt
      />

      <WhyUsDiamonds eyebrow="Why us" title={<>Why teams automate Messenger with SMSLocal</>} items={WHY_US} />

      <EcosystemChipsRow
        eyebrow="Ecosystem"
        title={<>Messenger fits right into your messaging stack</>}
        subtitle="Pair Messenger with Instagram, WhatsApp and agentic AI across the same conversations."
        items={ECOSYSTEM}
        alt
      />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} />

      <FAQ title={<>Messenger API — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Turn Messenger into a real support channel"
        subtitle="Connect your Page and start automating replies today."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default FacebookMessengerApi
