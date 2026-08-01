/**
 * Renders one schema.org JSON-LD block. `undefined` values drop out via
 * JSON.stringify, so optional properties can be spread in as-is without
 * guarding each one at the call site.
 */
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default JsonLd
