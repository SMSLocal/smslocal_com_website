import { Link } from 'react-router-dom'
import { PiggyBank, Send, Database, ShieldAlert, Target } from 'lucide-react'
import Seo from '../../components/Seo.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { FAQ, HowItWorks, WhyUs, CTABanner } from '../../components/sections/Sections.jsx'
import CarrierLookupForm from '../../components/tools/CarrierLookupForm.jsx'
import '../Contact.css'
import './Tools.css'

const BENEFITS = [
  { icon: <PiggyBank size={20} />, title: 'Optimise costs', desc: 'Pick cost-effective SMS routes per network and stop paying to message numbers that can never receive a text.' },
  { icon: <Send size={20} />, title: 'Improve delivery', desc: 'Spot landlines and invalid numbers before a campaign, so fewer messages fail or get blocked.' },
  { icon: <Database size={20} />, title: 'Enrich your data', desc: 'Add carrier, line type and region to your contact lists for better segmentation.' },
  { icon: <ShieldAlert size={20} />, title: 'Prevent fraud', desc: 'Combine line type and validity checks with your sign-up flow to flag suspicious numbers.' },
  { icon: <Target size={20} />, title: 'Target marketing', desc: 'Tailor messaging and offers by country, region or mobile network.' },
]

const STEPS = [
  { title: 'Enter a number', desc: 'Choose the country code and type the phone number you want to check.' },
  { title: 'We check the numbering plan', desc: "The number is matched against the national numbering plan and carrier allocations published for its country." },
  { title: 'Get the results', desc: 'See whether the number is valid, its line type, the network it was issued by, its region and its time zone.' },
]

const FAQS = [
  {
    q: 'What is a carrier lookup?',
    a: 'A carrier lookup identifies the telecom operator a phone number belongs to, such as Vodafone, Airtel or China Mobile, along with whether it is a mobile, landline or VoIP number.',
  },
  {
    q: 'Is the carrier lookup free?',
    a: "Yes. Individual lookups on this page are free and need no account. For high-volume or automated lookups, contact the SMSLocal team about bulk options.",
  },
  {
    q: 'Which countries are supported?',
    a: 'Numbers from every country can be validated and given a line type. Carrier names are available for most countries; for the US and Canada the carrier is not shown, because numbers there move freely between operators.',
  },
  {
    q: 'How accurate is the result?',
    a: 'The tool shows the network the number range was originally assigned to. If the owner has ported the number to another operator since, the current carrier can differ. Validity and line type are reliable.',
  },
  {
    q: 'What is phone number portability?',
    a: 'Number portability lets people keep their phone number when they switch operators. It is why the original network of a number is not always the one serving it today.',
  },
  {
    q: 'Can I look up numbers in bulk?',
    a: 'This free tool checks one number at a time. For bulk or API-based lookups, contact our team.',
  },
  {
    q: 'How does knowing the carrier help my SMS campaigns?',
    a: 'It helps you route messages cost-effectively, remove landlines and invalid numbers before sending, and segment audiences by network and region.',
  },
  {
    q: 'What is the difference between mobile, landline and VoIP numbers?',
    a: 'Mobile numbers belong to phones on a cellular network. Landlines are fixed telephone lines. VoIP numbers run over the internet. Landlines usually cannot receive SMS, which is why checking line type before a campaign saves money.',
  },
]

function ToolCarrierLookup() {
  return (
    <>
      <Seo
        title="Free Carrier Lookup: Find Any Number's Carrier"
        description="Free carrier lookup: find the mobile network, line type (mobile, landline or VoIP), region and time zone of any phone number. No sign-up needed."
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
            <span className="contact-hero-eyebrow">Free tool</span>
            <h1 className="contact-hero-title">
              Free carrier lookup: identify any phone number's <span className="grad-word">carrier</span>
            </h1>
            <p className="contact-hero-sub">
              Find the network behind a phone number in seconds. Check whether it's mobile, landline or VoIP, where
              it's from and whether it's valid — free, with no sign-up.
            </p>
          </div>
          <CarrierLookupForm />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container tool-content">
          <h2>Why use a carrier lookup tool?</h2>
          <p>
            Knowing which carrier a phone number belongs to, and whether it can receive SMS at all, helps businesses
            and individuals alike: from cleaning a contact list before an SMS campaign to checking an unknown number
            before you call back.
          </p>
        </div>
      </section>

      <WhyUs eyebrow="Benefits" title="Carrier lookup benefits" items={BENEFITS} />

      <HowItWorks title="How SMSLocal's carrier lookup works" steps={STEPS} alt />

      <section className="section">
        <div className="container tool-content">
          <h2>Common uses for carrier lookup</h2>
          <h3>For businesses</h3>
          <ul>
            <li><strong>SMS marketing:</strong> remove landlines and invalid numbers and route by network before you send.</li>
            <li><strong>CRM enrichment:</strong> add carrier, region and line type to customer records.</li>
            <li><strong>Sign-up checks:</strong> validate phone numbers when accounts are created.</li>
          </ul>
          <h3>For developers</h3>
          <ul>
            <li><strong>Application development:</strong> add phone validation and line-type checks to sign-up and checkout flows.</li>
            <li><strong>Fraud detection:</strong> treat VoIP and invalid numbers as higher-risk signals.</li>
          </ul>
          <h3>For individuals</h3>
          <ul>
            <li><strong>Unknown callers:</strong> see a number's country, region and network before you answer or reply.</li>
            <li><strong>Spam and scams:</strong> check a number before responding to an unexpected message.</li>
          </ul>

          <h2>Understanding line types: mobile, landline and VoIP</h2>
          <ul>
            <li><strong>Mobile:</strong> assigned to a phone on a cellular network. Can receive SMS.</li>
            <li><strong>Landline:</strong> a fixed telephone line. Usually can't receive SMS.</li>
            <li><strong>VoIP:</strong> a number that runs over the internet. SMS support depends on the provider.</li>
          </ul>
          <p>Knowing the line type tells you the best way to reach a number and avoids paying for messages that can't be delivered.</p>

          <h2>Number portability and carrier lookup</h2>
          <p>
            Number portability lets people keep their number when they change operator, so a number's original
            network can differ from the one serving it today. This tool shows the original network and says so in the
            result. In the US and Canada, where portability is universal, it shows the region and time zone instead
            of a carrier.
          </p>
          <div className="tool-related">
            <Link to="/tools/send-text/" className="btn btn-ghost">Send a free test SMS</Link>
            <Link to="/country-code/" className="btn btn-ghost">Country calling codes</Link>
            <Link to="/contact-us/" className="btn btn-ghost">Talk to our team</Link>
          </div>
        </div>
      </section>

      <FAQ title="Frequently asked questions" items={FAQS} alt />

      <CTABanner
        title="Send SMS globally with competitive rates"
        subtitle="Create a free account and put carrier-aware SMS to work for your business."
        cta={{ href: '/signup/', label: 'Create free account' }}
        secondaryCta={{ href: '/pricing/', label: 'See pricing' }}
      />
    </>
  )
}

export default ToolCarrierLookup
