/**
 * Shared brand mark — the real SMSLocal icon (verified against the live
 * Vercel site), used in both the navbar and the footer.
 */
function BrandLogo({ size = 28, className }) {
  return (
    <img
      src="/smslocal-icon.png"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ flex: 'none', width: size, height: size }}
    />
  )
}

export default BrandLogo
