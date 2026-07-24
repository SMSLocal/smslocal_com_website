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

/* the comment→sale story, stamped along a six-second clock */
const TRANSFORM_BEATS = [
  { t: '0s', title: 'The comment lands', desc: 'A public “is this in stock?” on your latest post.', quote: '@aria.wears · Is the canvas tote still in stock? 😍' },
  { t: '2s', title: 'It auto-routes to a DM', desc: 'The comment becomes a private conversation before it scrolls away.' },
  { t: '6s', title: 'The AI answers', desc: 'Stock checked, link sent, discount applied — no one had to be watching.', quote: 'Yes! In stock — here’s the link and a 10% code for you 🛍️' },
  { t: 'then', title: 'Your team closes it', desc: 'The whole thread stays in the shared inbox with the rest of the customer’s history.' },
]

const WHY = [
  { icon: <IconChart />, title: 'Faster response times', desc: 'Auto-replies answer in seconds, day or night.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Every agent works the same inbox, with clean handoff.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'CRM, helpdesk and store context ride along.' },
  { icon: <IconShield />, title: 'Built on the official API', desc: 'Meta’s own API — never a risky workaround.' },
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
        title={<>One <span className="grad-word">Instagram DM</span> API for support, sales and social commerce</>}
        subtitle="Automate replies, turn comments into conversations, and answer every DM from one shared inbox — without ever leaving Instagram."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<InstagramHeroMock />}
      />

      {/* INNER 1 — surfaces: the section IS the thread. Each surface arrives as a
          labelled inbound message; the AI answers all three at the end. */}
      <section className="section ig-surfaces">
        <div className="container ig-surfaces-inner">
          <div className="ig-surfaces-lead">
            <span className="section-kicker">One inbox</span>
            <h2 className="section-title">Every Instagram surface, answered in one place</h2>
            <p className="section-subtitle">DMs, comments and story replies stop living in three separate corners of the app. They all land in the same shared inbox — with the same history behind them.</p>
          </div>

          <div className="ig-thread">
            <span className="ig-thread-line" aria-hidden="true" />

            {SURFACES.slice(0, 3).map((s, i) => (
              <div className="ig-msg" key={s.title} style={{ '--i': i }}>
                <span className="ig-msg-src">
                  <i aria-hidden="true">{s.icon}</i>
                  {s.title}
                </span>
                <p className="ig-msg-body">{s.desc}</p>
              </div>
            ))}

            <div className="ig-msg ig-msg--out" style={{ '--i': 3 }}>
              <span className="ig-msg-src">
                <i aria-hidden="true">{SURFACES[3].icon}</i>
                {SURFACES[3].title}
              </span>
              <p className="ig-msg-body">{SURFACES[3].desc}</p>
            </div>

            <span className="ig-typing" aria-hidden="true">
              <i /><i /><i />
            </span>
          </div>
        </div>
      </section>

      {/* INNER 2 — steps: horizontal expanding panels, heading sits in the row */}
      <section className="section section-alt ig-steps">
        <div className="container ig-steps-row">
          <div className="ig-steps-lead">
            <span className="section-kicker">How it works</span>
            <h2 className="section-title">Go live on Instagram in three steps</h2>
          </div>

          <ol className="ig-steps-panels">
            {STEPS.map((s, i) => (
              <li className="ig-panel" key={s.title} style={{ '--i': i }}>
                <span className="ig-panel-num" aria-hidden="true">{i + 1}</span>
                <div className="ig-panel-text">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INNER 3 — one moment, two sides of a seam: public post vs private DM */}
      <section className="section ig-transform">
        <div className="container">
          <div className="ig-cross-head">
            <span className="section-kicker">Social commerce</span>
            <h2 className="ig-cross-title">It starts in public. It closes in private.</h2>
            <p className="ig-cross-sub">A comment under your post is a buying signal with a shelf life. SMSLocal moves it into a private DM automatically, so the AI — or your team — can answer while the customer is still there.</p>
          </div>

          <div className="ig-cross">
            <div className="ig-cross-side ig-cross-side--public">
              <span className="ig-cross-label">On the post</span>
              <p className="ig-cross-line">Is the canvas tote still in stock? 😍</p>
              <span className="ig-cross-meta">@aria.wears · public comment, sliding down the feed</span>
            </div>

            <span className="ig-cross-seam" aria-hidden="true">
              <i />
            </span>

            <div className="ig-cross-side ig-cross-side--private">
              <span className="ig-cross-label">In the DM, 6s later</span>
              <p className="ig-cross-line">Yes! In stock — here’s the link and a 10% code 🛍️</p>
              <span className="ig-cross-meta">Answered by AI-assist · thread waiting in your shared inbox</span>
            </div>
          </div>

          <p className="ig-cross-foot">
            <span><b>2s</b> comment routed to a DM</span>
            <span><b>6s</b> answered with stock, link and code</span>
            <span><b>0</b> tabs your team has to watch</span>
          </p>
        </div>
      </section>

      {/* INNER 4 — why us: a hub. Four reasons orbit the shared inbox, each
          wired to it with a live line. */}
      <section className="section section-alt ig-why">
        <div className="container">
          <div className="ig-why-head">
            <span className="section-kicker">Why us</span>
            <h2 className="ig-why-title">Why brands run Instagram on SMSLocal</h2>
          </div>

          <div className="ig-hub">
            <svg className="ig-hub-wires" viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true">
              {[
                { id: 'w0', d: 'M320,80 C430,80 430,190 500,190' },
                { id: 'w1', d: 'M320,300 C430,300 430,190 500,190' },
                { id: 'w2', d: 'M680,80 C570,80 570,190 500,190' },
                { id: 'w3', d: 'M680,300 C570,300 570,190 500,190' },
              ].map((w, i) => (
                <g key={w.id}>
                  <path id={w.id} className="ig-hub-wire" d={w.d} />
                  <circle className="ig-hub-spark" r="4">
                    <animateMotion dur="3.6s" begin={`${i * 0.9}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1">
                      <mpath href={`#${w.id}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))}
            </svg>

            <div className="ig-hub-core">
              <span className="ig-hub-ring" aria-hidden="true" />
              <strong>One shared inbox</strong>
              <small>every DM, comment and story reply</small>
            </div>

            {WHY.map((w, i) => (
              <div className={`ig-hub-node ig-hub-node--${i}`} key={w.title} style={{ '--i': i }}>
                <span className="ig-hub-ic">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
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
