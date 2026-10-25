import React from 'react';

/**
 * CourtyardLights — Ambient and interactive illumination layers:
 * 1. Deep night radial darkness mask (.dark)
 * 2. Warm vignette (.vig)
 * 3. Floor light pool cast by the swinging lantern (.diya-floor)
 * 4. Radial ignition flash (.flash)
 * 5. Sequential glowing lanterns & Haveli grand doorway (.cg)
 */
export default function CourtyardLights({
  glows = { left: false, mid: false, right: false, door: false },
}) {
  return (
    <>
      {/* 1. Subtle warm vignette */}
      <div className="vig" aria-hidden="true" />

      {/* 2. Deep night darkness circular mask (scaled by pendulum progress) */}
      <div className="dark" aria-hidden="true" />

      {/* 3. Sequential glowing lanterns across the haveli courtyard */}
      <div
        className={`cg c-lant-l soft ${glows.left ? 'on' : ''}`}
        aria-hidden="true"
      />
      <div
        className={`cg c-lant-m soft ${glows.mid ? 'on' : ''}`}
        aria-hidden="true"
      />
      <div
        className={`cg c-lant-r soft ${glows.right ? 'on' : ''}`}
        aria-hidden="true"
      />
      <div
        className={`cg c-door big soft ${glows.door ? 'on' : ''}`}
        aria-hidden="true"
      />

      {/* 4. White-gold radial ignition flash */}
      <div className="flash" aria-hidden="true" />

      {/* 5. Dynamic light pool thrown on the courtyard floor */}
      <div className="diya-floor" aria-hidden="true" />
    </>
  );
}
