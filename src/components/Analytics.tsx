'use client';

import Script from 'next/script';
import { GA_ID } from '../lib/analytics';

/**
 * GA4 loader. Renders nothing at all unless NEXT_PUBLIC_GA_ID is set, so the tag only
 * exists in environments you've deliberately configured.
 *
 * afterInteractive keeps it off the critical path — this page already ships Three.js and
 * GSAP, and analytics shouldn't compete with them for first paint.
 */
export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
