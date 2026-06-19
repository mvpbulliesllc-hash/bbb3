import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { EmptyState } from '@/features/mako/components/EmptyState';
import { LitterCard } from '@/features/mako/components/LitterCard';
import { PageHeader } from '@/features/mako/components/PageHeader';
import { getLitters } from '@/features/mako/queries';

export const metadata: Metadata = {
  title: 'Litters — Mako Kennel',
  description: 'Current and planned XL American Bully litters at Mako Kennel.',
};

const sections = [
  { status: 'current' as const, title: 'Current Litters' },
  { status: 'planned' as const, title: 'Planned Litters' },
  { status: 'past' as const, title: 'Past Litters' },
];

export default async function LittersPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const all = await getLitters();

  return (
    <>
      <PageHeader
        eyebrow="Breeding program"
        title="Litters"
        description="Our current and upcoming pairings. Join a waitlist early to reserve from a planned litter."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        {all.length === 0 && (
          <EmptyState title="Litters coming soon" description="Current and planned litters will appear here." />
        )}
        {sections.map((section) => {
          const litters = all.filter(l => l.status === section.status);
          if (litters.length === 0) {
            return null;
          }
          return (
            <div key={section.status}>
              <h2 className="font-serif text-2xl font-bold text-mako-cream">{section.title}</h2>
              <div className="
                mt-8 grid gap-6
                lg:grid-cols-2
              "
              >
                {litters.map(litter => (
                  <LitterCard key={litter.id} litter={litter} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
