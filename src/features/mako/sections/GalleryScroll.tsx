'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Horizontal image rail driven by vertical scroll (adapted from the template). */
export function GalleryScroll({ images }: { images: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const [sectionHeight, setSectionHeight] = useState('100vh');
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) {
        return;
      }
      const w = containerRef.current.scrollWidth;
      setSectionHeight(`${window.innerHeight + (w - window.innerWidth)}px`);
    };
    const t = setTimeout(calc, 100);
    window.addEventListener('resize', calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', calc);
    };
  }, [images.length]);

  const update = useCallback(() => {
    if (!sectionRef.current || !containerRef.current) {
      return;
    }
    const rect = sectionRef.current.getBoundingClientRect();
    const distance = containerRef.current.scrollWidth - window.innerWidth;
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / distance);
    setTranslateX(progress * -distance);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
      raf.current = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [update]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="relative bg-background" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full items-center">
          <div
            ref={containerRef}
            className="flex gap-6 px-6"
            style={{ transform: `translate3d(${translateX}px, 0, 0)`, backfaceVisibility: 'hidden' }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="
                  relative h-[70vh] w-[85vw] shrink-0 overflow-hidden
                  rounded-2xl
                  md:w-[60vw]
                  lg:w-[45vw]
                "
              >
                {' '}
                <img
                  src={src}
                  alt="Mako Kennel"
                  className="size-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
