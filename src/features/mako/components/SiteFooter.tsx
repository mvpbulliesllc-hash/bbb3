import { Link } from '@/libs/I18nNavigation';
import { Brand, navLinks, whatsappLink } from '../Brand';

const half = Math.ceil(navLinks.length / 2);

export const SiteFooter = () => (
  <footer className="bg-background">
    <div className="
      border-t border-border px-6 py-16
      md:px-12 md:py-20
      lg:px-20
    "
    >
      <div className="
        grid grid-cols-2 gap-12
        md:grid-cols-4
        lg:grid-cols-5
      "
      >
        <div className="
          col-span-2
          md:col-span-2
          lg:col-span-2
        "
        >
          <Link
            href="/"
            className="font-display text-xl font-semibold text-foreground"
          >
            Mako Kennel
          </Link>
          <p className="mt-4 max-w-xs text-sm/relaxed text-muted-foreground">
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
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
          <ul className="space-y-3">
            {navLinks.slice(0, half).map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    text-sm text-muted-foreground transition-colors
                    hover:text-foreground
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium text-foreground">More</h4>
          <ul className="space-y-3">
            {navLinks.slice(half).map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    text-sm text-muted-foreground transition-colors
                    hover:text-foreground
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium text-foreground">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                className="
                  text-muted-foreground transition-colors
                  hover:text-foreground
                "
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                className="
                  text-muted-foreground transition-colors
                  hover:text-foreground
                "
                href={Brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="
                  text-muted-foreground transition-colors
                  hover:text-foreground
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
    </div>

    <div className="
      border-t border-border p-6
      md:px-12
      lg:px-20
    "
    >
      <div className="
        flex flex-col items-center justify-between gap-3
        md:flex-row
      "
      >
        <p className="text-xs text-muted-foreground">
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          {Brand.legalName}
          . All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          {Brand.registry}
          {' '}
          registered ·
          {' '}
          {Brand.location}
          {' '}
          ·
          {' '}
          {Brand.phone}
        </p>
      </div>
    </div>
  </footer>
);
