import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconRobot, IconMegaphone, IconPlug, IconUsers, IconLink, IconMail } from '../components/icons.jsx'
import TelegramHeroMock from '../components/TelegramHeroMock.jsx'
import TelegramBotSetup from '../components/TelegramBotSetup.jsx'
import './TelegramBusiness.css'

const BOT_POINTS = [
  'Tap-to-act buttons — customers never guess a command',
  'AI answers, then hands off to a human with full history',
  'Remembers context across every visit, not just one session',
]
const CAST_POINTS = [
  'Segmented one-to-many channel broadcasts',
  'Delivery and read tracking on every send',
  'Replies flow straight back into one shared inbox',
]

const BUTTONS = [
  { label: '/start', kind: 'cmd' },
  { label: '🛒 Track Order', kind: 'btn' },
  { label: '📦 Order status', kind: 'btn' },
  { label: '📚 Browse Catalog', kind: 'btn' },
  { label: '💬 Talk to Support', kind: 'btn' },
  { label: '❓ FAQ', kind: 'btn' },
]

const STEPS = [
  { title: 'Create your bot', desc: 'Register a bot in a few clicks — we handle the setup, no server required.' },
  { title: 'Design commands & buttons', desc: 'Build commands, inline keyboards and broadcast templates visually.' },
  { title: 'Go live in one inbox', desc: 'Every bot chat and channel reply lands beside your other channels.' },
]

const WHY = [
  { icon: <IconPlug />, title: 'No server to run', desc: 'We host and scale your bot — no infrastructure for your team to maintain.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Multiple agents take over any bot conversation without losing history.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connect your CRM, helpdesk or store so every reply has real context.' },
  { icon: <IconMail />, title: 'One shared inbox', desc: 'Telegram sits beside WhatsApp, SMS and email in the same inbox.' },
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
        title={<>Telegram bots and broadcasts, <span className="grad-word">built for business</span></>}
        subtitle="Automate two-way conversations, publish channel broadcasts, and manage every Telegram interaction from one platform — bots, buttons and all."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<TelegramHeroMock />}
      />

      {/* INNER 1 — two-mode split: bots | broadcasts */}
      <section className="section tg-modes">
        <div className="container">
          <span className="section-kicker">Two jobs, one platform</span>
          <h2 className="section-title">Bots that talk back, and broadcasts that reach everyone</h2>
          <div className="tg-modes-grid">
            <div className="tg-mode">
              <span className="tg-mode-icon"><IconRobot /></span>
              <h3>Two-way bots</h3>
              <p>Commands, inline keyboards and AI answers that actually remember the customer.</p>
              <ul>{BOT_POINTS.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
            <div className="tg-mode-split" aria-hidden="true"><span>+</span></div>
            <div className="tg-mode">
              <span className="tg-mode-icon"><IconMegaphone /></span>
              <h3>Channel broadcasts</h3>
              <p>Publish one-to-many posts to your subscribers and see exactly how they land.</p>
              <ul>{CAST_POINTS.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* INNER 2 — inline-keyboard command showcase, explained as a flow */}
      <section className="section section-alt tg-keys">
        <div className="container tg-keys-inner">
          <div className="tg-keys-copy">
            <span className="section-kicker">Tap, don’t type</span>
            <h2 className="section-title">Everything happens with a button</h2>
            <p className="section-subtitle">Your customers never guess a command. They tap a labelled button, and the bot — or your AI — takes it from there.</p>
          </div>

          <div className="tg-flow" aria-hidden="true">
            <div className="tg-flow-step">
              <span className="tg-flow-label">Step 1 — typed once, to begin</span>
              <span className="tg-key tg-key--cmd">/start</span>
            </div>

            <span className="tg-flow-arrow">↓</span>

            <div className="tg-flow-step">
              <span className="tg-flow-label">Step 2 — every reply after is a tap, never typed again</span>
              <div className="tg-keyboard">
                {BUTTONS.filter((b) => b.kind === 'btn').map((b) => (
                  <span className="tg-key tg-key--btn" key={b.label}>{b.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INNER 3 — live BotFather-style setup transcript */}
      <TelegramBotSetup
        eyebrow="How it works"
        title="Go live on Telegram in three steps"
        steps={STEPS}
      />

      {/* INNER 4 — why us: ghost-numeral benefits, 4 across */}
      <section className="section section-alt tg-why">
        <div className="container">
          <span className="section-kicker">Why us</span>
          <h2 className="section-title">Why teams run Telegram on SMSLocal</h2>
          <div className="tg-why-grid">
            {WHY.map((w, i) => (
              <div className="tg-why-cell" key={w.title}>
                <span className="tg-why-ghost">{`0${i + 1}`}</span>
                <span className="tg-why-icon">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Launch your Telegram bot without the server"
        subtitle="Bots, buttons and broadcasts — live in days, not months."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>Telegram for business — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default TelegramBusiness
