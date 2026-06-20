'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/Helpers';
import { Brand } from '../Brand';

type FadeImageProps = {
  src?: string | null;
  alt: string;
  label?: string;
  className?: string;
  fadeDelay?: number;
};

/**
 * Image that fades + scales in when scrolled into view (adapted from the UI
 * template). Uses a plain <img> so admin-pasted external URLs work without
 * Next.js image remote-pattern config. Falls back to a branded placeholder.
 */
export function FadeImage({ src, alt, label, className, fadeDelay = 0 }: FadeImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(setIsVisible, fadeDelay, true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [fadeDelay]);

  // An image that is already cached/complete before hydration never fires
  // `onLoad`, which would otherwise leave it stuck at opacity-0. Detect that
  // case (and reset for a new src) so the photo always becomes visible.
  useEffect(() => {
    setIsLoaded(false);
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const initials = (label ?? alt)
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div ref={ref} className="relative size-full">
      {src
        ? (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              className={cn(
                'size-full object-cover transition-all duration-700 ease-out',
                isVisible && isLoaded
                  ? 'scale-100 opacity-100'
                  : `scale-[1.02] opacity-0`,
                className,
              )}
            />
          )
        : (
            <div
              className={cn(
                `
                  flex size-full items-center justify-center bg-neutral-200
                  transition-opacity duration-700
                `,
                isVisible ? 'opacity-100' : 'opacity-0',
                className,
              )}
            >
              <span className="
                font-display text-4xl tracking-widest text-neutral-400
              "
              >
                {initials || Brand.name[0]}
              </span>
            </div>
          )}
    </div>
  );
}
