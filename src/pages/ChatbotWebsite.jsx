import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import WebsiteContextContrast from '../components/WebsiteContextContrast.jsx'
import StepsControlPanel from '../components/StepsControlPanel.jsx'
import { IconBolt, IconUsers, IconCalendar, IconChat } from '../components/icons.jsx'
import WebsiteWidgetDemo from '../components/WebsiteWidgetDemo.jsx'
import FeatureExpandStack from '../components/FeatureExpandStack.jsx'

const FEATURES = [
  { icon: <IconBolt />, title: 'Instant AI answers', desc: 'Sub-second responses to pricing, feature and policy questions, pulled straight from your own content.' },
  { icon: <IconUsers />, title: 'Smart lead capture', desc: 'Greets visitors, asks the right qualifying questions, and collects name, email and intent inside the chat.' },
  { icon: <IconCalendar />, title: 'Appointment booking', desc: 'Checks availability and books demos or calls right in the conversation — no back-and-forth email.' },
  { icon: <IconChat />, title: 'Seamless human handoff', desc: 'Passes complex chats to a live agent with the full history attached, so nobody repeats themselves.' },
]

const STEPS = [
  { title: 'Connect your content', desc: 'Point it at your help center, docs or a website URL and it learns your answers in minutes.' },
  { title: 'Set your rules', desc: 'Decide when it answers, when it captures a lead, and when to hand off to your team.' },
  { title: 'Go live and improve', desc: 'Publish the widget, then watch resolution and lead-capture rates and refine over time.' },
]

const TESTIMONIALS = [
  { quote: 'We added the widget to our site in ten minutes and it was answering real questions by lunch.', name: 'Fatima Al-Sayed', role: 'Support Lead' },
  { quote: 'Overnight and weekend inquiries used to just wait until Monday. Now most get answered instantly.', name: 'Jonas Weber', role: 'Ecommerce Founder' },
  { quote: 'The handoff to our support inbox keeps the whole conversation attached — nobody repeats themselves.', name: 'Grace Adeyemi', role: 'Customer Experience Manager' },
]

const FAQS = [
  { q: 'How do I add the chatbot to my website?', a: 'Paste a single script snippet into your site — no rebuild or developer sprint required. It works on any platform, including WordPress, Webflow, Shopify, React or plain HTML.' },
  { q: 'Can the bot answer questions from my help docs?', a: 'Yes, point it at your help center, upload documents or paste a URL and it learns to answer common questions automatically — in your own tone and policies.' },
  { q: 'Can it capture leads and book appointments?', a: 'Yes. It qualifies visitors inside the chat and collects their details, and can check availability to book demos or calls without any back-and-forth.' },
  { q: 'What happens when the bot can\'t help?', a: 'The conversation hands off to your live support inbox with the full chat history attached, so the customer never repeats themselves.' },
  { q: 'Does it work in languages other than English?', a: 'Yes, the bot can detect and respond in the visitor\'s language automatically.' },
  { q: 'Is visitor data kept secure?', a: 'Yes. Conversations are encrypted in transit and at rest, with role-based access so only the right people on your team can view them.' },
]

function ChatbotWebsite() {
  return (
    <>
      <Seo
        title="AI Website Chatbot for Support & Sales"
        description="Add an AI chatbot to your website in minutes. Answer FAQs, capture leads and hand off to live agents — 24/7, no coding required."
        keywords={['AI chatbot for website', 'embed chatbot on website', 'live chat chatbot', 'website chatbot for business']}
      />

      <Hero
        eyebrow="Website Chatbot"
        title={<>An AI chatbot for your website, <span className="grad-word">live in minutes</span></>}
        subtitle="Answer FAQs, capture leads and hand off to live agents — 24/7, with a single script snippet and no code required."
        primaryCta={{ label: 'Start Free', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<WebsiteWidgetDemo />}
      />

      <WebsiteContextContrast
        eyebrow="The problem"
        heading={<>A chatbot that only pops up isn't actually helping anyone.</>}
        leftLabel="Chat widget"
        leftItems={[
          'Answers three pre-written questions, nothing else',
          'Falls back to a contact form quickly',
          'No memory of your actual help docs',
          'Same generic greeting for every visitor',
        ]}
        rightLabel="Website chatbot, trained on your content"
        rightItems={[
          'Answers pulled directly from your help center',
          'Escalates to a human only when it should',
          'Learns your docs without manual setup',
          'Captures a qualified lead when it can\'t resolve',
        ]}
        alt
      />

      <FeatureExpandStack eyebrow="Features" title={<>Everything a website bot needs</>} items={FEATURES} />

      <StepsControlPanel eyebrow="How it works" title={<>Live on your site in three steps</>} steps={STEPS} alt />

      <Testimonials title={<>Trusted by growing teams</>} items={TESTIMONIALS} />

      <CTABanner
        title="Add a chatbot to your website today"
        subtitle="One snippet, live in minutes — no developer required."
        cta={{ label: 'Start Free', href: '/contact-us' }}
      />

      <FAQ title={<>Website chatbot — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ChatbotWebsite
