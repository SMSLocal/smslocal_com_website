import Seo from './Seo.jsx'
import { Hero, FeatureGrid, HowItWorks, WhyUs, EcosystemGrid, FAQ, CTABanner } from './sections/Sections.jsx'
import './CpaasPage.css'

/**
 * One template for the CPaaS, Developers, Use-case and Platform pages.
 *
 * Every page is a plain data object (see src/data/cpaasPages.jsx) rendered with
 * the site's own section components, so these pages inherit the same spacing,
 * typography and dark CTA as the hand-built product pages. Each block is
 * optional — a page only renders the sections it defines — and the light/tinted
 * background alternates automatically so a missing block never leaves two
 * identical sections stacked.
 */

function CodeBlock({ label, lines }) {
  return (
    <div className="cpaas-code" role="group" aria-label={label}>
      <div className="cpaas-code-bar">
        <span className="cpaas-code-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="cpaas-code-label">{label}</span>
      </div>
      <pre className="cpaas-code-body"><code>{lines.join('\n')}</code></pre>
    </div>
  )
}

function CodeSection({ eyebrow, title, subtitle, label, lines, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container cpaas-code-wrap">
        <div className="cpaas-code-copy">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        <CodeBlock label={label} lines={lines} />
      </div>
    </section>
  )
}

function CpaasPage({ seo, hero, features, code, steps, why, related, cta, faqs }) {
  let alt = false
  const next = () => {
    const current = alt
    alt = !alt
    return current
  }

  return (
    <>
      <Seo {...seo} />

      <Hero {...hero} />

      {features && <FeatureGrid {...features} alt={next()} />}

      {code && <CodeSection {...code} alt={next()} />}

      {steps && <HowItWorks {...steps} alt={next()} />}

      {why && <WhyUs {...why} alt={next()} />}

      {related && <EcosystemGrid {...related} alt={next()} />}

      {cta && <CTABanner {...cta} />}

      {faqs && <FAQ title={faqs.title} items={faqs.items} alt />}
    </>
  )
}

export default CpaasPage
