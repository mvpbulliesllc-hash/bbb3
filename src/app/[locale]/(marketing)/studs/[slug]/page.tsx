import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { DogProfile } from '@/features/mako/components/DogProfile';
import { getDogBySlug } from '@/features/mako/queries';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  const dog = await getDogBySlug(slug);
  return { title: dog ? `${dog.name} — Mako Kennel Stud` : 'Stud — Mako Kennel' };
}

export default async function StudDetailPage(props: Props) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const dog = await getDogBySlug(slug);

  if (!dog || dog.type !== 'stud') {
    notFound();
  }

  return <DogProfile dog={dog} />;
}
