import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * ScratchFoilCard — Interactive metallic gold foil scratch-off card.
 * Guests rub with their finger or mouse to reveal the wedding date beneath.
 * Reaches threshold (>40% cleared) to trigger full celebratory auto-reveal.
 */
export default function ScratchFoilCard({ t, lang }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const lastPointRef = useRef(null);
  const strokeCountRef = useRef(0);

  /**
   * Initializes the gold metallic foil canvas layer
   */
  const initFoilCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Reset composite operation
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

    // 2. Subtle Noise / Texture overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
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

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // 4. Stamped Gold Foil Typography & Sparkle Icon
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Sparkle icon
    ctx.font = '22px serif';
    ctx.fillStyle = '#5A3617';
    ctx.fillText('✦ ✦ ✦', width / 2, height / 2 - 28);

    // Foil Prompt text
    ctx.font = lang === 'ur'
      ? "600 16px 'Noto Nastaliq Urdu', serif"
      : "700 13px 'Manrope', sans-serif";
    ctx.fillStyle = '#4A2A0C';
    ctx.fillText(t.scratchPrompt, width / 2, height / 2 + (lang === 'ur' ? 2 : 2));

    // Foil Hint text
    ctx.font = lang === 'ur'
      ? "400 12px 'Noto Nastaliq Urdu', serif"
      : "500 10.5px 'Jost', sans-serif";
    ctx.fillStyle = '#6E451B';
    ctx.fillText(t.scratchHint, width / 2, height / 2 + (lang === 'ur' ? 32 : 24));
  }, [lang, t]);

  // Initialize canvas on mount and language change
  useEffect(() => {
    setIsRevealed(false);
    setScratchPercent(0);
    // Slight delay to allow parent layout to settle
    const timer = setTimeout(initFoilCanvas, 50);
    return () => clearTimeout(timer);
  }, [initFoilCanvas]);

  /**
   * Calculates the percentage of the foil that has been scratched away
   */
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    // Sample every 8th pixel for fast 60fps performance
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

    // Auto-reveal once user scratches >40% of the ticket
    if (percent >= 40 && !isRevealed) {
      setIsRevealed(true);
    }
  };

  /**
   * Erases foil along the pointer drag path
   */
  const scratchAt = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 36 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x * dpr, lastPointRef.current.y * dpr);
      ctx.lineTo(x * dpr, y * dpr);
      ctx.stroke();
    } else {
      ctx.arc(x * dpr, y * dpr, 18 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    strokeCountRef.current++;
    if (strokeCountRef.current % 6 === 0) {
      checkScratchPercentage();
    }
  };

  // Pointer event handlers
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
    checkScratchPercentage();
  };

  /**
   * Generates and downloads standard iCalendar (.ics) file
   */
  const handleAddToCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Niru//Haveli Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:Umair & Meher — Baraat & Nikah',
      'DESCRIPTION:We celebrate the union of Umair & Meher at Sheesh Mahal Banquet, Lahore.',
      'LOCATION:Sheesh Mahal Banquet, Canal Road, Lahore, Pakistan',
      'DTSTART:20261219T133000Z',
      'DTEND:20261219T183000Z',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'DESCRIPTION:Reminder: Umair & Meher Wedding Tomorrow',
      'ACTION:DISPLAY',
      'END:VALARM',
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
    <div className="scratch-card-container fade-in-up fade-delay-3" ref={containerRef}>
      {/* Revealed Date Card Content Underneath */}
      <div className={`scratch-revealed-card ${lang === 'ur' ? 'ur-mode' : ''}`}>
        <div className="scratch-inner-border">
          <p className="scratch-day-of-week">{t.dayOfWeek}</p>
          <div className="scratch-number-row">
            <span className="scratch-decor-ornament">✤</span>
            <span className="scratch-day-number">{t.dayNumber}</span>
            <span className="scratch-decor-ornament">✤</span>
          </div>
          <p className="scratch-month-year">{t.monthYear}</p>
          <p className="scratch-city">{t.city}</p>
          <div className="scratch-card-divider" />
          <p className="scratch-tagline">{t.tagline}</p>

          {/* Action buttons shown once revealed */}
          {isRevealed && (
            <div className="scratch-actions fade-in-up">
              <span className="revealed-badge">{t.revealedSuccess}</span>
              <button
                className="calendar-btn"
                onClick={handleAddToCalendar}
                aria-label={t.addToCalendar}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {t.addToCalendar}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Metallic Gold Foil Canvas Layer */}
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

      {/* Progress pill indicator while scratching */}
      {!isRevealed && scratchPercent > 5 && (
        <div className="scratch-progress-pill">
          {scratchPercent}% scratched
        </div>
      )}
    </div>
  );
}
