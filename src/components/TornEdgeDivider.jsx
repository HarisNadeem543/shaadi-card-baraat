import React from 'react';

/**
 * TornEdgeDivider — Organic jagged torn-paper divider between card sections.
 * Replicates the authentic reference tear pattern with non-symmetric clipping,
 * natural flat plateaus, deep notches, and varied jagged slopes.
 *
 * @param {string} [topColor] - Background color of the preceding section.
 * @param {string} [bottomColor] - Background color of the following section.
 * @param {boolean} [reverse] - Flips horizontally for organic visual variety.
 * @param {'A'|'B'} [variant='A'] - Alternate contour variant.
 * @param {number} [height=22] - Height of the torn divider (in pixels).
 */

// Precise trace of original reference: non-symmetric, ~14 organic peaks, flat steps & deep notches
const TORN_PATH_A =
  'M0,30 L0,16 L18,8 L35,14 L45,12 L58,20 L78,11 L98,17 L122,16 L142,12 L165,10 L185,15 L208,12 L235,18 L268,14 L295,8 L320,15 L348,12 L380,20 L410,14 L440,10 L465,15 L492,17 L518,11 L535,11 L560,16 L588,10 L618,10 L635,13 L660,12 L688,16 L712,11 L735,13 L758,17 L785,12 L812,8 L838,14 L865,11 L888,15 L915,18 L942,10 L975,14 L1000,11 L1000,30 Z';

const TORN_PATH_B =
  'M0,30 L0,12 L28,17 L55,9 L82,14 L108,19 L132,12 L160,8 L190,14 L218,17 L248,11 L275,11 L305,16 L335,9 L368,14 L395,19 L425,12 L458,8 L488,15 L515,11 L545,16 L575,10 L605,10 L635,15 L662,11 L690,18 L718,13 L748,8 L775,14 L805,11 L835,17 L865,10 L895,14 L925,19 L955,11 L980,8 L1000,13 L1000,30 Z';

export default function TornEdgeDivider({
  topColor = 'var(--band-deep)',
  bottomColor = 'var(--parchment)',
  reverse = false,
  variant = 'A',
  height = 22,
}) {
  const path = variant === 'B' ? TORN_PATH_B : TORN_PATH_A;

  return (
    <div
      className="torn-divider-wrapper"
      style={{
        backgroundColor: topColor,
        lineHeight: 0,
        width: '100%',
        overflow: 'hidden',
        transform: reverse ? 'scaleX(-1)' : 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 30"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: `${height}px`,
          display: 'block',
        }}
      >
        <path d={path} fill={bottomColor} />
      </svg>
    </div>
  );
}
