import React, { useState, useEffect, useRef, useCallback } from 'react';
import CourtyardLights from '../entrance/CourtyardLights';
import PendulumLantern from '../entrance/PendulumLantern';
import ParticleCanvas from '../entrance/ParticleCanvas';
import EntranceCopy from '../entrance/EntranceCopy';

/**
 * HeroSection — Interactive Haveli Entrance & Grand Hero Reveal.
 *
 * Replicates the authentic ritual from niru.pk:
 * 1. Initial State: The Haveli courtyard sits in deep night darkness (.dark).
 * 2. Interaction: Guest swings or taps the hanging pendulum lantern.
 * 3. Physics & Visuals: The lantern warms, casts a dynamic floor light pool (.diya-floor),
 *    and sparks drift into the air on a canvas layer (#fx).
 * 4. Ignition Sequence (Sequential Glowing Lamps):
 *    - Flash burst (.flash) & audio starts with smooth swell
 *    - 600ms: Left lantern lights up with golden flicker
 *    - 900ms: Middle-left lantern lights up
 *    - 1250ms: Right lantern lights up
 *    - 1900ms: Grand Haveli central doorway bursts with radiant golden light
 * 5. Awakening (2450ms): The dark mask dissolves, revealing the warm courtyard.
 * 6. Grand Reveal (3350ms): Wedding details cascade into place (Bismillah, Maida & Usman, Date, City, Scroll Cue).
 */

const GOLD_COLORS = ['#F0DCA9', '#E4CE9E', '#D9B876', '#FFF7E2'];
const SWEEP_TARGET = 3.6; // Total arc swept to trigger ignition
const GRAVITY = 13.5;
const DAMPING = 0.30;

