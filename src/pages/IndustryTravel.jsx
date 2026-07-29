import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import ProblemTicketStack from '../components/ProblemTicketStack.jsx'
import FeatureShowcasePanel from '../components/FeatureShowcasePanel.jsx'
import BuilderJourneyPath from '../components/BuilderJourneyPath.jsx'
import WhyUsSpotlightGrid from '../components/WhyUsSpotlightGrid.jsx'
import { IconClock, IconCheck, IconBolt, IconUsers, IconPlug, IconGear, IconRocket } from '../components/icons.jsx'
import BookingCalendarMock from '../components/BookingCalendarMock.jsx'

const STEPS = [
  { icon: <IconPlug />, title: 'Connect your booking system', desc: 'Link your PMS or booking platform along with WhatsApp, SMS and web chat.' },
  { icon: <IconGear />, title: 'Train on your policies', desc: 'The agent learns your itinerary data, cancellation rules and property details.' },
  { icon: <IconRocket />, title: 'Go live in every language', desc: 'Launch across channels with automatic language detection built in from day one.' },
  { icon: <IconCheck />, title: 'Alerts run automatically', desc: 'Delay, gate-change and check-in alerts start pushing the moment itinerary data updates.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'No timezone gaps', desc: 'A guest asking about check-in at 3am gets the same instant, accurate answer as one asking at 3pm.' },
  { icon: <IconBolt />, title: 'Fewer missed connections', desc: 'Automatic delay and gate-change alerts reach travellers before they even have to think to ask.' },
  { icon: <IconUsers />, title: 'Frees your agents', desc: 'Routine itinerary questions resolve themselves, so your team can focus on the complex rebookings.' },
  { icon: <IconCheck />, title: 'Consistent everywhere', desc: 'One agent trained on your policies answers the same way whether the guest is on WhatsApp or the web.' },
]

const FAQS = [
  { q: 'Can the agent actually change a booking, or just answer questions about it?', a: 'Connected to your booking system, it can rebook, cancel and confirm changes directly against live availability, not just describe the policy.' },
  { q: 'Does it handle multiple languages in the same conversation?', a: 'Yes — it detects language automatically and replies naturally, without routing to a separate bot or human per language.' },
  { q: 'Can it send proactive alerts, like a gate change or delay?', a: 'Yes, broadcasting integrates with itinerary data to push timely SMS, WhatsApp or RCS updates without a person triggering each one.' },
  { q: 'How does it handle a request outside its guardrails, like a refund dispute?', a: 'It escalates to a human agent inside the same thread, with the full conversation and booking history attached.' },
  { q: 'How fast can we go live across our booking channels?', a: 'Most travel and hospitality teams connect their booking system and are live across chat channels within days.' },
]

function IndustryTravel() {
  return (
    <>
      <Seo
        title="Agentic AI for Travel and Hospitality Teams"
        description="Handle bookings, itinerary changes and multilingual support around the clock with agentic AI for travel and hospitality, plus omnichannel broadcasting."
        keywords={['AI for travel and hospitality', 'agentic AI travel', 'hospitality AI agent', 'travel booking AI']}
      />

      <Hero
        eyebrow="Travel & Hospitality"
        title={<>Agentic AI that keeps travellers moving, <span className="grad-word">in any language</span></>}
        subtitle="Handle bookings, itinerary changes and guest questions the moment they come in — across WhatsApp, SMS and web chat, with proactive alerts before travellers even have to ask."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<BookingCalendarMock />}
      />

      <ProblemTicketStack
        eyebrow="The problem"
        heading={<>Most guest support is just &ldquo;where&rsquo;s my booking?&rdquo; on repeat.</>}
        paragraph={<>The same handful of questions pile up in a queue — while a travel agent <strong>resolves them instantly</strong>, connected to your real itinerary data.</>}
        alt
      />

      <FeatureShowcasePanel
        eyebrow="Features"
        title="Built for travel and guests"
      />

      <BuilderJourneyPath
        eyebrow="How it works"
        title="Live across every booking channel in four steps"
        subtitle="From connecting your booking system to alerts that run themselves."
        steps={STEPS}
        alt
      />

      <WhyUsSpotlightGrid
        eyebrow="Why it works"
        title="Guests get answers, your team gets their time back"
        subtitle="Routine itinerary questions resolve automatically, freeing your team for the bookings that need real judgement."
        items={BENEFITS}
      />

      <CTABanner
        title="Give every traveller a 24/7 booking desk"
        subtitle="Deploy an agentic AI travel agent across chat and broadcasting in days, in every language your guests speak."
        cta={{ label: 'Talk to Sales', href: '/contact-us' }}
      />

      <FAQ title="Agentic AI for travel and hospitality — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryTravel
