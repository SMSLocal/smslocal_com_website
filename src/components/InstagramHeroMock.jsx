import { useEffect, useState } from 'react'
import './InstagramHeroMock.css'
import { IconBolt } from './icons.jsx'

const CONVERSATIONS = [
  { initial: 'A', handle: 'aria.wears', note: 'story reply', state: 'unread', active: true },
  { initial: 'K', handle: 'kunal_style', note: 'sizing question', state: 'done' },
  { initial: 'U', handle: 'urbanroots.co', note: 'wholesale · routed', state: 'routed' },
]

const REPLY = 'Yes, still in stock — and it ships worldwide! Want the link?'

function InstagramHeroMock() {
  const [showReply, setShowReply] = useState(false)

  useEffect(() => {
    let start = Date.now()
    let phase = 'typing'

    const id = setInterval(() => {
      const elapsed = Date.now() - start
      if (phase === 'typing' && elapsed >= 1600) {
        setShowReply(true)
        phase = 'shown'
        start = Date.now()
      } else if (phase === 'shown' && elapsed >= 4000) {
        setShowReply(false)
        phase = 'typing'
        start = Date.now()
      }
    }, 100)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="igmock" role="img" aria-label="An Instagram inbox with prior conversations, and the AI answering a DM from a story reply">
      <span className="igmock-tag">
        <i className="igmock-tag-dot" />
        @yourbrand.co · Replied in 6s
      </span>

      <div className="igmock-convo-list">
        {CONVERSATIONS.map((c) => (
          <div className={`igmock-convo${c.active ? ' is-active' : ''}`} key={c.handle}>
            <span className="igmock-convo-avatar">{c.initial}</span>
            <div className="igmock-convo-text">
              <strong>{c.handle}</strong>
              <span>{c.note}</span>
            </div>
            {c.state === 'unread' && <span className="igmock-convo-dot" />}
            {c.state === 'done' && <span className="igmock-convo-check">✓</span>}
          </div>
        ))}
      </div>

      <div className="igmock-thread">
        <div className="igmock-story-ref">
          <span className="igmock-story-thumb" />
          Replied to your story · "New drop — the canvas tote 🛍️"
        </div>

        <div className="igmock-bubble">
          Obsessed 😍 is the canvas tote still in stock, and does it ship internationally?
          <span className="igmock-time">9:41 AM</span>
        </div>

        {!showReply && (
          <div className="igmock-bubble igmock-bubble--out igmock-typing"><i /><i /><i /></div>
        )}
        {showReply && (
          <div className="igmock-bubble igmock-bubble--out">
            <span className="igmock-ai-label"><IconBolt /> AI answering</span>
            {REPLY}
          </div>
        )}
      </div>

      <div className="igmock-inputbar">
        <span>Message @aria.wears…</span>
        <span className="igmock-channels-pill">DMs · stories · comments</span>
      </div>
    </div>
  )
}

export default InstagramHeroMock
