import type { dogsSchema } from '@/models/Schema';
import { Link } from '@/libs/I18nNavigation';
import { FadeImage } from './FadeImage';
import { StatusBadge } from './StatusBadge';

type Dog = typeof dogsSchema.$inferSelect;

export const DogCard = ({ dog }: { dog: Dog }) => {
  const href = dog.type === 'female' ? `/females/${dog.slug}` : `/studs/${dog.slug}`;

  return (
    <Link href={href} className="group block">
      <div className="
        relative aspect-4/5 overflow-hidden rounded-2xl bg-secondary
      "
      >
        <FadeImage
          src={dog.heroImage}
          alt={dog.name}
          label={dog.name}
          className="
            transition-transform duration-700
            group-hover:scale-105
          "
        />
        {dog.status !== 'active' && (
          <div className="absolute top-4 left-4">
            <StatusBadge status={dog.status} />
          </div>
        )}
      </div>
      <div className="py-5">
        {dog.color && (
          <p className="
            mb-1 text-xs tracking-widest text-muted-foreground uppercase
          "
          >
            {dog.color}
          </p>
        )}
        <h3 className="font-display text-xl font-medium text-foreground">{dog.name}</h3>
        {dog.bio && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {dog.bio}
          </p>
        )}
        <span className="
          mt-3 inline-block text-sm text-foreground underline-offset-4
          group-hover:underline
        "
        >
          View profile →
        </span>
      </div>
    </Link>
  );
};
