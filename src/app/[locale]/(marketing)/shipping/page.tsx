import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Brand, whatsappLink } from '@/features/mako/Brand';
import { PageHeader } from '@/features/mako/components/PageHeader';
import { getSettings } from '@/features/mako/queries';

export const metadata: Metadata = {
  title: 'Shipping & Import — Mako Kennel',
  description: 'Worldwide shipping and import logistics for Mako Kennel XL American Bully puppies.',
};

const included = [
  'Full ABKC registration paperwork',
  'Up-to-date vaccinations & deworming',
  'Microchip & EU pet passport',
  'Veterinary health certificate',
  'IATA-compliant travel crate',
  'Lifetime breeder support',
];

export default async function ShippingPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow="Logistics"
        title="Shipping & Import"
        description={`We ship from ${Brand.location} to approved homes worldwide — including the USA, Canada, the UK and across Europe.`}
      />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="leading-relaxed whitespace-pre-line text-mako-muted">{settings.shipping_body}</div>

        <div className="
          mt-12 rounded-2xl border border-mako-border bg-mako-charcoal p-8
        "
        >
          <h2 className="font-serif text-2xl font-bold text-mako-cream">What's included</h2>
          <ul className="
            mt-6 grid gap-3
            sm:grid-cols-2
          "
          >
            {included.map(item => (
              <li key={item} className="flex items-start gap-2 text-mako-muted">
                <span className="mt-1 text-mako-gold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <h2 className="font-serif text-2xl font-bold text-mako-cream">Get a shipping quote</h2>
          <p className="mx-auto mt-2 max-w-lg text-mako-muted">
            Tell us your country and we'll provide a personalized transport quote and timeline.
          </p>
          <a
            href={whatsappLink('Hi! Could I get a shipping quote to my country?')}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6 inline-block rounded-full bg-mako-gold px-6 py-3
              font-semibold text-mako-ink transition-colors
              hover:bg-mako-gold-soft
            "
          >
            Request a quote on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
