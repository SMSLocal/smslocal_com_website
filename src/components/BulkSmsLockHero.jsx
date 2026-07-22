import './BulkSmsLockHero.css'

/**
 * Hero visual for the Bulk SMS page.
 *
 * A frameless cascade of native lock-screen notification banners — the same
 * broadcast landing on screen after screen. There is no phone frame and no
 * single wrapping card: each banner is its own floating chip on the page
 * background, and each warms to a delivered tick in turn. Deliberately unlike
 * every other hero on the site (no dashboard stack, no fan-out to recipients,
 * no device chrome, no counter+sparkline).
 *
 * Base (reduced-motion) state is the fully-assembled, all-delivered visual;
 * motion only sequences the delivered ticks and the freshly-arrived lift.
 */
const PINGS = [
  { from: 'SMSLOCAL', time: 'now', body: <>Flash sale is live — <b>20% off</b> everything, today only. Shop&nbsp;→&nbsp;sms.lc/sale</> },
  { from: 'SMSLOCAL', time: '1m ago', body: <>Order <b>#4821</b> is out for delivery. Track it live on the map.</> },
  { from: 'SMSLOCAL', time: '2m ago', body: <>Your verification code is <b>4471</b>. It expires in 10 minutes.</> },
]

function Tick() {
  return (
    <svg className="bslh-tick" viewBox="0 0 24 16" width="19" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8.5l4 4L14 3" />
      <path d="M10 12.5l1.5 1.5L22 4" />
    </svg>
  )
}

function MsgGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
    </svg>
  )
}

function BulkSmsLockHero() {
  return (
    <div className="bslh" role="img" aria-label="One bulk SMS broadcast landing as native lock-screen notifications, each marked delivered">
      <div className="bslh-clock" aria-hidden="true">
        <span className="bslh-lock">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
        </span>
        <span className="bslh-time">9:41</span>
        <span className="bslh-date">Saturday, 18 July</span>
      </div>

      <div className="bslh-stack">
        {PINGS.map((p, i) => (
          <div className={`bslh-ping bslh-ping--${i}`} key={i}>
            <span className="bslh-app"><MsgGlyph /></span>
            <div className="bslh-ping-body">
              <div className="bslh-ping-top">
                <span className="bslh-from">{p.from}</span>
                <span className="bslh-ago">{p.time}</span>
              </div>
              <p className="bslh-text">{p.body}</p>
            </div>
            <span className="bslh-tick-wrap"><Tick /></span>
          </div>
        ))}
      </div>

      <span className="bslh-reach">
        <span className="bslh-live" aria-hidden="true" />
        Delivered to <b>18,240</b> lock screens
      </span>
    </div>
  )
}

export default BulkSmsLockHero
