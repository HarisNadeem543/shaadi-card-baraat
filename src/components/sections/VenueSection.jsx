import React, { useState } from 'react';

/**
 * VenueSection — Tabbed venue switcher inside the Haveli Arch frame.
 * Shows venue name, event time, address, and a Google Maps link.
 */

const VENUES = [
  {
    tab: 'Mehndi',
    event: 'Thu 17 Dec · 7:00 PM',
    name: 'Gulbagh Marquee',
    addr: 'Block C, Johar Town\nLahore',
    mapUrl: 'https://maps.google.com/?q=Johar+Town+Lahore',
  },
  {
    tab: 'Baraat',
    event: 'Sat 19 Dec · 7:30 PM',
    name: 'Royal Palm',
    addr: 'Canal Road\nLahore',
    mapUrl: 'https://maps.google.com/?q=Royal+Palm+Lahore',
  },
  {
    tab: 'Walima',
    event: 'Sun 20 Dec · 8:00 PM',
    name: 'Pearl Continental',
    addr: 'The Mall\nLahore',
    mapUrl: 'https://maps.google.com/?q=Pearl+Continental+Lahore',
  },
];

export default function VenueSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const venue = VENUES[activeIdx];

  return (
    <section className="venue-section">
      {/* Haveli Arch Frame */}
      <div className="arch-frame fade-in-up">
        <img
          src="/assets/haveli-arch.webp"
          alt="Haveli arch frame"
          loading="lazy"
        />
      </div>

      <h2 className="section-title fade-in-up">Where to find us</h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      {/* Venue tabs */}
      <div className="venue-tabs fade-in-up fade-delay-2">
        {VENUES.map((v, i) => (
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
      <div className="venue-detail fade-in-up fade-delay-3">
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
          Open in Maps
        </a>
      </div>
    </section>
  );
}
