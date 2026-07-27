import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './AgentHandoffDossier.css'

/**
 * "The handoff" for /ai-agents — a brand-new topic for this page: what your
 * teammate actually receives at the exact moment the agent steps back.
 *
 * The whole section is ONE wide artifact: an escalation dossier that assembles
 * itself. As the conversation streams in on the left, the briefing on the right
 * fills field by field — each field pinned to the message that produced it.
 *
 * Three layers of interaction:
 *   1. Autoplay build with a scrub rail — pause, replay, or jump to any beat.
 *   2. Cross-highlighting — hover or tap a briefing field and the messages it
 *      was derived from light up (and the reverse), with a live "from message n"
 *      trace. This is the proof: nothing in the packet is invented.
 *   3. A mode switch to the raw export a normal tool would hand over, with the
 *      three things your teammate then has to redo by hand.
 *
 * Reduced motion skips straight to the sealed packet; every beat stays
 * reachable by click, so the section can never be stuck mid-animation.
 */

const TOTAL = 8
const BEAT = 1150

const THREAD = [
  {
    at: 1,
    from: 'cust',
    time: '09:14',
    text: 'My card was charged twice for order #77410 — £248 went out twice on Tuesday.',
  },
  {
    at: 2,
    from: 'agent',
    time: '09:14',
    text: 'Thanks Daniel — I\'ve verified you by OTP. I can see two authorisations of £248.00 on 14 Jan, both against #77410.',
  },
  {
    at: 3,
    from: 'cust',
    time: '09:15',
    text: 'I need one of them back today. My rent leaves on Friday.',
  },
  {
    at: 4,
    from: 'agent',
    time: '09:15',
    text: 'One of the two was still pending — I\'ve voided that one now and pulled both payment references.',
  },
  {
    at: 5,
    from: 'cust',
    time: '09:16',
    text: 'And this is the second time I\'ve had to chase you people about a charge.',
  },
  {
    at: 6,
    from: 'agent',
    time: '09:16',
    text: 'The other charge has already settled, so I\'m bringing in Sarah — she can release it today.',
  },
]

const FIELDS = [
  {
    id: 'ask',
    at: 1,
    src: [0],
    label: 'What they want',
    value: 'One duplicate charge of £248.00 refunded on order #77410',
    tone: 'ask',
  },
  {
    id: 'who',
    at: 2,
    src: [1],
    label: 'Who you\'re talking to',
    value: 'Daniel Okafor · verified by OTP',
    note: '4 previous orders · £912 lifetime · never refunded before',
    tone: 'who',
  },
  {
    id: 'checked',
    at: 3,
    src: [1],
    label: 'Already verified',
    value: '2 × £248.00 authorised 14 Jan — one settled (TX-9920), one pending (PA-4471)',
    note: 'read from Stripe + order record, not from what the customer said',
    tone: 'checked',
  },
  {
    id: 'done',
    at: 4,
    src: [3],
    label: 'Already done for you',
    value: 'Pending duplicate voided · payment refs attached · order left untouched',
    note: '2 actions logged, both reversible',
    tone: 'done',
  },
  {
    id: 'why',
    at: 5,
    src: [3, 5],
    label: 'Why it came to you',
    value: 'Settled refunds sit outside the agent\'s scope — finance approval required',
    tone: 'why',
  },
  {
    id: 'pressure',
    at: 6,
    src: [2, 4],
    label: 'What\'s at stake',
    value: 'Rent leaves Friday · second time contacting · churn risk 0.71',
    tone: 'risk',
  },
  {
    id: 'next',
    at: 7,
    src: [5],
    label: 'Next best action',
    value: 'Release TX-9920 in Stripe — £248.00, pre-filled, one approval',
    tone: 'next',
  },
  {
    id: 'draft',
    at: 8,
    src: [5],
    label: 'Reply drafted, waiting on you',
    value: '"Daniel — Sarah here. I\'ve released the second £248.00 charge; it lands back on your card within 2 working days, before Friday."',
    tone: 'draft',
  },
]

const RAW_NOTES = [
  'You re-read all 14 lines to find the amount.',
  'You re-check Stripe, because you can\'t tell what the agent already verified.',
  'You ask Daniel to explain it again — for the third time.',
]

const BEAT_LABELS = [
  'Charge disputed',
  'Identity verified',
  'Deadline surfaced',
  'Duplicate voided',
  'Scope limit hit',
  'Risk scored',
  'Action queued',
  'Packet sealed',
]

