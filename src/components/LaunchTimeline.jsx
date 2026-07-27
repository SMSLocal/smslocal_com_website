import { useEffect, useState } from 'react'
import './LaunchTimeline.css'

/* One afternoon, three stages — each one shows the actual work, not a description of it. */
const STAGES = [
  {
    id: 'connect',
    time: '1:15pm',
    at: 6.25,
    kicker: 'Stage 01',
    title: 'Connect your apps and data',
    desc: 'One-click OAuth. The agent inherits exactly the scopes you grant — nothing more.',
    apps: [
      { name: 'Shopify', scope: 'orders · refunds' },
      { name: 'Stripe', scope: 'payments' },
      { name: 'HubSpot', scope: 'contacts' },
      { name: 'Zendesk', scope: 'tickets' },
      { name: 'Gmail', scope: 'send as you' },
      { name: 'Slack', scope: 'alerts' },
    ],
    footnote: '6 apps connected · 11 scopes granted · 0 lines of code',
  },
  {
    id: 'train',
    time: '2:40pm',
    at: 41.7,
    kicker: 'Stage 02',
    title: 'Train on your knowledge',
    desc: 'Drop in what your team already wrote. Indexed in minutes, every answer traceable to a source.',
    docs: [
      { name: 'returns-policy.pdf', meta: '14 pages', chunks: 96 },
      { name: 'support-faq.md', meta: '212 answers', chunks: 318 },
      { name: 'catalog-2026.csv', meta: '4,180 SKUs', chunks: 604 },
      { name: 'past-transcripts', meta: '12k chats', chunks: 266 },
    ],
    footnote: 'Every reply cites the source it came from',
  },
  {
    id: 'live',
    time: '4:05pm',
    at: 76.4,
    kicker: 'Stage 03',
    title: 'Set guardrails and go live',
    desc: 'Scope what it may decide alone, plug it into the inbox you already use, and let it take the queue.',
    rails: [
      { name: 'Refund cap', value: 'auto up to $250' },
      { name: 'First response', value: 'under 2 minutes' },
      { name: 'Escalate on', value: 'frustration · disputes' },
      { name: 'Answer only from', value: 'approved sources' },
    ],
    channels: ['WhatsApp', 'SMS', 'Email', 'Voice'],
    footnote: 'First ticket resolved at 4:11pm — 6 minutes after go-live',
  },
]

const HOURS = ['1pm', '2pm', '3pm', '4pm', '5pm']
const STAGE_MS = 6400

function LaunchTimeline({ eyebrow, title, subtitle, alt }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [chunks, setChunks] = useState(0)

  const stage = STAGES[idx]

  useEffect(() => {
    if (paused) return undefined
    const t = setTimeout(() => setIdx((i) => (i + 1) % STAGES.length), STAGE_MS)
    return () => clearTimeout(t)
  }, [idx, paused])

  // count the indexed chunks up while stage 02 is on screen
  useEffect(() => {
    if (stage.id !== 'train') return undefined
    const target = stage.docs.reduce((n, d) => n + d.chunks, 0)
    setChunks(0)
    // drive off elapsed time, not tick count, so a throttled timer still lands on the total
    const started = performance.now()
    const iv = setInterval(() => {
      const p = Math.min(1, (performance.now() - started) / 1200)
      setChunks(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p === 1) clearInterval(iv)
    }, 45)
    return () => clearInterval(iv)
  }, [stage])

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="lnt-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div
          className="lnt-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ================= stage viewport ================= */}
          <div className="lnt-stage" key={stage.id}>
            <div className="lnt-stage-copy">
              <span className="lnt-kicker">
                {stage.kicker}
                <em>{stage.time}</em>
              </span>
              <h3>{stage.title}</h3>
              <p>{stage.desc}</p>
              <span className="lnt-foot">{stage.footnote}</span>
            </div>

            <div className="lnt-stage-view">
              {/* ---- 01 apps snapping in ---- */}
              {stage.id === 'connect' && (
                <div className="lnt-apps">
                  {stage.apps.map((a, i) => (
                    <span className="lnt-app" key={a.name} style={{ animationDelay: `${i * 130}ms` }}>
                      <span className="lnt-app-check">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </span>
                      <span className="lnt-app-name">{a.name}</span>
                      <span className="lnt-app-scope">{a.scope}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* ---- 02 documents indexing ---- */}
              {stage.id === 'train' && (
                <div className="lnt-docs">
                  <div className="lnt-counter">
                    <b>{chunks.toLocaleString()}</b>
                    <span>chunks indexed</span>
                  </div>

                  {stage.docs.map((d, i) => (
                    <div className="lnt-doc" key={d.name} style={{ animationDelay: `${i * 150}ms` }}>
                      <span className="lnt-doc-name">{d.name}</span>
                      <span className="lnt-doc-meta">{d.meta}</span>
                      <span className="lnt-doc-bar">
                        <i style={{ animationDelay: `${i * 150 + 120}ms` }} />
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- 03 guardrails + channels igniting ---- */}
              {stage.id === 'live' && (
                <div className="lnt-live">
                  <div className="lnt-rails">
                    {stage.rails.map((r, i) => (
                      <div className="lnt-rail" key={r.name} style={{ animationDelay: `${i * 140}ms` }}>
                        <span className="lnt-switch" style={{ animationDelay: `${i * 140 + 220}ms` }} />
                        <span className="lnt-rail-name">{r.name}</span>
                        <span className="lnt-rail-value">{r.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="lnt-ignite">
                    {stage.channels.map((c, i) => (
                      <span className="lnt-chan" key={c} style={{ animationDelay: `${600 + i * 120}ms` }}>{c}</span>
                    ))}
                    <span className="lnt-golive">
                      <span className="lnt-golive-dot" />
                      Live
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= afternoon timeline ================= */}
          <div className="lnt-axis">
            <span className="lnt-axis-line" />
            <span className="lnt-axis-fill" style={{ width: `${stage.at}%` }} />

            {HOURS.map((h, i) => (
              <span className="lnt-hour" key={h} style={{ left: `${(i / (HOURS.length - 1)) * 100}%` }}>
                <i />
                {h}
              </span>
            ))}

            {STAGES.map((s, i) => (
              <button
                type="button"
                key={s.id}
                className={`lnt-mark ${i === idx ? 'is-active' : ''} ${i < idx ? 'is-past' : ''}`}
                style={{ left: `${s.at}%` }}
                onClick={() => setIdx(i)}
                aria-label={s.title}
              >
                <span className="lnt-mark-dot">{i + 1}</span>
                <span className="lnt-mark-label">{s.title.split(' ').slice(0, 2).join(' ')}</span>
              </button>
            ))}

            <span className="lnt-playhead" style={{ left: `${stage.at}%` }} />
          </div>

          <div className="lnt-note">
            <span>{paused ? 'paused — click a stage' : 'playing the afternoon'}</span>
            <span className="lnt-note-right">Started 1:15pm · resolving tickets by 4:11pm</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LaunchTimeline
