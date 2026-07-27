import './PlatformConsoleAnatomy.css'
import { IconChat, IconMegaphone, IconCode, IconPhone, IconRobot, IconReceipt } from './icons.jsx'

/**
 * Bespoke, from-scratch replacement for the radial "four reasons" hub on
 * /why-smslocal. ONE concrete artifact - a realistic unified workspace
 * console (one nav, one workspace header, one merged inbox, one invoice) -
 * with four annotation callouts leadering OUT to its four sides, spec-sheet
 * style. Not a grid of icon tiles, not a wheel of spokes: an annotated
 * screenshot of the thing itself.
 */
const NAV = [
  { icon: <IconChat />, label: 'Inbox', active: true },
  { icon: <IconMegaphone />, label: 'Campaigns' },
  { icon: <IconCode />, label: 'API & webhooks' },
  { icon: <IconPhone />, label: 'Numbers' },
  { icon: <IconRobot />, label: 'Chatbot studio' },
  { icon: <IconReceipt />, label: 'Billing' },
]

const THREAD = [
  { channel: 'SMS', cls: 'sms', text: 'Your order #4821 is out for delivery' },
  { channel: 'WhatsApp', cls: 'wa', text: 'Can I reschedule to tomorrow?' },
  { channel: 'Email', cls: 'email', text: 'Delivery confirmation sent' },
]

function PlatformConsoleAnatomy() {
  return (
    <section className="section pcp-section">
      <div className="container">
        <span className="section-kicker">Why teams switch</span>
        <h2 className="section-title">Four reasons to run on one platform</h2>
        <p className="section-subtitle">
          Consolidation is not just tidier — it is simpler to run, cheaper to read and faster to launch.
        </p>

        <div
          className="pcp-stage"
          role="img"
          aria-label="A single SMSLocal workspace console, annotated on four sides: the unified left navigation is labelled Consolidation, the one-login workspace header is labelled Simplicity, the merged inbox thread across SMS, WhatsApp and email is labelled Speed, and the single itemised invoice is labelled Transparency."
        >
          <div className="pcp-callout pcp-callout--left">
            <span className="pcp-callout-kicker">Consolidation</span>
            <h3 className="pcp-callout-title">One platform, not five tools</h3>
            <p className="pcp-callout-desc">Messaging API, chatbot builder, campaigns, inbox and numbers — one unified nav, nothing to stitch together.</p>
          </div>

          <div className="pcp-callout pcp-callout--top">
            <span className="pcp-callout-kicker">Simplicity</span>
            <h3 className="pcp-callout-title">Simple by default</h3>
            <p className="pcp-callout-desc">One login, one workspace, one set of contacts. New teammates ship on their first afternoon.</p>
          </div>

          <div className="pcp-callout pcp-callout--right">
            <span className="pcp-callout-kicker">Speed</span>
            <h3 className="pcp-callout-title">Live in days, not months</h3>
            <p className="pcp-callout-desc">Every channel already talks to the same inbox — skip the integration project between vendors.</p>
          </div>

          <div className="pcp-callout pcp-callout--bottom">
            <span className="pcp-callout-kicker">Transparency</span>
            <h3 className="pcp-callout-title">One bill you can read</h3>
            <p className="pcp-callout-desc">Every channel, seat and message on a single itemised invoice — no per-vendor contracts.</p>
          </div>

          <div className="pcp-console">
            <div className="pcp-console-head">
              <span className="pcp-avatar">MN</span>
              <div className="pcp-workspace">
                <strong>Acme Retail</strong>
                <span>1 workspace · Meera N.</span>
              </div>
              <span className="pcp-live"><span className="pcp-live-dot" aria-hidden="true" />Live · day 2 of setup</span>
            </div>

            <div className="pcp-console-body">
              <nav className="pcp-nav">
                {NAV.map((n) => (
                  <span className={`pcp-nav-item${n.active ? ' active' : ''}`} key={n.label}>
                    {n.icon}
                    {n.label}
                  </span>
                ))}
              </nav>

              <div className="pcp-main">
                <div className="pcp-thread">
                  {THREAD.map((m) => (
                    <span className={`pcp-msg pcp-msg--${m.cls}`} key={m.channel}>
                      <b>{m.channel}</b>
                      {m.text}
                    </span>
                  ))}
                </div>

                <div className="pcp-invoice">
                  <span>This month</span>
                  <strong>$482.10</strong>
                  <span>1 itemised invoice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformConsoleAnatomy
