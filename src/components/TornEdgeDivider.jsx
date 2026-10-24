import React from 'react';

/**
 * TornEdgeDivider — Subtle, organic jagged torn-paper divider between card sections.
 * Non-recursive, natural torn paper contour with low-amplitude edge variations.
 *
 * @param {string} [topColor] - Background color of the preceding section.
 * @param {string} [bottomColor] - Background color of the following section.
 * @param {boolean} [reverse] - Flips horizontally for organic visual variety.
 * @param {'A'|'B'} [variant='A'] - Alternate contour variant.
 * @param {number} [height=14] - Subtle height of the torn divider (in pixels).
 */

// Irregular, low-amplitude torn paper path (amplitude ~4-5px max, non-repeating)
const TORN_PATH_A =
  'M0,24 L0,13 L35,10 L70,13 L95,15 L135,11 L185,13 L225,9 L270,14 L320,11 L365,15 L415,12 L475,13 L525,16 L575,10 L635,12 L685,14 L745,11 L795,15 L855,10 L905,14 L965,11 L1025,14 L1085,10 L1145,13 L1200,11 L1200,24 Z';

const TORN_PATH_B =
  'M0,24 L0,11 L45,14 L90,10 L145,13 L195,15 L245,11 L295,13 L350,9 L405,14 L460,11 L515,15 L570,12 L620,10 L675,14 L730,12 L785,15 L840,10 L895,13 L950,11 L1005,15 L1060,10 L1115,13 L1170,11 L1200,13 L1200,24 Z';

export default function TornEdgeDivider({
  topColor = 'var(--band-deep)',
  bottomColor = 'var(--parchment)',
  reverse = false,
  variant = 'A',
  height = 14,
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
        viewBox="0 0 1200 24"
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
