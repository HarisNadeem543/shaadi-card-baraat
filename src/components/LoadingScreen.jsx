import React, { useState, useEffect, useRef } from 'react';

/**
 * List of critical assets to preload before the card begins.
 * Includes courtyard night art, lantern, medallions, gallery images, and wedding track.
 */
const CRITICAL_ASSETS = [
  { url: '/assets/haveli-night.jpg', type: 'image' },
  { url: '/assets/haveli-lantern.webp', type: 'image' },
  { url: '/assets/haveli-night-soft.jpg', type: 'image' },
  { url: '/assets/haveli-hanging.webp', type: 'image' },
  { url: '/assets/haveli-arch.webp', type: 'image' },
  { url: '/assets/haveli-divider.webp', type: 'image' },
  { url: '/assets/haveli-garland.webp', type: 'image' },
  { url: '/assets/haveli-med-nikah.webp', type: 'image' },
  { url: '/assets/haveli-med-walima.webp', type: 'image' },
  { url: '/assets/couple1.jpg', type: 'image' },
  { url: '/assets/couple2.jpg', type: 'image' },
  { url: '/assets/couple3.jpg', type: 'image' },
  { url: '/assets/couple4.jpg', type: 'image' },
  { url: '/assets/iphone-mockup-20260921.webp', type: 'image' },
];

/**
 * LoadingScreen — Royal Haveli Preloader.
 * Preloads and GPU-decodes all assets and fonts before rendering the invitation.
 * Displays an elegant parchment ground with Maida & Usman branding and gold progress bar.
 */
export default function LoadingScreen({ lang = 'en', onReady, t }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const targetProgressRef = useRef(0);
  const animFrameRef = useRef(null);

  useEffect(() => {
    let completedCount = 0;
    // Total steps: images + fonts + audio
    const totalAssets = CRITICAL_ASSETS.length + 2;
    let isCancelled = false;

    const increment = () => {
      if (isCancelled) return;
      completedCount++;
      const ratio = Math.min(completedCount / totalAssets, 1);
      targetProgressRef.current = Math.round(ratio * 100);
    };

    // 1. Smooth RAF counter for fluid progress bar motion
    const updateProgressLoop = () => {
      setProgress((prev) => {
        const target = targetProgressRef.current;
        if (prev < target) {
          const step = Math.max(1, Math.ceil((target - prev) * 0.15));
          return Math.min(target, prev + step);
        }
        return prev;
      });

      if (!isCancelled) {
        animFrameRef.current = requestAnimationFrame(updateProgressLoop);
      }
    };
    animFrameRef.current = requestAnimationFrame(updateProgressLoop);

    // 2. Preload and decode images
    CRITICAL_ASSETS.forEach((asset) => {
      const img = new Image();
      img.src = asset.url;
      if (img.decode) {
        img.decode().then(increment).catch(increment);
      } else {
        img.onload = increment;
        img.onerror = increment;
      }
    });

    // 3. Preload web fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(increment).catch(increment);
    } else {
      increment();
    }

    // 4. Preload audio header
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = '/assets/track.mp3';
    const onAudioReady = () => {
      increment();
      cleanupAudio();
    };
    const cleanupAudio = () => {
      audio.removeEventListener('canplaythrough', onAudioReady);
      audio.removeEventListener('error', onAudioReady);
    };
    audio.addEventListener('canplaythrough', onAudioReady, { once: true });
    audio.addEventListener('error', onAudioReady, { once: true });
    audio.load();

    // 5. Completion watcher: Wait for 100% with minimum aesthetic delay
    const startTime = performance.now();
    const checkInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      // Allow at least 650ms for smooth perception, or complete immediately if past 4s
      if ((completedCount >= totalAssets && elapsed >= 650) || elapsed >= 4000) {
        clearInterval(checkInterval);
        targetProgressRef.current = 100;
        setProgress(100);

        // Hold at 100% briefly before dissolving
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsHidden(true);
            if (onReady) onReady();
          }, 650);
        }, 220);
      }
    }, 50);

    return () => {
      isCancelled = true;
      clearInterval(checkInterval);
      cleanupAudio();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [onReady]);

  if (isHidden) return null;

  const isUrdu = lang === 'ur';

  return (
    <div
      className={`card-boot-shield ${isFadingOut ? 'fade-out' : ''} ${
        isUrdu ? 'lang-ur' : ''
      }`}
      aria-label="Loading Invitation"
      role="status"
    >
      <div className="boot-content">
        {/* Sacred Bismillah */}
        <p className="boot-bismillah" dir="rtl">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        {/* Couple Title */}
        <h1 className="boot-title">
          {isUrdu ? 'مائدہ اور عثمان' : 'Maida & Usman'}
        </h1>

        {/* Slender golden progress bar */}
        <div className="boot-progress-track">
          <div
            className="boot-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status prompt & percentage counter */}
        <div className="boot-status-row">
          <span className="boot-status-text">
            {isUrdu ? 'شادی کارڈ کھل رہا ہے…' : 'Opening your invitation…'}
          </span>
          <span className="boot-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
