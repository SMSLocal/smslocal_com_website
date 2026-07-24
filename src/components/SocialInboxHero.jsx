import './SocialInboxHero.css'

/**
 * Hero visual for the Social media inbox page — a three-moment player.
 *
 * The page makes three promises, so the visual tells three moments on one 18s
 * clock:
 *   1  UNIFY   a public Instagram comment and a private WhatsApp message from
 *              the same person tie into one customer record
 *   2  ROUTE   that conversation is assigned to one owner and locked, so no
 *              two agents reply to it
 *   3  ANSWER  an AI-assisted draft is approved and sent, first reply in 42s
 *
 * Container treatment is deliberate: moment 1 is COMPLETELY free-floating —
 * its fragments sit directly on the page at their own offsets with no card,
 * frame or background of any kind — while moments 2 and 3 share ONE container
 * that fades in behind them. The client is steering away from container-heavy
 * layouts, so the visual opens boxless and only introduces a surface where the
 * content genuinely needs alignment (a routing table, a draft with actions).
 *
 * Otherwise built to the language approved on the channels and broadcasting
 * pages (ChannelsHubHero, WaBroadcastHero, VoiceChannelHero): small floating
 * pieces, dashed connectors, live counters, one brand-gradient accent, and an
 * assembled base state that reads correctly with animation switched off.
 */

const IgGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.4" />
    <circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const WaGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12a7.6 7.6 0 0 1-11 6.8L4 20l1.3-4.1A7.6 7.6 0 1 1 20 12z" />
    <path d="M9.4 9.4c.4 3 2.2 4.8 5.2 5.2l1-1.3-2-1-.9.7c-.9-.5-1.6-1.2-2-2l.7-.9-1-2z" fill="currentColor" stroke="none" />
  </svg>
)

const HeartGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z" />
  </svg>
)

const LinkGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 1 0-5.7-5.7L11 6.3" />
    <path d="M14 11a4 4 0 0 0-5.7 0L5.7 13.6a4 4 0 1 0 5.7 5.7l1.6-1.6" />
  </svg>
)

const LockGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="9" rx="2.5" />
    <path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3" />
  </svg>
)

const SparkGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.7 4.8L18.5 9.5l-4.8 1.7L12 16l-1.7-4.8L5.5 9.5l4.8-1.7z" />
    <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
  </svg>
)

const TickGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.5 12.5l4 4 8-9" />
    <path d="M9 16.5l1 1 8-9" />
  </svg>
)

function SocialInboxHero() {
  return (
    <div className="sih" aria-hidden="true">
      <div className="sih-stage">
        {/* ============ MOMENT 1 — unify. No container at all: every piece
             floats on the page at its own offset. ============ */}
        <div className="sih-free">
          <span className="sih-free-cap">
            <span className="sih-dot-live" />
            Comments &amp; DMs · one record
          </span>

          <span className="sih-frag sih-frag--a">
            <span className="sih-src sih-src--ig"><IgGlyph /></span>
            <span className="sih-frag-body">
              <span className="sih-frag-top">
                Priya <em>public comment</em>
              </span>
              <span className="sih-frag-msg">Love this! Is the mint dress back in stock?</span>
              <span className="sih-frag-meta"><HeartGlyph />24 · 12m</span>
            </span>
          </span>

          <span className="sih-tie">
            <span className="sih-tie-line"><span className="sih-tie-dot" /></span>
            <span className="sih-tie-badge"><LinkGlyph />same customer</span>
            <span className="sih-tie-line"><span className="sih-tie-dot sih-tie-dot--b" /></span>
          </span>

          <span className="sih-frag sih-frag--b">
            <span className="sih-src sih-src--wa"><WaGlyph /></span>
            <span className="sih-frag-body">
              <span className="sih-frag-top">
                Priya <em>private message</em>
              </span>
              <span className="sih-frag-msg">Also — where is my order #5120?</span>
              <span className="sih-frag-meta">2m</span>
            </span>
          </span>

          <span className="sih-free-stats">
            <b>1</b> record · <b>6</b> channels · <b>0</b> lost threads
          </span>
        </div>

        {/* ============ MOMENTS 2 & 3 — one shared container ============ */}
        <div className="sih-panel">
          {/* moment 2 */}
          <div className="sih-pane sih-pane--2">
            <span className="sih-pane-head">
              <span className="sih-dot-live" />
              Assigned to one owner
            </span>

            <div className="sih-row">
              <span className="sih-src sih-src--wa"><WaGlyph /></span>
              <span className="sih-row-body">
                <span className="sih-row-top">Priya <em>order query</em></span>
                <span className="sih-row-msg">Also — where is my order #5120?</span>
              </span>
            </div>

            <span className="sih-rule">
              Rule · <strong>order queries</strong> → Mira
            </span>

            <div className="sih-team">
              <span className="sih-mate">
                <span className="sih-mate-av">JD</span>
                <span className="sih-mate-name">Jonas</span>
                <span className="sih-mate-role">Support</span>
              </span>
              <span className="sih-mate sih-mate--target">
                <span className="sih-mate-av">MK</span>
                <span className="sih-mate-name">Mira</span>
                <span className="sih-mate-role">Orders</span>
                <span className="sih-mate-lock"><LockGlyph /></span>
              </span>
              <span className="sih-mate">
                <span className="sih-mate-av">SR</span>
                <span className="sih-mate-name">Sam</span>
                <span className="sih-mate-role">Returns</span>
              </span>
            </div>

            <span className="sih-pane-foot">
              <b>0</b> double replies · collision detection <b>on</b>
            </span>
          </div>

          {/* moment 3 */}
          <div className="sih-pane sih-pane--3">
            <span className="sih-pane-head">
              <span className="sih-spark"><SparkGlyph /></span>
              AI-assist draft
            </span>

            <span className="sih-draft-body">
              Hi Priya — the mint dress is back in stock, and order #5120 is out
              for delivery today.
            </span>

            <span className="sih-draft-actions">
              <span className="sih-chip-ghost">Edit</span>
              <span className="sih-chip-solid">Approve &amp; send</span>
            </span>

            <div className="sih-sent">
              <span className="sih-sent-text">Sent to Priya on WhatsApp</span>
              <span className="sih-sent-ticks"><TickGlyph /></span>
            </div>

            <span className="sih-pane-foot">
              <b>42s</b> first reply · <b>98%</b> answered same day
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialInboxHero
