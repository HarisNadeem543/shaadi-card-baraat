import React, { useState, useEffect } from 'react';
import DemoDevice from './components/DemoDevice';

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      setScrollY(Math.round(e.target.scrollTop));
    };

    const vp = document.getElementById('viewport');
    if (vp) {
      vp.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (vp) vp.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <DemoDevice>
      {/* Scrollable large mock content to test device boundaries and internal scrolling */}
      <div className="relative w-full bg-[#F2EADF] text-[#3A2A24] font-sans select-none pb-16">
        
        {/* Sticky Scroll Indicator for testing */}
        <div className="sticky top-2 z-50 mx-4 p-2.5 rounded-lg bg-[#573320]/90 backdrop-blur-md text-[#F2EADF] text-xs flex items-center justify-between shadow-lg border border-[#E4CE9E]/30">
          <span className="font-semibold tracking-wide">Viewport Scroll Test</span>
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-[#E4CE9E]">
            scrollTop: {scrollY}px
          </span>
        </div>

        {/* Hero Mock Section */}
        <div className="h-[480px] bg-[#1A1012] text-[#F3E5C8] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1012]/60 to-[#573320]/90 pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#E4CE9E]/80">
              Mock Screen Boundary Test
            </span>
            <h1 className="text-3xl font-serif font-medium text-[#F3E5C8]">
              Umair &amp; Meher
            </h1>
            <p className="text-xs text-[#E4CE9E]/70 tracking-widest uppercase">
              19 · 12 · 2026 · Lahore
            </p>
            <div className="mt-8 text-xs text-white/50 border border-white/20 px-3 py-1.5 rounded-full inline-block">
              ↓ Scroll down to test device containment
            </div>
          </div>
        </div>

        {/* Section 1: Deep Band */}
        <div className="p-8 bg-[#573320] text-[#F2EADF] text-center space-y-4 border-b border-[#E4CE9E]/20">
          <h2 className="text-xl font-serif italic text-[#E4CE9E]">
            Section 1: Deep Band (400px - 800px)
          </h2>
          <p className="text-sm leading-relaxed text-[#F2EADF]/80 max-w-xs mx-auto">
            Notice that the phone mockup shell maintains its exact proportions on desktop and does not enlarge or blow out the page.
          </p>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-xs">
            Outer Device: <code className="text-[#E4CE9E]">height: min(90vh, 860px)</code>
            <br />
            Internal Viewport: <code className="text-[#E4CE9E]">overflow-y: auto</code>
          </div>
        </div>

        {/* Section 2: Paper Band */}
        <div className="p-8 bg-[#EEE4D9] text-[#3A2A24] text-center space-y-4">
          <h2 className="text-xl font-serif italic text-[#573320]">
            Section 2: Paper Band (800px - 1300px)
          </h2>
          <p className="text-sm leading-relaxed text-[#7A655B] max-w-xs mx-auto">
            Testing smooth scrolling through simulated invitation sections: Calendar, Itinerary, Venue Arch, Gallery, and RSVP.
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto text-xs">
            <div className="p-3 bg-white/60 rounded border border-[#573320]/20 font-medium text-[#573320]">
              Mehndi<br />
              <span className="text-[10px] text-[#7A655B]">Thu 17 Dec</span>
            </div>
            <div className="p-3 bg-white/60 rounded border border-[#573320]/20 font-medium text-[#573320]">
              Baraat &amp; Nikah<br />
              <span className="text-[10px] text-[#7A655B]">Sat 19 Dec</span>
            </div>
          </div>
        </div>

        {/* Section 3: Deep Band (Wishes & Moments) */}
        <div className="p-8 bg-[#573320] text-[#F2EADF] text-center space-y-4">
          <h2 className="text-xl font-serif italic text-[#E4CE9E]">
            Section 3: Middle Band (1300px - 1800px)
          </h2>
          <p className="text-sm leading-relaxed text-[#F2EADF]/80 max-w-xs mx-auto">
            The status bar at the top and Safari bar at the bottom remain neatly fixed in position on desktop while this inner content scrolls.
          </p>
          <div className="h-40 bg-black/20 rounded-lg flex items-center justify-center border border-white/10 text-xs text-white/60">
            [Photo Carousel Placeholder]
          </div>
        </div>

        {/* Section 4: Deep Band (Bottom Sign-off) */}
        <div className="p-8 bg-[#231A14] text-[#F3E5C8] text-center space-y-4">
          <h2 className="text-xl font-serif italic text-[#E4CE9E]">
            Section 4: Bottom Sign-off (1800px - 2200px)
          </h2>
          <p className="text-sm text-[#F3E5C8]/80 max-w-xs mx-auto">
            End of the scrollable content. Notice how the scroll reaches the very bottom cleanly inside the iPhone screen.
          </p>
          <div className="py-8 text-xs text-[#E4CE9E]/60 tracking-widest uppercase">
            NIRU · Haveli
          </div>
        </div>

      </div>
    </DemoDevice>
  );
}
