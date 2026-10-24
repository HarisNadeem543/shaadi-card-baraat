import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * GallerySection — Horizontal snap-scrolling photo carousel
 * with dot indicators and smooth swiping.
 */

const PHOTOS = [
  { src: '/assets/couple1.jpg', alt: 'Couple photo 1' },
  { src: '/assets/couple2.jpg', alt: 'Couple photo 2' },
  { src: '/assets/couple3.jpg', alt: 'Couple photo 3' },
  { src: '/assets/couple4.jpg', alt: 'Couple photo 4' },
];

export default function GallerySection() {
  const carouselRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.firstElementChild?.offsetWidth || 1;
    const gap = 12;
    const idx = Math.round(scrollLeft / (itemWidth + gap));
    setActiveIdx(Math.min(idx, PHOTOS.length - 1));
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToIdx = (idx) => {
    const el = carouselRef.current;
    if (!el) return;
    const itemWidth = el.firstElementChild?.offsetWidth || 1;
    const gap = 12;
    el.scrollTo({ left: idx * (itemWidth + gap), behavior: 'smooth' });
  };

  return (
    <section className="gallery-section">
      <h2 className="section-title fade-in-up">Moments</h2>

      <img
        className="divider fade-in-up fade-delay-1"
        src="/assets/haveli-divider.webp"
        alt=""
        aria-hidden="true"
        style={{ paddingLeft: 28, paddingRight: 28 }}
      />

      <div className="gallery-carousel" ref={carouselRef}>
        {PHOTOS.map((photo, i) => (
          <div className="gallery-item" key={i}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </div>
        ))}
      </div>

      <div className="gallery-dots">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot${i === activeIdx ? ' active' : ''}`}
            onClick={() => scrollToIdx(i)}
            aria-label={`View photo ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
