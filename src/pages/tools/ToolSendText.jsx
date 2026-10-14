import { Link } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { FAQ, HowItWorks, CTABanner } from '../../components/sections/Sections.jsx'
import SmsTestForm from '../../components/tools/SmsTestForm.jsx'
import '../Contact.css'
import './Tools.css'

const STEPS = [
  { title: 'Enter your details', desc: 'Add your full name and email address so we know who requested the test.' },
  { title: 'Enter your phone number', desc: 'Pick the country code from the list and type the mobile number. Double-check it so the message can be delivered.' },
  { title: 'Send the test message', desc: 'Review the details, then click "Send message". The test SMS goes out on the SMSLocal network.' },
  { title: 'Delivery confirmation', desc: 'A confirmation appears as soon as the message is accepted. It usually arrives within a minute.' },
]

const FAQS = [
  {
    q: 'Is the free SMS test really free?',
    a: 'Yes. Sending the test message costs you nothing and needs no account or credit card. It exists so you can see SMSLocal delivery to your own country and network before you sign up.',
  },
  {
    q: 'Do I need to install an app or register?',
    a: 'No. The tool runs in your browser on any device. You only enter your name, email and the mobile number to send to.',
  },
  {
    q: 'Can I write my own message?',
    a: 'Not with the free test. It always sends the same short message, "SMSLocal: Test globally. Free SMS test now." That keeps the tool from being misused for spam. To send your own messages, create a free SMSLocal account.',
  },
  {
    q: 'Is there a limit on how many free texts I can send?',
    a: 'Yes. To prevent abuse there is a small daily limit per visitor and per phone number. If you reach it, try again after 24 hours, or sign up to send messages without that limit.',
  },
  {
    q: 'Can the recipient reply to the message?',
    a: 'No. The test is one-way, so replies are not delivered anywhere. Two-way messaging, dedicated numbers and sender IDs are available on an SMSLocal account.',
  },
  {
    q: 'What does "send SMS online" mean?',
    a: 'Sending SMS online means sending text messages from a website or an API instead of a phone. Businesses use it to send notifications, reminders, one-time passwords and campaigns to many people at once, often with scheduling, delivery reports and automation.',
  },
  {
    q: 'How is this different from texting from my phone?',
    a: 'A text from your phone goes through your own mobile plan. This tool sends from the SMSLocal platform over the internet, so you need no phone or plan, and the message is delivered to the recipient as a normal SMS.',
  },
]

function ToolSendText() {
  return (
    <>
      <Seo
        title="Free SMS - Send Text Online Worldwide"
        description="Send a free test SMS online to any country, including India, the US and Canada. No registration or app needed. Try SMSLocal delivery in seconds."
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />

      <section className="section contact-hero-section">
        <div className="container contact-hero-grid">
          <div className="contact-hero-content">
            <span className="contact-hero-eyebrow">Free SMS tool</span>
            <h1 className="contact-hero-title">
              Free SMS – Send text online <span className="grad-word">worldwide</span>
            </h1>
            <p className="contact-hero-sub">
              Send a free test text message to a mobile number in any country, straight from your browser. No
              registration, no app and no phone plan needed.
            </p>
            <ul className="tool-content">
              <li><strong>Free:</strong> no fees, subscription or credit card.</li>
              <li><strong>Worldwide:</strong> 190+ country codes to choose from.</li>
              <li><strong>Fast:</strong> delivered over the SMSLocal network, usually within a minute.</li>
            </ul>
          </div>
          <SmsTestForm tool="send-text" />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container tool-content">
          <h2>Send text messages online, free and easy</h2>
          <p>
            International SMS from a mobile plan can be expensive, and you can't always try a messaging provider before
            you pay. This free tool sends a real SMS from the SMSLocal platform to the number you choose, so you can
            check delivery to your country and network in seconds.
          </p>

          <h2>What is "send text online"?</h2>
          <p>
            Online SMS services send text messages from a website or an API instead of a handset. The message travels
            over the internet to an SMS gateway, which hands it to the recipient's mobile network. It arrives as an
            ordinary text message, and the recipient doesn't need an app or an internet connection to read it.
          </p>

          <h2>Benefits of SMSLocal's online texting</h2>
          <ul>
            <li><strong>Completely free:</strong> the test message costs you nothing, with no hidden fees.</li>
            <li><strong>No registration:</strong> you don't need an account to send the test.</li>
            <li><strong>Real delivery:</strong> the test is sent through the SMSLocal platform, not simulated.</li>
            <li><strong>Simple:</strong> three short steps from any computer, tablet or phone.</li>
          </ul>

          <h2>Privacy and security</h2>
          <ul>
            <li><strong>Minimal data:</strong> we only ask for a name, an email address and the number to text.</li>
            <li><strong>Human verification:</strong> a quick, usually invisible check keeps bots from using the tool.</li>
            <li><strong>Fixed message:</strong> the tool only sends one standard test text, so it can't be used to send spam or abuse.</li>
          </ul>

          <h2>Understanding the limits</h2>
          <h3>One fixed message</h3>
          <p>The free test always sends the same short text. Custom content needs an SMSLocal account.</p>
          <h3>One-way only</h3>
          <p>The test can't receive replies. Two-way messaging is part of the full platform.</p>
          <h3>Daily limits</h3>
          <p>A small number of tests per visitor and per phone number each day prevents misuse.</p>
          <h3>Delivery times vary</h3>
          <p>Most messages arrive within seconds, but delivery can be slower on some networks and in some countries.</p>

          <h2>When to use free online texting</h2>
          <p>
            Use it to check that SMS reaches a country or carrier before a campaign, to see what an SMSLocal message
            looks like on your phone, or to confirm a number can receive texts. When you're ready to send your own
            messages, to many people or through an API, an SMSLocal account adds custom content, sender IDs,
            scheduling, two-way inboxes and delivery reports.
          </p>
          <div className="tool-related">
            <Link to="/tools/text-free/" className="btn btn-ghost">Text my phone</Link>
            <Link to="/tools/carrier-lookup/" className="btn btn-ghost">Free carrier lookup</Link>
            <Link to="/pricing/" className="btn btn-ghost">SMS pricing</Link>
          </div>
        </div>
      </section>

      <HowItWorks title="How to send a free text message with SMSLocal" steps={STEPS} />

      <FAQ title="Frequently asked questions" items={FAQS} alt />

      <CTABanner
        title="Ready to send your own messages?"
        subtitle="Create a free SMSLocal account to send custom SMS to any country, one at a time or in bulk."
        cta={{ href: '/signup/', label: 'Create free account' }}
        secondaryCta={{ href: '/pricing/', label: 'See pricing' }}
      />
    </>
  )
}

export default ToolSendText
