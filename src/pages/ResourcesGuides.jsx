import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import './ResourcesGuides.css'
import { FAQ, CTABanner } from '../components/sections/Sections.jsx'
import GuideTrackPicker from '../components/GuideTrackPicker.jsx'
import GuidesMapHero from '../components/GuidesMapHero.jsx'
import {
  IconRocket, IconChat, IconRobot, IconBrain, IconCode, IconCheck,
  IconBook, IconClock, IconPencil,
} from '../components/icons.jsx'

/* ---- Learning tracks (railway rails) ---- */
const TRACKS = [
  {
    tint: 'a',
    icon: <IconRocket />,
    name: 'Getting started',
    tag: 'Beginner',
    stops: ['Create your account', 'Add a sender ID', 'Send your first SMS', 'Read a delivery report'],
  },
  {
    tint: 'b',
    icon: <IconChat />,
    name: 'Messaging channels',
    tag: 'Setup',
    stops: ['WhatsApp Business API', 'RCS onboarding', 'Viber & Telegram', 'Sender ID registration'],
  },
  {
    tint: 'c',
    icon: <IconRobot />,
    name: 'Chatbots',
    tag: 'Build',
    stops: ['Design your first flow', 'Add buttons & media', 'Hand off to a human', 'Publish everywhere'],
  },
  {
    tint: 'd',
    icon: <IconBrain />,
    name: 'AI agents',
    tag: 'Advanced',
    stops: ['Connect your data', 'Set guardrails', 'Test in the sandbox', 'Deploy to production'],
  },
  {
    tint: 'e',
    icon: <IconCode />,
    name: 'For developers',
    tag: 'API',
    stops: ['Authenticate requests', 'Send via REST', 'Handle webhooks', 'Relay over SMTP'],
  },
]

/* ---- Featured guide chapters ---- */
const CHAPTERS = [
  'Create your account and log in',
  'Register a sender ID',
  'Import or add a test contact',
  'Compose and send your first message',
  'Watch the delivery receipt land',
  'Wire the same call into your app',
]

/* ---- Popular guides (ranked) ---- */
const POPULAR = [
  { title: 'Set up the WhatsApp Business API', desc: 'Connect a number, verify your business and send your first template.', level: 'Intermediate', time: '12 min', href: '/channels/whatsapp' },
  { title: 'Send SMS from your own backend', desc: 'Authenticate, POST a message and read the response — in cURL, Node or Python.', level: 'Developer', time: '8 min', href: '/sms-api' },
  { title: 'Build a chatbot flow that converts', desc: 'Branch on replies, collect input and route to the right answer.', level: 'Intermediate', time: '15 min', href: '/chatbot/builder' },
  { title: 'Launch an RCS broadcast campaign', desc: 'Rich cards, carousels and suggested replies on Android — step by step.', level: 'Intermediate', time: '10 min', href: '/channels/rcs' },
  { title: 'Deploy your first AI agent', desc: 'Connect a knowledge source, set guardrails and go live in a sandbox first.', level: 'Advanced', time: '18 min', href: '/ai-agents/agent-builder' },
  { title: 'Handle delivery receipts with webhooks', desc: 'Receive real-time status events and inbound replies at your endpoint.', level: 'Developer', time: '9 min', href: '/resources/docs' },
]

/* ---- What's inside every guide ---- */
const ANATOMY = [
  { icon: <IconPencil />, title: 'Clear steps', desc: 'Numbered, in order, nothing skipped.' },
  { icon: <IconCode />, title: 'Copy-paste code', desc: 'Working snippets and configs you can lift straight in.' },
  { icon: <IconBook />, title: 'Real screenshots', desc: 'The actual screens, so you never lose your place.' },
  { icon: <IconClock />, title: 'A time to done', desc: 'Every guide tells you how long before you start.' },
]

const FAQS = [
  { q: 'Do I need a paid account to follow the guides?', a: 'No. Most getting-started and developer guides can be followed with a free trial account, using test sender IDs and sandbox endpoints before you send anything live.' },
  { q: 'Are the code samples production-ready?', a: 'The snippets are complete, working calls against the real API. You still add your own error handling and secrets management, but you can paste them in and get a response on the first try.' },
  { q: 'How often are the guides updated?', a: 'We revise guides whenever a channel onboarding step, API field or dashboard screen changes, so screenshots and code stay in sync with what you actually see.' },
  { q: 'I can’t find a guide for my use case. What now?', a: 'Reach out to our team — we’ll walk you through it directly and often turn common questions into a new guide so the next person finds it here.' },
]

