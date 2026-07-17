import Seo from '../components/Seo.jsx'
import { Hero, CompareTable, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconBolt, IconChat, IconPencil, IconUsers, IconChart, IconLink, IconShield, IconBrain, IconMail, IconClock, IconRefresh } from '../components/icons.jsx'
import InstagramHeroMock from '../components/InstagramHeroMock.jsx'
import InstagramCapabilityGrid from '../components/InstagramCapabilityGrid.jsx'
import InstagramStepsFlow from '../components/InstagramStepsFlow.jsx'
import WhyUsNumberedList from '../components/WhyUsNumberedList.jsx'
import EcosystemIconGrid from '../components/EcosystemIconGrid.jsx'

const HERO_BADGES = [
  { icon: <IconMail />, word: '3-in-1', desc: 'DMs, stories & comments' },
  { icon: <IconBolt />, word: '~4s', desc: 'average AI first reply' },
  { icon: <IconClock />, word: '24/7', desc: 'answered, even after hours' },
  { icon: <IconRefresh />, word: 'Full', desc: 'history on every handoff' },
]

const STEPS = [
  { title: 'Connect your account', desc: 'Link your Instagram Business or Creator account in a few clicks — no code required.' },
  { title: 'Set up replies & routing', desc: 'Define auto-replies, saved responses, and rules for turning comments into DMs.' },
  { title: 'Go live in one inbox', desc: 'Every DM, comment-turned-DM and handoff lands in the same inbox as your other channels.' },
]

const COMPARE_ROWS = [
  { feature: 'Team access', left: 'One login, one device', right: 'Unlimited team seats' },
  { feature: 'Automation', left: 'Manual replies only', right: 'Auto-replies, saved responses & AI' },
  { feature: 'Comments', left: 'Separate from DMs', right: 'Auto-routed into DM conversations' },
  { feature: 'Integrations', left: 'None', right: 'CRM, helpdesk & store integrations' },
  { feature: 'Reporting', left: 'No analytics', right: 'Reply time & volume reporting' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Faster response times', desc: 'Auto-replies and saved responses cut average first-response time to seconds.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Multiple agents work the same Instagram inbox without stepping on each other.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connect your CRM, helpdesk or store so every reply has real context behind it.' },
  { icon: <IconShield />, title: 'Built on the official API', desc: 'Runs on the official Instagram Messaging API — not a workaround that risks your account.' },
]

const ECOSYSTEM = [
  { icon: <IconChat />, title: 'WhatsApp, too', desc: 'Run Instagram DMs alongside WhatsApp Business API from the same shared inbox.', href: '/whatsapp-business-api' },
  { icon: <IconBolt />, title: 'SMS fallback', desc: 'Keep a universal channel in reach when a customer steps outside Instagram.', href: '/bulk-sms' },
  { icon: <IconBrain />, title: 'Agentic AI', desc: 'The same AI that answers your DMs can carry a conversation across every channel.', href: '/ai-agents/customer-service' },
  { icon: <IconPencil />, title: 'Chatbot builder', desc: 'Design the reply flows and routing rules visually, without writing code.', href: '/chatbot/builder' },
]

const TESTIMONIALS = [
  { quote: 'Comments used to just sit there. Now every "is this in stock?" turns into a DM and gets answered in seconds.', name: 'Ritika Malhotra', role: 'Founder, D2C fashion brand' },
  { quote: 'Our whole support team works the same Instagram inbox now — no more one person babysitting a phone.', name: 'Owen Dsouza', role: 'Support Lead, Retail' },
  { quote: 'Setting up saved replies took an afternoon and cut our response time from hours to minutes.', name: 'Farah Iqbal', role: 'Social Commerce Manager' },
]

const FAQS = [
  { q: 'What is the Instagram Messaging API?', a: 'It is Meta’s official API for sending and receiving Instagram DMs at scale, letting businesses automate and manage conversations beyond the Instagram app.' },
  { q: 'Can I automate replies to comments as well as DMs?', a: 'Yes — comments on your posts can be automatically routed into a private DM conversation, in addition to auto-replying to direct messages.' },
  { q: 'Can multiple team members share one Instagram inbox?', a: 'Yes, the whole conversation history and inbox is shared across your team, with assignment and handoff between agents and bots.' },
  { q: 'Do I need an Instagram Business account?', a: 'Yes — an Instagram Business or Creator account connected to a Facebook Page is required to use the Messaging API.' },
]

function InstagramMessagingApi() {
  return (
    <>
      <Seo
        title="Instagram Messaging & DM API"
        description="Manage and automate Instagram DMs via the Messaging API. Send, receive and route conversations for support, sales and social commerce."
        keywords={['Instagram DM API', 'Instagram messaging API', 'Instagram DM automation', 'Instagram business messaging', 'Instagram inbox API']}
      />

      <Hero
        eyebrow="Instagram"
        title="One Instagram DM API for support, sales and social commerce"
        subtitle="Automate replies, turn comments into conversations, and answer every DM from one shared inbox — without ever leaving Instagram."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<InstagramHeroMock />}
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

      <InstagramCapabilityGrid />

      <InstagramStepsFlow eyebrow="How it works" title={<>Go live on Instagram in three steps</>} steps={STEPS} alt />

      <CompareTable
        title={<>Instagram app inbox vs the Messaging API</>}
        subtitle="The native app works for one person. The API is built for a team and for scale."
        leftLabel="Instagram App"
        rightLabel="SMSLocal API"
        rows={COMPARE_ROWS}
      />

      <WhyUsNumberedList eyebrow="Why us" title={<>Why teams automate Instagram with SMSLocal</>} items={WHY_US} alt />

      <EcosystemIconGrid
        eyebrow="Ecosystem"
        title={<>Instagram fits right into your messaging stack</>}
        subtitle="Pair Instagram DMs with WhatsApp, SMS fallback and agentic AI across the same conversations."
        items={ECOSYSTEM}
      />

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} alt />

      <FAQ title={<>Instagram messaging API — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="Turn Instagram DMs into a real channel"
        subtitle="Connect your account and start automating replies today."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default InstagramMessagingApi
