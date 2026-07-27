import { useCallback, useEffect, useRef, useState } from 'react'
import './AgentLaunchTimeline.css'

/* One afternoon, replayed. Four moments on a clock the visitor can scrub.
   It plays itself; dragging the playhead or picking a question takes over. */

const STEPS = [
  { key: 'connect', time: '2:04', label: 'Connect', dur: 6000, status: 'Granting access' },
  { key: 'train', time: '2:31', label: 'Train', dur: 5600, status: 'Indexing your docs' },
  { key: 'dryrun', time: '3:12', label: 'Dry run', dur: 9500, status: 'Sandbox — not public' },
  { key: 'live', time: '4:47', label: 'Live', dur: 7000, status: 'Live on WhatsApp & Voice' },
]

const APPS = [
  { name: 'Shopify', at: 0.06 },
  { name: 'Zendesk', at: 0.24 },
  { name: 'Stripe', at: 0.42 },
  { name: 'Calendly', at: 0.6 },
]

const DOCS = [
  { name: 'returns-policy.pdf', at: 0.04 },
  { name: 'support-faq.md', at: 0.26 },
  { name: 'product-catalog.csv', at: 0.5 },
]

const QUESTIONS = [
  {
    id: 'order',
    ask: "Where's my order?",
    tools: [{ app: 'Shopify', call: 'orders.get(#4821)', out: 'out for delivery' }],
    reply: "It's out for delivery today — DHL 7741 9922 3, before 6pm. Want a text when it lands?",
    verdict: 'resolved',
  },
  {
    id: 'damaged',
    ask: 'It arrived damaged',
    tools: [
      { app: 'Stripe', call: 'refund.create($89)', out: 'under $250 cap' },
      { app: 'Zendesk', call: 'ticket.close()', out: 'logged' },
    ],
    reply: "That's on us — $89 refunded and a replacement ships tonight, free. Nothing to send back.",
    verdict: 'resolved',
  },
  {
    id: 'human',
    ask: 'Get me a real person',
    tools: [{ app: 'Guardrail', call: 'handoff.human()', out: 'Priya · online' }],
    reply: "Bringing in Priya now — she can see everything we covered, so you won't repeat yourself.",
    verdict: 'handed off',
  },
]

const clamp = (n, a, b) => Math.min(b, Math.max(a, n))
const ease = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3)

