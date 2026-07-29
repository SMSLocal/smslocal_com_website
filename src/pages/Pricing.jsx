import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import PricingRateCalculator from '../components/PricingRateCalculator.jsx'
import PricingPaymentMarquee from '../components/PricingPaymentMarquee.jsx'
import PricingProviderCompare from '../components/PricingProviderCompare.jsx'
import PricingWhyUs from '../components/PricingWhyUs.jsx'
import './Pricing.css'

// FAQ content updated to match the real per-SMS credit pricing model
// (see PricingRateCalculator.jsx for the sourcing note on rate figures).
const FAQS = [
  { q: 'How does SMS pricing work?', a: 'You pay only for the messages you send — no monthly plan, no seat fees. Add credit in any amount, and every SMS you send is deducted at the per-message rate for that destination country.' },
  { q: 'Are there contracts or minimum commitments?', a: 'No. There are no contracts and no recurring commitment — top up when you need to, and use the credit at your own pace. The rate calculator above shows the minimum top-up amount for your country.' },
  { q: 'Do rates change by country?', a: 'Yes. Each destination has its own per-SMS rate based on local carrier costs. Use the calculator above to see the current rate and how many messages your budget buys for a given country.' },
  { q: 'What currencies can I pay in?', a: 'USD and EUR are both supported — switch between them with the toggle in the rate calculator above to see rates in your preferred currency.' },
  { q: 'What payment methods do you accept?', a: 'Visa, Mastercard, American Express and PayPal are all accepted — see the payment options above. Credits are added instantly once a payment clears.' },
  { q: 'Do unused SMS credits expire?', a: 'No — credit you purchase stays on your account with no expiry, so there is no pressure to use it by a deadline.' },
  { q: 'Can I get a custom quote for high volume?', a: 'Yes. For large or recurring bulk sends, contact us for a custom quote — high-volume senders typically get a better rate than the self-serve top-up amounts.' },
]

function Pricing() {
  return (
    <div className="pricing-page">
      <Seo
        title="Pricing — Pay Only For The SMS You Send"
        description="SMSLocal pricing is simple: pay only for messages you send, with no hidden fees or contracts. See live per-country rates and calculate what your budget buys."
        keywords={['SMSLocal pricing', 'SMS rates', 'bulk SMS pricing', 'per-SMS pricing', 'SMS cost calculator', 'no contract SMS pricing']}
      />

      <Hero
        eyebrow="Pricing"
        title={<>Easy and user-friendly <span className="grad-word">SMS pricing</span> for your business</>}
        subtitle="Pay only for the text messages you actually send — no monthly plans, no seat fees, no long-term contracts. Top up any amount, see your exact per-message rate for any country, and start sending in minutes."
      />

      <PricingRateCalculator />

      <PricingPaymentMarquee />

      <PricingProviderCompare />

      <PricingWhyUs />

      <CTABanner
        title="Start sending for less than a cup of coffee"
        subtitle="Top up in USD or EUR, pick your destination, and send your first message in minutes — no card required to see your rate."
        cta={{ label: 'Start Free', href: '/signup' }}
        secondaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        variant="spotlight"
      />

      <FAQ title={<>Pricing — frequently asked questions</>} items={FAQS} />
    </div>
  )
}

export default Pricing
