import React, { useState, useRef, useEffect } from 'react';
import DemoDevice from './components/DemoDevice';
import FloatingControls from './components/FloatingControls';
import HeroSection from './components/sections/HeroSection';
import DearFamilySection from './components/sections/DearFamilySection';
import SaveTheDateSection from './components/sections/SaveTheDateSection';
import ThreeEveningsSection from './components/sections/ThreeEveningsSection';
import VenueSection from './components/sections/VenueSection';
import GallerySection from './components/sections/GallerySection';
import SignoffSection from './components/sections/SignoffSection';
import TornEdgeDivider from './components/TornEdgeDivider';
import LoadingScreen from './components/LoadingScreen';
import { TRANSLATIONS, getTranslations } from './data/translations';
import { getInvitationMode } from './utils/invitationMode';

export default function App() {
  const [mode, setMode] = useState(getInvitationMode);
  const [lang, setLang] = useState('en');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);
  const viewportRef = useRef(null);
  const fadeFrameRef = useRef(null);

  // Re-check mode if browser history changes
  useEffect(() => {
    const handlePopState = () => setMode(getInvitationMode());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Active translation dictionary tailored for language and card mode ('full' vs 'walima')
  const t = getTranslations(lang, mode);

  /**
   * Smooth volume fade helper using requestAnimationFrame with cosine easing
   * @param {number} targetVolume - Final volume between 0 and 1
   * @param {number} duration - Transition duration in ms
   * @param {Function} [onComplete] - Callback executed on finish
   */
  const fadeAudio = (targetVolume, duration = 1000, onComplete) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeFrameRef.current) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }

    const startVolume = audio.volume;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cosine easing
      const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      const newVol = startVolume + (targetVolume - startVolume) * eased;
      audio.volume = Math.max(0, Math.min(1, newVol));

      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = targetVolume;
        fadeFrameRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeFrameRef.current = requestAnimationFrame(step);
  };

  /**
   * Audio Play / Pause toggle with smooth volume transitions
   */
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Smooth fade-out from 100% to 0%, then pause
      setIsPlaying(false);
      fadeAudio(0, 800, () => {
        audio.pause();
      });
    } else {
      // Start from 0, play and smoothly swell to 80%
      setIsPlaying(true);
      if (audio.paused) {
        audio.volume = 0;
        audio
          .play()
          .then(() => {
            fadeAudio(0.8, 1200);
          })
          .catch((err) => {
            console.warn('Audio play prevented:', err);
          });
      } else {
        fadeAudio(0.8, 1000);
      }
    }
  };

  /**
   * Master ignition trigger: When guest swings/taps the lantern,
   * starts wedding instrumental track with authentic 2.4s volume swell.
   */
  const handleIgnite = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeAudio(0.8, 2400);
        })
        .catch((err) => {
          console.warn('Audio play prevented on ignite:', err);
        });
    } else {
      fadeAudio(0.8, 1800);
    }
  };

  const handleRevealed = () => {
    setIsRevealed(true);
  };

  // Lock scrolling within viewport until lantern is ignited and revealed
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    if (!isRevealed) {
      vp.style.overflowY = 'hidden';
      vp.scrollTop = 0;
    } else {
      vp.style.overflowY = 'auto';
    }
  }, [isRevealed]);

  // Language switcher handler
  const toggleLang = () => {
    setLang((current) => (current === 'en' ? 'ur' : 'en'));
  };

  // Connect scroll-reveal observer after mount & language change
  useEffect(() => {
    const timer = setTimeout(() => {
      const root = viewportRef.current;
      if (!root) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        {
          root,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.1,
        }
      );

      const elements = root.querySelectorAll('.fade-in-up');
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <>
      {/* 0. Royal Haveli Preloader Screen */}
      <LoadingScreen
        lang={lang}
        onReady={() => setIsLoaded(true)}
      />

      <DemoDevice
        lang={lang}
        mode={mode}
        viewportRef={viewportRef}
        controls={
          /* Fixed Floating Controls pinned atop the screen (slides down on reveal) */
          <FloatingControls
            isPlaying={isPlaying}
            onToggleAudio={toggleAudio}
            lang={lang}
            onLangToggle={toggleLang}
            isRevealed={isRevealed}
          />
        }
      >
        {/* Background Wedding Audio (track.mp3) */}
        <audio
          ref={audioRef}
          src="/assets/track.mp3"
          loop
          preload="auto"
          onEnded={() => setIsPlaying(false)}
        />

        {/* The Haveli Invitation Card (scrolls inside the device) */}
        <div className={`card ${lang === 'ur' ? 'lang-ur' : ''}`}>
          {/* 1. Hero / Courtyard */}
          <HeroSection
            t={t.hero}
            lang={lang}
            onIgnite={handleIgnite}
            onRevealed={handleRevealed}
          />

          {/* 2. Dear Family (brown band) */}
          <DearFamilySection t={t.dearFamily} lang={lang} />

          {/* Torn paper transition: brown → parchment */}
          <TornEdgeDivider
            topColor="var(--band-deep)"
            bottomColor="var(--parchment-2)"
            variant="A"
            height={22}
          />

          {/* 3. Save the Date (parchment) */}
          <SaveTheDateSection t={t.saveDate} lang={lang} />

          {/* Torn paper transition: parchment → brown */}
          <TornEdgeDivider
            topColor="var(--parchment-2)"
            bottomColor="var(--band-deep)"
            variant="B"
            reverse={true}
            height={22}
          />

          {/* 4. Three Evenings (brown band) */}
          <ThreeEveningsSection t={t.threeEvenings} lang={lang} />

          {/* 5. Venue (parchment) */}
          <TornEdgeDivider
            topColor="var(--band-deep)"
            bottomColor="var(--parchment)"
            variant="B"
            height={22}
          />
          <VenueSection t={t.venue} lang={lang} />

          {/* 6. Gallery (brown band) */}
          <TornEdgeDivider
            topColor="var(--parchment)"
            bottomColor="var(--band-deep)"
            variant="A"
            reverse={true}
            height={22}
          />
          <GallerySection t={t.gallery} lang={lang} />

          {/* 7. Sign-off (closing night) */}
          <SignoffSection t={t.signoff} lang={lang} />
        </div>
      </DemoDevice>
    </>
  );
}
