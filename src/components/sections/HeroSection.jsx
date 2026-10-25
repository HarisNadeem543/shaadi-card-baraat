import React from 'react';

/**
 * HeroSection – Full-screen courtyard background with the couple's names,
 * Bismillah calligraphy, date, and city, overlaid on the haveli-night image.
 * Supports bilingual English and Urdu text.
 */
export default function HeroSection({ t, lang }) {
  return (
    <section className={`hero-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      {/* Background: Haveli courtyard at night */}
      <img
        className="hero-bg"
        src="/assets/haveli-night.jpg"
        alt="Courtyard at night with warm lanterns"
        loading="eager"
        decoding="async"
      />

      {/* Dark gradient overlay for text legibility */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Main hero text content */}
      <div className="hero-content">
        <p className="hero-bismillah">{t.bismillah}</p>
        <p className="hero-subtitle">{t.subtitle}</p>
        <h1 className="hero-name">{t.name1}</h1>
        <span className="hero-ampersand">{t.amp}</span>
        <h1 className="hero-name">{t.name2}</h1>
        <p className="hero-date">{t.date}</p>
        <p className="hero-city">{t.city}</p>
      </div>

      {/* Scroll prompt */}
      <div className="scroll-indicator">
        <span>{t.scroll}</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
