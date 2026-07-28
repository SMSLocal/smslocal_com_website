import { useEffect, useState } from 'react'
import './KakaoTalkHeroMock.css'

/**
 * Hero visual for the KakaoTalk Business Messaging page.
 *
 * Two distinct moments crossfade, the way the homepage hero cycles through
 * scenes: the verified sender chip stays put (like HeroScenes keeps the
 * phone stationary across its first two scenes) while the body below it
 * swaps composition entirely.
 *
 * Moment 1 — AlimTalk: a template clears Kakao's own approval review (a
 * ring closing to a check), then sends and racks up deliveries.
 * Moment 2 — FriendTalk: a broadcast with an offer goes out to channel
 * friends, the friend count races up, and a reply lands.
 *
 * Each scene is a full composition, not a shared card with swapped text —
 * distinct enough that the crossfade reads as two different moments, not a
 * re-skin of one.
 */

const RING_R = 24
const RING_C = 2 * Math.PI * RING_R
const NOTICE_TOTAL = 6240
const BROADCAST_TOTAL = 4180
const DOTS = 12

const SCENES = [
  { key: 'alimtalk', title: 'AlimTalk notices', desc: 'Verified transactional notices, approved by Kakao' },
  { key: 'friendtalk', title: 'FriendTalk broadcasts', desc: 'Rich, branded broadcasts to everyone on your channel' },
]

// Moment 1 phases: approval ring closes, flips to a check, then sends.
const ALIMTALK_PHASES = [
  { name: 'review', ms: 1500 },
  { name: 'approved', ms: 600 },
  { name: 'sending', ms: 1500 },
  { name: 'hold', ms: 900 },
]

// Moment 2 phases: broadcast goes out, friend count races, a reply lands.
const FRIENDTALK_PHASES = [
  { name: 'sending', ms: 1800 },
  { name: 'reply', ms: 900 },
  { name: 'hold', ms: 1300 },
]

const TICK = 40
const SCENE_MS = 5000

function AlimTalkScene({ active }) {
  const [phase, setPhase] = useState('review')
  const [pct, setPct] = useState(0)
  const [sent, setSent] = useState(0)

  useEffect(() => {
    if (!active) { setPhase('review'); setPct(0); setSent(0); return }
    let i = 0
    let start = Date.now()
    const id = setInterval(() => {
      const cur = ALIMTALK_PHASES[i]
      const t = Math.min(1, (Date.now() - start) / cur.ms)
      if (cur.name === 'review') setPct(Math.round(100 * t))
      else if (cur.name === 'sending') setSent(Math.round(NOTICE_TOTAL * (1 - Math.pow(1 - t, 3))))
      if (t >= 1) {
        i = (i + 1) % ALIMTALK_PHASES.length
        start = Date.now()
        setPhase(ALIMTALK_PHASES[i].name)
        if (ALIMTALK_PHASES[i].name === 'review') { setPct(0); setSent(0) }
      }
    }, TICK)
    return () => clearInterval(id)
  }, [active])

  const approved = phase !== 'review'
  const sentPhase = phase === 'sending' || phase === 'hold'
  const dashoffset = RING_C * (1 - (approved ? 1 : pct / 100))

  return (
    <div className="kthero-scene">
      <div className="kthero-card">
        <div className="kthero-ring-wrap">
          <svg className="kthero-ring" viewBox="0 0 56 56">
            <circle className="kthero-ring-track" cx="28" cy="28" r={RING_R} />
            <circle
              className={`kthero-ring-fill${approved ? ' is-done' : ''}`}
              cx="28" cy="28" r={RING_R}
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
          <span className="kthero-card-label">{approved ? 'AlimTalk · approved' : 'AlimTalk · under review'}</span>
          <span className="kthero-card-text">Order #7734 confirmed — arriving Thursday</span>
        </div>
      </div>

      <span className={`kthero-line${sentPhase ? ' is-in' : ''}`}>
        <span className="kthero-line-fill" />
      </span>
      <span className={`kthero-sent${sentPhase ? ' is-in' : ''}`}>
        <b>{sent.toLocaleString()}</b> delivered
      </span>
    </div>
  )
}

function FriendTalkScene({ active }) {
  const [phase, setPhase] = useState('sending')
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!active) { setPhase('sending'); setN(0); return }
    let i = 0
    let start = Date.now()
    const id = setInterval(() => {
      const cur = FRIENDTALK_PHASES[i]
      const t = Math.min(1, (Date.now() - start) / cur.ms)
      if (cur.name === 'sending') setN(Math.round(BROADCAST_TOTAL * (1 - Math.pow(1 - t, 3))))
      if (t >= 1) {
        i = (i + 1) % FRIENDTALK_PHASES.length
        start = Date.now()
        setPhase(FRIENDTALK_PHASES[i].name)
        if (FRIENDTALK_PHASES[i].name === 'sending') setN(0)
      }
    }, TICK)
    return () => clearInterval(id)
  }, [active])

  const progress = n / BROADCAST_TOTAL
  const lit = Math.round(DOTS * progress)
  const replyIn = phase === 'reply' || phase === 'hold'

  return (
    <div className="kthero-scene">
      <div className="kthero-broadcast">
        <span className="kthero-broadcast-tag">FriendTalk</span>
        <span className="kthero-broadcast-text">🎉 20% off this weekend only — tap to shop</span>
      </div>

      <span className="kthero-figure">{n.toLocaleString()}</span>
      <span className="kthero-caption">friends reached</span>

      <span className="kthero-dots">
        {Array.from({ length: DOTS }, (_, i) => (
          <span key={i} className={`kthero-dot${i < lit ? ' is-lit' : ''}`} />
        ))}
      </span>

      <span className={`kthero-reply${replyIn ? ' is-in' : ''}`}>
        <span className="kthero-reply-av">E</span>
        <span className="kthero-reply-text">Does this stack with my coupon?</span>
      </span>
    </div>
  )
}

function KakaoTalkHeroMock() {
  const [scene, setScene] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setScene((s) => (s + 1) % SCENES.length), SCENE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="kthero"
      role="img"
      aria-label="An AlimTalk order notice being approved and delivered, crossfading into a FriendTalk broadcast reaching channel friends"
    >
      <span className="kthero-sender">
        <span className="kthero-mark" />
        Kakao Channel · verified
      </span>

      <div className="kthero-stage">
        <div className={`kthero-scene-wrap${scene === 0 ? ' is-active' : ''}`}>
          <AlimTalkScene active={scene === 0} />
        </div>
        <div className={`kthero-scene-wrap${scene === 1 ? ' is-active' : ''}`}>
          <FriendTalkScene active={scene === 1} />
        </div>
      </div>

      <div className="kthero-labels">
        {SCENES.map((s, i) => (
          <div key={s.key} className={`kthero-label${scene === i ? ' is-active' : ''}`}>
            <span className="kthero-label-title">{s.title}</span>
            <span className="kthero-label-desc">{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KakaoTalkHeroMock
