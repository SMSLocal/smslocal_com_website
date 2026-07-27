import { useEffect, useRef, useState } from 'react'
import { IconChat, IconGlobe, IconMic, IconShield } from './icons.jsx'
import './AgentBuildBlueprint.css'

/* One agent, one live schematic. Three annotations point at three real
   zones of the same diagram instead of three separate step cards. */

const TOOLS = ['CRM', 'Database', 'Stripe', 'Calendly']

const STEPS = [
  {
    label: 'Define the job',
    detail: 'Describe what it should handle and connect the tools it needs.',
    example: 'Handles: order status, damaged items, returns — reads Shopify, Stripe, Zendesk.',
  },
  {
    label: 'Set guardrails & escalation',
    detail: 'Decide what it can do on its own, and when it hands off to a human.',
    example: '$250 refund cap · hands off to a human after 2 failed attempts.',
  },
  {
    label: 'Deploy across channels',
    detail: 'Publish the same agent to chat, WhatsApp and voice.',
    example: 'One publish — live on chat, WhatsApp and voice at once.',
  },
]

function AgentBuildBlueprint({ eyebrow = 'How it works', title, alt }) {
  const [active, setActive] = useState(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % STEPS.length)
    }, 3600)
    return () => clearInterval(id)
  }, [])

  const pick = (i) => {
    setActive(i)
    pausedRef.current = true
  }

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="abp-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
        </div>

        <div
          className="abp-canvas"
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          <div className="abp-annos">
            {STEPS.map((s, i) => (
              <button
                type="button"
                key={s.label}
                className={`abp-anno${i === active ? ' is-active' : ''}`}
                onClick={() => pick(i)}
              >
                <span className="abp-anno-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="abp-anno-label">{s.label}</span>
                <span className="abp-anno-detail">{s.detail}</span>
              </button>
            ))}
          </div>

          <div className="abp-diagram">
            <div className={`abp-zone abp-zone--in${active === 0 ? ' is-active' : ''}`}>
              <span className="abp-chip"><IconChat /> Chat</span>
              <span className="abp-chip"><IconGlobe /> WhatsApp</span>
              <span className="abp-chip"><IconMic /> Voice</span>
              <span className="abp-flow" aria-hidden="true"><i /><i /><i /></span>
            </div>

            <div className={`abp-zone abp-zone--core${active === 1 ? ' is-active' : ''}`}>
              <span className="abp-ring" aria-hidden="true" />
              <span className="abp-core-badge"><IconShield /> Your agent</span>
              <div className="abp-tools">
                {TOOLS.map((t) => (
                  <span className="abp-tool" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className={`abp-zone abp-zone--out${active === 2 ? ' is-active' : ''}`}>
              <span className="abp-msg abp-msg--ok">Refunded $89 — resolved</span>
              <span className="abp-msg abp-msg--hand">Handed to Priya</span>
              <span className="abp-flow abp-flow--out" aria-hidden="true"><i /><i /><i /></span>
            </div>
          </div>

          <p className="abp-example" key={active}>{STEPS[active].example}</p>
        </div>
      </div>
    </section>
  )
}

export default AgentBuildBlueprint
