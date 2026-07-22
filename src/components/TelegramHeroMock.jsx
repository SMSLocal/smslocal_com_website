import './TelegramHeroMock.css'

const CHIPS = [
  { pos: 'tl', label: '/start', kind: 'cmd' },
  { pos: 'tr', label: '🛒 Track Order', kind: 'btn' },
  { pos: 'bl', label: '💬 Talk to Support', kind: 'btn' },
  { pos: 'br', label: '📚 Browse Catalog', kind: 'btn' },
]

function TelegramHeroMock() {
  return (
    <div className="tmock" role="img" aria-label="A Telegram bot at the centre broadcasting outward, ringed by its commands and tappable buttons">
      <span className="tmock-ring tmock-ring--1" aria-hidden="true" />
      <span className="tmock-ring tmock-ring--2" aria-hidden="true" />
      <span className="tmock-ring tmock-ring--3" aria-hidden="true" />

      <div className="tmock-hub">
        <span className="tmock-hub-mark">✈</span>
        <span className="tmock-hub-name">AI agent <i>✓</i></span>
        <span className="tmock-hub-sub">Telegram bot · online</span>
      </div>

      {CHIPS.map((c) => (
        <span className={`tmock-chip tmock-chip--${c.pos} tmock-chip--${c.kind}`} key={c.pos}>
          {c.label}
        </span>
      ))}

      <span className="tmock-broadcast">📣 Broadcast · 12,480 reached</span>
    </div>
  )
}

export default TelegramHeroMock
