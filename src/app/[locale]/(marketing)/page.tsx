import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Brand, whatsappLink } from '@/features/mako/Brand';
import { DogCard } from '@/features/mako/components/DogCard';
import { InstagramBlock } from '@/features/mako/components/InstagramBlock';
import { LitterCard } from '@/features/mako/components/LitterCard';
import { MuxVideoBlock } from '@/features/mako/components/MuxVideoBlock';
import { PuppyCard } from '@/features/mako/components/PuppyCard';
import { getFeaturedDogs, getGallery, getLitters, getPuppies, getSettings } from '@/features/mako/queries';
import { GalleryScroll } from '@/features/mako/sections/GalleryScroll';
import { Hero } from '@/features/mako/sections/Hero';
import { Philosophy } from '@/features/mako/sections/Philosophy';
import { StatementReveal } from '@/features/mako/sections/StatementReveal';
import { Link } from '@/libs/I18nNavigation';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${Brand.name} — ${Brand.tagline}`,
    description: `Professional ${Brand.registry} breeder of XL American Bullies since ${Brand.since}, based in ${Brand.location}. Health, character and structure — shipped worldwide.`,
  };
}

export default async function Home(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [settings, featured, currentLitters, plannedLitters, puppies, gallery] = await Promise.all([
    getSettings(),
    getFeaturedDogs(),
    getLitters('current'),
    getLitters('planned'),
    getPuppies('available'),
    getGallery(),
  ]);

  const litters = [...currentLitters, ...plannedLitters].slice(0, 2);
  const availablePuppies = puppies.slice(0, 3);

  // Collect imagery for the hero + philosophy from featured dogs and the gallery.
  const dogImages = featured.map(d => d.heroImage).filter((s): s is string => !!s);
  const galleryImages = gallery.filter(g => g.kind === 'image').map(g => g.url);
  const pool = [...dogImages, ...galleryImages];
  const heroCenter = pool[0];
  const heroLeft = [pool[1], pool[2]].filter(Boolean) as string[];
  const heroRight = [pool[3], pool[4]].filter(Boolean) as string[];

  return (
    <>
      <Hero
        centerImage={heroCenter}
        leftImages={heroLeft}
        rightImages={heroRight}
        tagline={settings.hero_subhead}
      />

      <Philosophy leftImage="/images/structure-show.jpg" rightImage={pool[6] ?? heroLeft[0]} />

      {/* Featured dogs */}
      {featured.length > 0 && (
        <section className="
          bg-background px-6 py-20
          md:px-12 md:py-28
          lg:px-20
        "
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="
                  text-xs tracking-[0.25em] text-muted-foreground uppercase
                "
                >
                  Our dogs
                </p>
                <h2 className="
                  mt-3 font-display text-4xl font-semibold tracking-tight
                  text-foreground
                  md:text-5xl
                "
                >
                  Featured bloodlines
                </h2>
              </div>
              <Link
                href="/studs"
                className="
                  text-sm text-muted-foreground transition-colors
                  hover:text-foreground
                "
              >
                View all studs →
              </Link>
            </div>
            <div className="
              mt-12 grid gap-8
              sm:grid-cols-2
              lg:grid-cols-4
            "
            >
              {featured.map(dog => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          </div>
        </section>
      )}

      <StatementReveal text={settings.about_body} />

      {/* Litters */}
      {litters.length > 0 && (
        <section className="
          bg-background px-6 py-20
          md:px-12 md:py-28
          lg:px-20
        "
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="
                  text-xs tracking-[0.25em] text-muted-foreground uppercase
                "
                >
                  Breeding program
                </p>
                <h2 className="
                  mt-3 font-display text-4xl font-semibold tracking-tight
                  text-foreground
                  md:text-5xl
                "
                >
                  Current & planned litters
                </h2>
              </div>
              <Link
                href="/litters"
                className="
                  text-sm text-muted-foreground transition-colors
                  hover:text-foreground
                "
              >
                All litters →
              </Link>
            </div>
            <div className="
              mt-12 grid gap-10
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
      {availablePuppies.length > 0 && (
        <section className="
          bg-secondary/40 px-6 py-20
          md:px-12 md:py-28
          lg:px-20
        "
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="
                  text-xs tracking-[0.25em] text-muted-foreground uppercase
                "
                >
                  Storefront
                </p>
                <h2 className="
                  mt-3 font-display text-4xl font-semibold tracking-tight
                  text-foreground
                  md:text-5xl
                "
                >
                  Available now
                </h2>
              </div>
              <Link
                href="/puppies"
                className="
                  text-sm text-muted-foreground transition-colors
                  hover:text-foreground
                "
              >
                All puppies →
              </Link>
            </div>
            <div className="
              mt-12 grid gap-8
              sm:grid-cols-2
              lg:grid-cols-3
            "
            >
              {availablePuppies.map(puppy => (
                <PuppyCard key={puppy.id} puppy={puppy} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Horizontal gallery rail */}
      {galleryImages.length > 1 && <GalleryScroll images={galleryImages} />}

      <InstagramBlock />

      {/* CTA */}
      <section className="
        bg-background px-6 py-24 text-center
        md:py-32
      "
      >
        <h2 className="
          mx-auto max-w-3xl font-display text-4xl font-semibold tracking-tight
          text-foreground
          md:text-5xl
        "
        >
          Ready to find your XL Bully?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Tell us what you're looking for and we'll guide you through availability, the reservation process and worldwide
          shipping.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="
              rounded-full bg-foreground px-7 py-3 font-medium text-background
              transition-opacity
              hover:opacity-80
            "
          >
            Contact us
          </Link>
          <a
            href={whatsappLink('Hi Mako Kennel! I would like more information.')}
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-full border border-border px-7 py-3 font-medium
              text-foreground transition-colors
              hover:border-foreground
            "
          >
            Message on WhatsApp
          </a>
        </div>
      </section>

      {/* Full-width MUX video block */}
      <MuxVideoBlock
        src={settings.home_video_url ?? ''}
        playbackId={settings.home_video_playback_id ?? ''}
        title={Brand.name}
      />
    </>
  );
}
