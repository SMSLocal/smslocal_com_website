import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconShield, IconPhone, IconSearch, IconGlobe, IconBolt, IconRefresh, IconPlug } from '../components/icons.jsx'
import { OtpMock } from '../components/heroMocks.jsx'

const FEATURES = [
  { icon: <IconShield />, title: 'One-time passcodes', desc: 'Generate and deliver OTPs for signup, login and transactions.' },
  { icon: <IconPhone />, title: 'Voice & WhatsApp fallback', desc: 'Automatically retry via voice call or WhatsApp if SMS fails to deliver.' },
  { icon: <IconSearch />, title: 'Fraud protection', desc: 'Rate limiting and number-risk scoring to block abuse.' },
  { icon: <IconGlobe />, title: 'Global delivery', desc: 'Fast OTP delivery across 190+ countries and carriers.' },
]

const STEPS = [
  { title: 'Request an OTP', desc: 'Call the Verify API when a user signs up or logs in.' },
  { title: 'Deliver via SMS', desc: 'We generate and send the code, with automatic fallback if needed.' },
  { title: 'Verify the code', desc: 'Confirm the user-entered code with a single API call.' },
]

const WHY_US = [
  { icon: <IconBolt />, title: 'Fast delivery', desc: 'Most OTPs are delivered in under 5 seconds globally.' },
  { icon: <IconRefresh />, title: 'Automatic retries', desc: 'Fallback channels reduce failed verifications.' },
  { icon: <IconShield />, title: 'Built-in fraud checks', desc: 'Block toll-fraud and abuse patterns automatically.' },
  { icon: <IconPlug />, title: 'Simple integration', desc: 'A single Verify API for send and check operations.' },
]

const FAQS = [
  { q: 'What is OTP SMS used for?', a: 'OTP SMS is used to verify user identity during signup, login, and sensitive transactions via a one-time passcode.' },
  { q: 'What happens if SMS delivery fails?', a: 'The Verify API can automatically retry via voice call or WhatsApp to maximize successful verification.' },
  { q: 'Is this suitable for 2FA?', a: 'Yes, the same Verify API is commonly used for two-factor authentication (2FA) alongside login flows.' },
  { q: 'How do you prevent OTP fraud?', a: 'Rate limiting, number risk scoring and configurable retry limits help block automated abuse.' },
]

function OtpSms() {
  return (
    <>
      <Seo
        title="OTP SMS API & Two-Factor Verification"
        description="Verify users in seconds with OTP SMS. Fast global delivery, 2FA and phone verification API with voice/WhatsApp fallback and fraud protection."
      />

      <Hero
        eyebrow="Verify"
        title={<>Verify users in seconds with <span className="grad-word">OTP SMS</span></>}
        subtitle="Fast, global OTP delivery for signup, login and 2FA — with voice and WhatsApp fallback, plus fraud protection built in."
        primaryCta={{ label: 'Get API Key', href: '/contact-us' }}
        secondaryCta={{ label: 'View SMS API', href: '/sms-api' }}
        visual={<OtpMock />}
      />

      <NarrativeCompare
        heading={<>A dropped OTP doesn't just fail a text. It fails a signup.</>}
        paragraphs={[
          "Most teams treat OTP delivery as a solved problem — until a code lands late, or not at all, and a new user gives up mid-signup instead of trying again.",
          'A single-channel OTP has no backup plan. If the SMS route is congested on that carrier at that moment, the user just waits, and eventually leaves.',
          <>An OTP flow built for real conditions <strong>retries on another channel automatically</strong> — voice or WhatsApp — so the code still gets there.</>,
        ]}
        leftLabel="Single-channel OTP"
        leftItems={[
          'One shot over SMS, no fallback',
          'A slow carrier route just means a slow code',
          'No visibility into why a code failed',
          'Abuse and toll fraud go unchecked',
        ]}
        rightLabel="Verify API, built for real conditions"
        rightItems={[
          'Automatic fallback to voice or WhatsApp',
          'Global carrier routes chosen for speed',
          'Delivery status on every send',
          'Rate limiting and fraud checks built in',
        ]}
        alt
      />

      <FeatureGrid title={<>A complete verification toolkit</>} items={FEATURES} />

      <HowItWorks title={<>Verify a user in three steps</>} steps={STEPS} alt />

      <WhyUs title={<>Built to maximize successful verification</>} items={WHY_US} />

      <CTABanner
        title="Start verifying users today"
        subtitle="Get your API key and send a test OTP in minutes."
        cta={{ label: 'Get API Key', href: '/contact-us' }}
      />

      <FAQ title={<>OTP SMS — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default OtpSms
