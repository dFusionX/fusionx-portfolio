import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const PORT = 4323;
const MIME = { '.html':'text/html; charset=utf-8', '.woff2':'font/woff2', '.svg':'image/svg+xml' };

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url||'/').split('?')[0]);
  let filePath;
  if (urlPath === '/card') filePath = path.join(root, 'scripts', 'og-card.html');
  else filePath = path.join(root, 'public', urlPath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found: ' + filePath); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`http://127.0.0.1:${PORT}/card`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(root, 'public', 'og-image.png') });
  console.log('wrote public/og-image.png');
  await browser.close();
  server.close();
});
