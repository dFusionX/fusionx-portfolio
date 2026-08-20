/**
 * Content for the four ad-landing pages. Each one is Problem → Why the usual approach
 * fails → What FusionX does → Proof → Process → CTA, per the actual PPC-landing-page
 * strategy this was built for: a Google ad for "legacy software modernization" should land
 * on a page about exactly that, not the general homepage.
 *
 * Every claim here is grounded in what's already real and stated elsewhere on the site
 * (Work.tsx's case study, Fuse API Hub, VOH Opticians, WhoWeAre's capability list). Nothing
 * invented — no stats we didn't measure, no proof we don't have. Where a page's topic
 * (custom-erp) doesn't have a literal matching case study, it says what's actually true
 * (POS/inventory/backend systems work) rather than overclaiming.
 */

import type { Metadata } from 'next';

export type ProofItem = 'rebuild-case-study' | 'fuse-api-hub' | 'voh';

export type LandingContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  whyFailsHeading: string;
  whyFails: { title: string; desc: string }[];
  whatWeDoHeading: string;
  whatWeDo: string;
  proof: ProofItem[];
  showExistingSoftware: boolean;
  showAssessment: boolean;
  ctaHeadline: string;
};

export const legacyModernization: LandingContent = {
  slug: 'legacy-software-modernization',
  metaTitle: 'Legacy Software Modernization | FusionX',
  metaDescription:
    'Your system outgrew its foundation — that doesn’t mean starting over. We assess it, find the real problem, and fix that: not everything around it.',
  eyebrow: 'Legacy Software Modernization',
  h1: 'Your system outgrew its foundation. That doesn’t mean starting over.',
  intro:
    'Years of feature additions, one reasonable change at a time, and the database and architecture underneath no ' +
    'longer match what the system has become. Every change takes longer than it should. Every new addition ' +
    'carries more risk than the last.',
  whyFailsHeading: 'The usual options, and why they fall short',
  whyFails: [
    {
      title: 'A full rewrite',
      desc:
        'Expensive, risky, and often unnecessary. Most systems we look at need targeted repair, not replacement — ' +
        'the trick is knowing which is which before you commit to either.',
    },
    {
      title: 'Another round of patches',
      desc:
        'Optimization has diminishing returns. Past a certain point, the constraint isn’t the code you’re ' +
        'fixing — it’s the foundation underneath it, and no amount of patching changes that.',
    },
    {
      title: 'A generic dev shop',
      desc:
        'Quotes a rebuild by default, because that’s the bigger invoice — without investigating whether ' +
        'your system actually needs one.',
    },
  ],
  whatWeDoHeading: 'What we actually do',
  whatWeDo:
    'We assess the system first — architecture, database, dependencies, technical debt — and tell you ' +
    'which situation you’re actually in: fix what’s wrong, repair the foundation in place, or rebuild on ' +
    'something healthier. The recommendation follows the assessment. Not the other way around.',
  proof: ['rebuild-case-study'],
  showExistingSoftware: true,
  showAssessment: true,
  ctaHeadline: 'Find out what your system actually needs.',
};

export const businessSoftwareDevelopment: LandingContent = {
  slug: 'business-software-development',
  metaTitle: 'Custom Business Software Development | FusionX',
  metaDescription:
    'Software built around how your business actually works, not a template you have to bend around. From a first version through production and beyond.',
  eyebrow: 'Business Software Development',
  h1: 'Software built around how your business actually works.',
  intro:
    'Off-the-shelf software covers most of what you do and fights you on the rest. Spreadsheets have quietly ' +
    'become the system. Your process doesn’t fit any product on the market, so you end up bending the ' +
    'business to fit the tool instead of the other way around.',
  whyFailsHeading: 'The usual options, and why they fall short',
  whyFails: [
    {
      title: 'Off-the-shelf software',
      desc: 'Built for the average business, not yours. You end up working around it as much as you work with it.',
    },
    {
      title: 'No-code / template builders',
      desc: 'Fast to start, hard to extend. They cover the obvious cases well and fight you on everything specific to your business.',
    },
    {
      title: 'A freelancer or agency that disappears after launch',
      desc: 'Software needs engineering after it ships, not just before. A system nobody maintains is a system quietly decaying.',
    },
  ],
  whatWeDoHeading: 'What we actually do',
  whatWeDo:
    'We build software around your actual workflows — customer-facing or internal — from a first version ' +
    'through production and beyond. Databases, backend systems and infrastructure, not just the screens on top of them.',
  proof: ['fuse-api-hub', 'voh'],
  showExistingSoftware: false,
  showAssessment: false,
  ctaHeadline: 'Tell us what you’re trying to build.',
};

