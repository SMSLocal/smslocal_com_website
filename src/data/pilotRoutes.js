/**
 * Multilingual pilot scope (see the reference doc's own methodology: "pilot
 * on 2 pages first, then the full site"). Only these routes get translated
 * static pages and hreflang tags — everything else stays English-only until
 * this is verified and scaled up. Shared between the React tree (HreflangTags
 * only renders for a route in this list) and scripts/prerender.mjs (only
 * these get built in every locale).
 */
export const PILOT_ROUTES = ['/', '/pricing', '/country-code/china', '/country-code/india']
