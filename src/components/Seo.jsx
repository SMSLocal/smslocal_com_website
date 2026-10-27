import { useLocation } from 'react-router-dom'
import { SITE_ORIGIN } from './Canonical.jsx'
import { withSlash } from '../lib/url.js'
import { useLocale } from '../lib/LocaleContext.jsx'
import { LANGUAGES } from '../data/languages.js'
import { SEO_OVERRIDES } from '../data/seoOverrides.js'

/** 1200x630 share card used when a page has no raster image of its own. */
export const DEFAULT_OG_IMAGE = '/og-default.jpg'
const DEFAULT_OG_IMAGE_ALT = 'SMSLocal: every customer conversation, in one place'
const RASTER_IMAGE = /\.(png|jpe?g|webp|gif)(\?.*)?$/i

/**
 * Head tags rendered as real elements rather than written from an effect, so
 * they exist in the prerendered HTML — effects don't run during renderToString,
 * which left crawlers that don't execute JS (and link-preview scrapers) seeing
 * the template's generic title. React 19 hoists title/meta/link from anywhere in
 * the tree into <head>, and drops them again on unmount, so route changes no
 * longer need the manual cleanup this used to do. scripts/prerender.mjs lifts
 * them out of the rendered body for the static files.
 *
 * `exactTitle` sets the title verbatim — imported posts carry the meta title
 * from the source page, which already reads as a complete title and must not
 * pick up the site suffix.
 *
 * The canonical <link> is not emitted here: Canonical.jsx owns it for every
 * route. `canonical` only overrides og:url, which posts need because they
 * resolve under two paths.
 */
function Seo({
  title,
  exactTitle,
  description,
  keywords,
  canonical,
  ogImage,
  ogType,
  publishedTime,
  modifiedTime,
}) {
  const { pathname } = useLocation()
  const locale = useLocale()
  const localePrefix = locale !== 'en' ? `/${locale}` : ''
  // og:locale wants language_TERRITORY. The territory comes from the same
  // `country` each language already carries for its flag, so there's no
  // second mapping to keep in sync. Without this, social platforms guess the
  // language of a translated page from its English-looking URL structure.
  const lang = LANGUAGES.find((l) => l.code === locale)
  const ogLocale = lang ? `${lang.code}_${lang.country.toUpperCase()}` : 'en_US'
  // A route listed in seoOverrides.js takes its title and description from
  // there, whatever the page component passes (see that file for the ranges).
  const override = SEO_OVERRIDES[withSlash(pathname)]
  const resolved = override?.title ?? exactTitle ?? (title ? `${title} | SMSLocal` : null)
  const metaDescription = override?.description ?? description
  // A page that passes its own `canonical` (posts do, because they resolve
  // under two paths) was handing og:url the English address even on a
  // translated page — so a shared Dutch article previewed as the English one.
  // The prefix is inserted into the supplied URL rather than ignoring it,
  // which keeps the post's own choice of path.
  const localizedCanonical =
    canonical && localePrefix
      ? canonical.replace(SITE_ORIGIN, `${SITE_ORIGIN}${localePrefix}`)
      : canonical
  const url = localizedCanonical ?? `${SITE_ORIGIN}${localePrefix}${withSlash(pathname)}`
  // Social scrapers (Facebook, LinkedIn, X, Slack) do not render SVG, and a
  // page that passes no image would preview as a blank card. Anything that is
  // not a raster image therefore falls back to the sitewide default.
  const imagePath = ogImage && RASTER_IMAGE.test(ogImage) ? ogImage : DEFAULT_OG_IMAGE
  const usingDefaultImage = imagePath === DEFAULT_OG_IMAGE
  const image = new URL(imagePath, SITE_ORIGIN).href
  const keywordList = Array.isArray(keywords) ? keywords.join(', ') : keywords

  return (
    <>
      {resolved && <title>{resolved}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {keywordList && <meta name="keywords" content={keywordList} />}
      {resolved && <meta property="og:title" content={resolved} />}
      {metaDescription && <meta property="og:description" content={metaDescription} />}
      <meta property="og:type" content={ogType ?? 'website'} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="SMSLocal" />
      <meta property="og:image" content={image} />
      {usingDefaultImage && <meta property="og:image:width" content="1200" />}
      {usingDefaultImage && <meta property="og:image:height" content="630" />}
      {usingDefaultImage && <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />}
      <meta name="twitter:card" content="summary_large_image" />
      {resolved && <meta name="twitter:title" content={resolved} />}
      {metaDescription && <meta name="twitter:description" content={metaDescription} />}
      <meta name="twitter:image" content={image} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
    </>
  )
}

export default Seo
