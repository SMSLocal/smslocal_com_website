import './MessageTypeShowcase.css'

function MessageTypeShowcase({ title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="mts-rows">
          {items.map((item, i) => (
            <div className={`mts-row mts-row--${i % 2 === 0 ? 'a' : 'b'}`} key={item.title}>
              <div className="mts-visual">{item.mock}</div>
              <div className="mts-text">
                <span className="mts-num">{String(i + 1).padStart(2, '0')}</span>
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

export default MessageTypeShowcase
