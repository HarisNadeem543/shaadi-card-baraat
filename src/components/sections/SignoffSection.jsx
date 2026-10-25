import React from 'react';

/**
 * SignoffSection — Closing night courtyard view with garland,
 * Quranic verse with translation & reference, Prophetic wedding dua,
 * farewell text, and branding.
 * Supports bilingual English and Urdu text.
 */
export default function SignoffSection({ t, lang }) {
  const isUr = lang === 'ur';

  return (
    <section className={`signoff-section ${isUr ? 'ur-mode' : ''}`}>
      {/* Background courtyard night image (soft) */}
      <img
        className="signoff-bg"
        src="/assets/haveli-night-soft.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      {/* Garland ornament stretched to either sides across the top of its div */}
      <img
        className="garland signoff-garland fade-in-up"
        src="/assets/haveli-garland.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="signoff-content">
        {/* 1. Quranic Verse Block */}
        <div className="signoff-blessing-block fade-in-up fade-delay-1">
          <p className="dua-text signoff-verse-arabic" dir="rtl">
            {t.verseArabic || 'وَخَلَقْنَاكُمْ أَزْوَاجًا'}
          </p>
          {t.verseTranslation && (
            <p className="signoff-trans" dir={isUr ? 'rtl' : 'ltr'}>
              &ldquo;{t.verseTranslation}&rdquo;
            </p>
          )}
          {t.verseRef && (
            <p className="signoff-ref" dir={isUr ? 'rtl' : 'ltr'}>
              {t.verseRef}
            </p>
          )}
        </div>

        {/* Delicate ornament divider */}
        <div className="signoff-sep fade-in-up fade-delay-1" aria-hidden="true">
          <span>✦</span>
        </div>

        {/* 2. Prophetic Wedding Dua Block */}
        <div className="signoff-blessing-block fade-in-up fade-delay-2">
          <p className="dua-text signoff-dua-arabic" dir="rtl">
            {t.duaArabic || 'بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ'}
          </p>
          {t.duaTranslation && (
            <p className="signoff-trans" dir={isUr ? 'rtl' : 'ltr'}>
              &ldquo;{t.duaTranslation}&rdquo;
            </p>
          )}
        </div>

        {/* Closing farewell */}
        {t.closing && (
          <p
            className="closing-text fade-in-up fade-delay-3"
            style={{ whiteSpace: 'pre-line' }}
            dir={isUr ? 'rtl' : 'ltr'}
          >
            {t.closing}
          </p>
        )}

        {/* Branding */}
        {t.brand ? (
          <p className="brand fade-in-up fade-delay-3">
            {t.brand}
          </p>
        ) : null}
      </div>
    </section>
  );
}