function AgentHandoffDossier({ eyebrow = 'The handoff', title, subtitle, alt = false }) {
  const reduce = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  ).current

  const [t, setT] = useState(reduce ? TOTAL : 0)
  const [playing, setPlaying] = useState(!reduce)
  const [mode, setMode] = useState('packet')
  const [sel, setSel] = useState(null)
  const [hov, setHov] = useState(null)

  // ---- autoplay -----------------------------------------------------------
  useEffect(() => {
    if (!playing || t >= TOTAL || mode !== 'packet') return undefined
    const id = setTimeout(() => setT((v) => Math.min(TOTAL, v + 1)), t === 0 ? 420 : BEAT)
    return () => clearTimeout(id)
  }, [playing, t, mode])

  useEffect(() => {
    if (t >= TOTAL) setPlaying(false)
  }, [t])

  const jump = useCallback((n) => {
    setPlaying(false)
    setT(n)
  }, [])

  const replay = useCallback(() => {
    setSel(null)
    setT(0)
    setMode('packet')
    setPlaying(true)
  }, [])

  // ---- cross-highlighting -------------------------------------------------
  const focus = hov ?? sel
  const focused = useMemo(() => FIELDS.find((f) => f.id === focus) || null, [focus])

  const hotMsgs = useMemo(() => {
    if (!focused) return []
    return focused.src.filter((i) => THREAD[i].at <= t)
  }, [focused, t])

  const msgHot = (i) => hotMsgs.includes(i)
  const fieldsFromMsg = (i) => FIELDS.filter((f) => f.src.includes(i) && f.at <= t)

  const shown = FIELDS.filter((f) => f.at <= t)
  const sealed = t >= TOTAL

  return (
    <section className={`ahd${alt ? ' ahd--alt' : ''}`}>
      <div className="container">
        <div className="ahd-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {/* ================= the artifact ================= */}
        <div className={`ahd-frame${sealed ? ' is-sealed' : ''}`}>
          {/* ---- top bar ---- */}
          <div className="ahd-bar">
            <span className="ahd-bar-live">
              <span className="ahd-pulse" aria-hidden="true" />
              WhatsApp · order #77410
            </span>

            <span className="ahd-bar-route">
              <span className="ahd-chip ahd-chip--bot">AI agent</span>
              <span className="ahd-arrow" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className={`ahd-chip ahd-chip--human${sealed ? ' is-on' : ''}`}>Sarah Blake · Payments</span>
            </span>

            <span className="ahd-bar-tools">
              <span className="ahd-seg" role="tablist" aria-label="Handoff format">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'packet'}
                  className={`ahd-seg-btn${mode === 'packet' ? ' is-on' : ''}`}
                  onClick={() => setMode('packet')}
                >
                  Handoff packet
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'raw'}
                  className={`ahd-seg-btn${mode === 'raw' ? ' is-on' : ''}`}
                  onClick={() => setMode('raw')}
                >
                  Raw export
                </button>
              </span>

              {mode === 'packet' && (
                <button
                  type="button"
                  className="ahd-play"
                  onClick={() => (sealed ? replay() : setPlaying((p) => !p))}
                  aria-label={sealed ? 'Replay the handoff' : playing ? 'Pause' : 'Play'}
                >
                  {sealed ? '↻ Replay' : playing ? '❙❙ Pause' : '▶ Play'}
                </button>
              )}
            </span>
          </div>

          {/* ---- body ---- */}
          <div className="ahd-body">
            {/* ============ LEFT: the conversation ============ */}
            <div className="ahd-thread">
              <span className="ahd-col-tag">The conversation</span>

              <ol className="ahd-msgs">
                {THREAD.map((m, i) => {
                  const live = m.at <= t
                  const owners = fieldsFromMsg(i)
                  return (
                    <li
                      key={i}
                      className={[
                        'ahd-msg',
                        `ahd-msg--${m.from}`,
                        live ? 'is-live' : 'is-idle',
                        msgHot(i) ? 'is-hot' : '',
                        focused && !msgHot(i) ? 'is-dim' : '',
                      ]
                        .join(' ')
                        .trim()}
                      onMouseEnter={() => live && owners[0] && setHov(owners[0].id)}
                      onMouseLeave={() => setHov(null)}
                    >
                      <span className="ahd-msg-meta">
                        <b>{m.from === 'cust' ? 'Daniel' : 'Agent'}</b>
                        {m.time}
                      </span>
                      <p className="ahd-msg-text">{live ? m.text : '· · · · · · · · · · · · · · ·'}</p>
                      {live && owners.length > 0 && (
                        <span className="ahd-msg-pins">
                          {owners.map((f) => (
                            <button
                              key={f.id}
                              type="button"
                              className={`ahd-pin${focus === f.id ? ' is-on' : ''}`}
                              onMouseEnter={() => setHov(f.id)}
                              onMouseLeave={() => setHov(null)}
                              onClick={() => setSel((s) => (s === f.id ? null : f.id))}
                            >
                              {f.label}
                            </button>
                          ))}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ol>

              {/* scrub rail */}
              <div className="ahd-rail" role="group" aria-label="Handoff timeline">
                {BEAT_LABELS.map((label, i) => {
                  const n = i + 1
                  return (
                    <button
                      key={label}
                      type="button"
                      className={`ahd-rail-node${t >= n ? ' is-done' : ''}${t === n ? ' is-now' : ''}`}
                      onClick={() => jump(n)}
                      title={label}
                    >
                      <span className="ahd-rail-dot" aria-hidden="true" />
                      <span className="ahd-rail-label">{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ============ RIGHT: the dossier / the raw export ============ */}
            {mode === 'packet' ? (
              <div className="ahd-packet">
                <span className="ahd-col-tag">
                  What Sarah opens
                  <em>{shown.length}/{FIELDS.length} fields</em>
                </span>

                <div className="ahd-fields">
                  {FIELDS.map((f) => {
                    const live = f.at <= t
                    if (!live) {
                      return (
                        <div className="ahd-field is-idle" key={f.id} aria-hidden="true">
                          <span className="ahd-field-label">{f.label}</span>
                          <span className="ahd-skel" />
                        </div>
                      )
                    }
                    return (
                      <button
                        type="button"
                        key={f.id}
                        className={[
                          'ahd-field',
                          `ahd-field--${f.tone}`,
                          'is-live',
                          focus === f.id ? 'is-hot' : '',
                          focused && focus !== f.id ? 'is-dim' : '',
                        ]
                          .join(' ')
                          .trim()}
                        onMouseEnter={() => setHov(f.id)}
                        onMouseLeave={() => setHov(null)}
                        onFocus={() => setHov(f.id)}
                        onBlur={() => setHov(null)}
                        onClick={() => setSel((s) => (s === f.id ? null : f.id))}
                      >
                        <span className="ahd-field-label">
                          {f.label}
                          <em>
                            from {f.src.map((i) => `message ${i + 1}`).join(' + ')}
                          </em>
                        </span>
                        <span className="ahd-field-value">{f.value}</span>
                        {f.note && <span className="ahd-field-note">{f.note}</span>}
                      </button>
                    )
                  })}
                </div>

                <div className={`ahd-foot${sealed ? ' is-on' : ''}`}>
                  <span className="ahd-foot-stat">
                    <b>9s</b>
                    to Sarah&rsquo;s first reply
                  </span>
                  <span className="ahd-foot-line">
                    {sealed
                      ? 'Nothing re-asked, nothing re-checked, nothing repeated back to Daniel.'
                      : 'Assembling while the conversation is still open…'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="ahd-raw">
                <span className="ahd-col-tag ahd-col-tag--warn">
                  What every other tool hands over
                  <em>transcript.txt · 14 lines</em>
                </span>

                <pre className="ahd-raw-dump">
{`[09:14] customer: my card was charged twice for order #77410
[09:14] customer: £248 went out twice on tuesday
[09:14] bot: ok let me check that for you
[09:14] bot: can you confirm the last 4 digits
[09:14] customer: 4417
[09:14] bot: thanks, one moment
[09:15] customer: i need one of them back today
[09:15] customer: my rent leaves on friday
[09:15] bot: i understand, checking
[09:16] customer: and this is the second time
[09:16] customer: i've had to chase you people
[09:16] bot: sorry about that
[09:16] bot: transferring you to an agent
[09:16] system: conversation assigned → queue/payments`}
                </pre>

                <ul className="ahd-raw-notes">
                  {RAW_NOTES.map((n, i) => (
                    <li key={n} style={{ '--i': i }}>
                      <span className="ahd-raw-x" aria-hidden="true">×</span>
                      {n}
                    </li>
                  ))}
                </ul>

                <div className="ahd-foot ahd-foot--warn is-on">
                  <span className="ahd-foot-stat">
                    <b>4m 12s</b>
                    before anyone helps him
                  </span>
                  <span className="ahd-foot-line">
                    No verified facts, no actions taken, no reason it escalated — just a queue.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="ahd-hint">
          {mode === 'packet'
            ? 'Hover any field to see the exact message it came from — or scrub the timeline.'
            : 'Switch back to the handoff packet to see the same conversation, briefed.'}
        </p>
      </div>
    </section>
  )
}

export default AgentHandoffDossier