export default function HeroSection({
  t,
  lang,
  onIgnite,
  onRevealed,
}) {
  const entranceRef = useRef(null);
  const lampRef = useRef(null);
  const canvasRef = useRef(null);

  // Animation phase states
  const [isLit, setIsLit] = useState(false);
  const [isAwake, setIsAwake] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isNudge, setIsNudge] = useState(false);
  const [promptText, setPromptText] = useState('');

  // Sequential glowing lamps state
  const [glows, setGlows] = useState({
    left: false,
    mid: false,
    right: false,
    door: false,
  });

  // Physics & Animation internal refs (avoid re-rendering on 60fps raf loop)
  const stateRef = useRef({
    th: 0, // Pendulum angle
    thv: 0, // Angular velocity
    L: 0, // Pendulum chain length
    piv: 0, // Pivot Y
    swept: 0,
    f: 0, // Progress [0, 1]
    dragging: false,
    lit: false,
    done: false,
    tPrev: 0,
    tAbs: 0,
    w: 0,
    h: 0,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    fx: { x: 0, y: 0 },
    particles: [],
  });

  const rafRef = useRef(null);

  /**
   * Recalculates viewport dimensions and pendulum chain length
   */
  const handleResize = useCallback(() => {
    const entrance = entranceRef.current;
    const lamp = lampRef.current;
    const canvas = canvasRef.current;
    if (!entrance || !lamp || !canvas) return;

    const s = stateRef.current;
    s.w = entrance.clientWidth;
    s.h = entrance.clientHeight;
    s.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = s.w * s.dpr;
    canvas.height = s.h * s.dpr;

    s.L = lamp.getBoundingClientRect().height || s.h * 0.40;
    s.piv = lamp.offsetTop || 0;

    placeLantern();
  }, []);

  /**
   * Updates CSS variables for the light pool, dark circle mask, and lantern rotation
   */
  const placeLantern = () => {
    const entrance = entranceRef.current;
    const lamp = lampRef.current;
    if (!entrance || !lamp) return;

    const s = stateRef.current;
    const cx = s.w * 0.5 + Math.sin(s.th) * s.L;
    const cy = s.piv + Math.cos(s.th) * s.L;

    s.fx.x = cx;
    s.fx.y = cy - 14;

    lamp.style.transform = `translateX(-50%) rotate(${(s.th * 57.2958).toFixed(2)}deg)`;

    entrance.style.setProperty('--dx', `${cx.toFixed(1)}px`);
    entrance.style.setProperty('--dy', `${cy.toFixed(1)}px`);

    const sn = Math.sin(s.th);
    entrance.style.setProperty('--floorY', `${(s.h * 0.72).toFixed(1)}px`);
    entrance.style.setProperty('--swing', Math.abs(sn).toFixed(3));
    entrance.style.setProperty('--tilt', sn.toFixed(3));
    entrance.style.setProperty('--f', s.f.toFixed(3));

    // Warming lantern filter values
    entrance.style.setProperty('--lampb', (0.4 + s.f * 0.9).toFixed(3));
    entrance.style.setProperty('--lamps', (0.45 + s.f * 0.75).toFixed(3));

    const darkEl = entrance.querySelector('.dark');
    if (darkEl && !s.lit) {
      darkEl.style.transform = `translate(-50%,-50%) scale(${(1 + s.f * 1.9).toFixed(3)})`;
    }
  };

  /**
   * Spawns spark particles from the lantern wick
   */
  const spawnSpark = (count = 1) => {
    const s = stateRef.current;
    for (let i = 0; i < count; i++) {
      s.particles.push({
        x: s.fx.x + (Math.random() - 0.5) * 6,
        y: s.fx.y - 4,
        vx: (Math.random() - 0.5) * 1.1,
        vy: -(0.6 + Math.random() * 1.8),
        r: 0.7 + Math.random() * 1.3,
        life: 0,
        ttl: 0.5 + Math.random() * 0.7,
        c: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
        smoke: false,
      });
    }
  };

  /**
   * Spawns subtle smoke puff if the guest pauses before full ignition
   */
  const spawnSmoke = () => {
    const s = stateRef.current;
    for (let i = 0; i < 7; i++) {
      s.particles.push({
        x: s.fx.x + (Math.random() - 0.5) * 5,
        y: s.fx.y - 8,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.4 + Math.random() * 0.7),
        r: 2 + Math.random() * 3,
        life: 0,
        ttl: 1.4 + Math.random() * 0.9,
        c: '#C9BBAE',
        smoke: true,
      });
    }
  };

  /**
   * Master ignition trigger: lights the courtyard and begins sequential lamp illumination
   */
  const ignite = useCallback(() => {
    const s = stateRef.current;
    if (s.lit) return;
    s.lit = true;
    s.f = 1;
    s.dragging = false;

    setIsLit(true);
    spawnSpark(18);

    // Notify parent to start audio playback with volume swell
    if (onIgnite) onIgnite();

    const entrance = entranceRef.current;
    const darkEl = entrance ? entrance.querySelector('.dark') : null;
    if (darkEl) {
      darkEl.style.transition = 'transform 2s cubic-bezier(.22,.61,.36,1)';
      darkEl.style.transform = 'translate(-50%,-50%) scale(5.2)';
    }

    // 1. Sequential glowing animations
    setTimeout(() => setGlows((prev) => ({ ...prev, left: true })), 600);
    setTimeout(() => setGlows((prev) => ({ ...prev, mid: true })), 900);
    setTimeout(() => setGlows((prev) => ({ ...prev, right: true })), 1250);
    setTimeout(() => setGlows((prev) => ({ ...prev, door: true })), 1900);

    // 2. Awakening: Dark mask fully dissolves, courtyard returns to scale 1
    setTimeout(() => {
      if (darkEl) {
        darkEl.style.transition = '';
        darkEl.style.transform = '';
      }
      setIsAwake(true);
    }, 2450);

    // 3. Grand Reveal: Hero text cascades in, scroll unlocked
    setTimeout(() => {
      setIsRevealed(true);
      if (onRevealed) onRevealed();
    }, 3350);

    // 4. Teardown particle loop after fade out
    setTimeout(() => {
      s.done = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }, 5400);
  }, [onIgnite, onRevealed]);

  /**
   * Main 60fps render & physics integration loop
   */
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const s = stateRef.current;
    s.tPrev = performance.now();

    const frameLoop = (now) => {
      const dt = Math.min((now - s.tPrev) / 1000, 0.05) || 0.016;
      s.tPrev = now;
      s.tAbs += dt;

      if (!s.lit) {
        if (!s.dragging) {
          // Harmonic pendulum equation: d(thv)/dt = -GRAV * sin(th) - DAMP * thv
          const th0 = s.th;
          s.thv += (-GRAVITY * Math.sin(s.th) - DAMPING * s.thv) * dt;
          s.th += s.thv * dt;

          // Accumulate arc progress
          s.swept += Math.abs(s.th - th0);
        }

        // Slight progress decay if abandoned completely
        if (!s.dragging && Math.abs(s.thv) < 0.15) {
          s.swept = Math.max(0, s.swept - dt * 0.18);
        }

        s.f = Math.max(0, Math.min(1, s.swept / SWEEP_TARGET));
        placeLantern();

        // Spawn ember sparks while swinging vigorously
        if (Math.abs(s.thv) > 1.1 && Math.random() < s.f * 0.6) {
          spawnSpark(1);
        }

        // Auto ignite once arc threshold reached
        if (s.f >= 1) {
          ignite();
        }
      }

      // Draw canvas particles
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      ctx.clearRect(0, 0, s.w, s.h);

      // Render glowing wick radial halo
      if (!s.done && s.fx.x > 0) {
        const n = 0.5 + 0.5 * Math.sin(s.tAbs * 6.2) + 0.25 * Math.sin(s.tAbs * 11.7 + 1.3);
        const r = 26 + s.f * 96 + n * 5;
        ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createRadialGradient(s.fx.x, s.fx.y, 0, s.fx.x, s.fx.y, r);
        g.addColorStop(0, `rgba(255,226,163,${(0.10 + 0.42 * s.f).toFixed(3)})`);
        g.addColorStop(0.45, `rgba(240,180,100,${(0.05 + 0.20 * s.f).toFixed(3)})`);
        g.addColorStop(1, 'rgba(240,180,100,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.fx.x, s.fx.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      // Render drifting particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.life += dt;
        p.x += p.vx;
        p.y += p.vy;

        if (p.life > p.ttl) {
          s.particles.splice(i, 1);
          continue;
        }

        const k = 1 - p.life / p.ttl;
        if (p.smoke) {
          ctx.globalAlpha = 0.10 * k;
          ctx.fillStyle = '#C9BBAE';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + p.life * 5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = 0.85 * k;
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!s.done) {
        rafRef.current = requestAnimationFrame(frameLoop);
      }
    };

    rafRef.current = requestAnimationFrame(frameLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleResize, ignite]);

  // Pointer drag interaction handlers
  const handlePointerDown = (e) => {
    const s = stateRef.current;
    if (s.lit) return;
    s.dragging = true;
    s.thv = 0;

    const darkEl = entranceRef.current?.querySelector('.dark');
    if (darkEl) darkEl.style.transition = 'none';

    aim(e);
  };

  const aim = (e) => {
    const s = stateRef.current;
    const entrance = entranceRef.current;
    if (!entrance) return;

    const r = entrance.getBoundingClientRect();
    const dx = e.clientX - r.left - s.w * 0.5;
    const dy = Math.max(24, e.clientY - r.top - s.piv);

    let tAngle = Math.atan2(dx, dy);
    tAngle = Math.max(-0.62, Math.min(0.62, tAngle));

    s.swept += Math.abs(tAngle - s.th);
    s.thv = (tAngle - s.th) / 0.06;
    s.th = tAngle;
  };

  const handlePointerMove = (e) => {
    const s = stateRef.current;
    if (!s.dragging || s.lit) return;
    aim(e);
  };

  const handlePointerUp = () => {
    const s = stateRef.current;
    if (s.lit || !s.dragging) return;
    s.dragging = false;

    if (s.f > 0.1 && s.f < 1) {
      spawnSmoke();
      setIsNudge(true);
      setTimeout(() => setIsNudge(false), 700);
      setPromptText(lang === 'ur' ? 'جھلاتے رہیں…' : 'Keep it swinging…');
    }
  };

  // Keyboard and Tap push support
  const handleKeyDown = (e) => {
    const s = stateRef.current;
    if (s.lit) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      s.thv += (e.key === 'ArrowLeft' ? -1 : 1) * 2.2;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      ignite();
    }
  };

  const handleLampClick = () => {
    const s = stateRef.current;
    if (s.lit) return;

    // A direct tap gives the lantern a strong swing impulse or ignites directly!
    s.thv += (s.th >= 0 ? 1 : -1) * 3.4;
    s.swept += 1.2;
    if (s.swept >= SWEEP_TARGET) {
      ignite();
    }
  };

  return (
    <section
      className={`entrance ${isLit ? 'lit' : ''} ${isAwake ? 'awake' : ''} ${
        isRevealed ? 'revealed' : ''
      } ${lang === 'ur' ? 'ur-mode' : ''}`}
      id="entrance"
      ref={entranceRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 1. Background: Haveli courtyard night scene */}
      <img
        className="night"
        src="/assets/haveli-night.jpg"
        alt="Courtyard at night"
        draggable="false"
        loading="eager"
      />

      {/* 2. Interactive Illumination, Shadows, and Glowing Lanterns */}
      <CourtyardLights glows={glows} />

      {/* 3. The Hanging Pendulum Lantern */}
      <PendulumLantern
        ref={lampRef}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        onClick={handleLampClick}
        isLit={isLit}
        lang={lang}
      />

      {/* 4. Canvas Particle Sparks & Smoke */}
      <ParticleCanvas ref={canvasRef} />

      {/* 5. Poetic Copy & Instruction Prompt (fades out on ignition) */}
      <EntranceCopy
        t={t}
        lang={lang}
        isNudge={isNudge}
        promptText={promptText}
      />

      {/* 6. Grand Revealed Hero Typography (cascades into view on reveal) */}
      <div className="hero">
        <p className="bismillah h-item" dir="rtl">
          {t.bismillah}
        </p>

        <p className="eyebrow h-item">
          {t.subtitle}
        </p>

        <h1 className="names h-item">
          <span>{t.name1}</span>
          <span className="amp">{t.amp}</span>
          <span>{t.name2}</span>
        </h1>

        <p className="date h-item">{t.date}</p>
        <p className="place h-item">{t.city}</p>
      </div>

      {/* 7. Animated Scroll Cue */}
      <div className="scrollcue">
        <span>{t.scroll}</span>
        <i aria-hidden="true" />
      </div>
    </section>
  );
}
