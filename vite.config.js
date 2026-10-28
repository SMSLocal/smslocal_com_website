import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import i18nDevTranslate from './scripts/i18n/vite-dev-translate.mjs'

// https://vite.dev/config/
// (config touched to force a full dev-server restart so postcss.config.js is picked up)
export default defineConfig({
  plugins: [react(), i18nDevTranslate()],
  build: {
    // Pages are lazy chunks in the browser build (src/lib/lazyPage.js) and plain
    // synchronous components in the SSR build, which is what keeps
    // scripts/prerender.mjs's renderToString output real content. The heaviest
    // vendor deps also get their own cacheable chunks. Vite 8 bundles with
    // Rolldown, so the option lives under rolldownOptions.output.codeSplitting,
    // not the classic Rollup manualChunks.
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
