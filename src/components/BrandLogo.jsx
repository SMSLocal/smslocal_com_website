/**
 * Shared brand mark — the real SMSLocal wordmark, matching the reference site
 * (which renders /smslocal-logo-v2.svg at h-8 w-auto, ~161x32).
 *
 * This replaced an icon-tile + "SMSLocal" text lockup, which did not match:
 * the wordmark is a single artwork with its own letterforms and spacing.
 *
 * On dark backgrounds pass `invert` — the logo's indigo only reaches 1.67
 * contrast there, so parts of it would disappear.
 */
function BrandLogo({ height = 32, className = '' }) {
  return (
    <img
      src="/smslocal-logo-v2.svg"
      alt="SMSLocal"
      className={className}
      style={{ flex: 'none', height, width: 'auto' }}
    />
  )
}

export default BrandLogo
