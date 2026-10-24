import React from 'react';

/**
 * SignoffSection — Closing night courtyard view with garland,
 * Arabic dua, farewell text, and branding.
 */
export default function SignoffSection() {
  return (
    <section className="signoff-section">
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

        {/* Dua text */}
        <p className="dua-text fade-in-up fade-delay-1" dir="rtl">
          رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا<br />
          قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
        </p>

        {/* Closing farewell */}
        <p className="closing-text fade-in-up fade-delay-2">
          We can't wait to<br />celebrate with you.
        </p>

        {/* Branding */}
        <p className="brand fade-in-up fade-delay-3">
          NIRU · Haveli
        </p>
      </div>
    </section>
  );
}