export const dataMigration: LandingContent = {
  slug: 'data-migration',
  metaTitle: 'Data Migration Services | FusionX',
  metaDescription:
    'Move to a new system without leaving your business data behind. Migration as a controlled, validated process — not a leap of faith.',
  eyebrow: 'Data Migration',
  h1: 'Move to a new system without leaving your business data behind.',
  intro:
    'Years of business data and operational history sit in the system you’re trying to move away from — ' +
    'and none of it is disposable. A migration that loses records, breaks relationships between tables, or can’t ' +
    'be verified against the original costs the business more than the problem it was meant to solve.',
  whyFailsHeading: 'The usual options, and why they fall short',
  whyFails: [
    {
      title: 'Manual export / import',
      desc: 'Works for a spreadsheet. Breaks down fast on real relational data, with no verification step to catch what didn’t survive the trip.',
    },
    {
      title: 'Migrating on faith',
      desc: 'Cutting over without validating the result against the source means you find out what broke after the business already depends on the new system.',
    },
    {
      title: 'Treating it as an afterthought',
      desc: 'Migration planned after the new system is already built usually means that system’s data model was never designed with your old data in mind.',
    },
  ],
  whatWeDoHeading: 'What we actually do',
  whatWeDo:
    'We treat migration as a controlled process: understand the source data and its relationships, plan the ' +
    'transformation, move it, and validate the result against the original before anything switches over. A ' +
    'rollback path stays open until you’re confident — not just told to be.',
  proof: ['rebuild-case-study'],
  showExistingSoftware: true,
  showAssessment: true,
  ctaHeadline: 'Talk to us before you move anything.',
};

export const customErp: LandingContent = {
  slug: 'custom-erp',
  metaTitle: 'Custom ERP & Internal Business Systems | FusionX',
  metaDescription:
    'Inventory, POS, operations, reporting — the software that runs the business, built around how you actually operate instead of a generic template.',
  eyebrow: 'Custom ERP & Internal Business Systems',
  h1: 'The internal system that runs the business — built to fit how you actually operate.',
  intro:
    'Inventory, POS, operations, reporting — the software nobody outside the business ever sees, but everyone ' +
    'inside it depends on. A generic ERP package covers most of how you work and forces a workaround for the rest.',
  whyFailsHeading: 'The usual options, and why they fall short',
  whyFails: [
    {
      title: 'Big-name ERP platforms',
      desc: 'Built for the average business, configured — not built — to fit yours. Customization is expensive, slow, and limited to what the platform allows.',
    },
    {
      title: 'Spreadsheets stitched together',
      desc: 'Works until it doesn’t. No single source of truth, no audit trail, and it breaks the moment the person who built it leaves.',
    },
    {
      title: 'A rebuild with no migration plan',
      desc: 'Replacing the system that runs daily operations without a validated plan for the data already in it risks the business it’s meant to support.',
    },
  ],
  whatWeDoHeading: 'What we actually do',
  whatWeDo:
    'We build the internal systems that run the business — inventory, point-of-sale, operational tools, ' +
    'dashboards, workflow — designed around your actual process instead of a generic template, and integrated ' +
    'with what you already have rather than replacing it wholesale on day one.',
  proof: ['voh'],
  showExistingSoftware: true,
  showAssessment: true,
  ctaHeadline: 'Tell us how the business actually runs.',
};

/** Same title/description/OG/Twitter shape used across all four pages — built once here so a change to the pattern doesn't need repeating in four page.tsx files. */
export function metadataFor(content: LandingContent): Metadata {
  const canonical = `/${content.slug}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: 'FusionX',
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonical,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
      images: ['/og-image.png'],
    },
  };
}

/** Matches the visible breadcrumb in LandingPage.tsx — same "Home / this page" structure, as data. */
export function breadcrumbJsonLdFor(content: LandingContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'FusionX', item: 'https://fusionx.tech/' },
      { '@type': 'ListItem', position: 2, name: content.eyebrow, item: `https://fusionx.tech/${content.slug}` },
    ],
  };
}

export const landingPages: LandingContent[] = [
  legacyModernization,
  businessSoftwareDevelopment,
  dataMigration,
  customErp,
];
