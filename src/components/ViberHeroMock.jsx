import { useEffect, useState } from 'react'
import './ViberHeroMock.css'

/**
 * Hero visual for the Viber Business Messages page.
 *
 * The racing figure is the hook, but a bare number is not a composition — so
 * it anchors a sequence with several things happening around it:
 *   1  the count surges 0 -> 12,480 while a row of recipient dots lights up
 *      left to right and a progress line closes underneath it
 *   2  three replies drop in one after another once delivery lands
 *   3  the shared AI answers them in turn, each flipping to a green tick
 *   4  the payoff line resolves, holds, and the whole thing restarts
 *
 * Everything is driven by one state machine, so the number, the dots, the line
 * and the replies can never disagree with each other.
 *
 * Frameless, per the language the client approves on the channels and
 * broadcasting pages: the atmosphere is an edgeless radial glow, and the pieces
 * float on it with no panel holding them.
 *
 * Not reused from elsewhere: BulkSmsBroadcastScatter owns the scattered
 * delivery field, ChannelsHubHero the rail, WaBroadcastHero the fan to named
 * recipients, MessengerHeroFlow the converging hub, VoiceChannelHero the
 * waveform, AgentOrbitVisual the orbit, BulkWorldMap the dot map.
 */

const TOTAL = 12480
const SECONDS = 8
const DOTS = 16

// Non-Indian, and not reused from the other channel visuals.
const REPLIES = [
  { who: 'Elena', text: 'Does this ship to Prague?' },
  { who: 'Tomas', text: 'Can I stack two codes?' },
  { who: 'Nadia', text: 'Is size M back in stock?' },
]

const PHASES = [
  { name: 'sending', ms: 2400 },
  { name: 'replies', ms: 1500 },
  { name: 'answering', ms: 1500 },
  { name: 'hold', ms: 1600 },
]

const TICK = 40

function ViberHeroMock() {
  const [phase, setPhase] = useState('sending')
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(0)
  const [answered, setAnswered] = useState(0)

  useEffect(() => {
    let i = 0
    let start = Date.now()

    const id = setInterval(() => {
      const cur = PHASES[i]
      const t = Math.min(1, (Date.now() - start) / cur.ms)

      if (cur.name === 'sending') {
        // ease-out so it surges, then settles onto the final figure
        setN(Math.round(TOTAL * (1 - Math.pow(1 - t, 3))))
      } else if (cur.name === 'replies') {
        setN(TOTAL)
        setShown(Math.min(REPLIES.length, Math.floor(t * REPLIES.length) + 1))
      } else if (cur.name === 'answering') {
        setShown(REPLIES.length)
        setAnswered(Math.min(REPLIES.length, Math.floor(t * REPLIES.length) + 1))
      }

      if (t >= 1) {
        i = (i + 1) % PHASES.length
        start = Date.now()
        setPhase(PHASES[i].name)
        if (PHASES[i].name === 'sending') {
          setN(0)
          setShown(0)
          setAnswered(0)
        }
      }
    }, TICK)

    return () => clearInterval(id)
  }, [])

  const progress = n / TOTAL
  const lit = Math.round(DOTS * progress)
  const secs = (Math.min(1, progress) * SECONDS).toFixed(1)

  return (
    <div
      className={`vbmock is-${phase}`}
      role="img"
      aria-label="A verified Viber broadcast reaching 12,480 people in eight seconds, with replies coming back and answered by AI"
    >
      <span className="vbmock-glow" />

      <span className="vbmock-sender">
        <span className="vbmock-mark" />
        Verified business sender
      </span>

      {/* the figure and its live readout */}
      <span className="vbmock-figure">{n.toLocaleString()}</span>

      <span className="vbmock-caption">
        delivered in <b>{secs}s</b>
      </span>

      {/* recipients lighting up as the count climbs — the number made visible */}
      <span className="vbmock-dots">
        {Array.from({ length: DOTS }, (_, i) => (
          <span key={i} className={`vbmock-dot${i < lit ? ' is-lit' : ''}`} />
        ))}
      </span>

      <span className="vbmock-line">
        <span className="vbmock-line-fill" style={{ transform: `scaleX(${progress})` }} />
      </span>

      {/* replies land, then get answered one by one */}
      <span className="vbmock-replies">
        {REPLIES.map((r, i) => (
          <span
            key={r.who}
            className={`vbmock-reply${i < shown ? ' is-in' : ''}${i < answered ? ' is-done' : ''}`}
          >
            <span className="vbmock-reply-av">{r.who[0]}</span>
            <span className="vbmock-reply-body">
              <span className="vbmock-reply-who">{r.who}</span>
              <span className="vbmock-reply-text">{r.text}</span>
            </span>
            <span className="vbmock-reply-tick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </span>
          </span>
        ))}
      </span>

      <span className="vbmock-payoff">
        <b>840</b> replied · answered by your AI
      </span>
    </div>
  )
}

export default ViberHeroMock
