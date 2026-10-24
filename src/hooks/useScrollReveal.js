import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Uses IntersectionObserver to add the 'visible' class
 * to elements with 'fade-in-up' when they enter the viewport.
 * Scoped to a container ref (the demo viewport scroll container).
 *
 * @param {React.RefObject} containerRef - The scrolling container to observe within.
 */
export default function useScrollReveal(containerRef) {
  const observerRef = useRef(null);

  useEffect(() => {
    const root = containerRef?.current || null;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        root,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    // Observe all fade-in-up elements within the container
    const container = root || document;
    const elements = container.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef]);
}
