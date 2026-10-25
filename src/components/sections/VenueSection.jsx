import React, { useState } from 'react';

/**
 * VenueSection — Replicates authentic Haveli design matching the reference image:
 * 1. Title at top ("Where to come")
 * 2. Rose garland divider
 * 3. Venue switcher tabs (separate pill buttons: MEHNDI, BARAAT & NIKKAH, WALIMA)
 * 4. Ornate Haveli Arch frame with venue details (event time, venue name, address,
 *    and "OPEN IN MAPS" button) centered INSIDE the arch opening window.
 * Supports bilingual English and Urdu text.
 */
export default function VenueSection({ t, lang }) {
  // Default to index 0 (BARAAT & NIKKAH) as the primary event
  const [activeIdx, setActiveIdx] = useState(0);
  const venues = t.venues;
  const venue = venues[activeIdx] || venues[0];

  return (
    <section className={`venue-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      {/* 1. Header: Title and Rose Garland Divider */}
      <h2 className="section-title fade-in-up">{t.title}</h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      {/* 2. Venue Switcher Tabs (Only if multiple venues exist) */}
      {venues.length > 1 && (
        <div className="venue-tabs fade-in-up fade-delay-2">
          {venues.map((v, i) => (
            <button
              key={v.tab}
              className={`venue-tab-pill${i === activeIdx ? ' active' : ''}`}
              onClick={() => setActiveIdx(i)}
            >
              {v.tab}
            </button>
          ))}
        </div>
      )}

      {/* 3. Arch Frame with Venue Details Positioned INSIDE the Arch Window Opening */}
      <div className="arch-frame-container fade-in-up fade-delay-3">
        <img
          src="/assets/haveli-arch.webp"
          alt="Ornate Wedding Arch"
          className="arch-bg-img"
          loading="lazy"
        />

        <div className="arch-inner-content" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
          <div className="venue-event-time">{venue.event}</div>
          <h3 className="venue-event-name">{venue.name}</h3>
          <p className="venue-event-addr">{venue.addr}</p>

          {venue.schedule && venue.schedule.length > 0 && (
            <div className="venue-schedule">
              {venue.schedule.map((item, i) => (
                <div key={i} className="venue-schedule-item">
                  <span className="schedule-time">{item.time}</span>
                  <span className="schedule-sep">·</span>
                  <span className="schedule-label">{item.label}</span>
                </div>
              ))}
            </div>
          )}

          <a
            className="venue-map-btn"
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="map-pin-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{t.mapBtn}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
