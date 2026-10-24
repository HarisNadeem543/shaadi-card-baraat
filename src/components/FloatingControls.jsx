import React, { useState } from 'react';

/**
 * FloatingControls — Mute/Unmute and Language toggle (EN/UR)
 * Fixed in the top-right corner of the viewport.
 */
export default function FloatingControls({ lang, onLangToggle }) {
  const [muted, setMuted] = useState(true);

  return (
    <div className="floating-controls">
      {/* Mute / Unmute */}
      <button
        onClick={() => setMuted(!muted)}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          /* Muted icon */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Playing icon */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      {/* Language toggle */}
      <button
        onClick={onLangToggle}
        aria-label={`Switch to ${lang === 'en' ? 'Urdu' : 'English'}`}
        style={{ fontFamily: lang === 'ur' ? "'Noto Nastaliq Urdu', serif" : 'inherit' }}
      >
        {lang === 'en' ? 'اردو' : 'EN'}
      </button>
    </div>
  );
}
