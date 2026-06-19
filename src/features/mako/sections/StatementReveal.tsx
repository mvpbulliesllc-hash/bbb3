'use client';

import { useEffect, useRef, useState } from 'react';

/** Scroll-driven word-by-word color reveal for an editorial statement (adapted). */
export function StatementReveal({ text = '' }: { text?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) {
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const end = window.innerHeight * 0.1;
      setProgress(Math.max(0, Math.min(1, (start - rect.top) / (start - end))));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const words = text.split(' ');

  return (
    <section className="
      bg-background px-6 py-24
      md:px-12 md:py-32
      lg:px-20 lg:py-40
    "
    >
      <div className="mx-auto max-w-4xl">
        <p
          ref={ref}
          className="
            font-display text-3xl/snug font-medium
            md:text-4xl
            lg:text-5xl
          "
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="transition-colors duration-150"
              style={{ color: progress > i / words.length ? 'var(--foreground)' : '#d4d4d4' }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
