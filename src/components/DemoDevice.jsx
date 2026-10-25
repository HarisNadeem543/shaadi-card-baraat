import React from 'react';

/**
 * DemoDevice — iPhone mockup shell wrapper.
 * On mobile (<760px): fills the screen with no frame.
 * On desktop (≥760px): centers in an iPhone mockup with drop shadow.
 *
 * @param {React.ReactNode} children - The scrollable card content to render inside viewport.
 * @param {React.ReactNode} [controls] - Fixed controls pinned at top of screen (e.g. FloatingControls).
 * @param {React.RefObject} viewportRef - Ref to the inner scrollable viewport.
 */
export default function DemoDevice({ children, controls, viewportRef, lang = 'en' }) {
  return (
    <div className="demo-stage">
      <div className="demo-device">
        <div className="demo-screen" id="screen">
          {/* Fixed Floating Controls pinned atop the screen */}
          {controls}

          {/* Inner Scrollable Viewport */}
          <div className="demo-viewport" id="viewport" ref={viewportRef}>
            {children}
          </div>
        </div>

        {/* Device Frame Overlay */}
        <img
          className="demo-frame"
          loading="eager"
          decoding="async"
          src="/assets/iphone-mockup-20260921.webp"
          alt="Wedding Invitation Preview"
          aria-hidden="true"
        />
      </div>

      <p className="demo-hint">
        {lang === 'ur' ? (
          <>
            <b>مائدہ اور عثمان</b> &nbsp;·&nbsp; شادی کارڈ
          </>
        ) : (
          <>
            <b>Maida &amp; Usman</b> &nbsp;·&nbsp; Wedding Invitation
          </>
        )}
      </p>
    </div>
  );
}
