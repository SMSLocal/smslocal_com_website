import './InboxRoutingEngine.css'

const ROWS = [
  {
    id: 'billing',
    y: 90,
    channel: 'WhatsApp',
    icon: 'whatsapp',
    text: 'Hi, my invoice for March looks wrong — can someone check?',
    meta: 'Billing · just now',
    dest: 'Billing team',
    initials: 'BT',
    sla: 'SLA 15m',
    slaTone: 'default',
  },
  {
    id: 'voice',
    y: 250,
    channel: 'Voice',
    icon: 'phone',
    text: 'Missed call — after-hours line, no voicemail left',
    meta: 'Voice · 11:47 PM',
    dest: 'On-call + callback',
    initials: 'OC',
    sla: 'SLA 5m',
    slaTone: 'default',
  },
  {
    id: 'refund',
    y: 410,
    channel: 'SMS',
    icon: 'chat',
    text: 'Can I get a refund on order #4821? Total was $640.',
    meta: 'SMS · “refund” detected',
    dest: 'Tier 2 · notify manager',
    initials: 'T2',
    sla: 'Priority',
    slaTone: 'priority',
  },
  {
    id: 'stale',
    y: 570,
    channel: 'Idle',
    icon: 'clock',
    text: 'No reply from agent — 10 minutes elapsed',
    meta: 'Any channel · unanswered',
    dest: 'Escalate · round-robin',
    initials: 'RR',
    sla: 'Auto',
    slaTone: 'auto',
  },
]

const CENTER = { x: 600, y: 330 }
const LX = 205
const RX = 995

const pathFor = (yL, yR) =>
  `M ${LX} ${yL} C ${LX + 190} ${yL}, ${CENTER.x - 130} ${CENTER.y}, ${CENTER.x} ${CENTER.y} ` +
  `C ${CENTER.x + 130} ${CENTER.y}, ${RX - 190} ${yR}, ${RX} ${yR}`

const ICONS = {
  whatsapp: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2Zm0 18.2a8.16 8.16 0 0 1-4.17-1.14l-.3-.18-3 .79.8-2.93-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.52-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.56.12-.17.25-.65.8-.8.96-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
}

function InboxRoutingEngine() {
  return (
    <section className="section iren">
      <div className="container iren-head">
        <span className="section-kicker">Routing &amp; SLAs</span>
        <h2 className="section-title">Routing that runs itself</h2>
        <p className="section-subtitle">
          Every message is checked against your rules the instant it arrives — matched, routed and
          timed, with no one standing at the gate.
        </p>
      </div>

      <div className="iren-stage">
        <svg className="iren-svg" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="iren-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.55" />
              <stop offset="50%" stopColor="var(--cyan)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.55" />
            </linearGradient>
            <radialGradient id="iren-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {ROWS.map((r, i) => (
            <path
              key={r.id}
              id={`iren-path-${i}`}
              d={pathFor(r.y, r.y)}
              className="iren-path"
              fill="none"
              stroke="url(#iren-line)"
              strokeWidth="1.6"
            />
          ))}

          <circle cx={CENTER.x} cy={CENTER.y} r="70" fill="url(#iren-core)" className="iren-glow" />

          {ROWS.map((r, i) => (
            <circle key={r.id} r="4.5" className="iren-dot" fill="var(--cyan)">
              <animateMotion dur="3.6s" begin={`${i * -0.85}s`} repeatCount="indefinite">
                <mpath href={`#iren-path-${i}`} />
              </animateMotion>
            </circle>
          ))}
        </svg>

        <div
          className="iren-engine"
          style={{ left: `${(CENTER.x / 1200) * 100}%`, top: `${(CENTER.y / 620) * 100}%` }}
        >
          <span className="iren-engine-ring" />
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
          </svg>
          <span className="iren-engine-label">Rules engine</span>
        </div>

        {ROWS.map((r) => (
          <div className="iren-trigger" key={`t-${r.id}`} style={{ top: `${(r.y / 620) * 100}%` }}>
            <span className="iren-trigger-icon">{ICONS[r.icon]}</span>
            <span className="iren-trigger-body">
              <span className="iren-trigger-meta">{r.meta}</span>
              <span className="iren-trigger-text">{r.text}</span>
            </span>
          </div>
        ))}

        {ROWS.map((r) => (
          <div className="iren-dest" key={`d-${r.id}`} style={{ top: `${(r.y / 620) * 100}%` }}>
            <span className="iren-dest-avatar">{r.initials}</span>
            <span className="iren-dest-body">
              <span className="iren-dest-name">{r.dest}</span>
              <span className={`iren-dest-sla iren-dest-sla-${r.slaTone}`}>{r.sla}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default InboxRoutingEngine
