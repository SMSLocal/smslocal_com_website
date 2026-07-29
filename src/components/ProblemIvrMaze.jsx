import './ProblemIvrMaze.css'

function ProblemIvrMaze({ eyebrow, heading, paragraph, menu, resolved, alt }) {
  return (
    <section className={alt ? 'section section-alt pim-section' : 'section pim-section'}>
      <div className="container pim-inner">
        <div className="pim-copy">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          <h2 className="pim-heading">{heading}</h2>
          <p className="pim-paragraph">{paragraph}</p>
        </div>

        <div className="pim-visual">
          <div className="pim-ivr">
            <span className="pim-ivr-label">Incoming call</span>
            <ul className="pim-ivr-menu">
              {menu.map((item, i) => (
                <li className="pim-ivr-row" key={item} style={{ '--pim-i': i }}>
                  <span className="pim-ivr-key">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
            <span className="pim-ivr-loop" aria-hidden="true">Please continue holding&hellip;</span>
          </div>

          <span className="pim-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>

          <div className="pim-chat">
            <span className="pim-chat-label">One message</span>
            <div className="pim-chat-bubble">{resolved}</div>
            <span className="pim-chat-done">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none"><path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Answered
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemIvrMaze
