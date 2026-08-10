import { useEffect, type RefObject } from 'react';
import * as THREE from 'three';

/**
 * The hero's ambient WebGL backdrop — a containment ring and wireframe core, ported 1:1
 * from the original build. Cleans up its renderer/listeners on unmount.
 */
export function useHeroScene(canvasRef: RefObject<HTMLCanvasElement>, heroRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    const heroEl = heroRef.current;
    if (reduceMotion || !canvas || !heroEl) return;

    const supportsWebGL = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    })();
    if (!supportsWebGL) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const styles = getComputedStyle(document.documentElement);
    const steel = new THREE.Color(styles.getPropertyValue('--steel').trim() || '#5B7C99');
    const plasma = new THREE.Color(styles.getPropertyValue('--plasma').trim() || '#FF6A1A');

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.014, 8, 96),
      new THREE.MeshBasicMaterial({ color: steel, transparent: true, opacity: 0.5 })
    );
    torus.rotation.x = Math.PI / 2.4;
    scene.add(torus);

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.008, 6, 96),
      new THREE.MeshBasicMaterial({ color: steel, transparent: true, opacity: 0.22 })
    );
    torus2.rotation.x = Math.PI / 2.4;
    torus2.rotation.y = 0.6;
    scene.add(torus2);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.62, 1),
      new THREE.MeshBasicMaterial({ color: plasma, wireframe: true, transparent: true, opacity: 0.9 })
    );
    scene.add(core);

    const coreGlow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.9, 0),
      new THREE.MeshBasicMaterial({ color: plasma, wireframe: true, transparent: true, opacity: 0.18 })
    );
    scene.add(coreGlow);

    const particleCount = window.innerWidth < 700 ? 220 : 480;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6 - 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: steel, size: 0.028, transparent: true, opacity: 0.55, sizeAttenuation: true })
    );
    scene.add(particles);

    const group = new THREE.Group();
    group.add(torus, torus2, core, coreGlow, particles);
    group.rotation.x = 0.15;
    scene.add(group);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const r = heroEl.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    heroEl.addEventListener('pointermove', onPointerMove);

    function resize() {
      const r = heroEl!.getBoundingClientRect();
      const w = r.width;
      const h = r.height || window.innerHeight * 0.9;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    let running = true;
    const io = new IntersectionObserver((entries) => { running = entries[0].isIntersecting; }, { threshold: 0 });
    io.observe(heroEl);
    const onVisibility = () => { if (document.hidden) running = false; };
    document.addEventListener('visibilitychange', onVisibility);

    const clock = new THREE.Clock();
    let raf = 0;
    function tick() {
      raf = requestAnimationFrame(tick);
      if (!running) return;
      const dt = clock.getDelta();
      torus.rotation.z += dt * 0.06;
      torus2.rotation.z -= dt * 0.04;
      core.rotation.y += dt * 0.25;
      core.rotation.x += dt * 0.12;
      coreGlow.rotation.y -= dt * 0.15;
      particles.rotation.y += dt * 0.015;
      group.rotation.y += (pointer.x * 0.25 - group.rotation.y) * 0.03;
      group.rotation.x += (0.15 + pointer.y * 0.15 - group.rotation.x) * 0.03;
      renderer.render(scene, camera);
    }
    tick();
    requestAnimationFrame(() => canvas.classList.add('is-ready'));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      heroEl.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      pGeo.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          const mat = obj.material as THREE.Material | THREE.Material[];
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
