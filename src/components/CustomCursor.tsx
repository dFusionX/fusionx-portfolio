import { useEffect, useRef, useState } from 'react';

// Only real buttons get the target-lock reticle. Cards/nodes/etc. are NOT clickable as a
// whole (only specific links inside some of them are) — reticling the whole container would
// imply the entire thing is actionable, which is misleading.
const DOCK_SELECTOR = '.btn';
// Actual links, inputs, and labels get the simple glowing ring. Hovering plain card/section
// background (non-interactive) intentionally shows neither — just the idle cursor.
const GLOW_SELECTOR = 'a, input, textarea, label';
const MAGNETIC_SELECTOR = DOCK_SELECTOR; // same set — every dockable element is also a real button
const MAGNETIC_STRENGTH = 0.35;

const RING = { free: 32, glow: 52 };
const DOCK_PAD = 10;
const LERP = 0.22;

type Corner = 'tl' | 'tr' | 'br' | 'bl';
const CORNERS: Corner[] = ['tl', 'tr', 'br', 'bl'];

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const bracketRefs = useRef<Record<Corner, HTMLDivElement | null>>({ tl: null, tr: null, br: null, bl: null });
  const [mode, setMode] = useState<'free' | 'glow' | 'dock'>('free');
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarsePointer || reduceMotion) return;

    document.documentElement.classList.add('has-custom-cursor');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y, size: RING.free };
    const box = { cx: mouse.x, cy: mouse.y, hw: 3, hh: 3 };
    let dockEl: HTMLElement | null = null;
    let currentMode: 'free' | 'glow' | 'dock' = 'free';
    let magnetEl: HTMLElement | null = null;

    function resetMagnet() {
      if (magnetEl) {
        magnetEl.style.transform = '';
        magnetEl = null;
      }
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement;
      const btn = target.closest?.(MAGNETIC_SELECTOR) as HTMLElement | null;
      if (btn !== magnetEl) resetMagnet();
      if (btn) {
        magnetEl = btn;
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${relX * MAGNETIC_STRENGTH}px, ${relY * MAGNETIC_STRENGTH}px)`;
      }
    }

    function setMode2(m: 'free' | 'glow' | 'dock') {
      currentMode = m;
      setMode(m);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const dockCandidate = target.closest?.(DOCK_SELECTOR) as HTMLElement | null;
      if (dockCandidate) {
        dockEl = dockCandidate;
        setMode2('dock');
        return;
      }
      if (target.closest?.(GLOW_SELECTOR)) {
        dockEl = null;
        setMode2('glow');
      }
    }
    function onOut(e: MouseEvent) {
      const related = e.relatedTarget as HTMLElement | null;
      const stillDocked = related?.closest?.(DOCK_SELECTOR);
      const stillGlowing = related?.closest?.(GLOW_SELECTOR);
      if (!stillDocked && !stillGlowing) {
        dockEl = null;
        setMode2('free');
      } else if (!stillDocked && dockEl) {
        dockEl = null;
        setMode2('glow');
      }
      if ((e.target as HTMLElement)?.closest?.(MAGNETIC_SELECTOR) && !related?.closest?.(MAGNETIC_SELECTOR)) {
        resetMagnet();
      }
    }
    function onDown() { setPressed(true); }
    function onUp() { setPressed(false); }
    function onWindowLeave() { dockEl = null; setMode2('free'); resetMagnet(); }

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onWindowLeave);

    let raf = 0;
    function tick() {
      // circular ring — used for free/glow, hidden while docked
      const targetSize = currentMode === 'glow' ? RING.glow : RING.free;
      ring.x += (mouse.x - ring.x) * LERP;
      ring.y += (mouse.y - ring.y) * LERP;
      ring.size += (targetSize - ring.size) * LERP;
      if (ringRef.current) {
        ringRef.current.style.width = `${ring.size}px`;
        ringRef.current.style.height = `${ring.size}px`;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      // reticle box — collapses to a point at the cursor when not docked, expands to
      // frame the target's live bounds (so it tracks the magnetic-pull shift too) when docked
      let desired: { cx: number; cy: number; hw: number; hh: number };
      if (dockEl) {
        const rect = dockEl.getBoundingClientRect();
        desired = {
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2,
          hw: rect.width / 2 + DOCK_PAD,
          hh: rect.height / 2 + DOCK_PAD,
        };
      } else {
        desired = { cx: mouse.x, cy: mouse.y, hw: 3, hh: 3 };
      }
      box.cx += (desired.cx - box.cx) * LERP;
      box.cy += (desired.cy - box.cy) * LERP;
      box.hw += (desired.hw - box.hw) * LERP;
      box.hh += (desired.hh - box.hh) * LERP;

      const pos: Record<Corner, [number, number, string]> = {
        tl: [box.cx - box.hw, box.cy - box.hh, 'translate(0, 0)'],
        tr: [box.cx + box.hw, box.cy - box.hh, 'translate(-100%, 0)'],
        br: [box.cx + box.hw, box.cy + box.hh, 'translate(-100%, -100%)'],
        bl: [box.cx - box.hw, box.cy + box.hh, 'translate(0, -100%)'],
      };
      CORNERS.forEach((c) => {
        const el = bracketRefs.current[c];
        if (!el) return;
        const [x, y, anchor] = pos[c];
        el.style.transform = `translate3d(${x}px, ${y}px, 0) ${anchor}`;
      });

      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onWindowLeave);
      resetMagnet();
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  const dotClass = `cursor-dot${mode !== 'free' ? ' is-hovering' : ''}${pressed ? ' is-pressed' : ''}`;
  const ringClass = `cursor-ring cursor-ring--${mode}${pressed ? ' is-pressed' : ''}`;
  const bracketBaseClass = `cursor-bracket${mode === 'dock' ? ' is-visible' : ''}${pressed ? ' is-pressed' : ''}`;

  return (
    <>
      <div ref={dotRef} className={dotClass} aria-hidden="true" />
      <div ref={ringRef} className={ringClass} aria-hidden="true">
        <span className="cursor-ring-spin" />
      </div>
      {CORNERS.map((c) => (
        <div
          key={c}
          ref={(el) => { bracketRefs.current[c] = el; }}
          className={`${bracketBaseClass} cursor-bracket--${c}`}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
