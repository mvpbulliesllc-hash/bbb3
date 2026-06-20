'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type PhilosophyProps = {
  leftImage?: string;
  rightImage?: string;
};

const Pillar = ({ src, label, translateX }: { src?: string; label: string; translateX: number }) => (
  <div
    className="relative aspect-4/3 overflow-hidden rounded-2xl bg-neutral-200"
    style={{ transform: `translate3d(${translateX}%, 0, 0)`, backfaceVisibility: 'hidden' }}
  >
    {src
      ? (
          <img src={src} alt={label} className="size-full object-cover" />
        )
      : (
          <div className="
            size-full bg-linear-to-br from-neutral-300 to-neutral-400
          "
          />
        )}
    <div className="absolute bottom-6 left-6">
      <span className="
        rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white
        backdrop-blur-md
      "
      >
        {label}
      </span>
    </div>
  </div>
);

/** Two images slide in from the sides over a giant editorial title (adapted). */
export function Philosophy({ leftImage, rightImage }: PhilosophyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const [p, setP] = useState(0);

  const update = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const range = ref.current.offsetHeight - window.innerHeight;
    setP(Math.max(0, Math.min(1, -rect.top / range)));
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

  return (
    <section className="bg-background">
      <div ref={ref} className="relative" style={{ height: '200vh' }}>
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="relative w-full">
            <div
              className="
                pointer-events-none absolute inset-0 z-0 flex items-center
                justify-center
              "
              style={{ opacity: 1 - p }}
            >
              <h2 className="
                px-6 text-center font-display text-[11vw] leading-[0.95]
                font-semibold tracking-tighter text-foreground
                md:text-[9vw]
              "
              >
                Health. Character. Structure.
              </h2>
            </div>
            <div className="
              relative z-10 grid grid-cols-1 gap-4 px-6
              md:grid-cols-2 md:px-12
              lg:px-20
            "
            >
              <Pillar src={leftImage} label="Show-quality structure" translateX={(1 - p) * -100} />
              <Pillar src={rightImage} label="Calm, family temperament" translateX={(1 - p) * 100} />
            </div>
          </div>
        </div>
      </div>

      <div className="
        px-6 py-20 text-center
        md:px-12 md:py-28
        lg:px-20 lg:py-32
      "
      >
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Our standard</p>
        <p className="
          mx-auto mt-8 max-w-3xl text-3xl/relaxed text-muted-foreground
        "
        >
          We breed world-class XL American Bullies for heavy bone, large heads and rare coat colors — never at the
          expense of health, temperament and structure.
        </p>
      </div>
    </section>
  );
}
