import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LitterProfile } from '@/features/mako/components/LitterProfile';
import { getLitterBySlug } from '@/features/mako/queries';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  const litter = await getLitterBySlug(slug);
  return { title: litter ? `${litter.name} — Mako Kennel Litter` : 'Litter — Mako Kennel' };
}

export default async function LitterDetailPage(props: Props) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const litter = await getLitterBySlug(slug);

  if (!litter) {
    notFound();
  }

  return <LitterProfile litter={litter} />;
}
