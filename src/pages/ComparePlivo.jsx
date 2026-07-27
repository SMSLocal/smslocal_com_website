import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { Hero, CompareTable, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import WhyUsUnderline from '../components/WhyUsUnderline.jsx'
import { CompareLogo } from '../components/CompareLogo.jsx'
import { getCompetitor } from '../data/compareData.jsx'

const c = getCompetitor('plivo')

const siblings = [
  { slug: 'twilio', name: 'Twilio', domain: 'twilio.com' },
  { slug: 'bird', name: 'Bird', domain: 'bird.com' },
  { slug: 'infobip', name: 'Infobip', domain: 'infobip.com' },
]

function ComparePlivo() {
  return (
    <>
      <Seo title={c.seo.title} description={c.seo.description} keywords={c.seo.keywords} />

      <Hero
        eyebrow={`SMSLocal vs ${c.name}`}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        primaryCta={{ label: 'Get Started Free', href: '/contact-us' }}
        secondaryCta={{ label: 'Compare all', href: '/compare' }}
        stats={c.hero.stats.map((s) => ({ value: s.value, label: s.label }))}
      />

      <CompareTable
        title={<>SMSLocal vs <CompareLogo name={c.name} domain={c.domain} className="inline-compare-logo" /> {c.name}, side by side</>}
        subtitle={`A fair, feature-by-feature look at SMSLocal against ${c.name}.`}
        leftLabel={c.name}
        rightLabel="SMSLocal"
        rows={c.scorecard.map((row) => ({ feature: row.feature, left: row.them, right: row.us }))}
      />

      <WhyUsUnderline
        eyebrow="Why switch"
        title={`Why teams choose SMSLocal over ${c.name}`}
        items={c.reasons}
      />

      <CTABanner
        title={c.cta.title}
        subtitle={c.cta.subtitle}
        cta={{ label: 'Get Started Free', href: '/contact-us' }}
        secondaryCta={{ label: 'Talk to sales', href: '/contact-us' }}
      />

      <FAQ
        title={<>SMSLocal vs {c.name}, <span className="grad-word">answered</span></>}
        items={c.faqs}
        alt
      />

      <section className="section section-alt">
        <div className="container">
          <span className="section-kicker">Compare with others</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
            {siblings.map((s) => (
              <Link className="btn btn-ghost" to={`/compare/${s.slug}`} key={s.slug}>
                <CompareLogo name={s.name} domain={s.domain} /> vs {s.name}
              </Link>
            ))}
            <Link className="btn btn-ghost" to="/compare">All comparisons →</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ComparePlivo
