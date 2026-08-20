'use client';

// The client boundary for landing pages, same role SiteApp.tsx plays for the homepage —
// one clear 'use client' entry point, everything under it can freely use hooks/interactivity
// (Contact's form state, the analytics trackCta calls) without each leaf needing its own
// directive.
import MarkDefs from './MarkDefs';
import Mark from './Mark';
import ExistingSoftware from './ExistingSoftware';
import Assessment from './Assessment';
import HowWeWork from './HowWeWork';
import Faq from './Faq';
import Contact from './Contact';
import Footer from './Footer';
import { trackCta } from '../lib/analytics';
import type { LandingContent, ProofItem } from '../content/landing-pages';

const PROOF_CARDS: Record<ProofItem, { tag: string; title: string; strap: string; desc: string; tags: string[]; link?: { href: string; label: string } }> = {
  'rebuild-case-study': {
    tag: 'Case study',
    title: 'When software outgrows its foundation',
    strap: 'Retail business · E-commerce, POS and internal systems',
    desc:
      'A business application had grown for years until the database and architecture underneath no longer ' +
      'matched what it had become. We assessed it, rebuilt on a healthier foundation, and migrated years of ' +
      'business data across in a controlled, validated process — the business moved forward on everything it ' +
      'had already built, not from zero.',
    tags: ['Modernization', 'Rebuild', 'Data Migration'],
    link: { href: '/#work', label: 'Read the full case study' },
  },
  'fuse-api-hub': {
    tag: 'Our own product · built and operated by us',
    title: 'Fuse API Hub',
    strap: 'API infrastructure & marketplace platform',
    desc:
      'A platform connecting API providers and consumers — distribution, monetization, and management in one ' +
      'place. We designed it, built it, and run it in production.',
    tags: ['Platform Eng.', 'Auth', 'Subscriptions', 'Analytics'],
    link: { href: 'https://fuseapihub.com/info', label: 'Visit Fuse API Hub →' },
  },
  voh: {
    tag: 'Client · Ongoing engineering',
    title: 'VOH Opticians',
    strap: 'Engineering & maintenance partner',
    desc:
      'Ongoing support for a customer-facing platform and the internal business software behind it — ' +
      'e-commerce, POS, and backend systems in daily operational use.',
    tags: ['E-commerce', 'POS', 'Backend'],
  },
};

export default function LandingPage({ content }: { content: LandingContent }) {
  return (
    <>
      <MarkDefs />

      {/* Deliberately minimal — no full nav with anchor links to sections this page doesn't
          have. A landing page has one job: get the visitor to the form below, not offer an
          exit back into browsing. */}
      <header className="landing-header">
        <div className="wrap landing-header-inner">
          <a className="brand" href="/">
            <Mark />
            <span>
              FUSION<span className="x">X</span>
            </span>
          </a>
          <a
            className="btn btn-primary"
            href="#contact"
            onClick={() => trackCta('Talk to an Engineer', 'landing-header')}
          >
            Talk to an Engineer
          </a>
        </div>
      </header>

      {/* Explicit "you're on a subpage, here's the way back" — the logo already links home
          (standard convention), but this says so in words instead of relying on a visitor
          recognising that convention. */}
      <nav className="landing-breadcrumb" aria-label="Breadcrumb">
        <div className="wrap">
          <a href="/">fusionx.tech</a>
          <span aria-hidden="true"> / </span>
          <span>{content.eyebrow}</span>
        </div>
      </nav>

      <div className="field" />
      <div className="glow" />

      <main>
        <section className="landing-hero">
          <div className="wrap">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.h1}</h1>
            <p className="lede landing-hero-lede">{content.intro}</p>
            <div className="btn-row">
              <a
                className="btn btn-primary"
                href="#contact"
                onClick={() => trackCta('Talk to an Engineer', 'landing-hero')}
              >
                Talk to an Engineer
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head">
              <p className="eyebrow">{content.whyFailsHeading}</p>
            </div>
            <div className="why-grid">
              {content.whyFails.map((w) => (
                <div className="why-card" key={w.title}>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <p className="eyebrow">{content.whatWeDoHeading}</p>
            <p className="lede" style={{ marginTop: '1rem', maxWidth: '70ch' }}>
              {content.whatWeDo}
            </p>
          </div>
        </section>

        {content.showExistingSoftware && <ExistingSoftware />}

        <section id="proof">
          <div className="wrap">
            <div className="head">
              <p className="eyebrow">Proof</p>
              <h2>Not a pitch — real work.</h2>
            </div>
            <div className="work-grid">
              {content.proof.map((p) => {
                const c = PROOF_CARDS[p];
                return (
                  <div className="card" key={p}>
                    <span className="card-tag">{c.tag}</span>
                    <h3>{c.title}</h3>
                    <span className="strap">{c.strap}</span>
                    <p>{c.desc}</p>
                    <div className="tag-row">
                      {c.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {c.link && (
                      <a
                        className="card-link"
                        href={c.link.href}
                        {...(c.link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {c.link.label}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {content.showAssessment && <Assessment />}

        <HowWeWork />
        <Faq />

        <section>
          <div className="wrap">
            <div className="head" style={{ textAlign: 'center', alignItems: 'center' }}>
              <h2>{content.ctaHeadline}</h2>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
