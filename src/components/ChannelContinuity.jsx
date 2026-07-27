import './ChannelContinuity.css'

/**
 * Channels section for /ai-agents — a four-tile bento grid.
 * The first contact takes the tall 2x2 tile and carries a little more detail
 * (thread opened, a short meta row, the facts it captured); the three later
 * channels take smaller tiles. Static — no timers or reveal animation.
 */

const STEPS = [
  {
    id: 'wa',
    ch: 'WhatsApp',
    day: 'Mon',
    opened: true,
    ask: 'Change the address on #4821.',
    reply: 'Done — 14 Kingsway, Flat 3B.',
    meta: [
      { k: 'Resolved in', v: '34s' },
      { k: 'Human involved', v: 'none' },
      { k: 'Order matched', v: 'automatic' },
    ],
    did: [
      'Matched the number to order #4821 — no ID asked for',
      'Validated the new address and wrote it to the order',
      'Confirmed back in the same thread, then kept it open',
      'Filed both facts so every later channel inherits them',
    ],
    note: 'The thread opens here. Every later channel builds on this one.',
    learned: ['order #4821', '14 Kingsway, Flat 3B'],
    size: 'lg',
  },
  {
    id: 'sms',
    ch: 'SMS',
    day: 'Mon',
    ask: 'Actually — make it Saturday instead?',
    reply: 'Moved. Same address as this morning.',
    note: 'New channel, and it asked for neither the order nor the address.',
    learned: ['delivery Saturday'],
    size: 'wide',
  },
  {
    id: 'email',
    ch: 'Email',
    day: 'Tue',
    ask: 'Can you send a VAT invoice for that?',
    reply: 'Attached — INV-3390 for order #4821.',
    note: 'Knew what "that" meant, a day and a channel later.',
    learned: ['invoice INV-3390'],
    size: 'sm',
  },
  {
    id: 'voice',
    ch: 'Voice',
    day: 'Thu',
    ask: 'Did my delivery actually go out?',
    reply: 'Confirmed on the call — arriving Saturday.',
    note: 'The call opened already knowing the whole week.',
    learned: [],
    size: 'sm',
  },
]

function ChannelContinuity({ eyebrow = 'Channels', title, subtitle }) {
  return (
    <section className="cco">
      <div className="container">
        <div className="cco-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="cco-bento">
          {STEPS.map((s) => (
            <article className={`cco-tile cco-tile--${s.size}`} key={s.id}>
              <span className="cco-ch">
                <span className="cco-ch-name">{s.ch}</span>
                <span className="cco-ch-day">{s.day}</span>
                {s.opened && <span className="cco-opened">thread opened</span>}
              </span>

              <p className="cco-ask">{s.ask}</p>
              <p className="cco-reply">{s.reply}</p>

              {s.meta && (
                <div className="cco-meta">
                  {s.meta.map((m) => (
                    <span className="cco-meta-item" key={m.k}>
                      <b>{m.v}</b>
                      {m.k}
                    </span>
                  ))}
                </div>
              )}

              {s.did && (
                <ul className="cco-did">
                  {s.did.map((d) => (
                    <li key={d}>
                      <span className="cco-did-mark" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}

              <span className="cco-tile-foot">
                {s.learned.length > 0 ? (
                  <span className="cco-learned">
                    <span className="cco-learned-l">captured</span>
                    {s.learned.map((l) => (
                      <span className="cco-tok" key={l}>{l}</span>
                    ))}
                  </span>
                ) : (
                  <span className="cco-nothing">nothing new needed</span>
                )}
                <span className="cco-note">{s.note}</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChannelContinuity
