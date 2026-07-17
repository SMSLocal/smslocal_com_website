import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, CompareTable, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconRobot, IconCursor, IconMegaphone, IconBrain, IconPlug, IconUsers, IconLink, IconMail, IconChat, IconBolt, IconPencil } from '../components/icons.jsx'
import TelegramHeroMock from '../components/TelegramHeroMock.jsx'
import TelegramCapabilityGrid from '../components/TelegramCapabilityGrid.jsx'
import TelegramStepsCascade from '../components/TelegramStepsCascade.jsx'
import WhyUsTiltBadges from '../components/WhyUsTiltBadges.jsx'
import EcosystemTextLinks from '../components/EcosystemTextLinks.jsx'

const HERO_BADGES = [
  { icon: <IconRobot />, word: 'Bots', desc: 'commands & inline keyboards' },
  { icon: <IconCursor />, word: 'Buttons', desc: 'tap to act, no typing needed' },
  { icon: <IconMegaphone />, word: 'Broadcast', desc: 'channel posts at scale' },
  { icon: <IconBrain />, word: 'AI', desc: 'answers folded into one inbox' },
]

const STEPS = [
  { title: 'Create your bot', desc: 'Register a bot in a few clicks — we handle the setup, no server required.' },
  { title: 'Design commands & buttons', desc: 'Build commands, inline keyboards and broadcast templates visually.' },
  { title: 'Go live in one inbox', desc: 'Every bot chat and channel reply lands beside your other channels.' },
]

const COMPARE_ROWS = [
  { feature: 'Hosting', left: 'You run your own bot server', right: 'Fully hosted, nothing to maintain' },
  { feature: 'Changes', left: 'Code changes for every tweak', right: 'Visual builder, no code needed' },
  { feature: 'Context', left: 'No memory between sessions', right: 'Full customer record on every chat' },
  { feature: 'Integrations', left: 'None', right: 'CRM, helpdesk & store integrations' },
  { feature: 'Reporting', left: 'Basic bot logs', right: 'Delivery, reply & command analytics' },
]

const WHY_US = [
  { icon: <IconPlug />, title: 'No server to run', desc: 'We host and scale your bot — no infrastructure for your team to maintain.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Multiple agents can take over any bot conversation without losing history.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connect your CRM, helpdesk or store so every reply has real context.' },
  { icon: <IconMail />, title: 'One inbox, every channel', desc: 'Telegram sits beside WhatsApp, SMS and email in the same shared inbox.' },
]

const ECOSYSTEM = [
  { icon: <IconChat />, title: 'WhatsApp, too', desc: 'Run your Telegram bot alongside WhatsApp Business API from the same inbox.', href: '/whatsapp-business-api' },
  { icon: <IconBolt />, title: 'SMS fallback', desc: 'Keep a universal channel in reach for customers outside Telegram.', href: '/bulk-sms' },
  { icon: <IconBrain />, title: 'Agentic AI', desc: 'The same AI that answers your bot can carry a conversation across every channel.', href: '/ai-agents/customer-service' },
  { icon: <IconPencil />, title: 'Chatbot builder', desc: 'Design commands, keyboards and reply flows visually, without writing code.', href: '/chatbot/builder' },
]

const TESTIMONIALS = [
  { quote: 'We had a bot live in an afternoon — no server, no BotFather headaches, just a visual builder.', name: 'Karan Bhatt', role: 'Founder, D2C brand' },
  { quote: 'When our bot can’t answer something, it hands off to a human with the full chat already attached. That alone saved us hours a week.', name: 'Elena Marchetti', role: 'Support Ops Lead' },
  { quote: 'Our Telegram channel and bot finally share one inbox with WhatsApp — no more checking four different apps.', name: 'Yusuf Demir', role: 'Customer Experience Manager' },
]

const FAQS = [
  { q: 'What is Telegram for Business?', a: 'It’s a way for businesses to run Telegram bots, channels and two-way chats at scale — with automation, team handoff and reporting built in, not just a raw Bot API.' },
  { q: 'Do I need to run my own bot server?', a: 'No — we host and scale the bot for you. You design commands, buttons and flows visually, without managing any infrastructure.' },
  { q: 'Can a human take over from the bot?', a: 'Yes, any conversation can be escalated to a live agent with the full chat history attached, right inside the same shared inbox.' },
  { q: 'Can I send channel broadcasts as well as bot chats?', a: 'Yes — one-way channel broadcasts and two-way bot conversations are both supported and tracked separately in your reporting.' },
]

function TelegramBusiness() {
  return (
    <>
      <Seo
        title="Telegram Business Messaging & Bot API"
        description="Automate Telegram at scale — two-way messaging, bots and interactive formats integrated with your CRM and other channels."
        keywords={['Telegram for business', 'Telegram Bot API', 'Telegram business messaging', 'Telegram chatbot API', 'Telegram API integration']}
      />

      <Hero
        eyebrow="Telegram"
        title="Telegram bots and broadcasts, built for business"
        subtitle="Automate two-way conversations, publish channel broadcasts, and manage every Telegram interaction from one platform — bots, buttons and all."
        primaryCta={{ label: 'Get Started', href: '/contact' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<TelegramHeroMock />}
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
        heading={<>A Telegram bot without memory is just a command list.</>}
        paragraphs={[
          'Most Telegram bots handle a command and forget everything the moment the chat ends. A customer types /start, taps a button, and if they come back tomorrow the bot has no idea who they are or what they asked.',
          "So every interaction restarts from zero, buttons repeat themselves, and anything that needs a human gets stuck — there's no shared record connecting the bot, the agent, and the rest of your channels.",
          <>Wire your bot into the same inbox as WhatsApp, SMS and email, and <strong>every tap, command and handoff stays attached to one customer record</strong>.</>,
        ]}
        leftLabel="A standalone bot"
        leftItems={[
          'Forgets the customer between sessions',
          'Buttons and commands, nothing else',
          "No handoff path when a bot can't help",
          'Lives apart from your other channels',
        ]}
        rightLabel="Telegram, on SMSLocal"
        rightItems={[
          'Remembers context across every visit',
          'Bots, buttons and live agents in one thread',
          'Clean handoff to a human, with full history',
          'Sits beside WhatsApp, SMS and email',
        ]}
        alt
      />

      <TelegramCapabilityGrid />

      <TelegramStepsCascade eyebrow="How it works" title={<>Go live on Telegram in three steps</>} steps={STEPS} alt />

      <CompareTable
        title={<>DIY bot vs the SMSLocal API</>}
        subtitle="A raw Bot API gets you a command list. This gets you a channel your whole team can run."
        leftLabel="DIY Telegram Bot"
        rightLabel="SMSLocal API"
        rows={COMPARE_ROWS}
      />

      <WhyUsTiltBadges eyebrow="Why us" title={<>Why teams run Telegram on SMSLocal</>} items={WHY_US} alt />

      <EcosystemTextLinks
        eyebrow="Ecosystem"
        title={<>Telegram fits right into your messaging stack</>}
        subtitle="Pair Telegram with WhatsApp, SMS fallback and agentic AI across the same conversations."
        items={ECOSYSTEM}
      />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} alt />

      <FAQ title={<>Telegram for business — frequently asked questions</>} items={FAQS} />

      <CTABanner
        title="Launch your Telegram bot without the server"
        subtitle="Bots, buttons and broadcasts — live in days, not months."
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  )
}

export default TelegramBusiness
