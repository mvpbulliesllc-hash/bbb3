import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { DogCard } from '@/features/mako/components/DogCard';
import { EmptyState } from '@/features/mako/components/EmptyState';
import { PageHeader } from '@/features/mako/components/PageHeader';
import { getDogs } from '@/features/mako/queries';

export const metadata: Metadata = {
  title: 'Females — Mako Kennel',
  description: 'Our foundation dams — including our famous white panther, Mako\'s Siberia.',
};

export default async function FemalesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const dogs = await getDogs('female');

  return (
    <>
      <PageHeader
        eyebrow="Our females"
        title="Females"
        description="The foundation of our program — dams selected for structure, temperament and our signature rare coat colors."
      />
      <div className="mx-auto max-w-6xl px-4 py-16">
        {dogs.length > 0
          ? (
              <div className="
                grid gap-6
                sm:grid-cols-2
                lg:grid-cols-3
              "
              >
                {dogs.map(dog => (
                  <DogCard key={dog.id} dog={dog} />
                ))}
              </div>
            )
          : (
              <EmptyState title="Females coming soon" description="Our dams will be listed here shortly." />
            )}
      </div>
    </>
  );
}
