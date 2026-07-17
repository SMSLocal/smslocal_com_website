import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCalendar, IconGlobe, IconUsers, IconBell, IconChart, IconClock, IconRefresh, IconShield } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconCalendar />, title: 'Booking automation', desc: 'Handle reservations, changes and cancellations conversationally.' },
  { icon: <IconGlobe />, title: 'Itinerary updates', desc: 'Share flight, hotel or trip details right inside the chat.' },
  { icon: <IconUsers />, title: 'Guest support', desc: 'Answer common guest questions 24/7, in any language.' },
  { icon: <IconBell />, title: 'Trip reminders', desc: 'Send check-in, departure and reminder alerts automatically.' },
]

const STEPS = [
  { title: 'Connect your booking system', desc: 'Sync reservations so replies stay accurate in real time.' },
  { title: 'Design guest journeys', desc: 'Build booking, itinerary and support flows visually.' },
  { title: 'Go live across channels', desc: 'Deploy to WhatsApp, web and SMS from one bot.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Fewer support calls', desc: 'Routine booking and itinerary questions get answered instantly.' },
  { icon: <IconClock />, title: 'Always available', desc: 'Guests in any time zone get an answer immediately.' },
  { icon: <IconGlobe />, title: 'Multilingual', desc: 'Answers guests automatically in their own language.' },
  { icon: <IconRefresh />, title: 'Real-time accuracy', desc: 'Replies pull live data from your booking system.' },
]

const FAQS = [
  { q: 'Can guests book or change reservations through the bot?', a: 'Yes, bookings, changes and cancellations can be handled conversationally, synced to your booking system.' },
  { q: 'Does it support multiple languages?', a: 'Yes, the bot can detect and respond in the guest\'s own language automatically.' },
  { q: 'Can it send trip reminders?', a: 'Yes, check-in, departure and other trip reminders can be sent automatically ahead of time.' },
  { q: 'Which channels does it support?', a: 'The same guest-facing flow can run on WhatsApp, your website and SMS.' },
]

function ChatbotTravelHospitality() {
  return (
    <>
      <Seo
        title="Travel & Hospitality Chatbot"
        description="Automate bookings, itineraries and guest support with a travel chatbot on WhatsApp, web and SMS — 24/7 in any language."
        keywords={['hospitality chatbot', 'hotel booking chatbot', 'airline chatbot', 'travel virtual assistant']}
      />

      <Hero
        eyebrow="Travel & Hospitality"
        title="Guest support and bookings, automated"
        subtitle="Bookings, itinerary updates and guest support — 24/7, in any language, across WhatsApp, web and SMS."
        primaryCta={{ label: 'Start Free', href: '/contact' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents' }}
      />

      <NarrativeCompare
        heading={<>A guest stuck in a hold queue is a guest checking a competitor's rates.</>}
        paragraphs={[
          "A traveler mid-trip has a narrow window to get an answer — a delayed flight, a room change, a question about check-in — and most support lines make them wait through hold music to get it.",
          "Multiply that by every time zone your guests fly in from, and a small front-desk or call-center team simply cannot keep up around the clock.",
          <>Guest support should answer the moment it's asked — <strong>in the guest's own language, pulled from live booking data</strong> — not queued for whenever staff are available.</>,
        ]}
        leftLabel="Front desk or call center"
        leftItems={[
          'Guests wait on hold for routine questions',
          'Coverage gaps outside staffed hours',
          'Language support limited to available staff',
          'Itinerary details relayed manually, prone to error',
        ]}
        rightLabel="Travel chatbot, always available"
        rightItems={[
          'Bookings and changes handled instantly, in-chat',
          'Available 24/7 across every guest time zone',
          'Responds automatically in the guest\'s language',
          'Itinerary and reminders pulled from live booking data',
        ]}
        alt
      />

      <FeatureGrid title={<>Built for travel and guests</>} items={FEATURES} />

      <HowItWorks title={<>Go live for guests in three steps</>} steps={STEPS} alt />

      <WhyUs title={<>Why travel brands automate with SMSLocal</>} items={WHY_US} />

      <FAQ title={<>Travel chatbot — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Automate guest support today"
        subtitle="Connect your booking system and go live in days."
        cta={{ label: 'Start Free', href: '/contact' }}
      />
    </>
  )
}

export default ChatbotTravelHospitality
