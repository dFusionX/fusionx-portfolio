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
import Problem from './components/Problem';
import Services from './components/Services';
import ExistingSoftware from './components/ExistingSoftware';
import Assessment from './components/Assessment';
import HowWeWork from './components/HowWeWork';
import Work from './components/Work';
import InternalSystems from './components/InternalSystems';
import Technology from './components/Technology';
import WhyFusionX from './components/WhyFusionX';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useScrollAnimations } from './hooks/useScrollAnimations';

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
        <Problem />
        <Services />
        <ExistingSoftware />
        <Assessment />
        <HowWeWork />
        <Work />
        <InternalSystems />
        <Technology />
        <WhyFusionX />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
