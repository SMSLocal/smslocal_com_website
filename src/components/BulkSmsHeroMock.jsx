import { useEffect, useState } from 'react'
import './BulkSmsHeroMock.css'

const TOTAL = 18240
const DURATION = 2600

function BulkSmsHeroMock() {
  const [progress, setProgress] = useState(0)
  const [showReply, setShowReply] = useState(false)

  useEffect(() => {
    let start = Date.now()
    let phase = 'filling'

    const id = setInterval(() => {
      const elapsed = Date.now() - start

      if (phase === 'filling') {
        const pct = Math.min(100, (elapsed / DURATION) * 100)
        setProgress(pct)
        if (pct >= 100) {
          phase = 'holding'
          start = Date.now()
        }
        return
      }

      if (phase === 'holding') {
        if (elapsed >= 400) {
          setShowReply(true)
          phase = 'replying'
          start = Date.now()
        }
        return
      }

      if (phase === 'replying' && elapsed >= 4200) {
        setShowReply(false)
        setProgress(0)
        phase = 'filling'
        start = Date.now()
      }
    }, 60)

    return () => clearInterval(id)
  }, [])

  const delivered = Math.round((progress / 100) * 18015)
  const clicks = Math.round((progress / 100) * 2740)
  const rate = progress >= 100 ? '98.8%' : `${(progress * 0.988).toFixed(1)}%`

  return (
    <div className="bcast" role="img" aria-label="A bulk SMS broadcast sending live, with delivery stats and an AI-answered reply">
      <span className="bcast-tag">
        <i className="bcast-tag-dot" />
        18,240 recipients · DLT verified
      </span>

      <div className="bcast-msg">
        <div className="bcast-msg-head">
          <strong>Diwali Mega Sale</strong>
          <span className="bcast-sent">Sender ID: SMSLOC</span>
        </div>
        <p className="bcast-msg-text">
          Hi <mark>{'{{name}}'}</mark>, your Diwali discount is live for 24h — extra 15% off, code: <mark>DIWALI15</mark>. Reply STOP to opt out.
        </p>
      </div>

      <div className="bcast-progress">
        <div className="bcast-progress-head">
          <span>Live delivery</span>
          <strong>{delivered.toLocaleString()} / {TOTAL.toLocaleString()}</strong>
        </div>
        <div className="bcast-track">
          <span className="bcast-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="bcast-stats">
        <div className="bcast-stat">
          <strong>{delivered.toLocaleString()}</strong>
          <span>Delivered</span>
        </div>
        <div className="bcast-stat">
          <strong>{clicks.toLocaleString()}</strong>
          <span>Link clicks</span>
        </div>
        <div className="bcast-stat">
          <strong>{rate}</strong>
          <span>Delivery rate</span>
        </div>
      </div>

      <div className={`bcast-reply${showReply ? ' is-in' : ''}`}>
        <span className="bcast-reply-tag">Reply — answered by AI</span>
        <p>&ldquo;Can I use two codes together?&rdquo; — &ldquo;No, one code per order, happy shopping!&rdquo;</p>
        <span className="bcast-reply-meta">Replied in 3s · no agent needed</span>
      </div>
    </div>
  )
}

export default BulkSmsHeroMock
