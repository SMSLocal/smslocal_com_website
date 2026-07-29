import Seo from '../components/Seo.jsx'
import Hero from '../components/home/Hero.jsx'
import TrustBar from '../components/home/TrustBar.jsx'
import Stats from '../components/home/Stats.jsx'
import AppShowcase from '../components/home/AppShowcase.jsx'
import PlatformFeatures from '../components/home/PlatformFeatures.jsx'
import ProcessSteps from '../components/home/ProcessSteps.jsx'
import Audiences from '../components/home/Audiences.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import CTABanner from '../components/home/CTABanner.jsx'
import FAQ from '../components/home/FAQ.jsx'
import Reveal from '../components/home/Reveal.jsx'

function Home() {
  return (
    // .home-tw scopes the Tailwind element reset in styles/home-tailwind.css to
    // this page only — the plain-CSS inner pages must not inherit it.
    <div className="home-tw">
      <Seo
        title="Bulk SMS Marketing & Business Messaging Platform"
        description="Launch SMS campaigns, alerts, and promotions in seconds. No apps, no coding, no integration needed. Connect effortlessly and grow with SMSLocal."
        keywords={['bulk SMS', 'SMS API', 'business SMS', 'SMS marketing', 'SMS campaigns', 'text message marketing']}
      />

      <Hero />
      <Reveal><TrustBar /></Reveal>
      <Reveal><Stats /></Reveal>
      <Reveal><AppShowcase /></Reveal>
      <Reveal><PlatformFeatures /></Reveal>
      <Reveal><ProcessSteps /></Reveal>
      <Reveal><Audiences /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><CTABanner /></Reveal>
      <Reveal><FAQ /></Reveal>
    </div>
  )
}

export default Home
