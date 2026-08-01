import { useLocation } from 'react-router-dom'
import { SITE_ORIGIN } from './Canonical.jsx'

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
  const resolved = exactTitle ?? (title ? `${title} | SMSLocal` : null)
  const url = canonical ?? `${SITE_ORIGIN}${pathname}`
  const image = ogImage ? new URL(ogImage, SITE_ORIGIN).href : null
  const keywordList = Array.isArray(keywords) ? keywords.join(', ') : keywords

  return (
    <>
      {resolved && <title>{resolved}</title>}
      {description && <meta name="description" content={description} />}
      {keywordList && <meta name="keywords" content={keywordList} />}
      {resolved && <meta property="og:title" content={resolved} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType ?? 'website'} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
    </>
  )
}

export default Seo
