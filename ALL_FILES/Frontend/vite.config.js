import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  
  // Proxy configuration to connect frontend with backend servers
  // This allows the frontend to make API calls without CORS issues during development
  server: {
    proxy: {
      // Route all requests starting with /api/school to the School Backend (port 5001)
      '/api/school': {
        target: 'http://localhost:5001',
        changeOrigin: true, // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api\/school/, '/api') // Remove /school prefix before forwarding
      },
      // Route all requests starting with /api/college to the College Backend (port 5002)
      '/api/college': {
        target: 'http://localhost:5002',
        changeOrigin: true, // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api\/college/, '/api') // Remove /college prefix before forwarding
      }
    }
  }
})
