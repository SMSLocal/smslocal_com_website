import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        '.',
        'C:/Users/Admin/Desktop/smslocal_com_website-main/smslocal_com_website-main (2)/smslocal_com_website-main',
      ],
    },
  },
})
