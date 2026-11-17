import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import '../components/SignupFlow.css'
import { IconCheck } from '../components/icons.jsx'

const BENEFITS = [
  'Free trial credit included, no card required',
  'Send SMS, WhatsApp, RCS & voice from one API',
  'AI agents that resolve tickets around the clock',
  'Live in minutes — no code, no integration work',
  'Pay only for what you send, cancel anytime',
]

function tokenStorageKey(email) {
  return `smslocal_signup_token:${email}`
}

// Step 1 of the 3-step partner-registration flow (email -> /verify/ ->
// /register/), each its own page/URL. Talks to this site's own
// /api/signup/* functions, which reach WordPress and secure.smslocal.com
// server-to-server — a browser fetch straight to WordPress hits its CORS
// block, which is what broke the old single-page version of this flow.
function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/signup/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem(tokenStorageKey(email), data.token)
        navigate(`/verify/?email=${encodeURIComponent(email)}`, { state: { token: data.token } })
      } else {
        setError(data.message || 'Something went wrong')
      }
    } catch {
      setError('There was an error processing the form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo
        title="Start Your Free SMSLocal Trial Account Today"
        description="Create your free SMSLocal account and send SMS, WhatsApp, RCS and voice messages, build chatbots and deploy AI agents in minutes — no card required."
      />

      <section className="signup-split-page">
        <div className="signup-info-panel">
          <span className="signup-info-glow" aria-hidden="true" />
          <div className="signup-info-inner">
            <span className="signup-info-badge">Free Trial · No Card Required</span>
            <h2 className="signup-info-title">
              Everything you need to <span className="grad-word">talk to customers</span>, in one platform
            </h2>
            <p className="signup-info-sub">
              SMS, WhatsApp, RCS, voice and AI agents — one account, one API, no juggling vendors.
            </p>

            <ul className="signup-benefits">
              {BENEFITS.map((b) => (
                <li key={b}>
                  <span className="signup-benefit-check"><IconCheck /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="signup-form-panel">
          <div className="signup-form-inner">
            <div className="signup-steps">
              <span className="signup-step-dot active" />
              <span className="signup-step-dot" />
              <span className="signup-step-dot" />
            </div>

            <h1 className="signup-title">Start your free trial</h1>
            <p className="signup-subtitle">No credit card required — includes free trial credit.</p>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="signup-field">
                <label htmlFor="signup-email">Work email <span className="required">*</span></label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && <p className="signup-message error">{error}</p>}

              <button type="submit" className="btn signup-submit signup-submit-solid" disabled={loading}>
                {loading ? 'Sending…' : 'Verify Email for Free SMS'}
              </button>
            </form>

            <p className="signup-footer-note">
              Already have an account? <Link to="/login/" className="auth-link">Log in</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
