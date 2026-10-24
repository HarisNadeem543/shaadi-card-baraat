import React from 'react';

/**
 * HeroSection – Full-screen courtyard background with the couple's names,
 * Bismillah calligraphy, date, and city, overlaid on the haveli-night image.
 */
export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background: Haveli courtyard at night */}
      <img
        className="hero-bg"
        src="/assets/haveli-night.jpg"
        alt="Haveli courtyard at night with warm lanterns"
        loading="eager"
        decoding="async"
      />

      {/* Dark gradient overlay for text legibility */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Main hero text content */}
      <div className="hero-content">
        <p className="hero-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
        <p className="hero-subtitle">We're Getting Married</p>
        <h1 className="hero-name">Umair</h1>
        <span className="hero-ampersand">&amp;</span>
        <h1 className="hero-name">Meher</h1>
        <p className="hero-date">19 · 12 · 2026</p>
        <p className="hero-city">Lahore</p>
      </div>

      {/* Scroll prompt */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
