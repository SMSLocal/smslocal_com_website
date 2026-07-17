import './RcsMessageTypes.css'

function PhoneFrame({ children }) {
  return (
    <div className="rcst-phone">
      <div className="rcst-phone-notch" />
      <div className="rcst-phone-screen">{children}</div>
    </div>
  )
}

export function RichCardMock() {
  return (
    <PhoneFrame>
      <div className="rcst-card">
        <div className="rcst-card-media" />
        <strong>Order #8821 shipped</strong>
        <p>Arriving Thursday</p>
      </div>
      <button className="rcst-chip primary">Track order</button>
    </PhoneFrame>
  )
}

export function CarouselMock() {
  return (
    <PhoneFrame>
      <div className="rcst-carousel">
        <div className="rcst-carousel-card active">
          <div className="rcst-card-media small" />
          <span>Earbuds</span>
        </div>
        <div className="rcst-carousel-card">
          <div className="rcst-card-media small alt" />
          <span>Smart Watch</span>
        </div>
        <div className="rcst-carousel-card peek" />
      </div>
      <button className="rcst-chip">Browse all</button>
    </PhoneFrame>
  )
}

export function SuggestedRepliesMock() {
  return (
    <PhoneFrame>
      <div className="rcst-bubble">
        <p>Your appointment is confirmed for 4 PM. See you then?</p>
      </div>
      <div className="rcst-chip-row">
        <span className="rcst-chip small">Yes</span>
        <span className="rcst-chip small">Reschedule</span>
        <span className="rcst-chip small">Cancel</span>
      </div>
    </PhoneFrame>
  )
}
