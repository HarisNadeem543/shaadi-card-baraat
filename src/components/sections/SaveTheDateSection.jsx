import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * SaveTheDateSection — Re-adds interactive metallic gold foil scratch-off layer
 * on top of the authentic December 2026 calendar card. Guests rub with finger or mouse
 * to reveal the calendar underneath, with boxed countdown tiles below.
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

  // Click Pad states (Triple-click to view the date)
  const [clicks, setClicks] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClickPad = () => {
    if (isRevealed || isRemoved) return;

    // Trigger visual tap pulse
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 180);

    setClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setIsRevealed(true);
        setTimeout(() => {
          setIsRemoved(true);
        }, 450);
        return 3;
      }
      return next;
    });
  };

  const handleAddToCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//Maida & Usman Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:maida-usman-wedding-20261219@weddinginvitation',
      'DTSTAMP:20261024T000000Z',
      'DTSTART:20261219T143000Z',
      'DTEND:20261219T183000Z',
      'SUMMARY:Maida & Usman - Baraat & Nikah',
      'DESCRIPTION:We invite you to celebrate the wedding of Maida & Usman at Qasr-e-Noor Banquet, Lahore.',
      'LOCATION:Qasr-e-Noor Banquet, 12-A Cavalry Ground, Lahore Cantt, Lahore',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'maida-usman-wedding.ics');
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

      {/* Calendar Card Container */}
      <div className="calendar-scratch-wrapper fade-in-up fade-delay-2">
        {/* Revealed Calendar Card (Underneath) */}
        <div className={`calendar-card ${isRevealed ? 'just-revealed' : ''}`}>
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

              const isWedding = day === 19;
              const isWalima = day === 20;

              const dayNum = lang === 'ur' ? toUrduNum(day) : day;

              return (
                <span
                  key={idx}
                  className={`cal-day ${isWedding ? 'day-wedding' : ''} ${isWalima ? 'day-walima' : ''}`}
                  onClick={isWedding ? handleAddToCalendar : undefined}
                  title={isWedding ? 'Click to add Baraat & Nikah to calendar' : undefined}
                  role={isWedding ? 'button' : undefined}
                  tabIndex={isWedding ? 0 : undefined}
                >
                  <span className="cal-day-num">{dayNum}</span>
                  {isWalima && <span className="cal-day-dot">•</span>}
                </span>
              );
            })}
          </div>

          <div className="calendar-footer">
            {t.dateFooter}
          </div>
        </div>

        {/* Interactive Click Pad on Top - triple click removes it to reveal the date */}
        {!isRemoved && (
          <div
            className={`click-pad ${isRevealed ? 'revealed' : ''} ${isClicked ? 'clicked' : ''}`}
            onClick={handleClickPad}
            onMouseDown={(e) => e.preventDefault()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClickPad();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Click three times to view the date"
            title="Click three times to view the date"
          >
            <div className="click-pad-border">
              {/* Progress stars */}
              <div className="click-pad-stars" aria-hidden="true">
                <span className={`star-item ${clicks >= 1 ? 'active' : ''}`}>✦</span>
                <span className={`star-item ${clicks >= 2 ? 'active' : ''}`}>✦</span>
                <span className={`star-item ${clicks >= 3 ? 'active' : ''}`}>✦</span>
              </div>

              {/* Main Prompt */}
              <h4 className="click-pad-prompt">
                {t.clickPadPrompt || 'CLICK THREE TIMES TO VIEW THE DATE'}
              </h4>

              {/* Status / Remaining Clicks */}
              <div className="click-pad-status">
                {clicks === 0 && (
                  <span className="status-hint">
                    {t.clickPadHint || 'Click pad · Tap 3 times to reveal'}
                  </span>
                )}
                {clicks === 1 && (
                  <span className="status-counter">
                    {typeof t.clicksRemaining === 'function' ? t.clicksRemaining(2) : '2 clicks left'}
                  </span>
                )}
                {clicks === 2 && (
                  <span className="status-counter highlight">
                    {typeof t.clicksRemaining === 'function' ? t.clicksRemaining(1) : '1 click left!'}
                  </span>
                )}
                {clicks >= 3 && (
                  <span className="status-counter highlight">✨</span>
                )}
              </div>

              {/* 3 Interactive Dots */}
              <div className="click-pad-dots" aria-hidden="true">
                <span className={`pad-dot ${clicks >= 1 ? 'filled' : ''}`} />
                <span className={`pad-dot ${clicks >= 2 ? 'filled' : ''}`} />
                <span className={`pad-dot ${clicks >= 3 ? 'filled' : ''}`} />
              </div>
            </div>
          </div>
        )}
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
