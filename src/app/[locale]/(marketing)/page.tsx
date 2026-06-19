import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Brand, whatsappLink } from '@/features/mako/Brand';
import { DogCard } from '@/features/mako/components/DogCard';
import { InstagramBlock } from '@/features/mako/components/InstagramBlock';
import { LitterCard } from '@/features/mako/components/LitterCard';
import { PuppyCard } from '@/features/mako/components/PuppyCard';
import { getFeaturedDogs, getLitters, getPuppies, getSettings } from '@/features/mako/queries';
import { Link } from '@/libs/I18nNavigation';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${Brand.name} — ${Brand.tagline}`,
    description: `Professional ${Brand.registry} breeder of XL American Bullies since ${Brand.since}, based in ${Brand.location}. Health, character and structure — shipped worldwide.`,
  };
}

const stats = [
  { value: `Since ${Brand.since}`, label: `${Brand.registry} breeder` },
  { value: Brand.followers, label: 'Instagram followers' },
  { value: 'Worldwide', label: 'Shipping & import' },
  { value: 'Health · Structure', label: 'Our standard' },
];

export default async function Home(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [settings, featured, currentLitters, plannedLitters, puppies] = await Promise.all([
    getSettings(),
    getFeaturedDogs(),
    getLitters('current'),
    getLitters('planned'),
    getPuppies('available'),
  ]);

  const litters = [...currentLitters, ...plannedLitters].slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-mako-border">
        <div className="
          absolute inset-0 bg-linear-to-b from-mako-charcoal via-mako-ink
          to-mako-ink
        "
        />
        <div className="
          relative mx-auto max-w-6xl px-4 py-24 text-center
          sm:py-32
        "
        >
          <p className="
            text-sm font-semibold tracking-[0.25em] text-mako-gold uppercase
          "
          >
            {Brand.registry}
            {' '}
            ·
            {' '}
            {Brand.location}
            {' '}
            ·
            {' '}
            Since
            {' '}
            {Brand.since}
          </p>
          <h1 className="
            mx-auto mt-4 max-w-4xl font-serif text-4xl font-bold text-mako-cream
            sm:text-6xl
          "
          >
            {settings.hero_headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-mako-muted">{settings.hero_subhead}</p>
          <div className="
            mt-10 flex flex-wrap items-center justify-center gap-4
          "
          >
            <Link
              href="/puppies"
              className="
                rounded-full bg-mako-gold px-7 py-3 font-semibold text-mako-ink
                transition-colors
                hover:bg-mako-gold-soft
              "
            >
              Available Puppies
            </Link>
            <a
              href={whatsappLink('Hi Mako Kennel! I would like more information.')}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-full border border-mako-border px-7 py-3 font-semibold
                text-mako-cream transition-colors
                hover:border-mako-gold
              "
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-mako-border bg-mako-charcoal">
        <div className="
          mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10
          lg:grid-cols-4
        "
        >
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-2xl font-bold text-mako-gold">{s.value}</div>
              <div className="mt-1 text-sm text-mako-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured dogs */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="
                text-sm font-semibold tracking-[0.2em] text-mako-gold uppercase
              "
              >
                Our dogs
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-mako-cream">Featured bloodlines</h2>
            </div>
            <Link
              href="/studs"
              className="
                hidden text-sm text-mako-muted
                hover:text-mako-gold
                sm:block
              "
            >
              View all studs →
            </Link>
          </div>
          <div className="
            mt-10 grid gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
          >
            {featured.map(dog => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        </section>
      )}

      {/* Litters */}
      {litters.length > 0 && (
        <section className="border-y border-mako-border bg-mako-charcoal">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="flex items-end justify-between">
              <div>
                <p className="
                  text-sm font-semibold tracking-[0.2em] text-mako-gold
                  uppercase
                "
                >
                  Breeding program
                </p>
                <h2 className="
                  mt-2 font-serif text-3xl font-bold text-mako-cream
                "
                >
                  Current & planned litters
                </h2>
              </div>
              <Link
                href="/litters"
                className="
                  hidden text-sm text-mako-muted
                  hover:text-mako-gold
                  sm:block
                "
              >
                All litters →
              </Link>
            </div>
            <div className="
              mt-10 grid gap-6
              lg:grid-cols-2
            "
            >
              {litters.map(litter => (
                <LitterCard key={litter.id} litter={litter} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Available puppies */}
      {puppies.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="
                text-sm font-semibold tracking-[0.2em] text-mako-gold uppercase
              "
              >
                Storefront
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-mako-cream">Available now</h2>
            </div>
            <Link
              href="/puppies"
              className="
                hidden text-sm text-mako-muted
                hover:text-mako-gold
                sm:block
              "
            >
              All puppies →
            </Link>
          </div>
          <div className="
            mt-10 grid gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
          >
            {puppies.slice(0, 4).map(puppy => (
              <PuppyCard key={puppy.id} puppy={puppy} />
            ))}
          </div>
        </section>
      )}

      {/* About */}
      <section className="border-t border-mako-border bg-mako-charcoal">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="
            text-sm font-semibold tracking-[0.2em] text-mako-gold uppercase
          "
          >
            About Mako Kennel
          </p>
          <p className="
            mt-6 text-lg/relaxed whitespace-pre-line text-mako-muted
          "
          >
            {settings.about_body}
          </p>
        </div>
      </section>

      <InstagramBlock />

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-mako-cream">Ready to find your XL Bully?</h2>
        <p className="mx-auto mt-4 max-w-xl text-mako-muted">
          Tell us what you're looking for and we'll guide you through availability, the reservation process and worldwide
          shipping.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="
              rounded-full bg-mako-gold px-7 py-3 font-semibold text-mako-ink
              transition-colors
              hover:bg-mako-gold-soft
            "
          >
            Contact us
          </Link>
          <Link
            href="/shipping"
            className="
              rounded-full border border-mako-border px-7 py-3 font-semibold
              text-mako-cream transition-colors
              hover:border-mako-gold
            "
          >
            Shipping info
          </Link>
        </div>
      </section>
    </>
  );
}
