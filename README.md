# FusionX — Website

Next.js (App Router) + TypeScript site, with a Route Handler backing the contact form.

## Stack

- **Next.js 16 + React + TypeScript** — the homepage (`app/page.tsx`) renders `SiteApp`, one large
  client component covering the whole page (nearly every section uses hooks — scroll reveals, the
  hero's Three.js scene, the custom cursor — so there's no meaningful Server/Client split within
  the page itself). The win over a plain client-side SPA is that Next server-renders this
  component's HTML on the very first request — in fact the homepage builds as fully static HTML —
  so crawlers and JS-disabled visitors see real content with no extra tooling involved.
- **Three.js** — the hero background scene.
- **GSAP + ScrollTrigger** — entrance animation and scroll reveals.
- **Route Handler** (`app/api/contact/route.ts`) + **Resend** — sends the contact form as an
  email. This is the part that makes "a contact form that actually emails you" possible at all;
  a static site alone can't do it.

## Running locally

```
npm install
npm run dev
```

Opens on `http://localhost:3000`. `/api/contact` is served by the same dev server — no separate
CLI or emulator needed.

## Contact form setup (required before it can send real email)

1. Create a free account at [resend.com](https://resend.com) and grab an API key.
2. Copy `.env.example` to `.env` and fill in:
   - `RESEND_API_KEY` — from Resend.
   - `CONTACT_TO_EMAIL` — the inbox submissions should land in.
   - `CONTACT_FROM_EMAIL` — leave as `onboarding@resend.dev` until you verify `fusionx.tech` with Resend (Domains
     → Add Domain → add the DNS records they give you at your registrar). Once verified, change this to
     something like `hello@fusionx.tech`.
3. Restart `npm run dev` after editing `.env` and submit the form to test.

## Deploying

Any host that runs Next.js natively (Vercel is the reference target) works with zero extra config:

1. Push this repo to GitHub (or your host's git provider of choice).
2. Import/connect the repo — Next.js is auto-detected.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` as environment variables in that host's
   project settings (same values as your local `.env`).
4. Deploy, then point `fusionx.tech`'s DNS at whatever the host gives you when you're ready to go live.

## What's a placeholder still

- `CONTACT_FROM_EMAIL` / footer email — using `hello@fusionx.tech`; swap once you've verified the domain with
  Resend.
- LinkedIn link in the footer — currently a dead `#` link.
- VOH Opticians' "Case study — coming soon" label — no link yet, unlike Fuse API Hub and Washingtonia
  Nursery which link out to the real sites.

## Project structure

```
app/
  layout.tsx       root layout — all SEO/meta/JSON-LD (replaces the old hand-written index.html <head>)
  page.tsx          renders SiteApp
  api/contact/      the Route Handler the contact form POSTs to
src/
  SiteApp.tsx        the whole page tree (client component)
  components/        one file per page section (Hero, Services, Work, Contact, ...)
  hooks/             useHeroScene (Three.js), useScrollAnimations (GSAP), usePrefersReducedMotion
  index.css          the entire design system — tokens, layout, every component's styles
public/fonts/        self-hosted IBM Plex woff2 files
```
