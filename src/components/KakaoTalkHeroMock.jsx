import { useEffect, useState } from 'react'
import './KakaoTalkHeroMock.css'

/**
 * Hero visual for the KakaoTalk Business Messaging page.
 *
 * KakaoTalk's business surfaces are AlimTalk (transactional notices) and
 * FriendTalk (broadcasts to channel friends) — so the sequence sends a
 * FriendTalk broadcast (the figure races up while friend dots light), then an
 * AlimTalk notice card drops in with the payoff.
 *
 * Frameless, matching the other channel-page mocks: an edgeless glow, no
 * panel holding the pieces. KakaoTalk's own brand yellow (#FFCD00 / #3C1E1E)
 * on the sender chip and figure gradient; not reused from any other channel's
 * hero mock.
 */

const TOTAL = 8240
const SECONDS = 6
const DOTS = 16

const PHASES = [
  { name: 'sending', ms: 2200 },
  { name: 'notice', ms: 1600 },
  { name: 'hold', ms: 1800 },
]

const TICK = 40

function KakaoTalkHeroMock() {
  const [phase, setPhase] = useState('sending')
  const [n, setN] = useState(0)

  useEffect(() => {
    let i = 0
    let start = Date.now()

    const id = setInterval(() => {
      const cur = PHASES[i]
      const t = Math.min(1, (Date.now() - start) / cur.ms)

      if (cur.name === 'sending') {
        setN(Math.round(TOTAL * (1 - Math.pow(1 - t, 3))))
      }

      if (t >= 1) {
        i = (i + 1) % PHASES.length
        start = Date.now()
        setPhase(PHASES[i].name)
        if (PHASES[i].name === 'sending') setN(0)
      }
    }, TICK)

    return () => clearInterval(id)
  }, [])

  const progress = n / TOTAL
  const lit = Math.round(DOTS * progress)
  const secs = (Math.min(1, progress) * SECONDS).toFixed(1)
  const noticeIn = phase === 'notice' || phase === 'hold'

  return (
    <div
      className={`ktmock is-${phase}`}
      role="img"
      aria-label="A KakaoTalk FriendTalk broadcast reaching 8,240 channel friends, followed by an AlimTalk order notice"
    >
      <span className="ktmock-glow" />

      <span className="ktmock-sender">
        <span className="ktmock-mark" />
        Kakao Channel · verified
      </span>

      <span className="ktmock-figure">{n.toLocaleString()}</span>

      <span className="ktmock-caption">
        friends reached in <b>{secs}s</b>
      </span>

      <span className="ktmock-dots">
        {Array.from({ length: DOTS }, (_, i) => (
          <span key={i} className={`ktmock-dot${i < lit ? ' is-lit' : ''}`} />
        ))}
      </span>

      <span className="ktmock-line">
        <span className="ktmock-line-fill" style={{ transform: `scaleX(${progress})` }} />
      </span>

      {/* AlimTalk notice — the transactional notification surface */}
      <span className={`ktmock-notice${noticeIn ? ' is-in' : ''}`}>
        <span className="ktmock-notice-head">
          <span className="ktmock-notice-badge">알림톡 · AlimTalk</span>
        </span>
        <span className="ktmock-notice-body">
          Order <b>#7734</b> confirmed — arriving Thursday
        </span>
      </span>

      <span className="ktmock-payoff">
        <b>96%</b> notice open rate · answered in one shared inbox
      </span>
    </div>
  )
}

export default KakaoTalkHeroMock
