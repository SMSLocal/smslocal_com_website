import './AgentInboxMock.css'
import { IconRobot } from './icons.jsx'

function AgentInboxMock() {
  return (
    <div className="aim-window" role="img" aria-label="AI support agent inbox resolving a conversation and handing off to a human">
      <div className="aim-head">
        <span className="aim-avatar"><IconRobot /></span>
        <div className="aim-head-t">
          <strong>SMSLocal AI Agent</strong>
          <span><i className="aim-live-dot" />Online · multilingual</span>
        </div>
        <span className="aim-live">Live</span>
      </div>

      <div className="aim-thread">
        {/* Turn 1 — auto-resolved */}
        <div className="aim-turn aim-turn--in aim-t1">
          <div className="aim-meta">Priya · Hindi</div>
          <div className="aim-bubble aim-user">Order kab aayega? #SL-48219</div>
        </div>
        <div className="aim-turn aim-turn--in aim-t2">
          <div className="aim-meta right">AI reply</div>
          <div className="aim-bubble aim-bot">
            Namaste Priya! Aapka order #SL-48219 kal shaam 5 baje tak pahunch jaayega.
            <span className="aim-source">Source: order lookup · live</span>
          </div>
        </div>

        {/* Turn 2 — escalated */}
        <div className="aim-turn aim-turn--in aim-t3">
          <div className="aim-meta">Anita · English</div>
          <div className="aim-bubble aim-user">I want to report a damaged product. This is urgent.</div>
        </div>
        <div className="aim-turn aim-turn--in aim-t4">
          <div className="aim-handoff">
            <span className="aim-handoff-ic">
              <svg viewBox="0 0 24 24" width="12" height="12"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span>Handed to <strong>Meera</strong> with full transcript · 6s</span>
          </div>
        </div>
      </div>

      <div className="aim-stats">
        <div className="aim-stat"><strong>78%</strong><span>auto-resolved</span></div>
        <div className="aim-stat"><strong>&lt;2s</strong><span>avg reply</span></div>
        <div className="aim-stat"><strong>300+</strong><span>apps</span></div>
      </div>
    </div>
  )
}

export default AgentInboxMock
