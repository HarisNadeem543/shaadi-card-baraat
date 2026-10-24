import React from 'react';

/**
 * FloatingControls — Music player toggle (track.mp3) and Language switcher (EN / اردو).
 * Positioned in the top corners of the invitation device viewport.
 */
export default function FloatingControls({
  isPlaying,
  onToggleAudio,
  lang,
  onLangToggle,
}) {
  return (
    <div className="floating-controls">
      {/* Audio Play/Pause Button */}
      <button
        onClick={onToggleAudio}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
        className={`audio-btn ${isPlaying ? 'playing' : ''}`}
      >
        {isPlaying ? (
          /* Active Playing Equalizer bars */
          <div className="equalizer-bars" aria-hidden="true">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </div>
        ) : (
          /* Muted speaker icon */
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="audio-icon"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      {/* Language Toggle Button */}
      <button
        onClick={onLangToggle}
        aria-label={`Switch language to ${lang === 'en' ? 'Urdu' : 'English'}`}
        title={`Switch language to ${lang === 'en' ? 'Urdu' : 'English'}`}
        className="lang-btn"
        style={{
          fontFamily: lang === 'en' ? "'Noto Nastaliq Urdu', serif" : "'Manrope', sans-serif",
          fontSize: lang === 'en' ? '0.82rem' : '0.75rem',
          paddingTop: lang === 'en' ? '2px' : '0px',
        }}
      >
        {lang === 'en' ? 'اردو' : 'EN'}
      </button>
    </div>
  );
}
