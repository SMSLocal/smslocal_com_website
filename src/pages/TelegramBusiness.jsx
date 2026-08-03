import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconRobot, IconMegaphone, IconPlug, IconUsers, IconLink, IconMail } from '../components/icons.jsx'
import TelegramHeroMock from '../components/TelegramHeroMock.jsx'
import TelegramBotSetup from '../components/TelegramBotSetup.jsx'
import './TelegramBusiness.css'

const MODES = [
  {
    key: 'bots',
    icon: <IconRobot />,
    label: 'Two-way bots',
    desc: 'Commands, inline keyboards and AI answers that actually remember the customer.',
    points: [
      'Tap-to-act buttons — customers never guess a command',
      'AI answers, then hands off to a human with full history',
      'Remembers context across every visit, not just one session',
    ],
  },
  {
    key: 'broadcasts',
    icon: <IconMegaphone />,
    label: 'Channel broadcasts',
    desc: 'Publish one-to-many posts to your subscribers and see exactly how they land.',
    points: [
      'Segmented one-to-many channel broadcasts',
      'Delivery and read tracking on every send',
      'Replies flow straight back into one shared inbox',
    ],
  },
]

const BUTTONS = [
  { label: '🛒 Track Order', pct: 38, reply: 'Order #4812 is out for delivery, arriving today by 6 PM. You’ll get another tap-to-track update the moment it’s dropped off.' },
  { label: '📦 Order status', pct: 24, reply: 'Your last 3 orders are all delivered — nothing pending right now. Reordering any of them takes one tap, no forms to refill.' },
  { label: '📚 Browse Catalog', pct: 18, reply: 'Here’s the full catalog: sms.local/shop — new arrivals are pinned to the top. Every product card opens straight into checkout, no app switch needed.' },
  { label: '💬 Talk to Support', pct: 14, reply: 'Connecting you to a human agent now — average reply time is under 2 minutes. They’ll see this whole conversation already, so you won’t repeat yourself.' },
  { label: '❓ FAQ', pct: 6, reply: 'Most asked question: “Where’s my order?” — tap Track Order any time to check. Can’t find your answer here? Tap Talk to Support and a human takes over instantly.' },
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
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <>
      <Seo
        title="Telegram Business Messaging & Bot API Tools"
        description="Automate Telegram at scale with two-way messaging, bots and interactive formats, integrated with your CRM, shared inbox and other messaging channels."
        keywords={['Telegram for business', 'Telegram Bot API', 'Telegram business messaging', 'Telegram chatbot API', 'Telegram API integration']}
      />

      <Hero
        eyebrow="Telegram"
        title={<>Telegram bots and broadcasts, <span className="grad-word">built for business</span></>}
        subtitle="Automate two-way conversations, publish channel broadcasts, and manage every Telegram interaction from one platform — bots, buttons and all."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<TelegramHeroMock />}
      />

      {/* INNER 1 — full-bleed diagonal split, one job on each side of the page */}
      <section className="section tg-modes">
        <div className="container">
          <span className="section-kicker">Two jobs, one platform</span>
          <h2 className="section-title">Bots that talk back, and broadcasts that reach everyone</h2>
        </div>

        <div className="tg-split">
          {MODES.map((m) => (
            <div className={`tg-split-half tg-split-half--${m.key}`} key={m.key}>
              <div className="tg-split-inner">
                <span className="tg-split-icon">{m.icon}</span>
                <h3>{m.label}</h3>
                <p>{m.desc}</p>
                <ul className="tg-split-points">
                  {m.points.map((p) => (
                    <li key={p}><span>✓</span>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <span className="tg-split-badge" aria-hidden="true"><IconLink /></span>
        </div>
      </section>

      {/* INNER 2 — a genuinely clickable mini-demo: tap a button, get a real reply */}
      <section className="section section-alt tg-keys">
        <div className="container">
          <span className="section-kicker">Tap, don’t type</span>
          <h2 className="section-title">Everything happens with a button</h2>
          <p className="section-subtitle">Your customers never guess a command. Try it — tap a button below and see what your bot sends back.</p>

          <div className="tg-live">
            <div className="tg-live-main">
              <span className="tg-live-typed">/start</span>
              <p className="tg-live-prompt">
                <span className="tg-live-avatar">🤖</span>
                Welcome back — what can I help you with?
              </p>

              <div className="tg-live-keyboard">
                {BUTTONS.map((b, i) => (
                  <button
                    type="button"
                    key={b.label}
                    className={`tg-live-key${activeIndex === i ? ' tg-live-key--active' : ''}`}
                    style={{ '--d': `${i * 0.08}s` }}
                    onClick={() => setActiveIndex(i)}
                  >
                    {activeIndex === null && i === 0 && <span className="tg-live-tap" aria-hidden="true" />}
                    {b.label}
                  </button>
                ))}
              </div>

              <div className="tg-live-reply-slot" aria-live="polite">
                {activeIndex !== null ? (
                  <p className="tg-live-reply">{BUTTONS[activeIndex].reply}</p>
                ) : (
                  <span className="tg-live-hint">↑ go ahead, tap one — no typing needed</span>
                )}
              </div>
            </div>

            <div className="tg-live-side">
              <span className="tg-live-side-label">What customers tap most</span>
              <ul className="tg-live-bars">
                {BUTTONS.map((b, i) => (
                  <li
                    key={b.label}
                    className={`tg-live-bar-row${activeIndex === i ? ' tg-live-bar-row--active' : ''}`}
                  >
                    <span className="tg-live-bar-label">{b.label.replace(/^\S+\s/, '')}</span>
                    <span className="tg-live-bar-track">
                      <span className="tg-live-bar-fill" style={{ width: `${b.pct}%` }} />
                    </span>
                    <span className="tg-live-bar-pct">{b.pct}%</span>
                  </li>
                ))}
              </ul>
              <span className="tg-live-side-note">Tap a button on the left to see its share light up.</span>
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

      {/* INNER 4 — why us: asymmetric bento mosaic, not a uniform 4-up grid */}
      <section className="section section-alt tg-why">
        <div className="container">
          <span className="section-kicker">Why us</span>
          <h2 className="section-title">Why teams run Telegram on SMSLocal</h2>
          <div className="tg-why-bento">
            {WHY.map((w, i) => (
              <div className={`tg-why-tile tg-why-tile--${['big', 'wide', 'small', 'small'][i]}`} key={w.title}>
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
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>Telegram for business — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default TelegramBusiness
