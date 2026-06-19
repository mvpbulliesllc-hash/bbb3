import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { DogCard } from '@/features/mako/components/DogCard';
import { EmptyState } from '@/features/mako/components/EmptyState';
import { PageHeader } from '@/features/mako/components/PageHeader';
import { getDogs } from '@/features/mako/queries';

export const metadata: Metadata = {
  title: 'Stud Dogs — Mako Kennel',
  description: 'Our world-class XL American Bully stud dogs — heavy bone, large heads and rare coat colors.',
};

export default async function StudsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const dogs = await getDogs('stud');

  return (
    <>
      <PageHeader
        eyebrow="Our males"
        title="Stud Dogs"
        description="World-class XL American Bully studs selected for structure, head and rare coat color. Stud service available to approved females."
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
              <EmptyState title="Studs coming soon" description="Our stud dogs will be listed here shortly." />
            )}
      </div>
    </>
  );
}
