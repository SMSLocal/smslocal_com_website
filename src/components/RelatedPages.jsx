import EcosystemChipsRow from './EcosystemChipsRow.jsx'
import { RELATED_GROUPS } from '../data/relatedPages.js'

/**
 * A row of links to the sibling pages in the same section (other industries,
 * other messaging channels), minus the page it is shown on. Plain links, so they
 * are in the prerendered HTML for crawlers as well as in the browser.
 */
function RelatedPages({ group, current }) {
  const { eyebrow, title, items } = RELATED_GROUPS[group]
  return <EcosystemChipsRow eyebrow={eyebrow} title={title} items={items.filter((i) => i.href !== current)} alt />
}

export default RelatedPages
