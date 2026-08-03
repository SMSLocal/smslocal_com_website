import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ContactRoutingHub.css'

const DESTINATIONS = [
  { id: 'sales', tint: 'blue', title: 'Talk to Sales', desc: 'A walkthrough of the platform and the right plan.', to: 'sales@smslocal.com', href: 'mailto:sales@smslocal.com', side: 'left' },
  { id: 'support', tint: 'teal', title: 'Get Support', desc: 'Already a customer? Help with your account, fast.', to: 'support@smslocal.com', href: 'mailto:support@smslocal.com', side: 'right' },
  { id: 'partnerships', tint: 'coral', title: 'Partnerships', desc: "Reselling or integrating with SMSLocal?", to: 'partners@smslocal.com', href: '/partnerships/', side: 'left' },
  { id: 'general', tint: 'cyan', title: 'General Inquiries', desc: 'Press, feedback, or just a question.', to: 'hello@smslocal.com', href: 'mailto:hello@smslocal.com', side: 'right' },
]

function ContactRoutingHub() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % DESTINATIONS.length), 2600)
    return () => clearInterval(id)
  }, [])

  const activeDest = DESTINATIONS[active]

  const renderCallout = (d) => {
    const i = DESTINATIONS.indexOf(d)
    const Tag = d.href.startsWith('/') ? Link : 'a'
    const linkProp = d.href.startsWith('/') ? { to: d.href } : { href: d.href }
    return (
      <Tag
        key={d.id}
        {...linkProp}
        className={`crh-callout crh-callout--${d.side} crh-tint--${d.tint}${i === active ? ' is-active' : ''}`}
        onMouseEnter={() => setActive(i)}
      >
        <span className="crh-callout-kicker">{d.title}</span>
        <span className="crh-callout-desc">{d.desc}</span>
        <span className="crh-callout-to">{d.to}</span>
      </Tag>
    )
  }

  return (
    <section className="section crh-section">
      <div className="container">
        <span className="section-kicker">Explore</span>
        <h2 className="section-title">How can we help?</h2>
        <p className="section-subtitle">Tell us what you need — your message routes straight to the right team.</p>

        <div className="crh-stage">
          <div className="crh-col crh-col--left">
            {DESTINATIONS.filter((d) => d.side === 'left').map(renderCallout)}
          </div>

          <div className="crh-card">
            <div className="crh-card-bar">
              <span className="crh-dot crh-dot--r" />
              <span className="crh-dot crh-dot--y" />
              <span className="crh-dot crh-dot--g" />
              <span className="crh-card-url">new-message.smslocal.com</span>
            </div>
            <div className="crh-card-body">
              <span className="crh-card-field">What's this about?</span>
              <span className={`crh-card-value crh-tint--${activeDest.tint}`} key={active}>
                <i className="crh-card-value-dot" />{activeDest.title}
              </span>
              <span className="crh-card-note">Every reason above routes to a real inbox — nothing sits in a queue.</span>
            </div>
          </div>

          <div className="crh-col crh-col--right">
            {DESTINATIONS.filter((d) => d.side === 'right').map(renderCallout)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactRoutingHub
