import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import './Blog.css'
import { Hero, CTABanner } from '../components/sections/Sections.jsx'
import { IconRocket, IconShield, IconChat, IconRobot, IconBrain, IconBolt } from '../components/icons.jsx'

// Category → cover gradient + icon
const CATEGORY_META = {
  'Getting started': { grad: 'grad-c', icon: <IconRocket /> },
  Compliance: { grad: 'grad-b', icon: <IconShield /> },
  WhatsApp: { grad: 'grad-e', icon: <IconChat /> },
  Chatbots: { grad: 'grad-a', icon: <IconRobot /> },
  'AI Agents': { grad: 'grad-a', icon: <IconBrain /> },
  Deliverability: { grad: 'grad-f', icon: <IconBolt /> },
}

const POSTS = [
  {
    title: 'What DLT registration actually means for your SMS',
    excerpt: 'A plain-English walkthrough of entity, header and template registration — and where most senders trip up before their first campaign.',
    category: 'Compliance',
    date: 'Jul 2026',
    read: '9 min',
    featured: true,
  },
  {
    title: 'SMS vs WhatsApp: which channel for which message',
    excerpt: 'OTPs, order updates, promotions and support — a practical framework for picking the right channel instead of blasting everything everywhere.',
    category: 'Getting started',
    date: 'Jul 2026',
    read: '7 min',
  },
  {
    title: 'Why your OTPs arrive late, and how to fix it',
    excerpt: 'Latency rarely comes from one place. We break down routing, sender reputation and fallback so a verification code never keeps a user waiting.',
    category: 'Deliverability',
    date: 'Jul 2026',
    read: '8 min',
  },
  {
    title: 'A practical guide to WhatsApp template approval',
    excerpt: 'What Meta actually checks, why templates get rejected, and how to structure marketing, utility and authentication messages that pass first time.',
    category: 'WhatsApp',
    date: 'Jun 2026',
    read: '10 min',
  },
  {
    title: "Chatbot vs AI agent: what's the real difference",
    excerpt: 'One follows a script, the other takes action. Where each fits, when to upgrade, and how to avoid paying agent prices for chatbot work.',
    category: 'AI Agents',
    date: 'Jun 2026',
    read: '6 min',
  },
  {
    title: 'Designing a support chatbot that actually deflects tickets',
    excerpt: 'Deflection is a design problem, not a model problem. The flows, fallbacks and handoff rules that separate a helpful bot from an annoying one.',
    category: 'Chatbots',
    date: 'Jun 2026',
    read: '8 min',
  },
  {
    title: 'Sender IDs explained: branded SMS without the guesswork',
    excerpt: 'Alphanumeric vs numeric, registration rules by country, and why a recognizable sender name quietly lifts your open and trust rates.',
    category: 'Compliance',
    date: 'May 2026',
    read: '7 min',
  },
  {
    title: 'Cutting cart abandonment with WhatsApp follow-ups',
    excerpt: 'A single automated email is easy to ignore. Here is how a short, well-timed WhatsApp sequence recovers carts customers had already given up on.',
    category: 'WhatsApp',
    date: 'May 2026',
    read: '6 min',
  },
  {
    title: 'Rate limits, retries and idempotency: SMS API basics',
    excerpt: 'The three concepts that keep a high-volume integration from double-charging customers or silently dropping messages under load.',
    category: 'Getting started',
    date: 'May 2026',
    read: '9 min',
  },
  {
    title: 'Measuring delivery rate the right way',
    excerpt: 'Sent is not delivered, and delivered is not read. A clear-eyed look at the metrics that actually tell you whether your messages are landing.',
    category: 'Deliverability',
    date: 'Apr 2026',
    read: '7 min',
  },
]

const CATEGORIES = ['All topics', ...Object.keys(CATEGORY_META)]

function BlogCard({ post }) {
  const meta = CATEGORY_META[post.category] ?? { grad: 'grad-c', icon: <IconRocket /> }
  return (
    <article className="blog-card">
      <div className={`blog-cover ${meta.grad}`}>
        <span className="blog-cover-tag">{post.category}</span>
        <span className="blog-cover-icon">{meta.icon}</span>
      </div>
      <div className="blog-card-body">
        <div className="blog-meta">
          {post.date}<span className="dot">·</span>{post.read} read
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="blog-readmore">Read more →</span>
      </div>
    </article>
  )
}

function Blog() {
  const [active, setActive] = useState('All topics')

  const featured = POSTS.find((p) => p.featured)
  const isAll = active === 'All topics'
  const visible = POSTS.filter((p) => {
    if (isAll) return !p.featured
    return p.category === active
  })
  const featuredMeta = featured ? (CATEGORY_META[featured.category] ?? {}) : {}

  return (
    <>
      <Seo
        title="Blog & Articles on Messaging and AI Agents"
        description="Guides, playbooks and product updates on SMS, WhatsApp, chatbots and agentic AI from the SMSLocal team, written for people building messaging programs."
      />

      <Hero
        eyebrow="Blog"
        title={<>Messaging, compliance and delivery — from <span className="grad-word">the team that ships it</span></>}
        subtitle="Guides and playbooks on SMS, WhatsApp, chatbots and agentic AI, written for the people actually building with them."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Guides', href: '/resources/guides/' }}
      />

      <section className="section blog-section">
        <div className="container">
          <div className="blog-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={cat === active ? 'blog-chip active' : 'blog-chip'}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {isAll && featured && (
            <article className="blog-featured">
              <div className={`blog-cover ${featuredMeta.grad || 'grad-c'}`}>
                <span className="blog-cover-tag">{featured.category}</span>
                <span className="blog-cover-icon">{featuredMeta.icon}</span>
              </div>
              <div className="blog-featured-body">
                <div className="blog-meta">
                  Featured<span className="dot">·</span>{featured.date}<span className="dot">·</span>{featured.read} read
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="blog-readmore">Read more →</span>
              </div>
            </article>
          )}

          <div className="blog-grid">
            {visible.map((post) => (
              <BlogCard post={post} key={post.title} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Get new articles as we publish them"
        subtitle="Talk to us and we'll keep you posted on what's new."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />
    </>
  )
}

export default Blog
