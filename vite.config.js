import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import i18nDevTranslate from './scripts/i18n/vite-dev-translate.mjs'

// https://vite.dev/config/
// (config touched to force a full dev-server restart so postcss.config.js is picked up)
export default defineConfig({
  plugins: [react(), i18nDevTranslate()],
  build: {
    // Route-level React.lazy() isn't safe here: scripts/prerender.mjs calls
    // renderToString synchronously for all 293 routes and regex-extracts
    // <title>/<meta> from the result — a lazy component would render its
    // Suspense fallback instead of real content, breaking prerendered SEO
    // output for every page. This is the fix Vite's own build warning points
    // at instead: split the heaviest vendor deps into their own cacheable
    // chunks. Vite 8 bundles with Rolldown, so the option lives under
    // rolldownOptions.output.codeSplitting, not the classic Rollup
    // manualChunks — see node_modules/rolldown's own type definitions.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: /node_modules\/react/ },
            { name: 'vendor-country-data', test: /node_modules\/world-countries/ },
            { name: 'vendor-icons', test: /node_modules\/lucide-react/ },
            { name: 'vendor-dotted-map', test: /node_modules\/dotted-map/ },
            { name: 'vendor', test: /node_modules/ },
          ],
        },
      },
    },
  },
  server: {
    port: 3001,
    strictPort: true,
    fs: {
      allow: [
        '.',
        'C:/Users/Admin/Desktop/smslocal_com_website-main/smslocal_com_website-main (2)/smslocal_com_website-main',
      ],
    },
  },
})
