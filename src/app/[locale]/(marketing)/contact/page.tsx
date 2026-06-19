import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Brand, whatsappLink } from '@/features/mako/Brand';
import { InquiryForm } from '@/features/mako/components/InquiryForm';
import { PageHeader } from '@/features/mako/components/PageHeader';
import { getSettings } from '@/features/mako/queries';

export const metadata: Metadata = {
  title: 'Contact — Mako Kennel',
  description: 'Get in touch with Mako Kennel about puppies, stud service and worldwide shipping.',
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sent?: string }>;
};

export default async function ContactPage(props: Props) {
  const { locale } = await props.params;
  const { sent } = await props.searchParams;
  setRequestLocale(locale);
  const settings = await getSettings();

  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact" />
      <div className="
        mx-auto grid max-w-6xl gap-12 px-4 py-16
        lg:grid-cols-2
      "
      >
        <div>
          <p className="leading-relaxed whitespace-pre-line text-mako-muted">{settings.contact_intro}</p>

          <div className="mt-8 space-y-4">
            <a
              href={whatsappLink('Hi Mako Kennel! I have a question.')}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-3 rounded-xl border border-mako-border
                bg-mako-charcoal p-4 transition-colors
                hover:border-mako-gold
              "
            >
              <span className="text-2xl">💬</span>
              <span>
                <span className="block text-sm text-mako-muted">WhatsApp (fastest)</span>
                <span className="font-semibold text-mako-cream">{Brand.phone}</span>
              </span>
            </a>
            <a
              href={Brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-3 rounded-xl border border-mako-border
                bg-mako-charcoal p-4 transition-colors
                hover:border-mako-gold
              "
            >
              <span className="text-2xl">📸</span>
              <span>
                <span className="block text-sm text-mako-muted">Instagram</span>
                <span className="font-semibold text-mako-cream">
                  @
                  {Brand.instagramHandle}
                </span>
              </span>
            </a>
            <div className="
              flex items-center gap-3 rounded-xl border border-mako-border
              bg-mako-charcoal p-4
            "
            >
              <span className="text-2xl">📍</span>
              <span>
                <span className="block text-sm text-mako-muted">Location</span>
                <span className="font-semibold text-mako-cream">{Brand.location}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="
          rounded-2xl border border-mako-border bg-mako-charcoal p-8
        "
        >
          {sent
            ? (
                <div className="
                  rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6
                  text-center
                "
                >
                  <p className="font-serif text-xl text-mako-cream">Thank you! 🐾</p>
                  <p className="mt-2 text-mako-muted">
                    Your inquiry has been received. We'll get back to you personally — for the fastest reply, reach us on
                    WhatsApp.
                  </p>
                </div>
              )
            : (
                <>
                  <h2 className="font-serif text-2xl font-bold text-mako-cream">Send a message</h2>
                  <div className="mt-6">
                    <InquiryForm source="Contact page" redirectTo="/contact" />
                  </div>
                </>
              )}
        </div>
      </div>
    </>
  );
}
