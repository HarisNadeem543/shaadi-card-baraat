import React from 'react';

/**
 * DearFamilySection — A warm introductory letter set on the deep brown band,
 * framed by hanging lantern ornaments and the gold divider.
 * Supports bilingual English and Urdu text.
 */
export default function DearFamilySection({ t, lang }) {
  return (
    <section className={`dear-family-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      {/* Hanging ornamental lanterns */}
      <div className="hanging-ornaments" aria-hidden="true">
        <img
          src="/assets/haveli-hanging.webp"
          alt=""
          style={{ transform: 'scaleX(-1)' }}
        />
        <img
          src="/assets/haveli-hanging.webp"
          alt=""
        />
      </div>

      <h2
        className="section-title fade-in-up"
        style={{ whiteSpace: 'pre-line' }}
      >
        {t.title}
      </h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="body-text fade-in-up fade-delay-2" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
        <p>{t.p1}</p>
        <p>{t.p2}</p>
      </div>
    </section>
  );
}
