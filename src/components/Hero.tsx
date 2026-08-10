import { useRef } from 'react';
import { useHeroScene } from '../hooks/useHeroScene';
import HeroMark from './HeroMark';

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
            Software Engineering — Build · Improve · Modernize · Migrate · Maintain
          </p>
          <h1 data-hero="h1">Software that keeps your business moving.</h1>
          <p className="lede" data-hero="lede">
            We build new applications, fix what's breaking, modernize what's outdated, and migrate what you
            can't afford to lose — without disrupting the business that depends on it.
          </p>
          <div className="btn-row" data-hero="btns">
            <a className="btn btn-primary" href="#contact">
              Start a Project
            </a>
            <a className="btn btn-ghost" href="#work">
              See Our Work
            </a>
          </div>
        </div>
        <div className="hud" data-hero="hud">
          <div className="hud-top">
            <span>
              <i className="hud-dot" />
              System Map
            </span>
            <span>FX / 01</span>
          </div>
          <div className="hud-mark">
            <HeroMark />
          </div>
          <ul className="hud-chain">
            <li className="active">
              <i />Build — new systems
            </li>
            <li>
              <i />Improve — better engineering
            </li>
            <li>
              <i />Modernize — new foundation
            </li>
            <li>
              <i />Migrate — data intact
            </li>
            <li>
              <i />Maintain — stays that way
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