function AgentLaunchTimeline({ eyebrow, title, subtitle, alt }) {
  const [step, setStep] = useState(0)
  const [prog, setProg] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [question, setQuestion] = useState(QUESTIONS[0].id)
  const trackRef = useRef(null)
  const draggingRef = useRef(false)

  useEffect(() => {
    if (!playing) return undefined
    const tick = 60
    const id = setInterval(() => {
      setProg((p) => {
        const next = p + tick / STEPS[step].dur
        if (next < 1) return next
        setStep((s) => (s + 1) % STEPS.length)
        return 0
      })
    }, tick)
    return () => clearInterval(id)
  }, [playing, step])

  const seek = useCallback((clientX) => {
    const el = trackRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const ratio = clamp((clientX - r.left) / r.width, 0, 0.9999)
    const total = ratio * STEPS.length
    setStep(Math.floor(total))
    setProg(total % 1)
  }, [])

  const onPointerDown = (e) => {
    draggingRef.current = true
    setPlaying(false)
    e.currentTarget.setPointerCapture?.(e.pointerId)
    seek(e.clientX)
  }
  const onPointerMove = (e) => {
    if (draggingRef.current) seek(e.clientX)
  }
  const onPointerUp = () => {
    draggingRef.current = false
  }

  const jump = (i) => {
    setStep(i)
    setProg(0)
    setPlaying(true)
  }

  const key = STEPS[step].key
  const fill = ((step + prog) / STEPS.length) * 100

  const q = QUESTIONS.find((x) => x.id === question) || QUESTIONS[0]
  const typed = clamp((prog - 0.45) / 0.32, 0, 1)
  const replyText = q.reply.slice(0, Math.round(typed * q.reply.length))
  const liveEase = ease(clamp((prog - 0.08) / 0.75, 0, 1))

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="alt-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="alt-console">
          {/* ---------------- the clock ---------------- */}
          <div className="alt-clock">
            <div
              className="alt-track"
              ref={trackRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              role="slider"
              tabIndex={0}
              aria-label="Scrub the afternoon"
              aria-valuemin={0}
              aria-valuemax={STEPS.length - 1}
              aria-valuenow={step}
              aria-valuetext={`${STEPS[step].time} — ${STEPS[step].label}`}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') jump((step + 1) % STEPS.length)
                if (e.key === 'ArrowLeft') jump((step + STEPS.length - 1) % STEPS.length)
              }}
            >
              <span className="alt-track-fill" style={{ width: `${fill}%` }} />
              <span className="alt-playhead" style={{ left: `${fill}%` }} />

              {STEPS.map((s, i) => (
                <button
                  type="button"
                  key={s.key}
                  className={`alt-stamp${i === step ? ' is-now' : ''}${i < step ? ' is-done' : ''}`}
                  style={{ left: `${((i + 0.5) / STEPS.length) * 100}%` }}
                  onClick={(e) => {
                    e.stopPropagation()
                    jump(i)
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <span className="alt-stamp-time">{s.time}</span>
                  <span className="alt-stamp-label">{s.label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="alt-play"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5l12 7-12 7z" /></svg>
              )}
            </button>
          </div>

          {/* ---------------- stage ---------------- */}
          <div className="alt-stage" key={key}>
            {key === 'connect' && (
              <div className="alt-connect">
                <div className="alt-apps">
                  {APPS.map((a) => {
                    const state = prog > a.at + 0.11 ? 'on' : prog > a.at ? 'busy' : 'off'
                    return (
                      <div className={`alt-app is-${state}`} key={a.name}>
                        <span className="alt-app-mark">
                          {state === 'on' ? (
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                          ) : (
                            <i className="alt-spin" />
                          )}
                        </span>
                        {a.name}
                      </div>
                    )
                  })}
                </div>
                <p className="alt-line">OAuth, not integration work — and a <b>$250 refund cap</b> from the first minute.</p>
              </div>
            )}

            {key === 'train' && (
              <div className="alt-train">
                <div className="alt-docs">
                  {DOCS.map((d) => {
                    const p = clamp((prog - d.at) / 0.24, 0, 1)
                    return (
                      <div className={`alt-doc${p >= 1 ? ' is-done' : ''}`} key={d.name}>
                        <span className="alt-doc-name">{d.name}</span>
                        <span className="alt-doc-bar"><i style={{ width: `${p * 100}%` }} /></span>
                        <span className="alt-doc-pct">{p >= 1 ? 'indexed' : `${Math.round(p * 100)}%`}</span>
                      </div>
                    )
                  })}
                </div>
                <p className="alt-line">
                  <b>{Math.round(ease(prog) * 1284).toLocaleString()}</b> chunks indexed — and it answers from these, nothing else.
                </p>
              </div>
            )}

            {key === 'dryrun' && (
              <div className="alt-dry">
                <div className="alt-qs">
                  {QUESTIONS.map((x) => (
                    <button
                      type="button"
                      key={x.id}
                      className={`alt-q${x.id === question ? ' is-on' : ''}`}
                      onClick={() => {
                        setQuestion(x.id)
                        setStep(2)
                        setProg(0)
                        setPlaying(true)
                      }}
                    >
                      {x.ask}
                    </button>
                  ))}
                </div>

                <div className="alt-chat">
                  <div className={`alt-msg alt-msg--them${prog > 0.05 ? ' is-in' : ''}`}>{q.ask}</div>

                  <div className="alt-tools">
                    {q.tools.map((t, i) => (
                      <div className={`alt-tool${prog > 0.2 + i * 0.09 ? ' is-in' : ''}`} key={t.call}>
                        <span className="alt-tool-app">{t.app}</span>
                        <code>{t.call}</code>
                        <span className="alt-tool-out">{t.out}</span>
                      </div>
                    ))}
                  </div>

                  {prog > 0.45 && (
                    <div className="alt-msg alt-msg--agent is-in">
                      {replyText}
                      {typed < 1 && <span className="alt-caret" />}
                    </div>
                  )}
                </div>

                <p className={`alt-line alt-line--verdict${typed >= 1 ? ' is-in' : ''}`}>
                  <span className={`alt-pill alt-pill--${q.verdict === 'resolved' ? 'ok' : 'hand'}`}>{q.verdict}</span>
                  in a sandbox — nobody saw it but you.
                </p>
              </div>
            )}

            {key === 'live' && (
              <div className="alt-live">
                <div className="alt-metrics">
                  <div className="alt-metric">
                    <em>{Math.round(liveEase * 63)}</em>
                    <span>conversations</span>
                  </div>
                  <div className="alt-metric alt-metric--hero">
                    <em>{Math.round(liveEase * 71)}%</em>
                    <span>resolved end to end</span>
                  </div>
                  <div className="alt-metric">
                    <em>{Math.round(liveEase * 2)}</em>
                    <span>escalated to a human</span>
                  </div>
                </div>
                <p className="alt-line">Zero connected apps at lunch. <b>All of this before the office closed.</b></p>
              </div>
            )}
          </div>

          <div className="alt-foot">
            <span className={`alt-dot alt-dot--${step === 3 ? 'live' : step === 2 ? 'test' : 'wait'}`} />
            {STEPS[step].status}
            <span className="alt-foot-hint">{playing ? 'drag the clock to scrub' : 'paused'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentLaunchTimeline
