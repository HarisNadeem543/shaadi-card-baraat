import React from 'react';

export default function DemoDevice({ children }) {
  return (
    <div className="demo-stage">
      <div className="demo-device">
        <div className="demo-screen" id="screen">
          {/* Inner Scrollable Viewport */}
          <div className="demo-viewport" id="viewport">
            {children}
          </div>
        </div>

        {/* iPhone Mockup Image Overlay */}
        <img
          className="demo-frame"
          loading="eager"
          decoding="async"
          src="/assets/iphone-mockup-20260921.webp"
          alt="iPhone Mockup Frame"
          aria-hidden="true"
        />
      </div>

      <p className="demo-hint">
        <b>Haveli</b> &nbsp;·&nbsp; exactly what your guests receive
      </p>
    </div>
  );
}
