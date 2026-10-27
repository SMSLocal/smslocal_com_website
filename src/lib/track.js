/**
 * Product analytics events (PostHog). Pageviews, scrolls and clicks are already
 * captured automatically; these name the moments that matter for the funnel so
 * signup, contact and tool usage can be counted and attributed by channel.
 *
 * Rules: never put personal data in an event (no email, name, phone number or
 * message text), and never let analytics break the page, so every call is
 * wrapped. window.posthog is only initialised on the live hostname (see
 * index.html); elsewhere capture() lands in the loader's stub and goes nowhere.
 */
export function track(event, properties) {
  try {
    window.posthog?.capture?.(event, properties)
  } catch {
    /* analytics must never affect the page */
  }
}

// Links that lead into the sales funnel, with or without a locale prefix.
const CTA_LINK = /^(?:\/[a-z]{2,3}(?:-[A-Z]{2})?)?\/(signup|contact-us|pricing)\/?$/

/**
 * One delegated listener that records a `cta_click` whenever a visitor clicks a
 * link to /signup, /contact-us or /pricing, wherever it sits on the site. This
 * gives a per-page, per-label view of which calls to action actually get used
 * without touching each component.
 */
export function initCtaTracking() {
  if (typeof document === 'undefined' || window.__ctaTracking) return
  window.__ctaTracking = true
  document.addEventListener(
    'click',
    (e) => {
      const link = e.target instanceof Element ? e.target.closest('a[href]') : null
      if (!link) return
      const path = (link.getAttribute('href') || '')
        .replace(/^https?:\/\/(www\.)?smslocal\.com/, '')
        .split(/[?#]/)[0]
      const match = CTA_LINK.exec(path)
      if (!match) return
      track('cta_click', {
        cta: match[1],
        label: (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60),
        from: window.location.pathname,
      })
    },
    true,
  )
}
