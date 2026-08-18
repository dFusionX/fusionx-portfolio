'use client';

// The entire page tree is one client component: nearly every section uses hooks (scroll
// reveals, the hero's Three.js scene, the custom cursor), so there's no real Server/Client
// split within the page itself. The win from Next over the old Vite SPA isn't "less client
// JS" — it's that Next server-renders this client component's HTML on the very first
// request (then hydrates), so crawlers and JS-disabled visitors see real content without
// the Playwright prerender workaround the Vite build needed.
import { useEffect } from 'react';
import MarkDefs from './components/MarkDefs';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TwoDoors from './components/TwoDoors';
import ExistingSoftware from './components/ExistingSoftware';
import Assessment from './components/Assessment';
import Services from './components/Services';
import Work from './components/Work';
import HowWeWork from './components/HowWeWork';
import WhoWeAre from './components/WhoWeAre';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useScrollAnimations } from './hooks/useScrollAnimations';

/**
 * Section order, and why it changed.
 *
 * Was: Hero → Problem → Services → ExistingSoftware → Assessment → HowWeWork → Work →
 * InternalSystems → Technology → WhyFusionX → About → Contact.
 *
 * That put five restatements of the Build/Improve/Modernize/Migrate/Maintain framework
 * ahead of any proof, any named human, or any reason to trust two strangers with a
 * production database.
 *
 * Now: identify yourself (TwoDoors) → the differentiating wedge (ExistingSoftware) → the
 * conversion mechanism (Assessment) → full capability, stated once (Services) → proof
 * (Work) → process (HowWeWork) → who we actually are (WhoWeAre) → objections (Faq) → ask
 * (Contact).
 *
 * Removed: Problem (became TwoDoors), InternalSystems, Technology, WhyFusionX and About —
 * the last four are folded into WhoWeAre, which replaces four capability restatements with
 * the one thing the site never said: who FusionX is.
 */
export default function SiteApp() {
  useScrollAnimations();

  // close the mobile nav on Escape, and un-stick the checkbox state if the viewport grows past the breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) {
        const toggle = document.getElementById('nav-toggle') as HTMLInputElement | null;
        if (toggle) toggle.checked = false;
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <MarkDefs />
      <CustomCursor />
      <Nav />
      <div className="field" />
      <div className="glow" />
      <main id="top">
        <Hero />
        <TwoDoors />
        <ExistingSoftware />
        <Assessment />
        <Services />
        <Work />
        <HowWeWork />
        <WhoWeAre />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
