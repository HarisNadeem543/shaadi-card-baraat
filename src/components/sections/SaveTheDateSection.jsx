import React, { useState, useEffect, useRef } from 'react';
import ScratchFoilCard from '../ScratchFoilCard';

/**
 * SaveTheDateSection — Displays "Save the date" heading with a live countdown
 * to the wedding day (19 Dec 2026), followed by the interactive gold scratch-off card.
 * Set on the parchment background. Supports bilingual English and Urdu text.
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

export default function SaveTheDateSection({ t, lang }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className={`save-date-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      <h2 className="section-title fade-in-up">{t.title}</h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      {/* Live Countdown Timer */}
      <div className="countdown fade-in-up fade-delay-2">
        <div className="countdown-unit">
          <span className="countdown-value">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="countdown-label">{t.days}</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-unit">
          <span className="countdown-value">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="countdown-label">{t.hours}</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-unit">
          <span className="countdown-value">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="countdown-label">{t.mins}</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-unit">
          <span className="countdown-value">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="countdown-label">{t.secs}</span>
        </div>
      </div>

      {/* Interactive Gold Foil Scratch Card */}
      <ScratchFoilCard t={t} lang={lang} />
    </section>
  );
}
