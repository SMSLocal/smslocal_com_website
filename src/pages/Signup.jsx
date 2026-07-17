import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import '../components/AuthForm.css'

function Signup() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Start Free Trial"
        description="Create your free SMSLocal account — send bulk SMS, build chatbots and deploy AI agents in minutes."
      />

      <section className="section auth-section">
        <div className="container">
          <div className="auth-wrap">
            <h1 className="auth-title">Start your free trial</h1>
            <p className="auth-subtitle">No credit card required — includes free trial credit.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="signup-name">Full name</label>
                <input id="signup-name" type="text" placeholder="Jordan Lee" required />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-company">Company name</label>
                <input id="signup-company" type="text" placeholder="Acme Inc." required />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-email">Work email</label>
                <input id="signup-email" type="email" placeholder="you@company.com" required />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" placeholder="Create a password" required />
              </div>

              <button type="submit" className="btn btn-primary auth-submit">
                {submitted ? 'Welcome aboard!' : 'Start Free Trial'}
              </button>
            </form>

            <div className="auth-divider">or</div>

            <button type="button" className="auth-social">Continue with Google</button>

            <p className="auth-terms">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>

            <p className="auth-footer-note">
              Already have an account? <Link to="/login" className="auth-link">Log in</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
