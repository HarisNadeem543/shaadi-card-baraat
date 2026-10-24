import React, { useState, useEffect, useRef } from 'react';

/**
 * SaveTheDateSection — Authentic replication of the niru.pk Haveli invitation.
 * Displays "Save the date" heading, floral garland ornament, the December 2026
 * monthly calendar card with highlighted dates (17 Mehndi, 19 Baraat circled, 20 Walima),
 * "MARK YOUR CALENDARS" label, and 4 elegant boxed countdown tiles.
 */

const WEDDING_DATE = new Date('2026-12-19T14:00:00+05:00');

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

// December 2026: 1st is Tuesday (index 1 in Mon-Sun week). Total 31 days.
const CALENDAR_DAYS = [
  null, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31,
];

const URDU_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
function toUrduNum(num) {
  return String(num).split('').map(d => URDU_DIGITS[d] || d).join('');
}

export default function SaveTheDateSection({ t, lang }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleAddToCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Haveli Invitation//Umair & Meher Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:umair-meher-wedding-20261219@haveli.niru.pk',
      'DTSTAMP:20261024T000000Z',
      'DTSTART:20261219T143000Z',
      'DTEND:20261219T183000Z',
      'SUMMARY:Umair & Meher - Baraat & Nikah',
      'DESCRIPTION:We invite you to celebrate the wedding of Umair & Meher at Royal Palm, Lahore.',
      'LOCATION:Royal Palm Golf & Country Club, Canal Road, Lahore',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'umair-meher-wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className={`save-date-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      <h2 className="section-title fade-in-up">{t.title}</h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      {/* Calendar Card */}
      <div className="calendar-card fade-in-up fade-delay-2">
        <div className="calendar-header">
          <span className="cal-header-line" />
          <span className="cal-header-title">{t.monthYear}</span>
          <span className="cal-header-line" />
        </div>

        <div className="calendar-weekdays">
          {t.weekdays.map((day, idx) => (
            <span key={idx} className="cal-weekday">{day}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {CALENDAR_DAYS.map((day, idx) => {
            if (day === null) {
              return <span key={idx} className="cal-day empty" />;
            }

            const isMehndi = day === 17;
            const isWedding = day === 19;
            const isWalima = day === 20;

            const dayNum = lang === 'ur' ? toUrduNum(day) : day;

            return (
              <span
                key={idx}
                className={`cal-day ${isMehndi ? 'day-mehndi' : ''} ${isWedding ? 'day-wedding' : ''} ${isWalima ? 'day-walima' : ''}`}
                onClick={isWedding ? handleAddToCalendar : undefined}
                title={isWedding ? 'Click to add Baraat & Nikah to calendar' : undefined}
                role={isWedding ? 'button' : undefined}
                tabIndex={isWedding ? 0 : undefined}
              >
                <span className="cal-day-num">{dayNum}</span>
                {(isMehndi || isWalima) && <span className="cal-day-dot">•</span>}
              </span>
            );
          })}
        </div>

        <div className="calendar-footer">
          {t.dateFooter}
        </div>
      </div>

      {/* Subtitle */}
      <div className="mark-calendars-text fade-in-up fade-delay-3">
        {t.markCalendars}
      </div>

      {/* Boxed Countdown Tiles */}
      <div className="countdown-tiles fade-in-up fade-delay-4">
        <div className="countdown-tile">
          <span className="tile-number">
            {lang === 'ur' ? toUrduNum(timeLeft.days) : timeLeft.days}
          </span>
          <span className="tile-label">{t.days}</span>
        </div>
        <div className="countdown-tile">
          <span className="tile-number">
            {lang === 'ur' ? toUrduNum(timeLeft.hours) : timeLeft.hours}
          </span>
          <span className="tile-label">{t.hours}</span>
        </div>
        <div className="countdown-tile">
          <span className="tile-number">
            {lang === 'ur' ? toUrduNum(timeLeft.minutes) : timeLeft.minutes}
          </span>
          <span className="tile-label">{t.minutes}</span>
        </div>
        <div className="countdown-tile">
          <span className="tile-number">
            {lang === 'ur' ? toUrduNum(timeLeft.seconds) : timeLeft.seconds}
          </span>
          <span className="tile-label">{t.seconds}</span>
        </div>
      </div>
    </section>
  );
}
