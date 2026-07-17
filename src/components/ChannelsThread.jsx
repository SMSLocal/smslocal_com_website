import './ChannelsThread.css'

function ChannelsThread({ eyebrow, title, subtitle, items }) {
  return (
    <section className="section chthread-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="chthread" style={{ '--count': items.length }}>
          <div className="chthread-track">
            <span className="chthread-travel" />
          </div>

          {items.map((item) => (
            <div className="chthread-node" key={item.title}>
              <span className="chthread-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChannelsThread
