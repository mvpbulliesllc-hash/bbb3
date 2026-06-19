'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@/libs/I18nNavigation';
import { cn } from '@/utils/Helpers';
import { Brand, navLinks, whatsappLink } from '../Brand';

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="
      sticky top-0 z-40 border-b border-mako-border bg-mako-ink/90
      backdrop-blur-sm
    "
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="
            font-serif text-xl font-bold tracking-wide text-mako-cream
          "
          >
            MAKO
            {' '}
            <span className="text-mako-gold">KENNEL</span>
          </span>
        </Link>

        <nav className="
          hidden items-center gap-6
          lg:flex
        "
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="
                text-sm font-medium text-mako-muted transition-colors
                hover:text-mako-cream
              "
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink('Hi! I found you through your website and have a question.')}
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-full bg-mako-gold px-4 py-2 text-sm font-semibold
              text-mako-ink transition-colors
              hover:bg-mako-gold-soft
            "
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="
            text-mako-cream
            lg:hidden
          "
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className={cn(`
        border-t border-mako-border
        lg:hidden
      `, open
        ? 'block'
        : `hidden`)}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="
                border-b border-mako-border/60 py-3 text-mako-muted
                transition-colors
                hover:text-mako-cream
              "
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-3 mb-2 rounded-full bg-mako-gold px-4 py-2 text-center text-sm
              font-semibold text-mako-ink
            "
          >
            Message us on WhatsApp
            {' '}
            {Brand.phone}
          </a>
        </nav>
      </div>
    </header>
  );
};
