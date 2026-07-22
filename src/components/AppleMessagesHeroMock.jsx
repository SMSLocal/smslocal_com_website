import './AppleMessagesHeroMock.css'

const NODES = [
  { side: 'right', type: 'in', text: 'Hi, can I reschedule my fitting appointment?' },
  { side: 'left', type: 'out', text: 'Sure! Pick a new time 👇', tapback: true },
  { side: 'right', type: 'pick', text: '📅 Tomorrow, 11:00 AM', check: true },
  { side: 'left', type: 'in', text: 'Tomorrow at 11 works great' },
  { side: 'right', type: 'pay', text: ' Pay · $0 deposit' },
]

function AppleMessagesHeroMock() {
  return (
    <div className="amock" role="img" aria-label="A connected iMessage business-chat journey — reschedule request, reply, time pick, confirmation and an Apple Pay deposit, threaded on one flow">
      <span className="amock-start">
        <span className="amock-avatar">SL</span>
        SMSLocal · Business Chat
        <span className="amock-verified">✓</span>
      </span>

      <div className="amock-flow">
        <span className="amock-pulse" aria-hidden="true" />
        {NODES.map((n, i) => (
          <div className={`amock-row amock-row--${n.side}`} key={i}>
            <div className="amock-cell">
              <div className={`amock-msg amock-msg--${n.type}`}>
                {n.text}
                {n.check && <span className="amock-msg-check">✓</span>}
                {n.tapback && <span className="amock-tapback">❤️</span>}
              </div>
            </div>
            <span className={`amock-dot amock-dot--${n.type}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppleMessagesHeroMock
