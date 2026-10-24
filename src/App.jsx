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
import { TRANSLATIONS } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const viewportRef = useRef(null);

  // Active translation dictionary
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Audio Play / Pause handler
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play prevented by browser:', err);
        });
    }
  };

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
    <DemoDevice viewportRef={viewportRef}>
      {/* Background Wedding Audio (track.mp3) */}
      <audio
        ref={audioRef}
        src="/assets/track.mp3"
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating Controls: Audio Equalizer & Bilingual Switcher */}
      <FloatingControls
        isPlaying={isPlaying}
        onToggleAudio={toggleAudio}
        lang={lang}
        onLangToggle={toggleLang}
      />

      {/* The Haveli Invitation Card */}
      <div className={`card ${lang === 'ur' ? 'lang-ur' : ''}`}>
        {/* 1. Hero / Courtyard */}
        <HeroSection t={t.hero} lang={lang} />

        {/* 2. Dear Family (brown band) */}
        <DearFamilySection t={t.dearFamily} lang={lang} />

        {/* Torn paper transition: brown → parchment */}
        <div className="torn-edge" />

        {/* 3. Save the Date (parchment) */}
        <SaveTheDateSection t={t.saveDate} lang={lang} />

        {/* Torn paper transition: parchment → brown */}
        <div className="torn-edge-reverse" />

        {/* 4. Three Evenings (brown band) */}
        <ThreeEveningsSection t={t.threeEvenings} lang={lang} />

        {/* 5. Venue (parchment) */}
        <div className="torn-edge" />
        <VenueSection t={t.venue} lang={lang} />

        {/* 6. Gallery (brown band) */}
        <div className="torn-edge-reverse" />
        <GallerySection t={t.gallery} lang={lang} />

        {/* 7. Sign-off (closing night) */}
        <SignoffSection t={t.signoff} lang={lang} />
      </div>
    </DemoDevice>
  );
}
