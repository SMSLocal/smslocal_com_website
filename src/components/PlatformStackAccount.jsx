import './PlatformStackAccount.css'
import { IconChat, IconUsers, IconBrain, IconPlug, IconChart, IconShield } from './icons.jsx'

const LAYERS = [
  {
    id: 'channels',
    icon: <IconChat />,
    name: 'Messaging channels',
    desc: 'Every inbound and outbound conversation, on the channels your customers already use.',
    tags: ['SMS', 'WhatsApp', 'RCS', 'Voice', 'Email'],
  },
  {
    id: 'inbox',
    icon: <IconUsers />,
    name: 'Shared team inbox',
    desc: 'One queue where agents assign, reply, add private notes and hand off cleanly.',
    tags: ['Assignments', 'Notes', 'SLAs'],
  },
  {
    id: 'ai',
    icon: <IconBrain />,
    name: 'AI & automation',
    desc: 'No-code chatbots and autonomous AI agents that route, answer and resolve.',
    tags: ['Chatbots', 'AI agents', 'Routing'],
  },
  {
    id: 'integrations',
    icon: <IconPlug />,
    name: 'Integrations',
    desc: 'Your CRM, helpdesk and store stay in sync through one-click connectors and webhooks.',
    tags: ['CRM', 'Helpdesk', 'Webhooks'],
  },
  {
    id: 'analytics',
    icon: <IconChart />,
    name: 'Analytics & insights',
    desc: 'Delivery, replies and resolutions across every channel, in one reporting view.',
    tags: ['Delivery', 'Replies', 'Reports'],
  },
  {
    id: 'security',
    icon: <IconShield />,
    name: 'Enterprise security',
    desc: 'Roles, encryption and a full audit trail wrap the whole stack, not just one layer.',
    tags: ['Roles', 'Audit log', 'Encryption'],
  },
]

const CHECK = (
  <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l4 4L19 6" />
  </svg>
)

function ModuleBody({ id }) {
  if (id === 'channels') {
    return (
      <div className="psa-bubbles">
        <span className="psa-bubble psa-bubble--in">
          <b>WhatsApp</b>Can I change the delivery address?
        </span>
        <span className="psa-bubble psa-bubble--out">
          <b>SMS</b>Order #4821 has shipped &#128666;
        </span>
        <span className="psa-bubble psa-bubble--in psa-bubble--ghost">
          <b>RCS</b>Track your parcel &rarr;
        </span>
      </div>
    )
  }
  if (id === 'inbox') {
    return (
      <div className="psa-inbox">
        <span className="psa-avatar">RM</span>
        <span className="psa-inbox-text">
          <b>Ryan Mitchell</b> replied 2m ago &middot; <i>internal note: verify new address</i>
        </span>
        <span className="psa-sla">SLA &middot; 4m left</span>
      </div>
    )
  }
  if (id === 'ai') {
    return (
      <div className="psa-ai">
        <span className="psa-bot">AI</span>
        <span className="psa-ai-text">Auto-resolved &mdash; address updated, order re-confirmed.</span>
        <span className="psa-ai-tag">Escalation avoided</span>
      </div>
    )
  }
  if (id === 'integrations') {
    return (
      <div className="psa-sync">
        <span className="psa-sync-nodes">
          <span className="psa-node">CRM</span>
          <span className="psa-node-line" />
          <span className="psa-node">Helpdesk</span>
          <span className="psa-node-line" />
          <span className="psa-node">Webhook</span>
        </span>
        <span className="psa-sync-status">{CHECK} Synced to HubSpot &middot; 2s ago</span>
      </div>
    )
  }
  if (id === 'analytics') {
    return (
      <div className="psa-chart">
        <svg className="psa-spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true">
          <polyline points="0,26 15,22 30,24 45,14 60,17 75,8 90,11 105,4 120,6" />
        </svg>
        <span className="psa-chart-stats">
          <b>98.2%</b> delivered &middot; <b>1.4s</b> avg first reply
        </span>
      </div>
    )
  }
  return (
    <div className="psa-security">
      <span className="psa-sec-item">{CHECK} AES-256 encrypted</span>
      <span className="psa-sec-item">{CHECK} Full audit log</span>
      <span className="psa-sec-role">Role &middot; Support agent</span>
    </div>
  )
}

function PlatformStackAccount() {
  return (
    <section className="section psa-section">
      <div className="container">
        <span className="section-kicker">The stack</span>
        <h2 className="section-title">The whole stack, one account</h2>
        <p className="section-subtitle">
          Six layers that snap together into a single customer-engagement platform &mdash; billed
          once, managed from one login.
        </p>

        <div className="psa-stage">
        <span className="psa-glow" aria-hidden="true" />
        <div
          className="psa-diagram"
          role="img"
          aria-label="A single SMSLocal account screen containing six layers at once: messaging channels, shared team inbox, AI and automation, integrations, analytics and insights, and enterprise security."
        >
          <span className="psa-frame" aria-hidden="true" />

          <div className="psa-titlebar">
            <span className="psa-tb-dots">
              <i /><i /><i />
            </span>
            <span className="psa-tb-url">app.smslocal.com</span>
            <span className="psa-tb-account">
              <span className="psa-tb-avatar">S</span>
              One account &middot; one invoice
            </span>
          </div>

          {LAYERS.map((l, i) => (
            <div className="psa-module reveal" style={{ gridRow: i + 2, transitionDelay: `${i * 70}ms` }} key={l.id}>
              <span className="psa-mod-ic">{l.icon}</span>
              <ModuleBody id={l.id} />
            </div>
          ))}

          {LAYERS.map((l, i) => (
            <div className="psa-leader" style={{ gridRow: i + 2 }} aria-hidden="true" key={`leader-${l.id}`}>
              <span className="psa-leader-line" />
              <span className="psa-leader-dot" />
            </div>
          ))}

          {LAYERS.map((l, i) => (
            <div className="psa-note reveal" style={{ gridRow: i + 2, transitionDelay: `${i * 70 + 90}ms` }} key={`note-${l.id}`}>
              <h3 className="psa-note-name">{l.name}</h3>
              <p className="psa-note-desc">{l.desc}</p>
              <div className="psa-note-tags">
                {l.tags.map((t) => (
                  <span className="psa-note-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformStackAccount
