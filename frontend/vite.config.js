import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,  // 👈 this auto-opens the app in your default browser
    port: 5173,  // optional, you can set a custom port too
  },
})
