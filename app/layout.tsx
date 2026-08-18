import type { Metadata } from 'next';
import '../src/index.css';
import Analytics from '../src/components/Analytics';
import { site } from '../src/site.config';

// Everything here replaces the hand-written <head> from the old index.html — Next injects
// it server-side from this typed object instead, so it can never drift out of sync between
// the raw HTML and what the JS build actually ships.
const TITLE = 'FusionX — Custom Software, Modernization & Data Migration';
const DESCRIPTION =
  'FusionX builds custom business software and works on the systems you already have — ' +
  'diagnosing what’s actually slow or unstable, modernizing aging architecture, and migrating ' +
  'years of business data without treating it as disposable.';

export const metadata: Metadata = {
  metadataBase: new URL('https://fusionx.tech/'),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: 'FusionX',
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://fusionx.tech/',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
};

// Structured data: only fields we actually know to be true — no fabricated address/phone/socials.
// Optional fields are attached from site.config.ts only once they've been filled in.
const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FusionX',
  url: 'https://fusionx.tech/',
  logo: 'https://fusionx.tech/favicon.svg',
  description:
    'FusionX is a software engineering company that builds, improves, modernizes, and maintains business software — custom applications, e-commerce, APIs, internal business systems, databases, and infrastructure.',
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0B0D12" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
