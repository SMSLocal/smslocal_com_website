import './ProblemAnnotatedInbox.css'

/**
 * Bespoke, from-scratch replacement for the "the problem" floating-cards
 * section on /products/agent-copilot. ONE concrete artifact — a real reply
 * window, already resolved by the copilot — with four annotation callouts
 * leadering out to its four sides, spec-sheet style (same pattern as
 * PlatformConsoleAnatomy). Not a stack of floating pill cards.
 */
const POINTS = [
  { side: 'top', kicker: 'Summarised', title: 'Two lines, not ten messages' },
  { side: 'right', kicker: 'Grounded', title: 'Right policy, already pulled' },
  { side: 'bottom', kicker: 'Drafted', title: 'A ready-to-send reply' },
  { side: 'left', kicker: 'Reviewed', title: 'Agent still hits send' },
]

function ProblemAnnotatedInbox({ eyebrow, heading, paragraphs }) {
  return (
    <section className="section pai-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraphs && (
          <div className="pai-intro">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        <div
          className="pai-stage"
          role="img"
          aria-label="A resolved reply window, annotated on four sides: Summarised, Grounded, Drafted, Reviewed."
        >
          {POINTS.map((pt) => (
            <div className={`pai-callout pai-callout--${pt.side}`} key={pt.side}>
              <span className="pai-callout-kicker">{pt.kicker}</span>
              <h3 className="pai-callout-title">{pt.title}</h3>
            </div>
          ))}

          <div className="pai-window">
            <div className="pai-titlebar">
              <span className="pai-dot pai-dot--r" />
              <span className="pai-dot pai-dot--y" />
              <span className="pai-dot pai-dot--g" />
              <span className="pai-url">helpdesk.smslocal.com/inbox/48219</span>
              <span className="pai-live"><span className="pai-live-dot" aria-hidden="true" />Resolved in 12s</span>
            </div>

            <div className="pai-tabs">
              <span className="pai-tab is-active">Inbox</span>
              <span className="pai-tab">Help Centre</span>
              <span className="pai-tab">Policy: Refunds</span>
            </div>

            <div className="pai-body">
              <div className="pai-thread">
                <span className="pai-from">Emma Clarke · WhatsApp</span>
                <p className="pai-ask">"Returned my order 9 days ago, still no refund."</p>
                <p className="pai-summary"><b>Summary —</b> return received 14th, refund due Thursday.</p>
              </div>

              <div className="pai-chips">
                <span className="pai-chip"><CheckIcon /> Refund policy v4</span>
                <span className="pai-chip"><CheckIcon /> Order #SL-48219</span>
              </div>

              <div className="pai-draft">
                <p>
                  Hi Emma — your return was received on the 14th, so your refund is due by Thursday.
                  I've flagged it to move today.
                </p>
                <span className="pai-draft-badge"><SparkIcon /> AI draft</span>
              </div>

              <div className="pai-actions">
                <span className="pai-btn pai-btn--ghost">Edit</span>
                <span className="pai-btn pai-btn--send">Send<ArrowIcon /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M12 2l1.8 5.6L19.4 9l-5.6 1.8L12 16l-1.8-5.2L4.6 9l5.6-1.4L12 2z" /></svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
  )
}

export default ProblemAnnotatedInbox
