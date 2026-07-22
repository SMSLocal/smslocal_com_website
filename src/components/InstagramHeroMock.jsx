import { useEffect, useState } from 'react'
import './InstagramHeroMock.css'
import { IconBolt } from './icons.jsx'

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
    <div className="igmock" role="img" aria-label="Floating Instagram conversation fragments — a story reply, an incoming DM, and the AI answering in six seconds">
      {/* live badge — top right */}
      <div className="igf igf-badge">
        <span className="igmock-chip igmock-chip--live"><i className="igmock-live-dot" /> Replied in 6s</span>
      </div>

      {/* story-reply chip — top left */}
      <div className="igf igf-story">
        <span className="igmock-chip"><i className="igmock-thumb" /> Replied to your story · canvas tote 🛍️</span>
      </div>

      {/* incoming DM — upper left */}
      <div className="igf igf-in">
        <div className="igmock-card igmock-card--in">
          Obsessed 😍 is the canvas tote still in stock, and does it ship internationally?
          <span className="igmock-time">9:41 AM</span>
        </div>
      </div>

      {/* AI reply — focal, center-right */}
      <div className="igf igf-reply">
        <div className="igmock-card igmock-card--ai">
          <span className="igmock-ai-label"><IconBolt /> AI answering</span>
          {showReply ? (
            <span className="igmock-reply-text">{REPLY}</span>
          ) : (
            <span className="igmock-typing"><i /><i /><i /></span>
          )}
        </div>
      </div>

      {/* avatar cluster — lower left */}
      <div className="igf igf-avatars">
        <div className="igmock-avatars">
          <span style={{ '--i': 0 }}>A</span>
          <span style={{ '--i': 1 }}>K</span>
          <span style={{ '--i': 2 }}>U</span>
          <em>3 new DMs</em>
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
