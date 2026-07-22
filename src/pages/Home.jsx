import Seo from '../components/Seo.jsx'
import HeroPhoneMock from '../components/HeroPhoneMock.jsx'
import ReviewBadges from '../components/ReviewBadges.jsx'
import TrustStrip from '../components/TrustStrip.jsx'
import OverviewBento from '../components/OverviewBento.jsx'
import MobileToolsShowcase from '../components/MobileToolsShowcase.jsx'
import PlatformFeatures from '../components/PlatformFeatures.jsx'
import CampaignShowcase from '../components/CampaignShowcase.jsx'
import GetStartedSection from '../components/GetStartedSection.jsx'
import { Hero, FeatureGrid, WhyUs, Testimonials, CTABanner, FAQ } from '../components/sections/Sections.jsx'
import { IconMegaphone, IconChat, IconRefresh, IconChart, IconPlug, IconUsers, IconCalendar, IconBriefcase, IconDollar, IconClock, IconBook, IconHandshake, IconMail } from '../components/icons.jsx'

const QUICK_FEATURES = [
  { icon: <IconMegaphone />, title: 'Bulk SMS', desc: 'Send to thousands in one click' },
  { icon: <IconChat />, title: 'Two-Way Messaging', desc: 'Customers reply — managed in a shared inbox' },
  { icon: <IconRefresh />, title: 'Campaign Automation', desc: 'Triggered messages and multi-step flows' },
  { icon: <IconChart />, title: 'Reporting & Analytics', desc: 'Real-time delivery, clicks and carrier data' },
  { icon: <IconPlug />, title: 'API & Integrations', desc: 'REST API plus pre-built integrations' },
]

const AUDIENCES = [
  { icon: <IconUsers />, title: 'Customers & Clients', desc: 'Reminders & updates' },
  { icon: <IconCalendar />, title: 'Guests', desc: 'Bookings & inquiries' },
  { icon: <IconBriefcase />, title: 'Employees', desc: 'Internal alerts' },
  { icon: <IconDollar />, title: 'Donors', desc: 'Campaign appeals' },
  { icon: <IconClock />, title: 'Patients', desc: 'Appointments' },
  { icon: <IconBook />, title: 'Job applicants', desc: 'Application status' },
  { icon: <IconBook />, title: 'Students', desc: 'Class updates' },
  { icon: <IconHandshake />, title: 'Business partners', desc: 'Partner notices' },
  { icon: <IconMail />, title: 'Subscribers & Members', desc: 'Offers & news' },
]

const TESTIMONIALS = [
  { quote: 'SMSLocal has truly transformed the way we connect with our customers. From running SMS marketing campaigns to sending appointment reminders, the platform is incredibly easy to use.', name: 'John Miller', role: 'Marketing Manager' },
  { quote: "We've been using SMSLocal to communicate with our customers, and it's been a game changer. Two-way messaging lets us provide instant support and build better relationships.", name: 'Sarah Cooper', role: 'Customer Support Specialist' },
  { quote: "SMSLocal has made communication within our team so much smoother. Whether it's shift reminders or urgent updates, it's super convenient to send quick messages.", name: 'Emily Rodriguez', role: 'Operations Assistant' },
  { quote: 'I love how simple it is to integrate SMS messaging into our sales process. Whether we’re sending quick updates or following up with leads, SMSLocal makes it easy and efficient.', name: 'David Lee', role: 'Sales Coordinator' },
]

const FAQS = [
  { q: 'What features does SMSLocal offer for business communication?', a: 'SMSLocal offers bulk SMS, two-way messaging, campaign automation, contact management, a helpdesk, and detailed reporting — all from one dashboard, no coding required.' },
  { q: 'How can SMSLocal help me run SMS marketing campaigns?', a: 'Build, schedule, and track promotional campaigns from a single dashboard, with templates and audience segmentation built in.' },
  { q: 'Can I send bulk SMS with SMSLocal?', a: 'Yes — reach thousands of contacts in one click with carrier-grade delivery across 190+ countries.' },
  { q: 'Is it possible to integrate SMSLocal with other business apps?', a: 'Yes, SMSLocal offers a REST API plus pre-built integrations with popular CRM, helpdesk, and e-commerce platforms.' },
  { q: 'How does SMSLocal help with team communication?', a: 'A shared two-way inbox lets your whole team send, receive, and manage conversations together in real time.' },
  { q: 'How secure is SMSLocal’s messaging service?', a: 'SMSLocal is secure and fully compliant, with encrypted delivery and enterprise-grade data protection.' },
]

function Home() {
  return (
    <>
      <Seo
        title="Bulk SMS Services for Businesses"
        description="SMSLocal is a bulk SMS platform for campaigns, alerts, and promotions — two-way messaging, automation, and analytics in one place, no coding needed."
      />

      <Hero
        eyebrow="Powering 20,000+ Businesses Worldwide"
        title={<>One Platform for <span className="grad-word">Bulk SMS at Scale</span></>}
        subtitle="Launch SMS campaigns, alerts, and promotions in seconds. Simply log in from any web browser — no apps, no coding, no integration needed. Connect effortlessly and grow your business."
        primaryCta={{ label: 'Create Free Trial Account', href: '/contact-us' }}
        secondaryCta={{ label: 'Book a demo', href: '/contact-us' }}
        visual={<HeroPhoneMock />}
      />

      <div className="reveal">
        <FeatureGrid items={QUICK_FEATURES} eyebrow={null} />
      </div>

      <div className="reveal">
        <ReviewBadges />
      </div>

      <TrustStrip />

      <div className="reveal">
        <OverviewBento />
      </div>

      <div className="reveal">
        <MobileToolsShowcase />
      </div>

      <div className="reveal">
        <PlatformFeatures />
      </div>

      <div className="reveal">
        <CampaignShowcase />
      </div>

      <div className="reveal">
        <GetStartedSection />
      </div>

      <div className="reveal">
        <WhyUs
          eyebrow="Built For Every Audience"
          title="Reach Audiences Who Prefer Text-Based Communication"
          subtitle="Text messaging has become the most efficient and preferred way for businesses to connect. Here's why various groups favor SMS communication over other channels."
          items={AUDIENCES}
          alt
        />
      </div>

      <div className="reveal">
        <Testimonials title="Why Teams Rely On SMSLocal" items={TESTIMONIALS} />
      </div>

      <div className="reveal">
        <CTABanner
          title={<>Join thousands of businesses building with <span className="grad-word">SMSLocal</span></>}
          subtitle="One platform. Endless communication possibilities. Start today — it's free."
          cta={{ label: 'Create Free Trial Account', href: '/contact-us' }}
          secondaryCta={{ label: 'Book a demo', href: '/contact-us' }}
        />
      </div>

      <div className="reveal">
        <FAQ
          title="Get Clear Answers On Bulk SMS"
          subtitle="Explore answers about features, integrations, pricing, and getting started with SMSLocal."
          items={FAQS}
          alt
        />
      </div>
    </>
  )
}

export default Home
