import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Use the specific domain provided by ngrok or .ngrok-free.dev to allow all subdomains
    allowedHosts: ['.ngrok-free.dev'],
    hmr:{
      clientPort: 443
    }
  }
});