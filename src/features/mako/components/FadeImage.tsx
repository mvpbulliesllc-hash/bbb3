'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

  // Reveal when scrolled into view. If IntersectionObserver is unavailable, or
  // the element is already on-screen at mount, reveal immediately so an in-view
  // image can never stay stuck invisible.
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const reveal = () => setTimeout(setIsVisible, fadeDelay, true);

    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fadeDelay]);

  // A cached image often finishes loading before React attaches `onLoad` (very
  // common on client-side navigation), so `onLoad` never fires and the photo
  // would stay invisible. Reading `.complete` synchronously when the <img>
  // mounts catches that with no race. Combined with `key={src}` below, this
  // re-runs for every new src. `onError` also reveals so a broken URL doesn't
  // leave a blank box.
  const handleImgRef = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      setIsLoaded(node.complete && node.naturalWidth > 0);
    }
  }, []);

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
              key={src}
              ref={handleImgRef}
              src={src}
              alt={alt}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsLoaded(true)}
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
