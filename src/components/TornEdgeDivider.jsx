import React from 'react';

/**
 * TornEdgeDivider — Seamless organic jagged torn-paper divider between card sections.
 * 
 * To eliminate horizontal artifact lines:
 * 1. Top background rect covers ONLY the top portion (y: -5 to 21), stopping before the bottom.
 * 2. Bottom background rect covers ONLY the bottom portion (y: 20 to 45), ensuring 100% pure bottomColor.
 * 3. Jagged tear path fills with bottomColor from the contour (y: 8..20) down to y: 45.
 * 4. Wrapper background is 100% transparent with negative margins (-3px) so neither color
 *    can ever bleed or create an antialiased subpixel line at section boundaries.
 */

// Coordinates extend past viewBox bounds (-5 to 1005 x, and up to 45 y)
const TORN_PATH_A =
  'M-5,45 L-5,16 L18,8 L35,14 L45,12 L58,20 L78,11 L98,17 L122,16 L142,12 L165,10 L185,15 L208,12 L235,18 L268,14 L295,8 L320,15 L348,12 L380,20 L410,14 L440,10 L465,15 L492,17 L518,11 L535,11 L560,16 L588,10 L618,10 L635,13 L660,12 L688,16 L712,11 L735,13 L758,17 L785,12 L812,8 L838,14 L865,11 L888,15 L915,18 L942,10 L975,14 L1005,11 L1005,45 L-5,45 Z';

const TORN_PATH_B =
  'M-5,45 L-5,12 L28,17 L55,9 L82,14 L108,19 L132,12 L160,8 L190,14 L218,17 L248,11 L275,11 L305,16 L335,9 L368,14 L395,19 L425,12 L458,8 L488,15 L515,11 L545,16 L575,10 L605,10 L635,15 L662,11 L690,18 L718,13 L748,8 L775,14 L805,11 L835,17 L865,10 L895,14 L925,19 L955,11 L980,8 L1005,13 L1005,45 L-5,45 Z';

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
        background: 'transparent',
        lineHeight: 0,
        width: '100%',
        marginTop: '-3px',
        marginBottom: '-3px',
        position: 'relative',
        zIndex: 2,
        transform: reverse ? 'scaleX(-1)' : 'none',
        pointerEvents: 'none',
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
          verticalAlign: 'bottom',
        }}
      >
        {/* Solid top background rect that ONLY covers above the tear peaks, stops at y=21 so it CANNOT touch the bottom */}
        <rect x="-5" y="-5" width="1010" height="26" fill={topColor} />
        {/* Solid bottom rect that ONLY covers below y=20 so the bottom is 100% bottomColor */}
        <rect x="-5" y="20" width="1010" height="25" fill={bottomColor} />
        {/* Organic jagged tear filled with bottom section color extending past bottom edge */}
        <path d={path} fill={bottomColor} />
      </svg>
    </div>
  );
}
