import React from 'react';

/**
 * ThreeEveningsSection — Mehndi, Baraat & Nikah, Walima timeline cards
 * with medallion images and event details.
 * Supports bilingual English and Urdu text.
 */
export default function ThreeEveningsSection({ t, lang }) {
  return (
    <section className={`three-evenings-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      <h2 className="section-title fade-in-up">{t.title}</h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="fade-in-up fade-delay-2">
        {t.events.map((event) => (
          <div className="event-card" key={event.name}>
            <img
              className="medallion"
              src={event.medallion}
              alt={event.name}
              loading="lazy"
            />
            <div className="event-info" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <div className="event-name">{event.name}</div>
              <div className="event-detail">{event.date}</div>
              <div className="event-venue">{event.venue}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
