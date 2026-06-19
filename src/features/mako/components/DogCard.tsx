import type { dogsSchema } from '@/models/Schema';
import { Link } from '@/libs/I18nNavigation';
import { MediaImage } from './MediaImage';
import { StatusBadge } from './StatusBadge';

type Dog = typeof dogsSchema.$inferSelect;

export const DogCard = ({ dog }: { dog: Dog }) => {
  const href = dog.type === 'female' ? `/females/${dog.slug}` : `/studs/${dog.slug}`;

  return (
    <Link
      href={href}
      className="
        group overflow-hidden rounded-2xl border border-mako-border
        bg-mako-charcoal transition-colors
        hover:border-mako-gold/50
      "
    >
      <div className="aspect-4/5 overflow-hidden">
        <MediaImage
          src={dog.heroImage}
          alt={dog.name}
          label={dog.name}
          rounded={false}
          className="
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-xl font-semibold text-mako-cream">{dog.name}</h3>
          {dog.status !== 'active' && <StatusBadge status={dog.status} />}
        </div>
        {dog.color && <p className="mt-1 text-sm text-mako-gold">{dog.color}</p>}
        {dog.bio && <p className="mt-2 line-clamp-2 text-sm text-mako-muted">{dog.bio}</p>}
        <span className="
          mt-4 inline-block text-sm font-medium text-mako-muted
          transition-colors
          group-hover:text-mako-gold
        "
        >
          View profile →
        </span>
      </div>
    </Link>
  );
};
