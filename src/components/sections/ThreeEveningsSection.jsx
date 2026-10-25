import React from 'react';

/**
 * ThreeEveningsSection — Authentic replicated timeline layout matching the original design:
 * - Hanging ornamental lanterns on left and right corners
 * - "The three evenings" heading with rose garland divider
 * - Continuous central vertical gold connecting line
 * - 3-column timeline: Time & Date (left), Medallion (center), Event & Venue (right)
 * - NO "Add to Calendar" buttons per user instruction
 * - Bilingual English and Urdu support
 */
export default function ThreeEveningsSection({ t, lang }) {
  return (
    <section className={`three-evenings-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      {/* Hanging ornamental lanterns in top corners */}
      <div className="evenings-hanging-ornaments" aria-hidden="true">
        <img
          src="/assets/haveli-hanging.webp"
          alt=""
          className="evenings-hanging-left"
        />
        <img
          src="/assets/haveli-hanging.webp"
          alt=""
          className="evenings-hanging-right"
        />
      </div>

      {/* Header: Title and Rose Garland Divider */}
      <div className="evenings-header fade-in-up">
        <h2 className="evenings-title">{t.title}</h2>
        <img
          className="evenings-divider"
          src="/assets/haveli-divider.webp"
          alt=""
          aria-hidden="true"
        />
      </div>

      {/* Vertical Timeline */}
      <div className={`evenings-timeline fade-in-up fade-delay-1 ${t.events.length === 1 ? 'single-event' : ''}`}>
        {/* Continuous vertical connecting line passing through all medallions */}
        <div className="timeline-spine" aria-hidden="true" />

        {t.events.map((event, idx) => (
          <div className="timeline-row" key={idx}>
            {/* Left Column: Time & Date */}
            <div className="timeline-col-time">
              <span className="timeline-time">{event.time}</span>
              <span className="timeline-date">{event.date}</span>
            </div>

            {/* Center Column: Circular Medallion */}
            <div className="timeline-col-medallion">
              <img
                className="timeline-medallion-img"
                src={event.medallion}
                alt={event.name.replace('\n', ' ')}
                loading="lazy"
              />
            </div>

            {/* Right Column: Event Name & Venue */}
            <div className="timeline-col-details" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <h3 className="timeline-event-name">{event.name}</h3>
              <p className="timeline-venue">{event.venue}</p>
              {event.program && (
                <p className="timeline-program">{event.program}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
