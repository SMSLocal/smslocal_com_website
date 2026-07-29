import './ProblemChannelConverge.css'

const CHANNELS = [
  { icon: '💬', title: 'WhatsApp & SMS', desc: 'Direct messages and texts', active: false },
  { icon: '🌐', title: 'Web chat & site', desc: 'Live chat widget on your site', active: false },
  { icon: '📸', title: 'Instagram & Messenger', desc: 'DMs and story replies', active: true },
  { icon: '📞', title: 'Phone & voice', desc: 'Calls answered by voice AI', active: false },
]

const THREAD = [
  { initial: 'P', name: 'Priya', text: 'Table for 4 tomorrow at 7?', tint: 'blue' },
  { initial: 'D', name: 'Daniel', text: 'Can I reschedule my 3pm?', tint: 'cyan' },
  { initial: 'M', name: 'Mel', text: 'Is Friday still open?', tint: 'coral' },
  { initial: 'O', name: 'Omar', text: 'Confirmed — see you then!', tint: 'teal' },
]

function ProblemChannelConverge({ eyebrow, heading, paragraph, alt }) {
  return (
    <section className={alt ? 'section section-alt pcc-section' : 'section pcc-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="pcc-heading">{heading}</h2>}
        {paragraph && <p className="pcc-paragraph">{paragraph}</p>}

        <div className="pcc-diagram">
          <div className="pcc-channels">
            {CHANNELS.map((c, i) => (
              <div className={`pcc-channel${c.active ? ' is-active' : ''}`} key={c.title} style={{ '--pcc-i': i }}>
                <span className="pcc-channel-icon">{c.icon}</span>
                <div className="pcc-channel-t">
                  <strong>{c.title}</strong>
                  <span>{c.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <svg className="pcc-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="12" x2="50" y2="50" className="pcc-line" />
            <line x1="0" y1="37" x2="50" y2="50" className="pcc-line" />
            <line x1="0" y1="63" x2="50" y2="50" className="pcc-line" />
            <line x1="0" y1="88" x2="50" y2="50" className="pcc-line" />
            <line x1="50" y1="50" x2="100" y2="50" className="pcc-line pcc-line--solid" />
          </svg>

          <span className="pcc-dot" aria-hidden="true" />

          <div className="pcc-panel">
            <span className="pcc-panel-bar" aria-hidden="true" />
            <span className="pcc-panel-badge"><span className="pcc-panel-badge-check">✓</span>Live calendar</span>
            <h3>One shared calendar</h3>
            <p>Every channel, one thread, full context.</p>

            <div className="pcc-thread">
              {THREAD.map((t, i) => (
                <div className={`pcc-thread-row${i === 3 ? ' is-done' : ''}`} key={t.name}>
                  <span className={`pcc-avatar pcc-avatar--${t.tint}`}>{t.initial}</span>
                  <span className="pcc-thread-text"><strong>{t.name}</strong> {t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemChannelConverge
