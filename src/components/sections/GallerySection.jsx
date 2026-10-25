import React, { useState, useRef, useCallback } from 'react';

/**
 * GallerySection — Authentic single-image slideshow matching the original website (niru.pk):
 * - Exactly one image shown at a time, perfectly centered
 * - One swipe singularly jumps one image (no free-wheeling multiple-image scroll)
 * - Tactile pointer drag with smooth cubic-bezier transition
 * - Works on touch screens, mouse drag, and pen
 * - Responsive dot pagination
 * - Bilingual English and Urdu support
 */

const PHOTOS = [
  { src: '/assets/couple1.jpg', alt: 'Maida and Usman on a candlelit stage' },
  { src: '/assets/couple2.jpg', alt: 'Henna at the wedding celebrations' },
  { src: '/assets/couple3.jpg', alt: 'Gold embroidery on bridal dupatta' },
  { src: '/assets/couple4.jpg', alt: 'Maida and Usman in a lamplit corridor' },
];

export default function GallerySection({ t, lang }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const startXRef = useRef(null);
  const startYRef = useRef(null);
  const isHorizontalSwipeRef = useRef(null);

  const goTo = useCallback((targetIdx) => {
    const total = PHOTOS.length;
    const next = (targetIdx + total) % total;
    setActiveIdx(next);
  }, []);

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
    setDragOffset(0);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e) => {
    if (startXRef.current === null) return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    // Determine direction on first significant movement
    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        isHorizontalSwipeRef.current = Math.abs(dx) > Math.abs(dy);
      }
    }

    if (isHorizontalSwipeRef.current) {
      setDragOffset(dx);
    }
  };

  const handlePointerUp = (e) => {
    if (startXRef.current === null) return;

    const dx = e.clientX - startXRef.current;
    const wasHorizontal = isHorizontalSwipeRef.current;

    startXRef.current = null;
    startYRef.current = null;
    isHorizontalSwipeRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    // One swipe advances exactly one image
    if (wasHorizontal && Math.abs(dx) > 35) {
      if (dx < 0) {
        goTo(activeIdx + 1);
      } else {
        goTo(activeIdx - 1);
      }
    }
  };

  const handlePointerCancel = (e) => {
    startXRef.current = null;
    startYRef.current = null;
    isHorizontalSwipeRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goTo(activeIdx - 1);
    } else if (e.key === 'ArrowRight') {
      goTo(activeIdx + 1);
    }
  };

  // Calculate real-time percentage translate
  const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 320;
  const dragPercent = containerWidth > 0 ? (dragOffset / containerWidth) * 100 : 0;
  const currentTranslate = -activeIdx * 100 + (isDragging ? dragPercent : 0);

  return (
    <section className={`gallery-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      <h2 className="section-title fade-in-up">{t.title}</h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
      />

      {/* Centered single-image slideshow container */}
      <div
        className="gallery-slideshow fade-in-up fade-delay-2"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Wedding photo gallery"
      >
        <div
          className={`gallery-track ${isDragging ? 'dragging' : ''}`}
          style={{ transform: `translateX(${currentTranslate}%)` }}
        >
          {PHOTOS.map((photo, i) => (
            <div
              className="gallery-slide"
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Photo ${i + 1} of ${PHOTOS.length}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" draggable={false} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="gallery-dots" role="tablist" aria-label="Photos">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIdx}
            className={`gallery-dot${i === activeIdx ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
