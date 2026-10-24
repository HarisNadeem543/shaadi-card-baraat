import React, { useRef, useState, useEffect } from 'react';

/**
 * GallerySection — Horizontal swipeable photo carousel of the couple,
 * with navigation dots. Set on the brown band.
 * Supports bilingual English and Urdu text.
 */

const PHOTOS = [
  { src: '/assets/couple1.jpg', alt: 'Umair & Meher moment 1' },
  { src: '/assets/couple2.jpg', alt: 'Umair & Meher moment 2' },
  { src: '/assets/couple3.jpg', alt: 'Umair & Meher moment 3' },
  { src: '/assets/couple4.jpg', alt: 'Umair & Meher moment 4' },
];

export default function GallerySection({ t, lang }) {
  const carouselRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Track active slide based on scroll position
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const itemWidth = el.offsetWidth;
      const newIdx = Math.round(scrollLeft / itemWidth);
      setActiveIdx(Math.min(Math.max(newIdx, 0), PHOTOS.length - 1));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIdx = (i) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({
      left: i * el.offsetWidth,
      behavior: 'smooth',
    });
    setActiveIdx(i);
  };

  return (
    <section className={`gallery-section ${lang === 'ur' ? 'ur-mode' : ''}`}>
      <h2 className="section-title fade-in-up">{t.title}</h2>

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
