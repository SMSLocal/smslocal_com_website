import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// (config touched to force a full dev-server restart so postcss.config.js is picked up)
export default defineConfig({
  plugins: [react()],
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
