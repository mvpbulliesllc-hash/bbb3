import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { EmptyState } from '@/features/mako/components/EmptyState';
import { InstagramBlock } from '@/features/mako/components/InstagramBlock';
import { MediaImage } from '@/features/mako/components/MediaImage';
import { PageHeader } from '@/features/mako/components/PageHeader';
import { getGallery } from '@/features/mako/queries';

export const metadata: Metadata = {
  title: 'Gallery — Mako Kennel',
  description: 'Photo and video showcase of our XL American Bullies.',
};

export default async function GalleryPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const items = await getGallery();

  return (
    <>
      <PageHeader eyebrow="Showcase" title="Gallery" description="A look at our dogs, puppies and the famous white panther." />
      <div className="
        mx-auto max-w-6xl px-6 pb-24
        md:px-12
        lg:px-20
      "
      >
        {items.length > 0
          ? (
              <div className="
                grid grid-cols-2 gap-4
                sm:grid-cols-3
                lg:grid-cols-4
              "
              >
                {items.map(item => (
                  item.kind === 'video'
                    ? (
                        <a
                          key={item.id}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex aspect-square items-center justify-center
                            rounded-2xl bg-foreground text-sm font-medium
                            text-background
                          "
                        >
                          ▶ Watch video
                        </a>
                      )
                    : (
                        <div
                          key={item.id}
                          className="
                            aspect-square overflow-hidden rounded-2xl
                            bg-secondary
                          "
                        >
                          <MediaImage src={item.url} alt={item.alt || 'Mako Kennel'} rounded={false} />
                        </div>
                      )
                ))}
              </div>
            )
          : (
              <EmptyState
                title="Gallery coming soon"
                description="Photos and videos will appear here. In the meantime, see our latest posts on Instagram below."
              />
            )}
      </div>
      <InstagramBlock />
    </>
  );
}
