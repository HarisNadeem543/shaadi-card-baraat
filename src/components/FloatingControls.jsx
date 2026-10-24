import React from 'react';

/**
 * FloatingControls — Music player toggle (track.mp3 with smooth volume fades)
 * and Language indicator/switcher (EN / اردو).
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
        aria-label={isPlaying ? 'Mute music (fade out)' : 'Play music (fade in)'}
        title={isPlaying ? 'Mute music' : 'Play music'}
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

      {/* Language Toggle Button: Displays the current language badge (EN or اردو) */}
      <button
        onClick={onLangToggle}
        aria-label={`Current language: ${lang === 'en' ? 'English (Click for Urdu)' : 'Urdu (Click for English)'}`}
        title={`Current: ${lang === 'en' ? 'English' : 'Urdu'} · Click to switch`}
        className={`lang-btn ${lang === 'ur' ? 'lang-ur' : ''}`}
      >
        <span
          className="lang-text"
          style={{
            fontFamily: lang === 'ur' ? "'Noto Nastaliq Urdu', serif" : "'Manrope', sans-serif",
            fontSize: lang === 'ur' ? '0.92rem' : '0.78rem',
            transform: lang === 'ur' ? 'translateY(-3.5px)' : 'none',
            display: 'inline-block',
            lineHeight: 1,
          }}
        >
          {lang === 'en' ? 'EN' : 'اردو'}
        </span>
      </button>
    </div>
  );
}
