# FusionX — Website

React + TypeScript (Vite) site, with a serverless function backing the contact form.

## Stack

- **Vite + React + TypeScript** — the frontend. No Next.js: this machine's Node version (18.10) is below
  Next.js 14's minimum (18.17), and for a mostly-static site the extra weight wasn't buying anything anyway.
- **Three.js** — the hero background scene.
- **GSAP + ScrollTrigger** — entrance animation and scroll reveals.
- **Serverless function** (`api/contact.ts`) + **Resend** — sends the contact form as an email. This is the
  part that makes "a contact form that actually emails you" possible at all; a static site alone can't do it.
  The function is currently written in the Node-based `(req, res)` serverless format — the most common shape
  for this kind of function, but worth knowing the exact signature before picking a host, since a couple of
  platforms (e.g. Cloudflare Workers) expect a different one and would need the file adapted.

## Running locally

```
npm install
npm run dev
```

Opens on `http://localhost:5173`. The contact form will show a "not configured" error locally unless something
is also serving `api/contact.ts` as a function alongside the frontend — plain `vite dev` only serves the
static site, it has no idea `/api` exists. Whatever host you pick will have its own CLI for running that
locally (for example, Vercel's is `vercel dev`); check its docs for the equivalent.

## Contact form setup (required before it can send real email)

1. Create a free account at [resend.com](https://resend.com) and grab an API key.
2. Copy `.env.example` to `.env` and fill in:
   - `RESEND_API_KEY` — from Resend.
   - `CONTACT_TO_EMAIL` — the inbox submissions should land in.
   - `CONTACT_FROM_EMAIL` — leave as `onboarding@resend.dev` until you verify `fusionx.tech` with Resend (Domains
     → Add Domain → add the DNS records they give you at your registrar). Once verified, change this to
     something like `hello@fusionx.tech`.
3. Test locally using your chosen host's CLI/emulator (see "Running locally" above) so the form has something
   real to submit to.

## Deploying

This needs a host that can run `api/contact.ts` as a serverless function, not just serve static files.
In broad strokes, whichever one you pick:

1. Push this repo to GitHub (or your host's git provider of choice).
2. Import/connect the repo — most hosts auto-detect a Vite project.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` as environment variables in that host's
   project settings (same values as your local `.env`).
4. Deploy, then point `fusionx.tech`'s DNS at whatever the host gives you when you're ready to go live.

## SEO & AI-crawler visibility

The biggest fix here isn't a meta tag: this is a client-rendered React app, so the raw HTML response
before any JavaScript runs was just `<div id="root"></div>` — empty. A meaningful share of AI crawlers
(and plenty of simpler bots) don't execute JavaScript, so they were seeing **nothing**: no headline, no
services, no company description. `npm run build` now runs `scripts/prerender.mjs` afterward, which loads
the built site in a real headless browser, waits for it to fully render, and writes that actual rendered
HTML back over `dist/index.html`. Human visitors still get the full interactive React app (the JS bundle
is untouched) — they just land on a page that already has content instead of a blank one for that first
paint. This only runs on `npm run build`; `npm run dev` is unaffected.

Beyond that:
- `public/robots.txt` — explicitly allows crawling, including a named allow-list for AI crawlers
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, and others) rather than leaving them to a
  default.
- `public/sitemap.xml`, `public/llms.txt` — the latter is an emerging (not yet universal) convention some
  AI systems read for a structured summary of a site.
- `index.html` — canonical URL, Open Graph + Twitter Card tags, and a JSON-LD `Organization` block. The
  structured data only states what's actually confirmed (name, url, email) — no fabricated address, phone,
  or social profile links, since wrong structured data is worse than none.
- `public/og-image.png` — a real 1200×630 share-preview image, rendered from `scripts/og-card.html` via
  Playwright (`node scripts/gen-og.mjs`) rather than skipped. Re-run that script if the brand visuals
  change.

**What none of this can promise**: actual ranking position. That depends on backlinks, domain age,
competition for the search terms in question, and other things no code change controls. This work makes
the site fully visible and correctly described to crawlers and AI systems — it doesn't guarantee where it
places once it's seen.

## What's a placeholder still

- `CONTACT_FROM_EMAIL` / footer email — using `hello@fusionx.tech`; swap once you've verified the domain with
  Resend.
- LinkedIn link in the footer — currently a dead `#` link. Worth a real URL soon: it's also the kind of gap
  that would make sense to fill in `sameAs` in the JSON-LD once it exists.
- VOH Opticians' "Case study — coming soon" label — no link yet, unlike Fuse API Hub and Washingtonia
  Nursery which link out to the real sites.

## Project structure

```
src/
  components/    one file per page section (Hero, Services, Work, Contact, ...)
  hooks/         useHeroScene (Three.js), useScrollAnimations (GSAP), usePrefersReducedMotion
  index.css      the entire design system — tokens, layout, every component's styles
api/
  contact.ts     the serverless function the contact form POSTs to
public/fonts/    self-hosted IBM Plex woff2 files
```
