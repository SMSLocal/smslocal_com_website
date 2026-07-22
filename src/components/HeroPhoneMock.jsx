import './HeroPhoneMock.css'

const CONTACTS = ['+1 555 0134', '+44 7700 9001', '+61 400 12 345', '+49 151 2345 67']

function HeroPhoneMock() {
  return (
    <div className="phone-mock">
      <div className="phone-mock-notch" />
      <div className="phone-mock-status">
        <span>9:41</span>
      </div>

      <div className="phone-mock-header">Messages</div>

      <div className="phone-mock-contacts">
        {CONTACTS.map((c) => (
          <span className="phone-mock-chip" key={c}>{c}</span>
        ))}
      </div>

      <div className="phone-mock-thread">
        <div className="phone-mock-avatar">M</div>
        <div className="phone-mock-bubble">
          <div className="phone-mock-bubble-head">
            <strong>Maple &amp; Thread</strong>
            <span className="phone-mock-delivered">Delivered</span>
          </div>
          <p>Flash sale — 50% off everything today! Shop now before it ends. …More</p>
        </div>
      </div>

      <div className="phone-mock-sent">Sent to 12,480 contacts in one click</div>

      <div className="phone-mock-thread alt">
        <div className="phone-mock-avatar">S</div>
        <div className="phone-mock-bubbles">
          <div className="phone-mock-bubble small user">Is my order shipped?</div>
          <div className="phone-mock-bubble small bot">Yes — arriving today 🚚</div>
          <div className="phone-mock-bubble small user">Perfect, thanks!</div>
        </div>
      </div>

      <div className="phone-mock-tags">
        <span>New sign-up</span>
        <span>Cart abandoned</span>
      </div>
    </div>
  )
}

export default HeroPhoneMock
