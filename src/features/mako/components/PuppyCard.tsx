import type { puppiesSchema } from '@/models/Schema';
import { whatsappLink } from '../Brand';
import { FadeImage } from './FadeImage';
import { StatusBadge } from './StatusBadge';

type Puppy = typeof puppiesSchema.$inferSelect;

export const PuppyCard = ({ puppy }: { puppy: Puppy }) => (
  <div className="group">
    <div className="
      relative aspect-2/3 overflow-hidden rounded-2xl bg-secondary
    "
    >
      <FadeImage
        src={puppy.heroImage}
        alt={puppy.name}
        label={puppy.name}
        className="
          transition-transform duration-700
          group-hover:scale-105
        "
      />
      <div className="absolute top-4 right-4">
        <StatusBadge status={puppy.status} />
      </div>
    </div>
    <div className="py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-display text-lg font-medium text-foreground">{puppy.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{[puppy.sex, puppy.color].filter(Boolean).join(' · ')}</p>
        </div>
        <span className="font-display text-xl font-medium text-foreground">{puppy.price || 'Inquire'}</span>
      </div>
      {puppy.description && (
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {puppy.description}
        </p>
      )}
      {puppy.status === 'available'
        ? (
            <a
              href={whatsappLink(`Hi! I'm interested in puppy "${puppy.name}". Is it still available?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4 inline-block rounded-full bg-foreground px-5 py-2 text-sm
                font-medium text-background transition-opacity
                hover:opacity-80
              "
            >
              Inquire
            </a>
          )
        : (
            <span className="
              mt-4 inline-block text-sm text-muted-foreground capitalize
            "
            >
              {puppy.status}
            </span>
          )}
    </div>
  </div>
);
