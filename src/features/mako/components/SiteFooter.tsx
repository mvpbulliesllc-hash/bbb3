import { Link } from '@/libs/I18nNavigation';
import { Brand, navLinks, whatsappLink } from '../Brand';

export const SiteFooter = () => (
  <footer className="border-t border-mako-border bg-mako-ink">
    <div className="
      mx-auto grid max-w-6xl gap-10 px-4 py-14
      sm:grid-cols-2
      lg:grid-cols-4
    "
    >
      <div className="lg:col-span-2">
        <div className="
          font-serif text-xl font-bold tracking-wide text-mako-cream
        "
        >
          MAKO
          {' '}
          <span className="text-mako-gold">KENNEL</span>
        </div>
        <p className="mt-3 max-w-sm text-sm text-mako-muted">
          {Brand.tagline}
          .
          {' '}
          Professional
          {' '}
          {Brand.registry}
          {' '}
          breeder since
          {' '}
          {Brand.since}
          , based in
          {' '}
          {Brand.location}
          .
          {' '}
          {Brand.standards}
          .
        </p>
        <p className="mt-4 text-sm text-mako-muted">
          We ship
          {' '}
          {Brand.ships.toLowerCase()}
          {' '}
          to approved homes.
        </p>
      </div>

      <div>
        <h4 className="
          text-sm font-semibold tracking-wide text-mako-cream uppercase
        "
        >
          Explore
        </h4>
        <ul className="mt-4 space-y-2">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="
                  text-sm text-mako-muted transition-colors
                  hover:text-mako-gold
                "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="
          text-sm font-semibold tracking-wide text-mako-cream uppercase
        "
        >
          Contact
        </h4>
        <ul className="mt-4 space-y-2 text-sm text-mako-muted">
          <li>
            <a
              className="
                transition-colors
                hover:text-mako-gold
              "
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp:
              {' '}
              {Brand.phone}
            </a>
          </li>
          <li>
            <a
              className="
                transition-colors
                hover:text-mako-gold
              "
              href={Brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram @
              {Brand.instagramHandle}
            </a>
          </li>
          <li>
            <a
              className="
                transition-colors
                hover:text-mako-gold
              "
              href={Brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-mako-border">
      <div className="
        mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4
        py-6 text-xs text-mako-muted
        sm:flex-row
      "
      >
        <p>
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          {Brand.legalName}
          . All rights reserved.
        </p>
        <p>
          {Brand.registry}
          {' '}
          registered ·
          {' '}
          {Brand.location}
        </p>
      </div>
    </div>
  </footer>
);
