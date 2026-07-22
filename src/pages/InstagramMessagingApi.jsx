import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconChat, IconRefresh, IconMail, IconBrain, IconChart, IconUsers, IconLink, IconShield } from '../components/icons.jsx'
import InstagramHeroMock from '../components/InstagramHeroMock.jsx'
import './InstagramMessagingApi.css'

const SURFACES = [
  { icon: <IconChat />, title: 'Direct messages', desc: 'Auto-replies and saved responses handle the routine, and your team picks up whatever needs a human.' },
  { icon: <IconRefresh />, title: 'Comments, routed to DMs', desc: 'A public “is this in stock?” becomes a private DM in seconds — before it scrolls out of the feed.' },
  { icon: <IconMail />, title: 'Story replies', desc: 'Every reply to a story lands in the same thread, not a separate corner of the app you forget to check.' },
  { icon: <IconBrain />, title: 'One AI across all three', desc: 'The same agentic AI reads the full history and answers — whichever surface the message arrived on.' },
]

const STEPS = [
  { title: 'Connect your account', desc: 'Link your Instagram Business or Creator account in a few clicks — no code required.' },
  { title: 'Set up replies & routing', desc: 'Define auto-replies, saved responses, and rules for turning comments into DMs.' },
  { title: 'Go live in one inbox', desc: 'Every DM, comment-turned-DM and handoff lands in the same inbox as your other channels.' },
]

const TRANSFORM_POINTS = [
  'A comment auto-routes into a private DM in seconds',
  'The AI answers with stock, a link and a discount code',
  'The whole thread stays in your shared inbox to close',
]

const WHY = [
  { icon: <IconChart />, title: 'Faster response times', desc: 'Auto-replies and saved responses cut average first-response time from hours to seconds.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Multiple agents work the same Instagram inbox at once, with assignment and clean handoff.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connect your CRM, helpdesk or store so every reply carries real order and customer context.' },
  { icon: <IconShield />, title: 'Built on the official API', desc: 'Runs on Meta’s official Instagram Messaging API — never a workaround that risks your account.' },
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

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function InstagramMessagingApi() {
  const [flipped, setFlipped] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setFlipped((i) => (i + 1) % WHY.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <Seo
        title="Instagram Messaging & DM API"
        description="Manage and automate Instagram DMs via the Messaging API. Send, receive and route conversations for support, sales and social commerce."
        keywords={['Instagram DM API', 'Instagram messaging API', 'Instagram DM automation', 'Instagram business messaging', 'Instagram inbox API']}
      />

      <Hero
        eyebrow="Instagram"
        title={<>One <span className="grad-word">Instagram DM</span> API for support, sales and social commerce</>}
        subtitle="Automate replies, turn comments into conversations, and answer every DM from one shared inbox — without ever leaving Instagram."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<InstagramHeroMock />}
      />

      {/* INNER 1 — surfaces: asymmetric lead + open row list (no boxes) */}
      <section className="section ig-surfaces">
        <div className="container ig-surfaces-inner">
          <div className="ig-surfaces-lead">
            <span className="section-kicker">One inbox</span>
            <h2 className="section-title">Every Instagram surface, answered in one place</h2>
            <p className="section-subtitle">DMs, comments and story replies stop living in three separate corners of the app. They all land in the same shared inbox — with the same history behind them.</p>
          </div>
          <ul className="ig-surface-list">
            {SURFACES.map((s) => (
              <li className="ig-surface-row" key={s.title}>
                <span className="ig-surface-icon">{s.icon}</span>
                <div className="ig-surface-text">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INNER 2 — steps: horizontal connected path with big numerals */}
      <section className="section section-alt ig-steps">
        <div className="container">
          <span className="section-kicker">How it works</span>
          <h2 className="section-title">Go live on Instagram in three steps</h2>
          <ol className="ig-steps-track">
            {STEPS.map((s, i) => (
              <li className="ig-step" key={s.title}>
                <span className="ig-step-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INNER 3 — signature moment: public comment -> private DM */}
      <section className="section ig-transform">
        <div className="container ig-transform-inner">
          <div className="ig-transform-copy">
            <span className="section-kicker">Social commerce</span>
            <h2 className="section-title">Turn a public comment into a private sale</h2>
            <p className="section-subtitle">The moment someone comments on a post, it becomes a DM your team — or the AI — can actually close, before it scrolls away for good.</p>
            <ul className="ig-transform-points">
              {TRANSFORM_POINTS.map((p) => (
                <li key={p}><span className="ig-tick" aria-hidden="true" />{p}</li>
              ))}
            </ul>
          </div>
          <div className="ig-transform-visual" aria-hidden="true">
            <div className="ig-tile ig-tile--public">
              <span className="ig-tile-label">Public comment</span>
              <div className="ig-bubble">
                <strong>@aria.wears</strong>
                <span>Is the canvas tote still in stock? 😍</span>
              </div>
            </div>
            <span className="ig-transform-arrow" />
            <div className="ig-tile ig-tile--private">
              <span className="ig-tile-label">Private DM · replied in 6s</span>
              <div className="ig-bubble ig-bubble--bot">
                <span>Yes! In stock — here’s the link and a 10% code for you 🛍️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INNER 4 — why us: 3D flip cards (front icon+title, back the reason) */}
      <section className="section section-alt ig-why">
        <div className="container">
          <span className="section-kicker">Why us</span>
          <h2 className="section-title">Why brands run Instagram on SMSLocal</h2>
          <div className="ig-why-flip-row">
            {WHY.map((w, i) => (
              <div
                className="ig-why-flip"
                key={w.title}
                onClick={() => setFlipped(i)}
                onMouseEnter={() => setFlipped(i)}
              >
                <div className={i === flipped ? 'ig-why-flip-inner flipped' : 'ig-why-flip-inner'}>
                  <div className="ig-why-face ig-why-front">
                    <span className="ig-why-icon">{w.icon}</span>
                    <h3>{w.title}</h3>
                  </div>
                  <div className="ig-why-face ig-why-back">
                    <h3>{w.title}</h3>
                    <p>{w.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Turn Instagram DMs into a real channel"
        subtitle="Connect your account and start automating replies today."
        cta={{ label: 'Get Started', href: '/contact-us' }}
      />

      <FAQ title={<>Instagram messaging API — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default InstagramMessagingApi
