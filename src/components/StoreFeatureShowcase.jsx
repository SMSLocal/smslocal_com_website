import './StoreFeatureShowcase.css'

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M2 6h11v9H2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M13 10h4l3 3v2h-7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="1.7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="18" r="1.7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M11.6 3H5a2 2 0 0 0-2 2v6.6a2 2 0 0 0 .6 1.4l8 8a2 2 0 0 0 2.8 0l6-6a2 2 0 0 0 0-2.8l-8-8a2 2 0 0 0-1.4-.6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" width="11" height="11" fill="currentColor">
      <path d="M10 1.2l2.55 5.17 5.7.83-4.13 4.02.98 5.68L10 14.1l-5.1 2.8.98-5.68L1.75 7.2l5.7-.83L10 1.2z" />
    </svg>
  )
}

function CardBackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <rect x="2.5" y="5" width="19" height="14" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.5 9.5h19" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="9.2" fill="currentColor" opacity="0.15" />
      <path d="M8 12.3l2.6 2.6L16.5 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ITEMS = [
  {
    title: 'Order status & tracking',
    desc: 'Answers "where\'s my order?" instantly from live store data, with a live tracking link — no ticket, no waiting.',
    badge: { icon: <TruckIcon />, text: 'Out for delivery' },
    mock: (
      <div className="sfs-mini-order">
        <span className="sfs-mini-order-t">Order #SL-10294</span>
        <div className="sfs-mini-bar"><span /></div>
        <div className="sfs-mini-dots">
          <span className="is-done" /><span className="is-done" /><span className="is-done" /><span />
        </div>
      </div>
    ),
  },
  {
    title: 'Cart recovery that converts',
    desc: 'Follows up on abandoned carts on WhatsApp and SMS, answers the objection, and walks the shopper back to checkout.',
    badge: { icon: <TagIcon />, text: '10% OFF' },
    mock: (
      <div className="sfs-mini-chat">
        <span className="sfs-mini-bubble sfs-mini-bubble--in">Still thinking it over?</span>
        <span className="sfs-mini-bubble sfs-mini-bubble--cta">Here&rsquo;s 10% to finish your order</span>
      </div>
    ),
  },
  {
    title: 'Guided product discovery',
    desc: 'Understands what a shopper wants, recommends from your live catalogue, and guides them to the right product and checkout.',
    badge: { icon: <StarIcon />, text: '4.9 rated' },
    mock: (
      <div className="sfs-mini-discover">
        <span className="sfs-mini-search">Looking for a matching case…</span>
        <span className="sfs-mini-result">Slim Case &middot; $24</span>
        <span className="sfs-mini-result">Leather Case &middot; $32</span>
      </div>
    ),
  },
  {
    title: 'Returns & refunds',
    desc: 'Handles return requests end to end — checking eligibility, generating the label, and issuing the refund right inside the chat.',
    badge: { icon: <CardBackIcon />, text: '$48.00 back' },
    mock: (
      <div className="sfs-mini-refund">
        <span className="sfs-mini-refund-ic"><CheckCircleIcon /></span>
        <div className="sfs-mini-refund-t">
          <strong>Refund issued</strong>
          <span>$48.00 back to card</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Back-in-stock & alerts',
    desc: 'Notifies shoppers the moment a product is restocked, and sends offer, loyalty and shipping updates on their channel.',
    badge: { icon: <BellIcon />, text: '214 notified' },
    mock: (
      <div className="sfs-mini-alert">
        <span className="sfs-mini-alert-ic"><BellIcon /></span>
        <span>Back in stock — notify sent to 214 shoppers</span>
      </div>
    ),
  },
]

function StoreFeatureShowcase({ eyebrow, title }) {
  return (
    <section className="section sfs-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="sfs-grid">
          {ITEMS.map((item) => (
            <div className="sfs-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="sfs-mock">
                <span className="sfs-badge">
                  <span className="sfs-badge-ic">{item.badge.icon}</span>
                  {item.badge.text}
                  <span className="sfs-badge-dot" />
                </span>
                {item.mock}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoreFeatureShowcase
