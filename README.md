# FusionX — Website

React + TypeScript (Vite) site, with a Vercel serverless function backing the contact form.

## Stack

- **Vite + React + TypeScript** — the frontend. No Next.js: this machine's Node version (18.10) is below
  Next.js 14's minimum (18.17), and for a mostly-static site the extra weight wasn't buying anything anyway.
- **Three.js** — the hero background scene.
- **GSAP + ScrollTrigger** — entrance animation and scroll reveals.
- **Vercel serverless function** (`api/contact.ts`) + **Resend** — sends the contact form as an email. This
  is the part that makes "a contact form that actually emails you" possible at all; a static site alone can't
  do it.

## Running locally

```
npm install
npm run dev
```

Opens on `http://localhost:5173`. The contact form will show a "not configured" error locally unless you also
run `vercel dev` (which serves both the Vite frontend and the `/api` function together) — see below.

## Contact form setup (required before it can send real email)

1. Create a free account at [resend.com](https://resend.com) and grab an API key.
2. Copy `.env.example` to `.env` and fill in:
   - `RESEND_API_KEY` — from Resend.
   - `CONTACT_TO_EMAIL` — the inbox submissions should land in.
   - `CONTACT_FROM_EMAIL` — leave as `onboarding@resend.dev` until you verify `fusionx.tech` with Resend (Domains
     → Add Domain → add the DNS records they give you at your registrar). Once verified, change this to
     something like `hello@fusionx.tech`.
3. To test the form locally with the real function running, use the Vercel CLI instead of plain `vite dev`:
   ```
   npm i -g vercel
   vercel dev
   ```
   This serves the frontend and `/api/contact` together on one port, reading `.env` automatically.

## Deploying (Vercel)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Vite and the `/api` folder, no
   config needed.
3. In the Vercel project's **Settings → Environment Variables**, add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and
   `CONTACT_FROM_EMAIL` (same values as your local `.env`).
4. Deploy. Point `fusionx.tech`'s DNS at Vercel under **Settings → Domains** when you're ready to go live on
   the real domain.

## What's a placeholder still

- `CONTACT_FROM_EMAIL` / footer email — using `hello@fusionx.tech`; swap once you've verified the domain with
  Resend.
- LinkedIn link in the footer — currently a dead `#` link.
- Case study links ("View Case Study →") — currently dead `#` links; there are no individual case-study pages
  yet, just the summary cards.

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
