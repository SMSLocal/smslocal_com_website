import { useEffect, useState } from 'react'
import './KakaoTalkHeroMock.css'

/**
 * Hero visual for the KakaoTalk Business Messaging page.
 *
 * Dramatizes the one fact that's genuinely specific to KakaoTalk: an AlimTalk
 * notice template has to clear Kakao's own approval review before it can
 * send — a progress ring closes around a template card, flips to an
 * approved check, then the notice goes out and a live open-rate meter climbs.
 *
 * Deliberately NOT the other channel heroes' shapes: no racing counter
 * (Viber), no boxless bot Q&A (Telegram), no branch-fan to cards (LINE), no
 * hub-fork diagram (Email), no chat thread (Apple Messages). One floating
 * card with a ring, a delivery line, and a meter — nothing else holds it.
 */

const RING_R = 26
const RING_C = 2 * Math.PI * RING_R
const TOTAL = 6240

const PHASES = [
  { name: 'review', ms: 1800 },
  { name: 'approved', ms: 700 },
  { name: 'sending', ms: 1600 },
  { name: 'opened', ms: 1400 },
  { name: 'hold', ms: 1400 },
]

const TICK = 40

function KakaoTalkHeroMock() {
  const [phase, setPhase] = useState('review')
  const [pct, setPct] = useState(0)
  const [sent, setSent] = useState(0)
  const [openRate, setOpenRate] = useState(0)

  useEffect(() => {
    let i = 0
    let start = Date.now()

    const id = setInterval(() => {
      const cur = PHASES[i]
      const t = Math.min(1, (Date.now() - start) / cur.ms)

      if (cur.name === 'review') {
        setPct(Math.round(100 * t))
      } else if (cur.name === 'sending') {
        setSent(Math.round(TOTAL * (1 - Math.pow(1 - t, 3))))
      } else if (cur.name === 'opened') {
        setOpenRate(Math.round(96 * t))
      }

      if (t >= 1) {
        i = (i + 1) % PHASES.length
        start = Date.now()
        setPhase(PHASES[i].name)
        if (PHASES[i].name === 'review') {
          setPct(0)
          setSent(0)
          setOpenRate(0)
        }
      }
    }, TICK)

    return () => clearInterval(id)
  }, [])

  const approved = phase !== 'review'
  const sentPhase = phase === 'sending' || phase === 'opened' || phase === 'hold'
  const openedPhase = phase === 'opened' || phase === 'hold'
  const dashoffset = RING_C * (1 - (approved ? 1 : pct / 100))

  return (
    <div
      className={`kthero is-${phase}`}
      role="img"
      aria-label="An AlimTalk notice template clearing Kakao's approval review, then sending to 6,240 channel friends with a 96 percent open rate"
    >
      <span className="kthero-sender">
        <span className="kthero-mark" />
        Kakao Channel · verified
      </span>

      <div className="kthero-card">
        <div className="kthero-ring-wrap">
          <svg className="kthero-ring" viewBox="0 0 64 64">
            <circle className="kthero-ring-track" cx="32" cy="32" r={RING_R} />
            <circle
              className={`kthero-ring-fill${approved ? ' is-done' : ''}`}
              cx="32" cy="32" r={RING_R}
              strokeDasharray={RING_C}
              strokeDashoffset={dashoffset}
            />
          </svg>
          <span className="kthero-ring-glyph">
            {approved ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            ) : (
              <span className="kthero-ring-pct">{pct}%</span>
            )}
          </span>
        </div>

        <div className="kthero-card-body">
          <span className="kthero-card-label">
            {approved ? 'AlimTalk · approved' : 'AlimTalk · under review'}
          </span>
          <span className="kthero-card-text">Order #7734 confirmed — arriving Thursday</span>
        </div>
      </div>

      <span className={`kthero-line${sentPhase ? ' is-in' : ''}`}>
        <span className="kthero-line-fill" />
      </span>

      <span className={`kthero-sent${sentPhase ? ' is-in' : ''}`}>
        <b>{sent.toLocaleString()}</b> delivered
      </span>

      <span className={`kthero-meter${openedPhase ? ' is-in' : ''}`}>
        <span className="kthero-meter-track">
          <span className="kthero-meter-fill" style={{ width: `${openRate}%` }} />
        </span>
        <span className="kthero-meter-label"><b>{openRate}%</b> opened in the first hour</span>
      </span>
    </div>
  )
}

export default KakaoTalkHeroMock
