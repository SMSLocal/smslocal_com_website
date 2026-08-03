import { Link } from 'react-router-dom'
import './AgenticShowcase.css'

function InboxMock() {
  return (
    <div className="inbox-mock">
      <div className="inbox-sidebar">
        <div className="inbox-search">🔍 Search</div>
        <div className="inbox-item active">
          <span className="inbox-avatar">A</span>
          <span>Aisha R. <small>Order #4821</small></span>
        </div>
        <div className="inbox-item">
          <span className="inbox-avatar">D</span>
          <span>Daniel C. <small>Refund request</small></span>
        </div>
        <div className="inbox-item">
          <span className="inbox-avatar">P</span>
          <span>Priya N. <small>Shipping query</small></span>
        </div>
      </div>
      <div className="inbox-thread">
        <div className="inbox-bubble user">Where is my order? It&rsquo;s been 5 days.</div>
        <div className="inbox-bubble bot">Your order shipped yesterday — tracking sent to your email. Anything else?</div>
        <div className="inbox-bubble user">Perfect, thank you!</div>
        <div className="inbox-footnote">Resolved autonomously in 0.8s</div>
      </div>
    </div>
  )
}

function ChannelIcons() {
  const icons = ['💬', '🟢', '✉️', '✨', '📞']
  return (
    <div className="channel-icons">
      {icons.map((i) => (
        <span className="channel-icon" key={i}>{i}</span>
      ))}
    </div>
  )
}

function VoiceMock() {
  return (
    <div className="voice-mock">
      <div className="voice-wave">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={{ height: `${12 + Math.abs(9 - i) * 3}px` }} />
        ))}
      </div>
      <span className="voice-timer">00:14</span>
    </div>
  )
}

function AutomationMock() {
  return (
    <div className="automation-mock">
      <div className="automation-row">
        <span>If sentiment</span>
        <span className="automation-pill">Negative</span>
      </div>
      <div className="automation-row">
        <span>Then</span>
        <span className="automation-pill accent">Escalate to human</span>
      </div>
    </div>
  )
}

function BroadcastMock() {
  return (
    <div className="broadcast-mock">
      <div className="broadcast-row">
        <span>Reach</span>
        <strong>4,820 contacts</strong>
      </div>
      <div className="broadcast-row">
        <span>Delivered</span>
        <strong style={{ color: 'var(--success)' }}>98.4%</strong>
      </div>
    </div>
  )
}

const CARDS_ROW2 = [
  {
    title: 'Not just answers — action.',
    desc: 'Understands intent, connects to your tools, and takes real action to resolve — not just reply.',
    cta: 'Meet the agent',
    href: '/products/ai-agents/agentic-ai/',
    Mock: () => (
      <div className="mini-mock">
        <div className="mini-bubble user">Cancel my subscription</div>
        <div className="mini-bubble bot">Done — cancelled and confirmed by email. ✓</div>
      </div>
    ),
  },
  {
    title: 'Agentic AI voice.',
    desc: 'Natural, low-latency voice AI that answers, qualifies and resolves calls — no hold music required.',
    cta: 'See demo',
    href: '/products/ai-agents/voice/',
    dark: true,
    Mock: VoiceMock,
  },
]

const CARDS_ROW3 = [
  {
    title: 'Broadcast on every channel.',
    desc: 'Send bulk campaigns across SMS, WhatsApp and RCS from one dashboard.',
    cta: 'View pricing',
    href: '/pricing/',
    Mock: BroadcastMock,
  },
  {
    title: 'Every channel, one record.',
    desc: 'SMS, WhatsApp, RCS, Email and more — one contact history, no matter the channel.',
    cta: 'See channels',
    href: '/products/channels/',
    Mock: ChannelIcons,
  },
  {
    title: 'Decides and escalates.',
    desc: 'Set the rules once — the agent knows exactly when to act and when to hand off.',
    cta: 'Explore automation',
    href: '/products/ai-agents/agent-builder/',
    Mock: AutomationMock,
  },
]

function AgenticShowcase() {
  return (
    <section className="agentic-section">
      <div className="container">
        <div className="agentic-header">
          <h2 className="agentic-title">
            Agentic AI that takes action.
          </h2>
          <p className="agentic-subtitle">One platform for agents that answer, act and complete tasks across every channel.</p>
          <Link to="/products/ai-agents/agentic-ai/" className="agentic-explore-link">Explore the platform →</Link>
        </div>

        <div className="agentic-hero-card">
          <h3>One agent, every channel.</h3>
          <p>One or two agents, all your channels — WhatsApp, email, voice, Instagram and Messenger — grounded in your content, tucked in a human when needed.</p>
          <InboxMock />
          <Link to="/products/ai-agents/agentic-ai/" className="btn btn-primary">Open the inbox →</Link>
        </div>

        <div className="agentic-row row-2">
          {CARDS_ROW2.map((card) => (
            <div className={card.dark ? 'agentic-card dark' : 'agentic-card'} key={card.title}>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
              <card.Mock />
              <Link to={card.href} className="btn btn-ghost card-cta">{card.cta} →</Link>
            </div>
          ))}
        </div>

        <div className="agentic-row row-3">
          {CARDS_ROW3.map((card) => (
            <div className="agentic-card" key={card.title}>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
              <card.Mock />
              <Link to={card.href} className="btn btn-ghost card-cta">{card.cta} →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AgenticShowcase
