import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage } from 'node:http'

function spaFallbackPreview() {
  return {
    name: 'spa-preview-fallback',
    configurePreviewServer(server: { middlewares: { use: (fn: (req: IncomingMessage, _res: unknown, next: () => void) => void) => void } }) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? '/'
        if (!url.startsWith('/api') && !url.includes('.')) {
          req.url = '/index.html'
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), spaFallbackPreview()],
})
