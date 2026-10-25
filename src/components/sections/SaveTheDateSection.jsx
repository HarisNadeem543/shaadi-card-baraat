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

  // Scratch Foil Card states & refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const lastPointRef = useRef(null);
  const strokeCountRef = useRef(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  /**
   * Initializes the gold metallic foil canvas layer on top of the calendar card
   */
  const initFoilCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';

    // 1. Multi-stop Metallic Gold Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#9A6B2F');
    grad.addColorStop(0.18, '#D8B15D');
    grad.addColorStop(0.36, '#FAF0BE');
    grad.addColorStop(0.55, '#B98A3C');
    grad.addColorStop(0.75, '#ECD38C');
    grad.addColorStop(0.92, '#C29648');
    grad.addColorStop(1, '#8D5E24');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Shimmer / Texture overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let i = 0; i < 350; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Ornate Double Gold Border
    ctx.strokeStyle = 'rgba(107, 64, 38, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // 4. Stamped Gold Foil Typography & Sparkle Icon
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Sparkle icon
    ctx.font = '22px serif';
    ctx.fillStyle = '#5A3617';
    ctx.fillText('✦ ✦ ✦', width / 2, height / 2 - 26);

    // Foil Prompt text
    ctx.font = lang === 'ur'
      ? "600 15px 'Noto Nastaliq Urdu', serif"
      : "700 12.5px 'Manrope', sans-serif";
    ctx.fillStyle = '#4A2A0C';
    ctx.fillText(t.scratchPrompt || 'SCRATCH TO REVEAL', width / 2, height / 2 + 2);

    // Foil Hint text
    ctx.font = lang === 'ur'
      ? "400 12px 'Noto Nastaliq Urdu', serif"
      : "500 10.5px 'Jost', sans-serif";
    ctx.fillStyle = '#6E451B';
    ctx.fillText(t.scratchHint || 'Rub gold foil with finger or mouse', width / 2, height / 2 + (lang === 'ur' ? 30 : 22));
  }, [lang, t]);

  // Complete reveal trigger: smoothly fades out and completely unmounts the scratchpad
  const triggerCompleteReveal = useCallback(() => {
    setIsRevealed(true);
    setScratchPercent(100);
    setTimeout(() => {
      setIsRemoved(true);
    }, 450);
  }, []);

  // Initialize canvas on mount, language change, and window resize
  useEffect(() => {
    if (isRevealed || isRemoved) return;
    const timer = setTimeout(initFoilCanvas, 60);

    const handleResize = () => {
      if (!isRevealed && !isRemoved) {
        initFoilCanvas();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [initFoilCanvas, isRevealed, isRemoved]);

  /**
   * Calculates the percentage of the foil that has been scratched away
   */
  const checkScratchPercentage = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const step = 8;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let transparentPixels = 0;
    let totalSampled = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        totalSampled++;
        if (data[idx + 3] === 0) {
          transparentPixels++;
        }
      }
    }

    const percent = Math.round((transparentPixels / totalSampled) * 100);
    setScratchPercent(percent);

    // Auto-reveal: as requested, once a small amount is scratched (>=15%),
    // completely remove the rest of the scratch pad to reveal the card below!
    if (percent >= 15 && !isRevealed) {
      triggerCompleteReveal();
    }
  };

  /**
   * Erases foil along the pointer drag path
   */
  const scratchAt = (x, y) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 52 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x * dpr, lastPointRef.current.y * dpr);
      ctx.lineTo(x * dpr, y * dpr);
      ctx.stroke();
    } else {
      ctx.arc(x * dpr, y * dpr, 26 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    strokeCountRef.current++;
    if (strokeCountRef.current % 3 === 0) {
      checkScratchPercentage();
    }
  };

  const handlePointerDown = (e) => {
    if (isRevealed) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsScratching(true);
    lastPointRef.current = { x, y };
    scratchAt(x, y);
  };

  const handlePointerMove = (e) => {
    if (!isScratching || isRevealed) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    scratchAt(x, y);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
    lastPointRef.current = null;
    if (!isRevealed) {
      checkScratchPercentage();
      if (scratchPercent >= 10) {
        triggerCompleteReveal();
      }
    }
  };

  const handleAddToCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Haveli Invitation//Maida & Usman Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:maida-usman-wedding-20261219@haveli.niru.pk',
      'DTSTAMP:20261024T000000Z',
      'DTSTART:20261219T143000Z',
      'DTEND:20261219T183000Z',
      'SUMMARY:Maida & Usman - Baraat & Nikah',
      'DESCRIPTION:We invite you to celebrate the wedding of Maida & Usman at Royal Palm, Lahore.',
      'LOCATION:Royal Palm Golf & Country Club, Canal Road, Lahore',
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

      {/* Calendar Card Container with Gold Foil Scratch-off Layer */}
      <div className="calendar-scratch-wrapper fade-in-up fade-delay-2" ref={containerRef}>
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

        {/* Interactive Metallic Gold Foil Canvas Layer on Top - completely unmounted once revealed */}
        {!isRemoved && (
          <>
            <canvas
              ref={canvasRef}
              className={`scratch-canvas ${isRevealed ? 'revealed' : ''}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
              style={{ touchAction: 'none' }}
            />

            {/* Scratch Progress Pill Indicator */}
            {!isRevealed && scratchPercent > 3 && (
              <div className="scratch-progress-pill">
                {scratchPercent}% scratched
              </div>
            )}
          </>
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
