import { setRequestLocale } from 'next-intl/server';
import { SiteFooter } from '@/features/mako/components/SiteFooter';
import { SiteHeader } from '@/features/mako/components/SiteHeader';
import { WhatsAppFloat } from '@/features/mako/components/WhatsAppFloat';

export default async function MarketingLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>{props.children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
