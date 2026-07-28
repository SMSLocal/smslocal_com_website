import './CopilotAheadHero.css'

/**
 * Hero visual for /products/agent-copilot.
 * Dramatizes the headline literally: a customer message arrives, a "reading"
 * sweep highlights across it as if an agent were scanning line by line, while
 * the draft reply — already resolved, tick and all — sits ready beside it.
 * One concrete moment, not a diagram. Floats on the page background — no
 * outer frame. The fully-assembled state (both cards, draft included) is the
 * CSS base; the sweep is a decorative overlay only, gated behind
 * prefers-reduced-motion, so nothing depends on motion to read correctly.
 */
function CopilotAheadHero() {
  return (
    <div className="cah" aria-hidden="true">
      <span className="cah-chip">
        <span className="cah-chip-dot" />
        Copilot reading the thread
      </span>

      <div className="cah-incoming">
        <div className="cah-incoming-top">
          <span className="cah-avatar">LC</span>
          <span className="cah-who">
            <strong>Liam Cole</strong>
            <span>WhatsApp · 09:52</span>
          </span>
        </div>
        <p className="cah-incoming-text">
          <span className="cah-sweep" aria-hidden="true" />
          Hey — is my order still eligible for a return after 20 days?
        </p>
      </div>

      <div className="cah-link">
        <span className="cah-link-rule" />
        <span className="cah-link-label">before finished reading</span>
      </div>

      <div className="cah-draft">
        <div className="cah-draft-top">
          <span className="cah-draft-badge">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
            Draft ready
          </span>
          <span className="cah-draft-source">Return policy · Order #SL-7724</span>
        </div>
        <p className="cah-draft-text">
          Hi Liam — yes, returns are accepted up to 30 days from delivery, so you're well within the window. I'll send the return label now.
        </p>
      </div>

      <div className="cah-timer">
        <span><b>1.4s</b> to a ready-to-send draft</span>
      </div>
    </div>
  )
}

export default CopilotAheadHero
