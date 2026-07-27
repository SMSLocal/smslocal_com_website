import { useState } from 'react'
import './LaunchConfigurator.css'

/* The visitor builds their own agent in three picks — and the section answers back
   with what it can actually do on day one. Nothing auto-plays; they drive it. */

const APPS = [
  { id: 'shopify', name: 'Shopify', gains: ['Look up any order and issue refunds itself'] },
  { id: 'stripe', name: 'Stripe', gains: ['Explain charges and refund up to your cap'] },
  { id: 'zendesk', name: 'Zendesk', gains: ['Open, update and close tickets without you'] },
  { id: 'hubspot', name: 'HubSpot', gains: ['Log every conversation against the contact'] },
  { id: 'calendly', name: 'Calendly', gains: ['Book, move and remind on real availability'] },
  { id: 'sheets', name: 'Google Sheets', gains: ['Read your own tables as live truth'] },
]

const KNOWLEDGE = [
  { id: 'policies', name: 'Policies & terms', gains: ['Answer returns and warranty questions word-for-word'] },
  { id: 'faq', name: 'Support FAQ', gains: ['Resolve the 40 questions your team retypes daily'] },
  { id: 'catalog', name: 'Product catalog', gains: ['Recommend by size, stock and price — not vibes'] },
  { id: 'transcripts', name: 'Past transcripts', gains: ['Copy how your best agent already phrases things'] },
]

const CHANNELS = [
  { id: 'whatsapp', name: 'WhatsApp', gains: ['Reply on your verified business number'] },
  { id: 'sms', name: 'SMS & RCS', gains: ['Handle replies to campaigns, not just sends'] },
  { id: 'email', name: 'Email', gains: ['Triage and answer inside the shared inbox'] },
  { id: 'voice', name: 'Voice', gains: ['Pick up calls already knowing the chat history'] },
]

const GROUPS = [
  { key: 'apps', num: '01', verb: 'Connect', hint: 'what it can act on', items: APPS },
  { key: 'knowledge', num: '02', verb: 'Train on', hint: 'what it may answer from', items: KNOWLEDGE },
  { key: 'channels', num: '03', verb: 'Go live on', hint: 'where it works', items: CHANNELS },
]

const listPhrase = (names) => {
  if (!names.length) return null
  if (names.length === 1) return names[0]
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

function LaunchConfigurator({ eyebrow, title, subtitle, alt }) {
  const [picked, setPicked] = useState({
    apps: ['shopify', 'zendesk'],
    knowledge: ['policies', 'faq'],
    channels: ['whatsapp', 'voice'],
  })

  const toggle = (key, id) => {
    setPicked((p) => ({
      ...p,
      [key]: p[key].includes(id) ? p[key].filter((x) => x !== id) : [...p[key], id],
    }))
  }

  const chosen = (group) => group.items.filter((i) => picked[group.key].includes(i.id))
  const names = (group) => chosen(group).map((i) => i.name)

  const capabilities = GROUPS.flatMap((g) =>
    chosen(g).flatMap((i) => i.gains.map((text) => ({ id: `${g.key}-${i.id}`, text, group: g.key }))),
  )

  const appNames = listPhrase(names(GROUPS[0]))
  const knowNames = listPhrase(names(GROUPS[1]))
  const chanNames = listPhrase(names(GROUPS[2]))
  const totalPicks = capabilities.length

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="lcf-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        {/* ---------- the three picks ---------- */}
        <div className="lcf-rows">
          {GROUPS.map((g) => (
            <div className="lcf-row" key={g.key}>
              <div className="lcf-label">
                <span className="lcf-num">{g.num}</span>
                <span className="lcf-verb">{g.verb}</span>
                <span className="lcf-hint">{g.hint}</span>
              </div>

              <div className="lcf-picks">
                {g.items.map((item) => {
                  const on = picked[g.key].includes(item.id)
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={on ? 'lcf-pick is-on' : 'lcf-pick'}
                      onClick={() => toggle(g.key, item.id)}
                      aria-pressed={on}
                    >
                      <span className="lcf-tick">
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </span>
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ---------- what it answers back ---------- */}
        <div className="lcf-answer">
          <p className="lcf-sentence">
            {appNames ? (
              <>Your agent acts in <b key={appNames}>{appNames}</b></>
            ) : (
              <>Your agent has <i>nothing to act on yet</i></>
            )}
            {knowNames ? (
              <>, answers only from <b key={knowNames}>{knowNames}</b></>
            ) : (
              <>, and <i>no approved sources</i></>
            )}
            {chanNames ? (
              <> and works on <b key={chanNames}>{chanNames}</b>.</>
            ) : (
              <> — but <i>no channel to work on</i>.</>
            )}
          </p>

          <div className="lcf-day">
            <span className="lcf-day-label">
              Day one it can
              <em>{totalPicks}</em>
            </span>

            <ul className="lcf-caps">
              {capabilities.map((c, i) => (
                <li className={`lcf-cap lcf-cap--${c.group}`} key={c.id} style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
                  <span className="lcf-cap-mark" />
                  {c.text}
                </li>
              ))}

              {!capabilities.length && (
                <li className="lcf-cap lcf-cap--empty">Pick something above and it fills in.</li>
              )}
            </ul>
          </div>

          <p className="lcf-close">
            Every one of those is live by this afternoon — connecting is OAuth, training is a file drop,
            and the guardrails ship on by default: <b>$250 refund cap</b>, <b>escalate on frustration</b>,
            <b> answer only from approved sources</b>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default LaunchConfigurator
