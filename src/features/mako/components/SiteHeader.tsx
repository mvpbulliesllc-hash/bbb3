'use client';

import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Link } from '@/libs/I18nNavigation';
import { cn } from '@/utils/Helpers';
import { Brand, navLinks, whatsappLink } from '../Brand';

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Home page has a full-bleed dark hero, so the header starts transparent there.
  const isHome = /^\/(?:en|fr)?$/.test(pathname);
  const overHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        `
          fixed top-4 left-1/2 z-50 w-[94%] max-w-5xl -translate-x-1/2
          transition-all duration-300
        `,
        overHero
          ? 'bg-transparent'
          : `rounded-full bg-background/80 shadow-sm backdrop-blur-md`,
      )}
    >
      <div className="flex items-center justify-between py-2 pr-2 pl-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={cn(
            `
              font-display text-lg font-semibold tracking-tight
              transition-colors
            `,
            overHero ? 'text-white' : 'text-foreground',
          )}
        >
          MAKO
          {' '}
          <span className="font-sans text-sm font-light tracking-[0.3em]">KENNEL</span>
        </Link>

        <nav className="
          hidden items-center gap-7
          lg:flex
        "
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm transition-colors',
                overHero
                  ? `
                    text-white/70
                    hover:text-white
                  `
                  : `
                    text-muted-foreground
                    hover:text-foreground
                  `,
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="
          hidden items-center
          lg:flex
        "
        >
          <a
            href={whatsappLink('Hi Mako Kennel! I have a question.')}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all',
              overHero
                ? `
                  bg-white text-foreground
                  hover:bg-white/90
                `
                : `
                  bg-foreground text-background
                  hover:opacity-80
                `,
            )}
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
          className={cn(`
            transition-colors
            lg:hidden
          `, overHero
            ? 'text-white'
            : `text-foreground`)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="
          rounded-b-2xl border-t border-border bg-background p-6
          lg:hidden
        "
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-2 rounded-full bg-foreground px-5 py-3 text-center text-sm
                font-medium text-background
              "
            >
              WhatsApp
              {' '}
              {Brand.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
