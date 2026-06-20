import type { littersSchema } from '@/models/Schema';
import { Link } from '@/libs/I18nNavigation';
import { whatsappLink } from '../Brand';
import { FadeImage } from './FadeImage';
import { InquiryForm } from './InquiryForm';
import { LitterCam } from './LitterCam';
import { PricingTable } from './PricingTable';
import { StatusBadge } from './StatusBadge';

const GALLERY_SLOTS = 12;

type Litter = typeof littersSchema.$inferSelect;

const Detail = ({ label, value }: { label: string; value?: string | null }) =>
  value
    ? (
        <div>
          <dt className="
            text-xs tracking-widest text-muted-foreground uppercase
          "
          >
            {label}
          </dt>
          <dd className="mt-1 text-foreground">{value}</dd>
        </div>
      )
    : null;

export const LitterProfile = ({ litter }: { litter: Litter }) => {
  const hasPicks = litter.picks.length > 0;

  return (
    <article>
      {/* Breeding banner / hero */}
      <header className="
        relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-secondary
      "
      >
        {litter.heroImage && (
          <img
            src={litter.heroImage}
            alt={litter.name}
            className="absolute inset-0 size-full object-cover"
          />
        )}
        <div className="
          absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/30
        "
        />
        <div className="
          absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-10
          md:px-12
          lg:px-20
        "
        >
          <div className="mb-4">
            <StatusBadge status={litter.status} />
          </div>
          <h1 className="
            font-display text-4xl font-semibold text-white
            md:text-6xl
          "
          >
            {litter.name}
          </h1>
          {(litter.sireName || litter.damName) && (
            <p className="mt-3 text-lg text-white/85">
              {litter.sireName}
              {litter.sireName && litter.damName ? ' × ' : ''}
              {litter.damName}
            </p>
          )}
        </div>
      </header>

      <div className="
        mx-auto max-w-6xl px-6 py-16
        md:px-12
        lg:px-20
      "
      >
        <Link
          href="/litters"
          className="
            text-sm text-muted-foreground transition-colors
            hover:text-foreground
          "
        >
          ← Back to litters
        </Link>

        {/* Breeding details */}
        <dl className="
          mt-8 grid grid-cols-2 gap-6
          md:grid-cols-4
        "
        >
          <Detail label="Sire" value={litter.sireName} />
          <Detail label="Dam" value={litter.damName} />
          <Detail label="Date" value={litter.date} />
          <Detail label="Expected colors" value={litter.expectedColors} />
        </dl>

        {litter.description && (
          <p className="mt-8 max-w-3xl text-lg/relaxed text-muted-foreground">
            {litter.description}
          </p>
        )}

        {/* Pricing — pick of the litter */}
        {hasPicks && (
          <section className="mt-16">
            <h2 className="font-display text-3xl font-semibold text-foreground">
              Pricing — Pick of the Litter
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Reserve your pick order below. Picks are released in order as the puppies
              are evaluated. A deposit secures your place on the list.
            </p>
            <div className="mt-8">
              <PricingTable picks={litter.picks} />
            </div>
          </section>
        )}

        {/* Litter cam — live feed of the puppies */}
        {litter.liveStreamUrl && (
          <section className="mt-16">
            <h2 className="font-display text-3xl font-semibold text-foreground">
              Litter Cam
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              A live look inside the whelping room. Connect any webcam or stream to keep
              buyers watching their puppy grow.
            </p>
            <div className="mt-8">
              <LitterCam streamUrl={litter.liveStreamUrl} title={`${litter.name} — Litter Cam`} />
            </div>
          </section>
        )}

        {/* Puppy gallery — one box per puppy */}
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            Puppy Gallery
          </h2>
          <div className="
            mt-8 grid grid-cols-2 gap-4
            md:grid-cols-3
            lg:grid-cols-4
          "
          >
            {Array.from({ length: GALLERY_SLOTS }).map((_, i) => {
              const url = litter.gallery[i];
              return (
                <div
                  key={url ?? `slot-${i}`}
                  className="
                    relative flex aspect-square items-center justify-center
                    overflow-hidden rounded-xl bg-secondary
                  "
                >
                  {url
                    ? (
                        <FadeImage src={url} alt={`${litter.name} puppy ${i + 1}`} />
                      )
                    : (
                        <span className="
                          font-display text-2xl font-medium
                          text-muted-foreground/50
                        "
                        >
                          {i + 1}
                        </span>
                      )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Waitlist / inquiry */}
        <section className="
          mt-16 rounded-2xl bg-secondary/50 p-8
          md:p-12
        "
        >
          <h2 className="font-display text-3xl font-semibold text-foreground">
            Join the waitlist
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tell us which pick you're interested in and we'll be in touch personally.
          </p>
          <div className="mt-4">
            <a
              href={whatsappLink(`Hi! I'm interested in the ${litter.name} litter.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block rounded-full bg-foreground px-7 py-3 font-medium
                text-background transition-opacity
                hover:opacity-80
              "
            >
              Message us on WhatsApp
            </a>
          </div>
          <div className="mt-8">
            <InquiryForm
              source={`Litter: ${litter.name}`}
              redirectTo={`/litters/${litter.slug}`}
              defaultInterest="litter"
              compact
            />
          </div>
        </section>
      </div>
    </article>
  );
};
