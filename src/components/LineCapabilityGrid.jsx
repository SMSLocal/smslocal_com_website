import './LineCapabilityGrid.css'

function FlexMiniMock() {
  return (
    <div className="lncap-mock">
      <div className="lncap-flex-media" />
      <strong>Members-only sale</strong>
      <p>Ends tonight at midnight</p>
    </div>
  )
}

function PointsMiniMock() {
  return (
    <div className="lncap-mock">
      <div className="lncap-row">
        <span>Reward points</span>
        <strong>1,240</strong>
      </div>
      <div className="lncap-row">
        <span>Next reward at</span>
        <strong>1,500</strong>
      </div>
    </div>
  )
}

function OneInboxMiniMock() {
  return (
    <div className="lncap-mock">
      <div className="lncap-row">
        <span className="lncap-channel">LINE</span>
        <span>Do I still have reward points?</span>
      </div>
      <div className="lncap-row">
        <span className="lncap-channel">WhatsApp</span>
        <span>Order #8821 update please</span>
      </div>
    </div>
  )
}

const ITEMS = [
  { title: 'Flex messages that sell.', desc: 'Design rich, custom-laid-out cards — images, buttons and text arranged exactly how you want.', mock: <FlexMiniMock /> },
  { title: 'Loyalty built in.', desc: "Points, coupons and rewards live inside the same chat your customers already use to talk to you.", mock: <PointsMiniMock /> },
  { title: 'One inbox, every channel.', desc: 'LINE sits beside WhatsApp, SMS and email in the same shared inbox.', mock: <OneInboxMiniMock /> },
]

function LineCapabilityGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">What your Official Account can actually do</h2>
        <p className="section-subtitle">Three things that go beyond a plain broadcast list.</p>

        <div className="lncap-rows">
          {ITEMS.map((item, i) => (
            <div className={`lncap-showrow lncap-showrow--${i % 2 === 0 ? 'a' : 'b'}`} key={item.title}>
              <div className="lncap-mockwrap">{item.mock}</div>
              <div className="lncap-text">
                <span className="lncap-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LineCapabilityGrid
