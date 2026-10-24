import React, { useState } from 'react';

/**
 * VenueSection — Tabbed venue switcher inside the Haveli Arch frame.
 * Shows venue name, event time, address, and a Google Maps link.
 * Supports bilingual English and Urdu text.
 */
export default function VenueSection({ t, lang }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const venues = t.venues;
  const venue = venues[activeIdx] || venues[0];

  return (
    <section className={`venue-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      {/* Haveli Arch Frame */}
      <div className="arch-frame fade-in-up">
        <img
          src="/assets/haveli-arch.webp"
          alt="Haveli arch frame"
          loading="lazy"
        />
      </div>

      <h2 className="section-title fade-in-up">{t.title}</h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      {/* Venue tabs */}
      <div className="venue-tabs fade-in-up fade-delay-2">
        {venues.map((v, i) => (
          <button
            key={v.tab}
            className={`venue-tab${i === activeIdx ? ' active' : ''}`}
            onClick={() => setActiveIdx(i)}
          >
            {v.tab}
          </button>
        ))}
      </div>

      {/* Venue detail */}
      <div className="venue-detail fade-in-up fade-delay-3" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
        <div className="venue-name">{venue.name}</div>
        <div className="venue-time">{venue.event}</div>
        <div className="venue-addr">{venue.addr}</div>
        <a
          className="map-link"
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6A4.5 4.5 0 0 1 8 1.5Z" />
            <circle cx="8" cy="6" r="1.5" />
          </svg>
          {t.mapBtn}
        </a>
      </div>
    </section>
  );
}
