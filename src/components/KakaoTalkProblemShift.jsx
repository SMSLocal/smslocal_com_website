import './KakaoTalkProblemShift.css'

/**
 * "The problem" section for /channels/kakaotalk — two literal mini screens
 * facing off: a Kakao Channel replying blind and alone, vs. the same channel
 * sitting in a shared inbox that already has the customer's order history.
 * Mirrors ViberProblemShift's shape (a visual, not a bulleted list) with
 * KakaoTalk's own content and its own CSS classes — no shared state with the
 * Viber component.
 */
function KakaoTalkProblemShift({ eyebrow, heading, subtitle }) {
  return (
    <section className="section section-alt kps-section">
      <div className="container kps-inner">
        <div className="kps-copy">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {heading && <h2 className="kps-heading">{heading}</h2>}
          {subtitle && <p className="kps-sub">{subtitle}</p>}
        </div>

        <div className="kps-stage">
          <div className="kps-side">
            <div className="kps-phone kps-phone--bad">
              <div className="kps-phone-head">
                <span className="kps-avatar kps-avatar--bad" />
                <span className="kps-name">Kakao Channel</span>
              </div>
              <div className="kps-bubble kps-bubble--in">Hi, did my order ship yet?</div>
              <div className="kps-bubble kps-bubble--out muted">Can you send your order number again?</div>
            </div>
            <span className="kps-tag kps-tag--bad">✕ Starts from zero, every time</span>
          </div>

          <span className="kps-vs">VS</span>

          <div className="kps-side">
            <div className="kps-phone kps-phone--good">
              <div className="kps-phone-head">
                <span className="kps-avatar kps-avatar--good" />
                <span className="kps-name">Shared inbox</span>
                <span className="kps-context">AlimTalk: Order #7734 confirmed Tue</span>
              </div>
              <div className="kps-bubble kps-bubble--in">Hi, did my order ship yet?</div>
              <div className="kps-bubble kps-bubble--out">Shipped Tuesday — arriving Thursday! 📦</div>
            </div>
            <span className="kps-tag kps-tag--good">✓ Answers instantly, with full history</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KakaoTalkProblemShift
