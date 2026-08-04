import { translateBatch } from './translate.mjs'

/**
 * Dev-server-only translation endpoint.
 *
 * In production every locale page is a real prerendered file with its
 * translation dictionary baked in (scripts/prerender.mjs). The dev server
 * has none of that — it serves the SPA shell and renders in the browser, so
 * /fr/ would always show English and there'd be no way to check a
 * translation without a full build.
 *
 * This exposes the same translator the build uses over HTTP so the client
 * can ask for the current page's strings on the fly. It reuses
 * translateBatch, so it shares the on-disk cache with the build: strings the
 * build already translated cost nothing and return instantly. Calling the
 * free endpoint from the browser directly would be blocked by CORS, which is
 * why this proxies it server-side.
 *
 * `apply: 'serve'` — never part of a production build.
 */
export default function i18nDevTranslate() {
  return {
    name: 'i18n-dev-translate',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__i18n/translate', (req, res, next) => {
        if (req.method !== 'POST') return next()

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', async () => {
          res.setHeader('content-type', 'application/json')
          try {
            const { texts, targetLang } = JSON.parse(body)
            if (!Array.isArray(texts) || typeof targetLang !== 'string') {
              res.statusCode = 400
              return res.end(JSON.stringify({ error: 'invalid request' }))
            }
            const map = await translateBatch(texts, targetLang)
            res.end(JSON.stringify({ translations: texts.map((t) => map.get(t) ?? t) }))
          } catch {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'translation failed' }))
          }
        })
      })
    },
  }
}
