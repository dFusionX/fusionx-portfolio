import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Ports the site's original vanilla entrance/scroll-reveal choreography into React.
 * Runs once after the full page has mounted. Selectors match the class names used
 * throughout the section components, exactly as in the static build this was ported from.
 */
export function useScrollAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.reveal', { opacity: 1 });
        return;
      }

      // hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero="eyebrow"]', { opacity: 0, y: 10, duration: 0.5 })
        .from('[data-hero="h1"]', { opacity: 0, y: 26, duration: 0.8 }, '-=.3')
        .from('[data-hero="lede"]', { opacity: 0, y: 16, duration: 0.6 }, '-=.5')
        .from('[data-hero="btns"] .btn', { opacity: 0, y: 12, duration: 0.5, stagger: 0.1 }, '-=.4')
        .from('[data-hero="qualify"]', { opacity: 0, y: 10, duration: 0.5 }, '-=.25')
        .from('[data-hero="hud"]', { x: 24, duration: 0.8 }, '-=.6');

      // grouped reveals: stagger children, single reveal for lone blocks
      const groups: [string, string][] = [
        ['.doors', '.door'],
        ['.spine-nodes', '.node'],
        ['.work-grid', '.card'],
        ['.why-grid', '.why-card'],
        ['.timeline', '.step'],
        ['.grid-4', ':scope > div'],
        ['.people', '.person'],
        ['.faq', '.faq-item'],
      ];
      groups.forEach(([containerSel, itemSel]) => {
        document.querySelectorAll<HTMLElement>(`${containerSel}.reveal, ${containerSel}`).forEach((container) => {
          const items = container.querySelectorAll(itemSel);
          if (!items.length) return;
          gsap.fromTo(
            items,
            { opacity: 0, y: 18 },
            {
              opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
              scrollTrigger: { trigger: container, start: 'top 85%' },
            }
          );
          container.style.opacity = '1';
          container.dataset.revealed = 'true';
        });
      });

      // plain reveal blocks (headers, ledes, panels not covered above)
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        if (el.dataset.revealed) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
        );
      });

      // header state on scroll
      ScrollTrigger.create({
        start: 'top -80',
        toggleClass: { targets: 'header', className: 'is-scrolled' },
      });

      // lifecycle spine: draw the connecting line and step the active node as you scroll
      const spine = document.querySelector('.spine');
      if (spine) {
        const line = spine.querySelector('.spine-line');
        const nodes = spine.querySelectorAll('.node');
        if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
        ScrollTrigger.create({
          trigger: spine,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.6,
          onUpdate: (self) => {
            if (line) gsap.set(line, { scaleX: self.progress });
            const idx = Math.min(nodes.length - 1, Math.floor(self.progress * nodes.length));
            nodes.forEach((n, i) => n.classList.toggle('is-current', i === idx));
          },
        });
      }
    });

    // failsafe: guarantee content isn't left invisible if anything above throws
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => { el.style.opacity = '1'; });
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);
}
