import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconClock, IconBrain, IconChart, IconUsers, IconLink, IconShield, IconBolt, IconChat, IconPencil, IconCheck } from '../components/icons.jsx'
import MessengerHeroFlow from '../components/MessengerHeroFlow.jsx'
import MessengerScorecard from '../components/MessengerScorecard.jsx'
import MessengerUseCases from '../components/MessengerUseCases.jsx'
import { ProblemSplit, StepFlow } from '../components/MessengerSections.jsx'

const HERO_BADGES = [
  { icon: <IconClock />, word: '24/7', desc: 'coverage on Messenger' },
  { icon: <IconBolt />, word: '<10s', desc: 'typical first reply' },
  { icon: <IconCheck />, word: 'Most', desc: 'questions handled by AI' },
  { icon: <IconUsers />, word: 'One', desc: 'record across every channel' },
]

const MOMENTS = [
  { time: '11:58 PM', text: '“Is this back in stock?”' },
  { time: 'Sun 8:04 AM', text: '“Where has my order got to?”' },
  { time: 'Public holiday', text: '“Can I still change my address?”' },
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
  { icon: <IconChat />, title: 'Instagram, too', desc: 'Run Messenger alongside Instagram DMs from the same shared inbox.', href: '/channels/instagram' },
  { icon: <IconBolt />, title: 'WhatsApp Business API', desc: 'Add WhatsApp as a verified, branded channel next to Messenger.', href: '/channels/whatsapp' },
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
        title="Facebook Messenger API & Chat Automation"
        description="Automate Facebook Messenger conversations with our Messenger API. Send, receive and route conversations for support and sales, all from one shared inbox."
        keywords={['Facebook Messenger API', 'Messenger API', 'Messenger automation', 'Facebook Messenger business messaging', 'Messenger inbox API']}
      />

      <Hero
        eyebrow="Messenger"
        title={<>One <span className="grad-word">Facebook Messenger</span> API for support, sales and marketing</>}
        subtitle="Automate replies, stay inside Meta's messaging window rules, and route every conversation into one shared inbox — without ever leaving Messenger."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<MessengerHeroFlow />}
      />

      <ProblemSplit
        eyebrow="The problem"
        heading="Your Page gets messages all night. Your team clocks out."
        paragraphs={[
          <>Customers treat a Facebook Page like a text thread — asking at midnight, on a Sunday, on a public holiday — and every hour unanswered, the sale slips away. Agentic AI answering inside your main inbox closes that gap with <strong>instant replies around the clock</strong>, and a clean handoff for anything that needs a human.</>,
        ]}
        logTitle="Messages that missed you"
        moments={MOMENTS}
        outcome="Answered in seconds — day, night, weekend or holiday."
      />

      <StepFlow eyebrow="How it works" title="Go live on Messenger in three steps" steps={STEPS} alt />

      <MessengerUseCases
        eyebrow="See it in action"
        title="The everyday questions it answers for you"
        subtitle="Real Messenger threads, handled automatically — with a clean handoff whenever a human is needed."
      />

      <MessengerScorecard eyebrow="Why us" title="Why teams automate Messenger with SMSLocal" />

      <Testimonials
        eyebrow="Experience Their Journey"
        title={<>Why teams automate Messenger with <span className="grad-word">SMSLocal</span></>}
        subtitle="From support teams to lead-gen, growing teams trust SMSLocal to handle Messenger conversations automatically."
        items={TESTIMONIALS}
      />

      <CTABanner
        eyebrow="Get Started"
        title="Turn Messenger into a real support channel"
        subtitle="Connect your Page and start automating replies today."
        cta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
      />

      <FAQ
        eyebrow="Answers To Your Questions"
        title={<>Messenger API questions, <span className="grad-word">answered</span></>}
        subtitle="Everything about connecting your Facebook Page, automating replies, and handing off to a human when needed."
        items={FAQS}
        alt
      />
    </>
  )
}

export default FacebookMessengerApi
