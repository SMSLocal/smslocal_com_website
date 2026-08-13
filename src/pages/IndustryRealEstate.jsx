import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import ProblemLeadRace from '../components/ProblemLeadRace.jsx'
import FeatureCapabilityScroll from '../components/FeatureCapabilityScroll.jsx'
import StepsProgressBuild from '../components/StepsProgressBuild.jsx'
import WhyUsBenefitRibbon from '../components/WhyUsBenefitRibbon.jsx'
import { IconHandshake, IconCalendar, IconCheck, IconClock, IconChart, IconBolt, IconChat } from '../components/icons.jsx'
import RealEstateLeadScoreHeroMock from '../components/RealEstateLeadScoreHeroMock.jsx'

const STEPS = [
  { title: 'Connect your listings & calendar', desc: 'Link your listing feed and agent calendars along with WhatsApp, SMS and web chat.' },
  { title: 'Train on your inventory', desc: 'The agent learns your listings, pricing and qualification questions.' },
  { title: 'Go live for enquiries', desc: 'Launch instant lead capture and qualification across every channel.' },
  { title: 'Viewings book themselves', desc: 'Conversational scheduling starts confirming showings from day one.' },
]

const FEATURES = [
  { icon: <IconHandshake />, title: 'Instant lead capture & qualification', desc: 'Responds to every new enquiry immediately, asking the right questions to qualify budget and timeline.' },
  { icon: <IconChart />, title: 'Listing recommendations', desc: 'Suggests relevant properties based on stated preferences, sent through WhatsApp, SMS or web chat.' },
  { icon: <IconCalendar />, title: 'Viewing scheduling', desc: 'Books property viewings against live agent availability, confirmed inside the conversation.' },
  { icon: <IconChat />, title: 'One agent, every channel', desc: 'The same agent answers on your website, WhatsApp and SMS, with a consistent view of every lead.' },
]

const BENEFITS = [
  { icon: <IconClock />, title: 'No lead goes cold overnight', desc: 'A lead browsing listings at 11pm gets an instant reply instead of waiting for morning follow-up.' },
  { icon: <IconBolt />, title: 'Higher conversion from first contact', desc: 'Fast, relevant responses keep leads engaged instead of moving to a competing agent.' },
  { icon: <IconChart />, title: 'More viewings, less back-and-forth', desc: 'Conversational scheduling removes the email chains it usually takes to lock in a time.' },
  { icon: <IconCheck />, title: 'Consistent agent experience', desc: 'Every lead gets the same fast, accurate answers whether they text, message or browse your site.' },
]

const FAQS = [
  { q: 'Can it actually book a viewing, or just answer questions about listings?', a: 'Connected to your calendar and listing system, it books viewings against live agent availability and confirms them directly.' },
  { q: 'Can it recommend properties based on what a lead is looking for?', a: 'Yes — it asks qualifying questions and surfaces relevant listings from your actual inventory, not generic suggestions.' },
  { q: 'Does it work across WhatsApp, SMS and my website at once?', a: 'Yes, the same agent answers consistently on every channel, with a unified view of each lead\'s conversation history.' },
  { q: 'What happens when a lead is ready to talk to a real agent?', a: 'It hands off to your team inside the same thread with full context — budget, preferences, viewing history — attached.' },
  { q: 'How quickly can a brokerage or agency deploy this?', a: 'Most real estate teams connect their listings and calendar and go live within days.' },
]

function IndustryRealEstate() {
  return (
    <>
      <Seo
        title="Real Estate AI"
        description="Agentic AI for real estate: capture leads, recommend listings and book viewings, around the clock."
        keywords={['AI for real estate', 'agentic AI real estate', 'real estate lead AI', 'property AI agent']}
      />

      <Hero
        eyebrow="Real Estate"
        title={<>Agentic AI that answers a lead <span className="grad-word">before they move on</span></>}
        subtitle="Capture, qualify and respond to every enquiry instantly, recommend the right listings and book viewings — across web chat, WhatsApp, SMS and voice."
        primaryCta={{ label: 'Talk to Sales', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<RealEstateLeadScoreHeroMock />}
      />

      <ProblemLeadRace
        eyebrow="The problem"
        heading={<>The first agent to reply usually wins the lead.</>}
        paragraph="A buyer browsing listings at night rarely waits until morning — if nobody replies fast, they're already messaging the next agent. Agentic AI for real estate responds, qualifies and books the viewing instantly, so the fastest reply is always yours."
        alt
      />

      <FeatureCapabilityScroll
        eyebrow="Features"
        title="Covers the full lead-to-viewing journey"
        subtitle="From the first message to a confirmed showing, one agent keeps every lead moving."
        items={FEATURES}
      />

      <StepsProgressBuild
        eyebrow="How it works"
        title="Live for enquiries in four steps"
        subtitle="Watch readiness build — each stage provisions one more piece."
        steps={STEPS}
        alt
      />

      <WhyUsBenefitRibbon
        eyebrow="Why it works"
        title="Faster replies, more booked viewings"
        subtitle="Instant qualification and conversational scheduling turn more enquiries into showings."
        items={BENEFITS}
      />

      <CTABanner
        title="Never lose a lead to slow response time again"
        subtitle="Deploy an agentic AI real estate agent that qualifies and books viewings automatically."
        cta={{ label: 'Talk to Sales', href: '/contact-us/' }}
      />

      <FAQ title="Agentic AI for real estate — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default IndustryRealEstate
