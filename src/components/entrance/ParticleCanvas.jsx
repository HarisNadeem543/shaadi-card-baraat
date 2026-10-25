import React from 'react';

/**
 * ParticleCanvas — High-performance spark and smoke canvas overlay
 * Rendered during the entrance lantern swing and ignition sequence.
 */
export default React.forwardRef(function ParticleCanvas(props, ref) {
  return (
    <canvas
      id="fx"
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 6,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
});
