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
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  const [lang, setLang] = useState('en');
  const viewportRef = useRef(null);

  // Connect the scroll-reveal observer after mount
  useEffect(() => {
    // Small delay to let sections render before observing
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
  }, []);

  const toggleLang = () => setLang((l) => (l === 'en' ? 'ur' : 'en'));

  return (
    <DemoDevice viewportRef={viewportRef}>
      {/* Floating Controls: Mute + Language */}
      <FloatingControls lang={lang} onLangToggle={toggleLang} />

      {/* The Haveli Invitation Card */}
      <div className="card">
        <HeroSection />

        {/* Dear Family (brown band) */}
        <DearFamilySection />

        {/* Torn paper transition: brown → parchment */}
        <div className="torn-edge" />

        {/* Save the Date (parchment) */}
        <SaveTheDateSection />

        {/* Torn paper transition: parchment → brown */}
        <div className="torn-edge-reverse" />

        {/* Three Evenings (brown band) */}
        <ThreeEveningsSection />

        {/* Venue (parchment) */}
        <div className="torn-edge" />
        <VenueSection />

        {/* Gallery (brown band) */}
        <div className="torn-edge-reverse" />
        <GallerySection />

        {/* Sign-off (dark) */}
        <SignoffSection />
      </div>
    </DemoDevice>
  );
}
