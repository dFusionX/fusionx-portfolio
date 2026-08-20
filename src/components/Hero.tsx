import { useRef } from 'react';
import { useHeroScene } from '../hooks/useHeroScene';
import { trackCta } from '../lib/analytics';

/**
 * The HUD panel used to be a "System Map" ornament listing Build/Improve/Modernize/
 * Migrate/Maintain — the same five words as the eyebrow, the Services spine and the
 * footer. It now carries proof instead: the most valuable space on the page saying
 * something a visitor can't get from the headline.
 */
const PROOF = [
  { num: '01', text: 'E-commerce, POS and internal business systems — in production, in daily use.' },
  { num: '02', text: 'A business application rebuilt on a new foundation, with years of existing data migrated across.' },
  { num: '03', text: "Ongoing engineering for systems a business can't afford to have go down." },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHeroScene(canvasRef, heroRef);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow" data-hero="eyebrow">
            Custom software · Existing systems · Data migration
          </p>
          <h1 data-hero="h1">The software your business runs on shouldn&apos;t be the thing holding it back.</h1>
          <p className="lede" data-hero="lede">
            We build new applications, fix what&apos;s breaking, modernize what&apos;s outdated, and migrate what you
            can&apos;t afford to lose — without disrupting the business that depends on it.
          </p>
          <div className="btn-row" data-hero="btns">
            <a
              className="btn btn-primary"
              href="#contact"
              onClick={() => trackCta('Talk to an Engineer', 'hero')}
            >
              Talk to an Engineer
            </a>
            <a
              className="btn btn-ghost"
              href="#assessment"
              onClick={() => trackCta('Get a Technical Assessment', 'hero')}
            >
              Get a Technical Assessment
            </a>
          </div>
          <p className="hero-qualify" data-hero="qualify">
            First call is 30 minutes and costs nothing. We work with small and mid-sized businesses that run on
            software — we&apos;re not the right fit for brochure websites or one-week projects.
          </p>
        </div>
        <div className="hud" data-hero="hud">
          <div className="hud-top">
            <span>
              <i className="hud-dot" />
              What we work on
            </span>
            <span>FX</span>
          </div>
          <ul className="hud-proof">
            {PROOF.map((p) => (
              <li key={p.num}>
                <span className="hud-proof-num">{p.num}</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
