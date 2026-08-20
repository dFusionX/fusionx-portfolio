import type { Metadata } from 'next';
import LandingPage from '../../src/components/LandingPage';
import { legacyModernization, metadataFor } from '../../src/content/landing-pages';

export const metadata: Metadata = metadataFor(legacyModernization);

const SERVICE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Legacy Software Modernization',
  provider: { '@type': 'Organization', name: 'FusionX', url: 'https://fusionx.tech/' },
  areaServed: 'Worldwide',
  description: legacyModernization.metaDescription,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />
      <LandingPage content={legacyModernization} />
    </>
  );
}
