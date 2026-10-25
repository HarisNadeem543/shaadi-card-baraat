import React from 'react';

/**
 * PendulumLantern — The hanging lantern pendulum.
 * Suspended from top of screen (transform-origin: 50% 0).
 * Rotates with harmonic pendulum physics and interactive touch/pointer drag.
 */
export default React.forwardRef(function PendulumLantern(
  {
    onPointerDown,
    onKeyDown,
    onClick,
    isLit,
    lang,
  },
  ref
) {
  return (
    <button
      className="lamp"
      id="lamp"
      ref={ref}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      onClick={onClick}
      aria-label={
        lang === 'ur'
          ? 'لالٹین کو جھلا کر حویلی کے چراغ روشن کریں اور کارڈ دیکھیں'
          : 'Swing the lantern to light the courtyard and open the invitation'
      }
      type="button"
    >
      <img
        src="/assets/haveli-lantern.webp"
        alt=""
        aria-hidden="true"
        draggable="false"
        loading="eager"
      />
    </button>
  );
});