function ResourcesGuides() {
  return (
    <>
      <Seo
        title="Guides & Tutorials"
        description="Step-by-step SMSLocal guides — set up channels, build chatbots, deploy AI agents and integrate the API, grouped into tracks you can follow start to finish."
      />

      {/* ---------- HERO ---------- */}
      <section className="hero gd-hero">
        <div className="container gd-hero-inner">
          <div className="gd-hero-copy">
            <span className="eyebrow">Guides &amp; tutorials</span>
            <h1>Learn SMSLocal, one guide at a time</h1>
            <p className="hero-subtitle">
              Follow a track from your very first message to a fully deployed AI agent.
              Practical, up-to-date walkthroughs with real screenshots and copy-paste code.
            </p>
            <div className="hero-actions">
              <a href="#tracks" className="btn btn-primary">Browse the tracks</a>
              <Link to="/resources/docs" className="btn btn-ghost">Read the API docs</Link>
            </div>
            <div className="gd-hero-meta">
              <span><strong>40+</strong> guides</span>
              <span className="gd-hero-dot" aria-hidden="true" />
              <span><strong>5</strong> learning tracks</span>
              <span className="gd-hero-dot" aria-hidden="true" />
              <span><strong>Weekly</strong> updates</span>
            </div>
          </div>

          <GuidesMapHero />
        </div>
      </section>

      {/* ---------- TRACKS (interactive picker) ---------- */}
      <GuideTrackPicker tracks={TRACKS} />

      {/* ---------- FEATURED GUIDE ---------- */}
      <section className="section section-alt gd-featured">
        <div className="container gd-featured-inner">
          <div className="gd-featured-copy">
            <span className="gd-featured-flag">Start here</span>
            <h2>Send your first message in 10 minutes</h2>
            <p>
              The one guide everyone starts with. Go from an empty account to a delivered
              message — then make the exact same call from your own code, so you leave knowing
              both the dashboard and the API.
            </p>
            <div className="gd-featured-meta">
              <span><IconRocket /> Beginner</span>
              <span><IconBook /> 6 chapters</span>
              <span><IconClock /> 10 min read</span>
            </div>
            <Link to="/resources/docs" className="btn btn-primary">Read the guide</Link>
          </div>

          <ol className="gd-chapters">
            {CHAPTERS.map((c, i) => (
              <li className="gd-chapter" key={c}>
                <span className="gd-chapter-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="gd-chapter-text">{c}</span>
                <span className="gd-chapter-check" aria-hidden="true"><IconCheck /></span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- POPULAR (ranked leaderboard) ---------- */}
      <section className="section gd-popular">
        <div className="container">
          <span className="section-kicker">Most read</span>
          <h2 className="section-title">The guides people open the most</h2>
          <p className="section-subtitle">A good place to start if you’re not sure where to.</p>

          <div className="gd-rank-list">
            {POPULAR.map((g, i) => (
              <Link to={g.href} className="gd-rank" key={g.title}>
                <span className="gd-rank-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="gd-rank-body">
                  <span className="gd-rank-title">{g.title}</span>
                  <span className="gd-rank-desc">{g.desc}</span>
                </span>
                <span className="gd-rank-meta">
                  <span className="gd-rank-level">{g.level}</span>
                  <span className="gd-rank-time"><IconClock /> {g.time}</span>
                </span>
                <span className="gd-rank-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ANATOMY ---------- */}
      <section className="section section-alt gd-anatomy">
        <div className="container">
          <span className="section-kicker">No filler</span>
          <h2 className="section-title">What’s inside every guide</h2>
          <p className="section-subtitle">
            Same promise on all of them, whether it’s your first SMS or a production AI agent.
          </p>

          <div className="gd-anatomy-strip">
            {ANATOMY.map((a, i) => (
              <div className="gd-anatomy-item" key={a.title}>
                <span className="gd-anatomy-icon">{a.icon}</span>
                <span className="gd-anatomy-title">{a.title}</span>
                <span className="gd-anatomy-desc">{a.desc}</span>
                {i < ANATOMY.length - 1 && <span className="gd-anatomy-link" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Prefer a hand walking you through it?"
        subtitle="Tell us what you’re building and our team will guide you the rest of the way."
        cta={{ label: 'Talk to us', href: '/contact-us' }}
        secondaryCta={{ label: 'Browse the docs', href: '/resources/docs' }}
      />

      <FAQ title={<>Guides — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default ResourcesGuides
