import React from 'react';

export default function DemoDevice({ children }) {
  return (
    <div className="demo-stage">
      <div className="demo-device">
        <div className="demo-screen" id="screen">
          {/* iOS Top Status Bar */}
          <div className="ios-status" aria-hidden="true">
            <span className="sbTime">9:41</span>

            {/* Dynamic Island */}
            <div className="dynamic-island">
              <span className="camera"></span>
            </div>

            {/* iOS Status Icons */}
            <div className="sbIcons">
              {/* Cellular Signal Bars */}
              <svg viewBox="0 0 18 12" width="17" height="11" fill="currentColor">
                <rect x="0" y="8.5" width="3" height="3.5" rx="1"></rect>
                <rect x="5" y="6" width="3" height="6" rx="1"></rect>
                <rect x="10" y="3" width="3" height="9" rx="1"></rect>
                <rect x="15" y="0" width="3" height="12" rx="1"></rect>
              </svg>
              {/* Wifi */}
              <svg viewBox="0 0 16 12" width="15" height="11" fill="currentColor">
                <path d="M8 11.4 6.1 9.2a2.6 2.6 0 0 1 3.8 0L8 11.4Zm-3.4-4a5.3 5.3 0 0 1 6.8 0l1.3-1.5a7.3 7.3 0 0 0-9.4 0l1.3 1.5ZM8 1.2c2.5 0 4.8.9 6.6 2.4l1.3-1.5A12 12 0 0 0 8-.8 12 12 0 0 0 .1 2.1l1.3 1.5A10 10 0 0 1 8 1.2Z"></path>
              </svg>
              {/* Battery with outline and fill */}
              <svg viewBox="0 0 27 12" width="25" height="11" fill="none">
                <rect x=".6" y=".6" width="23" height="10.8" rx="3" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.1"></rect>
                <rect x="2.2" y="2.2" width="18" height="7.6" rx="1.9" fill="currentColor"></rect>
                <path d="M25.2 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" fillOpacity=".45"></path>
              </svg>
            </div>
          </div>

          {/* Inner Scrollable Viewport */}
          <div className="demo-viewport" id="viewport">
            {children}
          </div>

          {/* iOS Safari Bottom Bar (without Buy Now button, centered URL bar) */}
          <div className="ios-safari" aria-hidden="true">
            <div className="row">
              <div className="urlbar">
                <span className="aA">a<span style={{ fontSize: '1.22em' }}>A</span></span>
                <svg className="lock" viewBox="0 0 10 12" fill="currentColor">
                  <path d="M5 0a3 3 0 0 0-3 3v1.5h1.6V3a1.4 1.4 0 0 1 2.8 0v1.5H8V3a3 3 0 0 0-3-3ZM1.4 5.2h7.2c.5 0 .9.4.9.9v4.9c0 .5-.4.9-.9.9H1.4a.9.9 0 0 1-.9-.9V6.1c0-.5.4-.9.9-.9Z"></path>
                </svg>
                <span className="host">niru.pk</span>
              </div>
            </div>
            <div className="homebar"></div>
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
