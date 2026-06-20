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
      <div className="
        mx-auto max-w-3xl px-6 pb-24
        md:px-12
      "
      >
        <div className="
          leading-relaxed whitespace-pre-line text-muted-foreground
        "
        >
          {settings.shipping_body}
        </div>

        <div className="
          mt-14 rounded-2xl bg-secondary/50 p-8
          md:p-10
        "
        >
          <h2 className="font-display text-2xl font-semibold text-foreground">What's included</h2>
          <ul className="
            mt-6 grid gap-3
            sm:grid-cols-2
          "
          >
            {included.map(item => (
              <li
                key={item}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span className="mt-0.5 text-foreground">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">Get a shipping quote</h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Tell us your country and we'll provide a personalized transport quote and timeline.
          </p>
          <a
            href={whatsappLink('Hi! Could I get a shipping quote to my country?')}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6 inline-block rounded-full bg-foreground px-7 py-3 font-medium
              text-background transition-opacity
              hover:opacity-80
            "
          >
            Request a quote on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
