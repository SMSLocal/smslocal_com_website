import Seo from '../components/Seo.jsx'
import { Hero, NarrativeCompare, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import FeatureReveal from '../components/FeatureReveal.jsx'
import BuildJourneyStepper from '../components/BuildJourneyStepper.jsx'
import WhyUsChecklist from '../components/WhyUsChecklist.jsx'
import { IconGear, IconBell, IconPackage, IconCode, IconClock, IconCheck, IconBolt, IconChat, IconPlug, IconRocket } from '../components/icons.jsx'
import WebsiteWidgetHeroMock from '../components/ChatbotBuilderHeroMock.jsx'

const STEPS = [
  { icon: <IconCode />, title: 'Drop in one snippet', desc: 'Add a single script tag to your site — no engineering project required.' },
  { icon: <IconGear />, title: 'Style it to match your brand', desc: 'Set colours, position, avatar and greeting so it looks like part of your site.' },
  { icon: <IconPlug />, title: 'Connect your knowledge base', desc: 'Point the agentic AI at your help centre and site content to start answering.' },
  { icon: <IconRocket />, title: 'Go live instantly', desc: 'The widget answers visitors from the moment it publishes, escalating when needed.' },
]

const FEATURES = [
  { icon: <IconGear />, title: 'Fully customisable widget', desc: 'Match colours, position, avatar and greeting to your brand — no generic bubble that looks bolted on.' },
  { icon: <IconChat />, title: 'Agentic AI answers instantly', desc: 'Visitors get an accurate, grounded answer the moment they open the widget, day or night, with a clean human handoff when needed.' },
  { icon: <IconBell />, title: 'Proactive triggers', desc: 'Open the widget automatically based on time on page, scroll depth or intent, instead of waiting for a visitor to click first.' },
  { icon: <IconPackage />, title: 'File sharing built in', desc: 'Visitors and agents can share images, PDFs and screenshots directly inside the chat, no separate upload tool needed.' },
  { icon: <IconCode />, title: 'Drop-in install, one snippet', desc: 'Add one script tag and the widget is live — no engineering project required to get started.' },
  { icon: <IconClock />, title: 'In-app SDK for mobile', desc: 'Bring the same live chat experience into your iOS and Android app with a native SDK, not just the website.' },
]

const BENEFITS = [
  { icon: <IconBolt />, title: 'No visitor waits for a reply', desc: 'Agentic AI answers instantly, so the moment of highest intent — right when someone has a question — never goes cold.' },
  { icon: <IconCheck />, title: 'On-brand, not off-the-shelf', desc: 'Full styling control means the widget looks like part of your site, not a third-party plugin.' },
  { icon: <IconClock />, title: 'Coverage without a live team online', desc: 'The AI handles visitor questions around the clock, escalating to a human agent only when the conversation needs one.' },
  { icon: <IconPackage />, title: 'One inbox for chat and everything else', desc: 'Web chat conversations land in the same shared inbox as WhatsApp, SMS and email, so nothing lives in its own silo.' },
]

const FAQS = [
  { q: 'Can I fully customise how the widget looks?', a: 'Yes — colours, position, avatar, greeting message and more are all configurable, so the widget matches your brand rather than looking like a generic plugin.' },
  { q: 'Does the AI actually answer visitor questions, or just collect a message?', a: 'The agentic AI answers instantly from your knowledge base and site content, and hands off to a human agent inside the same thread when a question needs one.' },
  { q: 'Can I trigger the widget to open automatically?', a: 'Yes — set proactive triggers based on time on page, scroll depth or specific pages, instead of waiting for a visitor to click the bubble.' },
  { q: 'Is there a mobile SDK, or just a website widget?', a: 'Both. An in-app SDK brings the same live chat experience into your iOS and Android apps, not just your website.' },
  { q: 'How long does installation take?', a: 'Most sites are live with a single script snippet in minutes — no engineering project required.' },
]

function WebChat() {
  return (
    <>
      <Seo
        title="Website Live Chat Widget with Agentic AI"
        description="Add a customisable live chat widget with agentic AI that answers visitors instantly, plus proactive triggers, file sharing and an in-app SDK for mobile."
        keywords={['live chat widget', 'website chat widget', 'web chat AI', 'live chat with AI']}
      />

      <Hero
        eyebrow="Web Chat"
        title={<>A live chat widget that <span className="grad-word">actually answers</span>, on brand</>}
        subtitle="Add a fully customisable chat widget to your site, answered instantly by agentic AI — with proactive triggers, file sharing and an in-app SDK for mobile, all landing in the same shared inbox as your other channels."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<WebsiteWidgetHeroMock />}
      />

      <NarrativeCompare
        variant="paths"
        eyebrow="The problem"
        heading={<>A chat widget nobody answers is worse than no widget at all.</>}
        paragraphs={[
          'A generic embed script gets a bubble on the page, but if nobody is watching it, visitors learn fast that it goes unanswered — and stop bothering.',
          'A web chat widget backed by agentic AI answers instantly, every time — and still looks and feels like it belongs on your site.',
        ]}
        leftLabel="Unanswered widget"
        leftItems={['Visitor opens the widget', 'Types a question', 'Waits', 'Leaves, unanswered']}
        rightLabel="Agentic AI widget"
        rightItems={['Visitor opens the widget', 'Types a question', 'Instant grounded answer', 'Stays, converts']}
        alt
      />

      <FeatureReveal
        eyebrow="Features"
        title="A widget built to actually get used"
        subtitle="On-brand styling, instant AI answers, and everything a modern chat widget needs."
        items={FEATURES}
      />

      <BuildJourneyStepper
        eyebrow="How it works"
        title="Live on your site in four steps"
        subtitle="From dropping in a snippet to a widget that answers on its own."
        steps={STEPS}
        alt
      />

      <WhyUsChecklist
        eyebrow="Why it works"
        title="Every visitor gets an answer, not a bubble"
        subtitle="Instant, accurate replies keep visitors engaged instead of bouncing on an unanswered chat."
        items={BENEFITS}
      />

      <CTABanner
        title="Put a chat widget on your site that actually works"
        subtitle="On-brand, answered instantly by agentic AI, live with one script snippet."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title="Live chat widget — frequently asked questions" items={FAQS} alt />
    </>
  )
}

export default WebChat
