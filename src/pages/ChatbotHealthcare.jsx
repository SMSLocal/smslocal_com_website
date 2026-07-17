import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FeatureGrid, HowItWorks, WhyUs, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCalendar, IconBell, IconShield, IconUsers, IconClock, IconGlobe, IconChart, IconRefresh } from '../components/icons.jsx'

const FEATURES = [
  { icon: <IconCalendar />, title: 'Appointment booking', desc: 'Let patients book, reschedule or cancel visits inside the chat.' },
  { icon: <IconBell />, title: 'Reminders', desc: 'Automated appointment and medication reminders that cut no-shows.' },
  { icon: <IconShield />, title: 'Secure by design', desc: 'Handles patient conversations with privacy-conscious workflows.' },
  { icon: <IconUsers />, title: 'FAQ automation', desc: 'Answer hours, insurance and prep-instruction questions instantly.' },
]

const STEPS = [
  { title: 'Connect your scheduling system', desc: 'Sync appointment slots so booking stays accurate.' },
  { title: 'Design patient flows', desc: 'Build booking, reminders and FAQ flows visually.' },
  { title: 'Go live across channels', desc: 'Deploy to WhatsApp, web and SMS from one bot.' },
]

const WHY_US = [
  { icon: <IconChart />, title: 'Fewer no-shows', desc: 'Automated reminders measurably cut missed appointments.' },
  { icon: <IconClock />, title: 'Books 24/7', desc: 'Patients can book or reschedule outside clinic hours.' },
  { icon: <IconGlobe />, title: 'Multichannel', desc: 'WhatsApp, web and SMS, from the same patient flow.' },
  { icon: <IconRefresh />, title: 'Reduces front-desk load', desc: 'Routine questions get answered without a phone call.' },
]

const FAQS = [
  { q: 'Can patients book appointments through the chatbot?', a: 'Yes, patients can book, reschedule or cancel appointments directly inside the conversation, synced to your scheduling system.' },
  { q: 'Does it send appointment reminders?', a: 'Yes, automated reminders for appointments and medication schedules can be sent to reduce no-shows.' },
  { q: 'Can it answer insurance or prep questions?', a: 'Yes, common FAQs about hours, insurance and pre-visit instructions are answered automatically.' },
  { q: 'Which channels does it support?', a: 'The same patient-facing flow can run on WhatsApp, your website and SMS.' },
]

function ChatbotHealthcare() {
  return (
    <>
      <Seo
        title="Healthcare Chatbot for Patient Engagement"
        description="Automate appointments, reminders and FAQs with a healthcare chatbot. Secure patient engagement across WhatsApp, web and SMS."
        keywords={['patient engagement chatbot', 'medical chatbot', 'healthcare virtual assistant', 'appointment booking chatbot']}
      />

      <Hero
        eyebrow="Healthcare"
        title="Patient engagement that runs itself"
        subtitle="Appointment booking, reminders and FAQ automation — across WhatsApp, web and SMS, cutting no-shows and front-desk load."
        primaryCta={{ label: 'Start Free', href: '/contact' }}
        secondaryCta={{ label: 'See AI Agents', href: '/ai-agents' }}
      />

      <NarrativeCompare
        heading={<>A missed reminder call is a missed appointment nobody notices.</>}
        paragraphs={[
          "Most clinics still confirm and remind patients by phone — a call that goes to voicemail, a message that never gets returned, a slot that sits empty the next morning.",
          "The front desk absorbs the cost either way: chasing no-shows, rebooking manually, and fielding the same insurance and prep questions on repeat all day.",
          <>Patient communication should run automatically — <strong>booking, reminders and FAQs handled in the background</strong>, freeing staff for what actually needs a person.</>,
        ]}
        leftLabel="Phone-based scheduling"
        leftItems={[
          'Confirmations that rely on a call being answered',
          'No-shows discovered only after the slot is empty',
          'Same prep and insurance questions, every single call',
          'Rebooking handled manually, one patient at a time',
        ]}
        rightLabel="Healthcare chatbot, always on"
        rightItems={[
          'Automated reminders sent well ahead of the visit',
          'Patients reschedule themselves in the same chat',
          'Common FAQs answered instantly, day or night',
          'Synced to your scheduling system in real time',
        ]}
        alt
      />

      <FeatureGrid title={<>Built for patient engagement</>} items={FEATURES} />

      <HowItWorks title={<>Go live for patients in three steps</>} steps={STEPS} alt />

      <WhyUs title={<>Why clinics automate with our chatbot</>} items={WHY_US} />

      <FAQ title={<>Healthcare chatbot — frequently asked questions</>} items={FAQS} alt />

      <CTABanner
        title="Reduce no-shows starting this week"
        subtitle="Connect your scheduling system and go live in days."
        cta={{ label: 'Start Free', href: '/contact' }}
      />
    </>
  )
}

export default ChatbotHealthcare
