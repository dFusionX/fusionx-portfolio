import type { Metadata } from 'next';
import LandingPage from '../../src/components/LandingPage';
import { dataMigration, metadataFor, breadcrumbJsonLdFor } from '../../src/content/landing-pages';

export const metadata: Metadata = metadataFor(dataMigration);

const SERVICE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Data Migration',
  provider: { '@type': 'Organization', name: 'FusionX', url: 'https://fusionx.tech/' },
  areaServed: 'Worldwide',
  description: dataMigration.metaDescription,
};
const BREADCRUMB_JSON_LD = breadcrumbJsonLdFor(dataMigration);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <LandingPage content={dataMigration} />
    </>
  );
}
