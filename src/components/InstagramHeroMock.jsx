import { useEffect, useState } from 'react'
import './InstagramHeroMock.css'
import { IconBolt } from './icons.jsx'

const REPLY = 'Yes, still in stock — and it ships worldwide! Want the link?'

// The hook: DMs visibly pile up while the AI is drafting, then the backlog drops
// the moment it answers. It gives the loop a stake — the viewer watches a queue
// build and get cleared — instead of a sequence that merely repeats.
// Tuned so the swing is actually visible: at a 700ms bump against a 1600ms
// draft the count only moved 3->4 and back, which read as a flicker rather than
// a backlog. It now climbs roughly 2 -> 8 while the AI drafts, then clears in
// one step.
const QUEUE_START = 3
const QUEUE_MAX = 9
const QUEUE_AFTER_REPLY = 2
const BUMP_EVERY = 420
const DRAFTING_MS = 2200
const SENT_MS = 3600

function InstagramHeroMock() {
  const [showReply, setShowReply] = useState(false)
  const [queue, setQueue] = useState(QUEUE_START)
  const [cleared, setCleared] = useState(false)

  useEffect(() => {
    let start = Date.now()
    let lastBump = Date.now()
    let phase = 'typing'

    const id = setInterval(() => {
      const now = Date.now()
      const elapsed = now - start

      // the backlog only grows while the reply is still being written
      if (phase === 'typing' && now - lastBump >= BUMP_EVERY) {
        lastBump = now
        setQueue((q) => Math.min(QUEUE_MAX, q + 1))
      }

      if (phase === 'typing' && elapsed >= DRAFTING_MS) {
        setShowReply(true)
        setCleared(true)
        setQueue(QUEUE_AFTER_REPLY)
        phase = 'shown'
        start = now
      } else if (phase === 'shown' && elapsed >= SENT_MS) {
        setShowReply(false)
        setCleared(false)
        phase = 'typing'
        start = now
        lastBump = now
      }
    }, 100)

    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="igmock"
      role="img"
      aria-label="Floating Instagram conversation fragments — a story reply, an incoming DM, and the AI answering in six seconds"
    >
      {/* brand anchor — the account this inbox belongs to, in a story ring */}
      <div className="igf igf-profile">
        <span className="igmock-profile">
          <span className="igmock-ring">
            <span className="igmock-ava">
              <i className="igmock-ig-glyph" />
            </span>
          </span>
          <span className="igmock-profile-txt">
            <b>@yourbrand</b>
            <em>
              <i className="igmock-live-dot" />
              Active now
            </em>
          </span>
        </span>
      </div>

      {/* live badge — top right */}
      <div className="igf igf-badge">
        <span className="igmock-chip igmock-chip--live">
          <i className="igmock-live-dot" /> Replied in 6s
        </span>
      </div>

      {/* story-reply chip — top left */}
      <div className="igf igf-story">
        <span className="igmock-chip">
          <i className="igmock-thumb">
            <i className="igmock-ig-glyph" />
          </i>
          Replied to your story · canvas tote 🛍️
        </span>
      </div>

      {/* incoming DM — upper left */}
      <div className="igf igf-in">
        <div className="igmock-card igmock-card--in">
          Obsessed 😍 is the canvas tote still in stock, and does it ship
          internationally?
          <span className="igmock-time">9:41 AM</span>
        </div>
      </div>

      {/* AI reply — focal, center-right */}
      <div className="igf igf-reply">
        <div className="igmock-card igmock-card--ai">
          <span className="igmock-ai-label">
            <IconBolt /> AI answering
          </span>
          {showReply ? (
            <span className="igmock-reply-text">{REPLY}</span>
          ) : (
            <span className="igmock-typing">
              <i />
              <i />
              <i />
            </span>
          )}
        </div>
      </div>

      {/* avatar cluster, now carrying the live backlog counter */}
      <div className="igf igf-avatars">
        <div className={`igmock-avatars${cleared ? ' is-cleared' : ''}`}>
          <span style={{ '--i': 0 }}>A</span>
          <span style={{ '--i': 1 }}>K</span>
          <span style={{ '--i': 2 }}>U</span>
          {/* key on the value so each change re-triggers the count animation */}
          <em>
            <b key={queue}>{queue}</b> DMs waiting
          </em>
        </div>
      </div>

      {/* channels pill — lower right */}
      <div className="igf igf-channels">
        <span className="igmock-pill">DMs · stories · comments</span>
      </div>
    </div>
  )
}

export default InstagramHeroMock
