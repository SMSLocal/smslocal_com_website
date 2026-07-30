import { useEffect } from 'react'

/** Tags this component owns, so a route change can clear what it set before. */
const MANAGED = 'data-seo-managed'

function upsert(selector, attrs) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement(attrs.rel ? 'link' : 'meta')
    tag.setAttribute(MANAGED, '')
    document.head.appendChild(tag)
  }
  for (const [key, value] of Object.entries(attrs)) tag.setAttribute(key, value)
}

function setMeta(name, content) {
  if (!content) return
  upsert(`meta[name="${name}"]`, { name, content })
}

function setProperty(property, content) {
  if (!content) return
  upsert(`meta[property="${property}"]`, { property, content })
}

/**
 * `exactTitle` sets `document.title` verbatim — imported posts carry the meta
 * title from the source page, which already reads as a complete title and must
 * not pick up the site suffix.
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
  useEffect(() => {
    const resolved = exactTitle ?? (title ? `${title} | SMSLocal` : null)
    if (resolved) document.title = resolved

    setMeta('description', description)
    if (keywords) setMeta('keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords)

    setProperty('og:title', resolved)
    setProperty('og:description', description)
    setProperty('og:type', ogType ?? 'website')
    if (canonical) {
      setProperty('og:url', canonical)
      upsert('link[rel="canonical"]', { rel: 'canonical', href: canonical })
    }
    if (ogImage) {
      setProperty('og:image', new URL(ogImage, window.location.origin).href)
    }
    setProperty('article:published_time', publishedTime)
    setProperty('article:modified_time', modifiedTime)

    return () => {
      // Article-only tags would otherwise leak onto the next page.
      for (const tag of document.head.querySelectorAll(
        'meta[property^="article:"][data-seo-managed], link[rel="canonical"][data-seo-managed]',
      )) {
        tag.remove()
      }
    }
  }, [
    title,
    exactTitle,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    publishedTime,
    modifiedTime,
  ])

  return null
}

export default Seo
