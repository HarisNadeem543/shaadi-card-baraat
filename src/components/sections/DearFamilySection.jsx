import React from 'react';

/**
 * DearFamilySection — A warm introductory letter set on the deep brown band,
 * framed by hanging lantern ornaments and the gold divider.
 */
export default function DearFamilySection() {
  return (
    <section className="dear-family-section">
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

      <h2 className="section-title fade-in-up">
        Dear family and<br />friends,
      </h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="body-text fade-in-up fade-delay-2">
        <p>
          After years of our families knowing one another, ours is finally the
          wedding they get to plan together.
        </p>
        <p>
          Three evenings, one open door. Come eat with us, sit with us, and stay
          far longer than you meant to.
        </p>
      </div>
    </section>
  );
}
