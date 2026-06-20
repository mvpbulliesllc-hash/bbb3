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
      <div className="
        mx-auto max-w-6xl px-6 pb-24
        md:px-12
        lg:px-20
      "
      >
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
                    grid gap-8
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
                      font-display text-2xl font-semibold text-foreground
                    "
                    >
                      Recently reserved & placed
                    </h2>
                    <div className="
                      mt-8 grid gap-8
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

        <div className="mt-20 rounded-2xl bg-secondary/50 p-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground">Don't see the one?</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Join our waitlist and we'll match you with an upcoming puppy from a planned litter.
          </p>
          <a
            href={whatsappLink('Hi! I would like to join the puppy waitlist.')}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6 inline-block rounded-full bg-foreground px-7 py-3 font-medium
              text-background transition-opacity
              hover:opacity-80
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
