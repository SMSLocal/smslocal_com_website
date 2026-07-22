import './PlatformLayerSpec.css'
import { IconChat, IconUsers, IconBrain, IconPlug, IconChart, IconShield } from './icons.jsx'

const LAYERS = [
  {
    icon: <IconChat />,
    name: 'Messaging channels',
    desc: 'Every inbound and outbound conversation, on the channels your customers already use.',
    tags: ['SMS', 'WhatsApp', 'RCS', 'Voice', 'Email'],
  },
  {
    icon: <IconUsers />,
    name: 'Shared team inbox',
    desc: 'One queue where agents assign, reply, add private notes and hand off cleanly.',
    tags: ['Assignments', 'Notes', 'SLAs'],
  },
  {
    icon: <IconBrain />,
    name: 'AI & automation',
    desc: 'No-code chatbots and autonomous AI agents that route, answer and resolve.',
    tags: ['Chatbots', 'AI agents', 'Routing'],
  },
  {
    icon: <IconPlug />,
    name: 'Integrations',
    desc: 'Your CRM, helpdesk and store stay in sync through one-click connectors and webhooks.',
    tags: ['CRM', 'Helpdesk', 'Webhooks'],
  },
  {
    icon: <IconChart />,
    name: 'Analytics & insights',
    desc: 'Delivery, replies and resolutions across every channel, in one reporting view.',
    tags: ['Delivery', 'Replies', 'Reports'],
  },
  {
    icon: <IconShield />,
    name: 'Enterprise security',
    desc: 'Roles, encryption and a full audit trail wrap the whole stack, not just one layer.',
    tags: ['Roles', 'Audit log', 'Encryption'],
  },
]

function PlatformLayerSpec() {
  return (
    <section className="section pls-section">
      <div className="container">
        <span className="section-kicker">The stack</span>
        <h2 className="section-title">The whole stack, one account</h2>
        <p className="section-subtitle">
          Six layers that snap together into a single customer-engagement platform — billed once,
          managed from one login.
        </p>

        <div className="pls-stack">
          <span className="pls-spine" aria-hidden="true" />
          {LAYERS.map((l, i) => (
            <div className="pls-row reveal" style={{ transitionDelay: `${i * 60}ms` }} key={l.name}>
              <span className="pls-node">
                <span className="pls-ic">{l.icon}</span>
              </span>
              <div className="pls-main">
                <h3 className="pls-name">{l.name}</h3>
                <p className="pls-desc">{l.desc}</p>
              </div>
              <div className="pls-tags">
                {l.tags.map((t) => (
                  <span className="pls-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PlatformLayerSpec
