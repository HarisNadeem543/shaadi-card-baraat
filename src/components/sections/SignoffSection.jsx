import React from 'react';

/**
 * SignoffSection — Closing night courtyard view with garland,
 * Arabic dua, farewell text, and branding.
 * Supports bilingual English and Urdu text.
 */
export default function SignoffSection({ t, lang }) {
  return (
    <section className={`signoff-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      {/* Background courtyard night image (soft) */}
      <img
        className="signoff-bg"
        src="/assets/haveli-night-soft.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <div className="signoff-content">
        {/* Garland ornament */}
        <img
          className="garland fade-in-up"
          src="/assets/haveli-garland.webp"
          alt=""
          aria-hidden="true"
        />

        {/* Dua text (Arabic Quranic ayah) */}
        <p className="dua-text fade-in-up fade-delay-1" dir="rtl" style={{ whiteSpace: 'pre-line' }}>
          {t.dua}
        </p>

        {/* Closing farewell */}
        <p
          className="closing-text fade-in-up fade-delay-2"
          style={{ whiteSpace: 'pre-line' }}
          dir={lang === 'ur' ? 'rtl' : 'ltr'}
        >
          {t.closing}
        </p>

        {/* Branding */}
        <p className="brand fade-in-up fade-delay-3">
          {t.brand}
        </p>
      </div>
    </section>
  );
}
