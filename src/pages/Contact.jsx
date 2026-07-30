import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { FAQ } from '../components/sections/Sections.jsx'
import { IconMail, IconPhone, IconClock, IconGlobe } from '../components/icons.jsx'
import PhoneCountrySelect from '../components/PhoneCountrySelect.jsx'
import { DIAL_CODES } from '../data/dialCodes.js'
import TrustBar from '../components/home/TrustBar.jsx'
import ContactSupportConsole from '../components/ContactSupportConsole.jsx'
import ContactRoutingHub from '../components/ContactRoutingHub.jsx'
import './Contact.css'

const CHANNELS = [
  { icon: <IconMail />, tint: 'blue', label: 'Email', value: 'hello@smslocal.com', href: 'mailto:hello@smslocal.com' },
  { icon: <IconPhone />, tint: 'pink', label: 'Phone', value: '+1 559 549 5149', href: 'tel:+15595495149' },
  { icon: <IconClock />, tint: 'green', label: 'Response Time', value: 'Within one business hour' },
  { icon: <IconGlobe />, tint: 'purple', label: 'Availability', value: '24/7 worldwide' },
]

const FAQS = [
  { q: 'How quickly will someone get back to me?', a: 'Sales and general inquiries are typically answered within one business day. Existing customers get priority support response times based on their plan.' },
  { q: 'Can I book a live demo?', a: 'Yes — reach out to sales and we\'ll schedule a walkthrough tailored to your use case.' },
  { q: 'I\'m a current customer with an urgent issue — who do I contact?', a: 'Use the support option above, or reach out through your account dashboard for priority routing.' },
]

function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')
  const [dialCode, setDialCode] = useState(DIAL_CODES[0].code)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.target
    const dial = DIAL_CODES.find((c) => c.code === dialCode)?.dial || ''
    const payload = {
      name: form['contact-name'].value,
      email: form['contact-email'].value,
      company: form['contact-company'].value,
      reason: form['contact-reason'].value,
      phone: `${dial} ${form['contact-phone'].value}`.trim(),
      message: form['contact-message'].value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('sent')
      form.reset()
      setDialCode(DIAL_CODES[0].code)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <Seo
        title="Contact SMSLocal — Sales & Support Team"
        description="Get in touch with SMSLocal for sales, support, partnerships or general inquiries. Our team typically replies within one business day, worldwide, 24/7."
      />

      <section className="section contact-hero-section">
        <div className="container contact-hero-grid">
          <div className="contact-hero-content">
            <span className="contact-hero-eyebrow">Contact</span>
            <h1 className="contact-hero-title">
              Let's talk about what you're <span className="grad-word">trying to build</span>
            </h1>
            <p className="contact-hero-sub">
              Whether it's a quick question or a full platform walkthrough, drop us a message and the right team will get back to you.
            </p>

            <div className="contact-channels">
              {CHANNELS.map((c) => {
                const Tag = c.href ? 'a' : 'div'
                return (
                  <Tag key={c.label} href={c.href} className="contact-channel">
                    <span className={`contact-channel-icon tint-${c.tint}`}>{c.icon}</span>
                    <span>
                      <span className="contact-channel-label">{c.label}</span>
                      <span className="contact-channel-value">{c.value}</span>
                    </span>
                  </Tag>
                )
              })}
            </div>
          </div>

          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-split">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full name</label>
                  <input id="contact-name" type="text" placeholder="Your name" required />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Work email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Enter a valid email address, e.g. you@company.com"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-split">
                <div className="contact-field">
                  <label htmlFor="contact-phone">Phone number</label>
                  <div className="contact-phone-row">
                    <PhoneCountrySelect value={dialCode} onChange={setDialCode} />
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="555 123 4567"
                      pattern="[0-9\s()-]{6,}"
                      title="Enter a valid phone number"
                      required
                    />
                  </div>
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-company">Company name</label>
                  <input id="contact-company" type="text" placeholder="Company name" required />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-reason">What's this about?</label>
                <select id="contact-reason" defaultValue="" required>
                  <option value="" disabled>Select a reason</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="general">General inquiry</option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" rows={3} placeholder="Tell us a bit about what you need…" required />
              </div>

              <div className="contact-form-actions">
                <p className="contact-form-consent">
                  By submitting this form, you agree to our{' '}
                  <Link to="/terms-and-conditions">Terms of Service</Link> and{' '}
                  <Link to="/privacy-policy">Privacy Policy</Link>.
                </p>
                <button type="submit" className="btn btn-primary contact-form-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent!' : 'Submit'}
                </button>
              </div>

              {status === 'error' && <p className="contact-form-error">{errorMsg}</p>}
              {status === 'sent' ? (
                <p className="contact-form-note">Thanks — we'll get back to you within one business day.</p>
              ) : (
                <p className="contact-form-note">We usually reply within one business day.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* home-tw scopes the Tailwind element reset (styles/home-tailwind.css)
          to this subtree — TrustBar is a Tailwind component, this page is
          otherwise plain CSS. */}
      <div className="home-tw">
        <TrustBar />
      </div>

      <ContactSupportConsole />

      <ContactRoutingHub />

      <FAQ title={<>Contact — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default Contact
