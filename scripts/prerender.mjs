// Runs after `vite build`. The build's raw dist/index.html is just an empty <div id="root">
// until React mounts client-side — meaning any crawler that doesn't execute JavaScript
// (a meaningful share of AI crawlers among them) sees nothing at all. This script serves the
// built site locally, loads it in a real headless browser, waits for React/GSAP/Three.js to
// finish their initial mount, and writes the *actual rendered HTML* back over dist/index.html.
// Human visitors are unaffected: the JS bundle is untouched and still boots normally, it just
// re-renders on top of content that's already there instead of starting from blank.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const PORT = 4322;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const filePath = path.join(distDir, urlPath === '/' ? '/index.html' : urlPath);
      if (!filePath.startsWith(distDir)) {
        res.writeHead(403);
        res.end();
        return;
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          fs.readFile(path.join(distDir, 'index.html'), (e2, d2) => {
            if (e2) {
              res.writeHead(404);
              res.end('not found');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(d2);
          });
          return;
        }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function main() {
  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html not found — run `vite build` before this script.');
  }

  console.log('[prerender] serving dist/ locally...');
  const server = await serve();

  console.log('[prerender] launching headless Chromium...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle', timeout: 30000 });
  // let the hero entrance timeline / GSAP / Three.js finish their first pass
  await page.waitForTimeout(1000);

  // Most sections only fade in via GSAP ScrollTrigger as they're scrolled into view — a plain
  // wait after page load never triggers those, so without this, everything below the hero would
  // get captured frozen at opacity:0 (readable to a plain-text extractor, but invisible to any
  // JS-disabled browser or crawler that evaluates the rendered/visual state). Scrolling to the
  // bottom fires every trigger's "start" condition; scrolling back to top afterward resets the
  // one *scrubbed* animation (the services lifecycle spine) back to its correct default state
  // (stage 1 "Build" active) without undoing the one-shot fade-ins, which don't reverse.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const html = await page.content();
  await browser.close();
  server.close();

  if (errors.length) {
    console.warn('[prerender] the page threw client-side errors during render (site still works for users, but check these):');
    errors.forEach((e) => console.warn('  -', e));
  }

  // Sanity check against a known real content string rather than parsing DOM structure by regex —
  // Vite hoists the module script into <head> during build, so "root div directly followed by a
  // script tag" (the naive assumption) doesn't hold in the built output.
  const KNOWN_CONTENT = 'Software that keeps your business moving';
  if (!html.includes(KNOWN_CONTENT) || html.length < 15000) {
    throw new Error(`Prerendered output looks empty or incomplete (${html.length} bytes, expected content ${html.includes(KNOWN_CONTENT) ? 'found' : 'MISSING'}) — refusing to overwrite dist/index.html.`);
  }

  fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
  console.log(`[prerender] wrote fully-rendered HTML (${(html.length / 1024).toFixed(0)} KB) to dist/index.html`);
}

main().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
