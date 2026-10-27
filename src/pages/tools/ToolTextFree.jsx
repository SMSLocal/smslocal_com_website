import { Link } from 'react-router-dom'
import { Users, FileText, CalendarClock, BarChart3 } from 'lucide-react'
import Seo from '../../components/Seo.jsx'
import { FAQ, HowItWorks, WhyUs, CTABanner } from '../../components/sections/Sections.jsx'
import SmsTestForm from '../../components/tools/SmsTestForm.jsx'
import '../Contact.css'
import './Tools.css'

const STEPS = [
  { title: 'Enter your mobile number', desc: 'Choose your country code and type your own mobile number.' },
  { title: 'Receive a free test SMS', desc: 'SMSLocal sends a test text to your phone, usually within a minute.' },
  { title: 'Start messaging', desc: 'Happy with delivery? Create a free account to send your own messages and campaigns.' },
]

const FEATURES = [
  { icon: <Users size={20} />, title: 'Contact groups', desc: 'Import contacts and organise them into groups for targeted sends.' },
  { icon: <FileText size={20} />, title: 'SMS templates', desc: 'Save the messages you send often and reuse them in one click.' },
  { icon: <CalendarClock size={20} />, title: 'Scheduled messages', desc: 'Send a campaign now or schedule it for the moment it matters most.' },
  { icon: <BarChart3 size={20} />, title: 'Delivery reports', desc: 'See which messages were delivered, per number and per campaign.' },
]

const FAQS = [
  {
    q: 'Can I text for free online?',
    a: 'Yes. This page sends a free test SMS to your own mobile number so you can try SMSLocal delivery. To send your own messages, create a free SMSLocal account; new accounts get trial credit to start with.',
  },
  {
    q: 'How do I test my mobile network with a free text?',
    a: 'Enter your mobile number above and click "Send message". If the text arrives, your number and network can receive SMS from SMSLocal.',
  },
  {
    q: 'How do I send a free SMS campaign?',
    a: 'Sign up for SMSLocal, import your contacts into a group, write or pick a template, preview it and send it now or schedule it. Delivery reports show the results so you can improve the next campaign.',
  },
  {
    q: 'Can I send texts without using my personal number?',
    a: 'Yes. With an SMSLocal account you send from the web or the API using a sender ID or a business number, so your personal number is never shown.',
  },
  {
    q: 'Is it safe to send personal information by SMS?',
    a: 'Avoid sending passwords, bank details or confidential information by text message on any service. SMS is best for notifications, reminders, one-time codes and short updates.',
  },
  {
    q: 'Why was my test limited?',
    a: 'To prevent abuse, each visitor and each phone number can receive a small number of free tests per day. Try again after 24 hours, or sign up to send without that limit.',
  },
]

function ToolTextFree() {
  return (
    <>
      <Seo
        title="Text Free - Test Your Mobile Network Online"
        description="Send a free text to your own phone and test your mobile network online. No setup fee or app needed. Start a free SMSLocal trial when you're ready."
      />
      <section className="section contact-hero-section">
        <div className="container contact-hero-grid">
          <div className="contact-hero-content">
            <span className="contact-hero-eyebrow">Free SMS test</span>
            <h1 className="contact-hero-title">
              Send text free – test your mobile network <span className="grad-word">online</span>
            </h1>
            <p className="contact-hero-sub">
              Test your own phone number with a free text message from SMSLocal. No setup fee and nothing to install:
              enter your number and the message is on its way.
            </p>
          </div>
          <SmsTestForm tool="text-free" />
        </div>
      </section>

      <HowItWorks title="How it works" steps={STEPS} alt />

      <WhyUs
        eyebrow="Everything you need"
        title="Everything you need to stay connected"
        subtitle="The free test shows how SMSLocal delivers. An account adds the tools for real campaigns."
        items={FEATURES}
      />

      <section className="section section-alt">
        <div className="container tool-content">
          <h2>Free texting, made simple</h2>
          <p>
            "Text my phone" sends one test message from the SMSLocal platform to the number you enter. Use it to check
            that SMS from SMSLocal reaches your country and carrier, or to see how a business text looks on your
            handset, before you commit to anything.
          </p>
          <h2>Your security is our priority</h2>
          <ul>
            <li><strong>Fixed test message:</strong> the tool only sends one standard text, so it can't be used for spam.</li>
            <li><strong>Bot protection:</strong> a quick human-verification check runs before anything is sent.</li>
            <li><strong>Fair-use limits:</strong> daily limits per visitor and per number stop repeated sends to the same phone.</li>
          </ul>
          <div className="tool-related">
            <Link to="/tools/send-text/" className="btn btn-ghost">Send free SMS worldwide</Link>
            <Link to="/tools/carrier-lookup/" className="btn btn-ghost">Free carrier lookup</Link>
          </div>
        </div>
      </section>

      <FAQ title="Frequently asked questions" items={FAQS} />

      <CTABanner
        title="Start messaging with SMSLocal"
        subtitle="Create your account in minutes. No credit card required."
        cta={{ href: '/signup/', label: 'Sign up free' }}
        secondaryCta={{ href: '/pricing/', label: 'See pricing' }}
      />
    </>
  )
}

export default ToolTextFree
