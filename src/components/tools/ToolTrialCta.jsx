import { Link } from 'react-router-dom'

// Shown inside a tool's success state, so a visitor who has just used a free
// tool is offered the obvious next step. It is always rendered (the parent
// hides it until there is a result), like every other state in these tools:
// the translator works on the prerendered text, so a state that only mounts
// after a click would never be translated. Clicks on the buttons are recorded
// by the sitewide cta_click listener (see lib/track.js).
const COPY = {
  lookup: {
    title: 'Need to check numbers at volume?',
    text: 'Create a free SMSLocal account to send bulk SMS, WhatsApp and RCS campaigns, and ask us about bulk and automated carrier lookups.',
    secondary: { to: '/contact-us/', label: 'Talk to our team' },
  },
  sms: {
    title: 'Ready to message your whole list?',
    text: 'Start a free SMSLocal trial to send bulk SMS, schedule campaigns and track delivery reports from one dashboard.',
    secondary: { to: '/pricing/', label: 'See pricing' },
  },
}

export default function ToolTrialCta({ variant }) {
  const c = COPY[variant]
  return (
    <div className="tool-cta">
      <p className="tool-cta-title">{c.title}</p>
      <p className="tool-cta-text">{c.text}</p>
      <div className="tool-cta-actions">
        <Link to="/signup/" className="btn btn-primary">Start free trial</Link>
        <Link to={c.secondary.to} className="btn btn-ghost">{c.secondary.label}</Link>
      </div>
      <p className="tool-cta-fine">Free trial credit included. No card required.</p>
    </div>
  )
}
