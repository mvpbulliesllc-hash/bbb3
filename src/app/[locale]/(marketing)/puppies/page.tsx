import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Brand, whatsappLink } from '@/features/mako/Brand';
import { EmptyState } from '@/features/mako/components/EmptyState';
import { PageHeader } from '@/features/mako/components/PageHeader';
import { PuppyCard } from '@/features/mako/components/PuppyCard';
import { getPuppies } from '@/features/mako/queries';

export const metadata: Metadata = {
  title: 'Available Puppies — Mako Kennel',
  description: 'Available XL American Bully puppies from Mako Kennel. Reserve yours and ship worldwide.',
};

export default async function PuppiesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const all = await getPuppies();
  const available = all.filter(p => p.status === 'available');
  const others = all.filter(p => p.status !== 'available');

  return (
    <>
      <PageHeader
        eyebrow="Storefront"
        title="Available Puppies"
        description="Reserve a puppy from our latest litters. Each puppy ships worldwide with full paperwork, vaccinations and our ongoing support."
      />
      <div className="mx-auto max-w-6xl px-4 py-16">
        {all.length === 0
          ? (
              <EmptyState
                title="No puppies listed right now"
                description="New puppies are added here as litters arrive. Message us to join the waitlist."
              />
            )
          : (
              <>
                {available.length > 0 && (
                  <div className="
                    grid gap-6
                    sm:grid-cols-2
                    lg:grid-cols-3
                  "
                  >
                    {available.map(puppy => (
                      <PuppyCard key={puppy.id} puppy={puppy} />
                    ))}
                  </div>
                )}
                {others.length > 0 && (
                  <div className="mt-16">
                    <h2 className="
                      font-serif text-2xl font-bold text-mako-cream
                    "
                    >
                      Recently reserved & placed
                    </h2>
                    <div className="
                      mt-8 grid gap-6
                      sm:grid-cols-2
                      lg:grid-cols-3
                    "
                    >
                      {others.map(puppy => (
                        <PuppyCard key={puppy.id} puppy={puppy} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

        <div className="
          mt-16 rounded-2xl border border-mako-border bg-mako-charcoal p-8
          text-center
        "
        >
          <h2 className="font-serif text-2xl font-bold text-mako-cream">Don't see the one?</h2>
          <p className="mx-auto mt-2 max-w-lg text-mako-muted">
            Join our waitlist and we'll match you with an upcoming puppy from a planned litter.
          </p>
          <a
            href={whatsappLink('Hi! I would like to join the puppy waitlist.')}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6 inline-block rounded-full bg-mako-gold px-6 py-3
              font-semibold text-mako-ink transition-colors
              hover:bg-mako-gold-soft
            "
          >
            Join the waitlist on WhatsApp
            {' '}
            {Brand.phone}
          </a>
        </div>
      </div>
    </>
  );
}
