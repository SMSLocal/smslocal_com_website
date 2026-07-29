import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { EcosystemGrid, FAQ } from '../components/sections/Sections.jsx'
import { IconChart, IconUsers, IconHandshake, IconChat, IconMail, IconPhone, IconClock, IconGlobe } from '../components/icons.jsx'
import './Contact.css'

const OPTIONS = [
  { icon: <IconChart />, title: 'Talk to Sales', desc: 'Get a walkthrough of the platform and find the right plan for your team.', href: 'mailto:sales@smslocal.com' },
  { icon: <IconUsers />, title: 'Get Support', desc: 'Already a customer? Reach our support team for help with your account.', href: 'mailto:support@smslocal.com' },
  { icon: <IconHandshake />, title: 'Partnerships', desc: 'Interested in reselling or integrating with SMSLocal? Let\'s talk.', href: '/partnerships' },
  { icon: <IconChat />, title: 'General Inquiries', desc: 'Anything else — press, feedback or just a question.', href: 'mailto:hello@smslocal.com' },
]

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

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.target
    const payload = {
      name: form['contact-name'].value,
      email: form['contact-email'].value,
      company: form['contact-company'].value,
      reason: form['contact-reason'].value,
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
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with SMSLocal — sales, support, partnerships or general inquiries."
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
                  <input id="contact-email" type="email" placeholder="you@company.com" required />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-company">Company name</label>
                <input id="contact-company" type="text" placeholder="Company name" />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-reason">What's this about?</label>
                <select id="contact-reason" defaultValue="">
                  <option value="" disabled>Select a reason</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="general">General inquiry</option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" rows={4} placeholder="Tell us a bit about what you need…" required />
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

      <EcosystemGrid
        title={<>How can we help?</>}
        subtitle="Pick the team that fits what you need."
        items={OPTIONS}
        alt
      />

      <FAQ title={<>Contact — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default Contact
