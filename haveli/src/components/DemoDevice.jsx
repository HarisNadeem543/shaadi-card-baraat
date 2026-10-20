import React, { useEffect, useState } from 'react';

export default function DemoDevice({ children }) {
  const [showMobileBook, setShowMobileBook] = useState(false);

  useEffect(() => {
    // Show book bar when inside content is scrolled
    const handleScroll = (e) => {
      if (e.target && e.target.scrollTop > 150) {
        setShowMobileBook(true);
      }
    };

    const viewport = document.getElementById('viewport');
    if (viewport) {
      viewport.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (viewport) viewport.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="demo-stage">
        <div className="demo-device">
          <div className="demo-screen" id="screen">
            {/* iOS Status Bar */}
            <div className="ios-status" aria-hidden="true">
              <span className="sbTime">9:41</span>
              <span className="sbIcons">
                {/* Cellular Signal Bars */}
                <svg viewBox="0 0 18 12" width="18" height="12" fill="currentColor">
                  <rect x="0" y="8.5" width="3" height="3.5" rx="1"></rect>
                  <rect x="5" y="6" width="3" height="6" rx="1"></rect>
                  <rect x="10" y="3" width="3" height="9" rx="1"></rect>
                  <rect x="15" y="0" width="3" height="12" rx="1"></rect>
                </svg>
                {/* Wifi Icon */}
                <svg viewBox="0 0 16 12" width="16" height="12" fill="currentColor">
                  <path d="M8 11.4 6.1 9.2a2.6 2.6 0 0 1 3.8 0L8 11.4Zm-3.4-4a5.3 5.3 0 0 1 6.8 0l1.3-1.5a7.3 7.3 0 0 0-9.4 0l1.3 1.5ZM8 1.2c2.5 0 4.8.9 6.6 2.4l1.3-1.5A12 12 0 0 0 8-.8 12 12 0 0 0 .1 2.1l1.3 1.5A10 10 0 0 1 8 1.2Z"></path>
                </svg>
                {/* Battery Icon */}
                <svg viewBox="0 0 27 12" width="27" height="12" fill="none">
                  <rect x=".6" y=".6" width="23" height="10.8" rx="3" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.1"></rect>
                  <rect x="2.2" y="2.2" width="18" height="7.6" rx="1.9" fill="currentColor"></rect>
                  <path d="M25.2 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" fillOpacity=".45"></path>
                </svg>
              </span>
            </div>

            {/* Inner Scrollable Viewport */}
            <div className="demo-viewport card-ready" id="viewport">
              {children}
            </div>

            {/* iOS Safari Bottom Bar */}
            <div className="ios-safari">
              <div className="row">
                <a className="urlbar" href="/" title="niru.pk">
                  <span className="aA">a<span style={{ fontSize: '1.22em' }}>A</span></span>
                  <svg className="lock" viewBox="0 0 10 12" fill="currentColor">
                    <path d="M5 0a3 3 0 0 0-3 3v1.5h1.6V3a1.4 1.4 0 0 1 2.8 0v1.5H8V3a3 3 0 0 0-3-3ZM1.4 5.2h7.2c.5 0 .9.4.9.9v4.9c0 .5-.4.9-.9.9H1.4a.9.9 0 0 1-.9-.9V6.1c0-.5.4-.9.9-.9Z"></path>
                  </svg>
                  <span className="host">niru.pk</span>
                </a>
                <a className="buy" href="order?tpl=haveli">Buy this</a>
              </div>
              <div className="homebar"></div>
            </div>
          </div>

          {/* iPhone Mockup Frame Overlay */}
          <div className="demo-frame" aria-hidden="true"></div>
        </div>

        <p className="demo-hint">
          <b>Haveli</b> &nbsp;·&nbsp; exactly what your guests receive
        </p>
      </div>

      {/* Mobile Floating Book Bar */}
      <nav className={`demo-book ${showMobileBook ? 'show' : ''}`} id="book" aria-label="Book this design">
        <a className="go" href="order?tpl=haveli">
          Book this design<b id="bookPrice">· PKR 5,900</b>
        </a>
        <a 
          className="wa" 
          href="https://wa.me/923213397889?text=Assalam%20o%20Alaikum%2C%20I%20just%20saw%20the%20Haveli%20invitation%20on%20niru.pk%20and%20would%20like%20it%20for%20my%20wedding." 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Ask about Haveli on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm0-21.6A11.8 11.8 0 0 0 1.9 18l-1.7 6.1 6.3-1.6A11.8 11.8 0 1 0 12 .2Z"></path>
          </svg>
        </a>
      </nav>
    </>
  );
}
