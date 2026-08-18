import type { Metadata } from 'next';
import '../src/index.css';

// Everything here replaces the hand-written <head> from the old index.html — Next injects
// it server-side from this typed object instead, so it can never drift out of sync between
// the raw HTML and what the JS build actually ships.
export const metadata: Metadata = {
  metadataBase: new URL('https://fusionx.tech/'),
  title: 'FusionX — Software Engineering, Modernization & Migration',
  description:
    'FusionX builds, improves, modernizes and maintains business software — from new applications to legacy systems, databases and infrastructure.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: 'FusionX',
    title: 'FusionX — Software Engineering, Modernization & Migration',
    description:
      'FusionX builds, improves, modernizes and maintains business software — from new applications to legacy systems, databases and infrastructure.',
    url: 'https://fusionx.tech/',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FusionX — Software Engineering, Modernization & Migration',
    description:
      'FusionX builds, improves, modernizes and maintains business software — from new applications to legacy systems, databases and infrastructure.',
    images: ['/og-image.png'],
  },
};

// Structured data: only fields we actually know to be true — no fabricated address/phone/socials.
const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FusionX',
  url: 'https://fusionx.tech/',
  logo: 'https://fusionx.tech/favicon.svg',
  description:
    'FusionX is a software engineering company that builds, improves, modernizes, and maintains business software — custom applications, e-commerce, APIs, internal business systems, databases, and infrastructure.',
  email: 'hello@fusionx.tech',
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
      <body>{children}</body>
    </html>
  );
}
