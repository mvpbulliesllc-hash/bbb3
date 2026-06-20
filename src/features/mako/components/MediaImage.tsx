import { cn } from '@/utils/Helpers';

type MediaImageProps = {
  src?: string | null;
  alt: string;
  label?: string;
  className?: string;
  rounded?: boolean;
};

/**
 * Renders an image when a URL is provided, otherwise an elegant branded
 * placeholder. This keeps the site looking intentional before the owner has
 * uploaded photos for every dog/litter/puppy.
 */
export const MediaImage = ({ src, alt, label, className, rounded = true }: MediaImageProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn('size-full object-cover', rounded && 'rounded-xl', className)}
      />
    );
  }

  const initials = (label ?? alt)
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'flex size-full items-center justify-center bg-neutral-200',
        rounded && 'rounded-xl',
        className,
      )}
    >
      <span className="
        font-display text-4xl font-semibold tracking-widest text-neutral-400
      "
      >
        {initials || 'MK'}
      </span>
    </div>
  );
};
