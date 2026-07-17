import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import '../components/AuthForm.css'

function Login() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Log In"
        description="Log in to your SMSLocal account to manage campaigns, chatbots and AI agents."
      />

      <section className="section auth-section">
        <div className="container">
          <div className="auth-wrap">
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Log in to manage your campaigns, chatbots and AI agents.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="login-email">Work email</label>
                <input id="login-email" type="email" placeholder="you@company.com" required />
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" placeholder="••••••••" required />
              </div>

              <div className="auth-row-between">
                <label className="auth-checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
                <Link to="/contact" className="auth-link">Forgot password?</Link>
              </div>

              <button type="submit" className="btn btn-primary auth-submit">
                {submitted ? 'Check your inbox' : 'Log in'}
              </button>
            </form>

            <div className="auth-divider">or</div>

            <button type="button" className="auth-social">Continue with Google</button>

            <p className="auth-footer-note">
              Don't have an account? <Link to="/signup" className="auth-link">Get started free</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
