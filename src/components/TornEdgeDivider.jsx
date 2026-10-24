import React from 'react';

/**
 * TornEdgeDivider — Organic jagged torn-paper divider between card sections.
 * Scales responsively without distortion across mobile and desktop.
 *
 * @param {string} [topColor] - Background color of the preceding section.
 * @param {string} [bottomColor] - Background color of the following section.
 * @param {boolean} [reverse] - Flips horizontally/vertically for organic visual variety.
 * @param {number|string} [height=36] - Height of the torn divider in pixels.
 */

// Carefully traced jagged coordinates mimicking natural torn parchment
const JAGGED_PATH_A =
  'M0,60 L0,32 L22,18 L36,28 L50,14 L68,36 L86,22 L108,30 L126,16 L148,34 L170,26 L194,40 L220,22 L244,32 L268,14 L294,30 L316,20 L338,36 L360,24 L382,32 L406,16 L430,26 L452,12 L476,34 L498,22 L522,36 L548,20 L572,32 L592,16 L618,30 L644,22 L670,36 L694,16 L718,26 L744,12 L768,34 L792,20 L818,32 L844,16 L868,28 L892,18 L918,36 L944,22 L970,34 L996,16 L1022,28 L1048,18 L1074,34 L1100,22 L1124,30 L1150,16 L1174,28 L1200,20 L1200,60 Z';

const JAGGED_PATH_B =
  'M0,60 L0,26 L26,38 L48,20 L72,34 L96,16 L120,28 L142,14 L168,36 L192,22 L216,34 L240,18 L264,30 L288,20 L314,38 L338,24 L362,36 L388,18 L412,30 L436,20 L460,34 L484,16 L508,28 L532,18 L556,36 L580,22 L606,34 L630,16 L654,28 L678,18 L702,34 L726,20 L750,32 L774,16 L798,28 L822,18 L846,36 L870,22 L894,34 L920,18 L944,30 L968,20 L992,36 L1016,22 L1040,34 L1064,18 L1088,28 L1112,18 L1136,34 L1162,20 L1182,30 L1200,22 L1200,60 Z';

export default function TornEdgeDivider({
  topColor = 'var(--band-deep)',
  bottomColor = 'var(--parchment)',
  reverse = false,
  variant = 'A',
  height = 36,
}) {
  const path = variant === 'B' ? JAGGED_PATH_B : JAGGED_PATH_A;

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
        viewBox="0 0 1200 60"
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
