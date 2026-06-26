// Prerender script — visits all SPA routes via Playwright, saves static HTML + sitemap
// Run: pnpm build && node scripts/prerender.mjs

import { chromium } from 'playwright'
import { spawn } from 'child_process'
import fs from 'fs/promises'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const PORT = 4173
const BASE = `http://localhost:${PORT}`
const DOMAIN = 'https://fiindt.com'

// Seed routes — crawler auto-discovers the rest via links
const SEEDS = ['/', '/about', '/faq', '/contact', '/legal']

// Routes to skip (external, assets, mailto, etc.)
const SKIP_PREFIXES = ['http', 'mailto', 'tel', '#', '/api']

async function waitForServer(port, timeout = 30_000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}/`, (res) => {
          res.resume()
          resolve(undefined)
        })
        req.on('error', reject)
        req.end()
      })
      return
    } catch {
      await new Promise((r) => setTimeout(r, 400))
    }
  }
  throw new Error(`Preview server on :${port} did not start within ${timeout}ms`)
}

async function saveHTML(route, html) {
  const segments = route === '/' ? [] : route.split('/').filter(Boolean)
  const filePath = path.join(DIST, ...segments, 'index.html')
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, html, 'utf8')
}

async function main() {
  // Start Vite preview (uses SPA fallback plugin we added to vite.config.ts)
  const server = spawn(
    'pnpm',
    ['exec', 'vite', 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], shell: process.platform === 'win32' },
  )
  server.stdout.on('data', () => {}) // drain
  server.stderr.on('data', () => {}) // drain

  console.log('Waiting for preview server...')
  await waitForServer(PORT)
  console.log(`Server ready at ${BASE}\n`)

  const browser = await chromium.launch()
  const page = await browser.newPage()

  const visited = new Set()
  const queue = [...SEEDS]
  const rendered = []
  let skipped = 0

  while (queue.length > 0) {
    const route = queue.shift()
    if (!route || visited.has(route)) continue
    visited.add(route)

    try {
      await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 20_000 })

      // Let React effects settle (useSEO, etc.)
      await page.waitForTimeout(80)

      const title = await page.title()

      // Skip 404 pages (don't save them as regular routes)
      if (title.toLowerCase().includes('not found') || title.toLowerCase().includes('404')) {
        skipped++
        process.stdout.write(`  – ${route} (404, skipped)\n`)
        continue
      }

      const html = await page.content()
      await saveHTML(route, html)
      rendered.push(route)
      process.stdout.write(`  ✓ ${route}\n`)

      // Discover internal links
      const hrefs = await page.$$eval('a[href]', (els) =>
        els.map((el) => el.getAttribute('href')).filter(Boolean),
      )

      for (const href of hrefs) {
        if (!href) continue
        if (SKIP_PREFIXES.some((p) => href.startsWith(p))) continue
        const clean = href.split('#')[0].split('?')[0]
        if (clean && !visited.has(clean) && !queue.includes(clean)) {
          queue.push(clean)
        }
      }
    } catch (err) {
      process.stderr.write(`  ✗ ${route} — ${err.message}\n`)
    }
  }

  await browser.close()
  server.kill()

  // Generate sitemap.xml
  const now = new Date().toISOString().split('T')[0]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rendered
  .map((r) => {
    const depth = r.split('/').filter(Boolean).length
    const freq = r === '/' ? 'daily' : depth >= 2 ? 'weekly' : 'monthly'
    return `  <url>
    <loc>${DOMAIN}${r}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${freq}</changefreq>
  </url>`
  })
  .join('\n')}
</urlset>`

  await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8')

  console.log(`\nPrerendered ${rendered.length} pages, skipped ${skipped}.`)
  console.log(`Sitemap → dist/sitemap.xml (${rendered.length} URLs)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
