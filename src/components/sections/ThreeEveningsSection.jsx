import React from 'react';

/**
 * ThreeEveningsSection — Mehndi, Baraat & Nikah, Walima timeline cards
 * with medallion images and event details.
 */

const EVENTS = [
  {
    name: 'Mehndi',
    date: 'Thu 17 Dec · 7:00 PM',
    venue: 'Gulbagh Marquee, Johar Town',
    medallion: '/assets/haveli-med-mehndi.webp',
  },
  {
    name: 'Baraat & Nikah',
    date: 'Sat 19 Dec · 7:30 PM',
    venue: 'Royal Palm, Canal Road',
    medallion: '/assets/haveli-med-nikah.webp',
  },
  {
    name: 'Walima',
    date: 'Sun 20 Dec · 8:00 PM',
    venue: 'Pearl Continental, The Mall',
    medallion: '/assets/haveli-med-walima.webp',
  },
];

export default function ThreeEveningsSection() {
  return (
    <section className="three-evenings-section">
      <h2 className="section-title fade-in-up">Three Evenings</h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="fade-in-up fade-delay-2">
        {EVENTS.map((event, i) => (
          <div className="event-card" key={event.name}>
            <img
              className="medallion"
              src={event.medallion}
              alt={event.name}
              loading="lazy"
            />
            <div className="event-info">
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
