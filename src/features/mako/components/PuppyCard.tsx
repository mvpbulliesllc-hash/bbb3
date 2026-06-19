import type { puppiesSchema } from '@/models/Schema';
import { whatsappLink } from '../Brand';
import { MediaImage } from './MediaImage';
import { StatusBadge } from './StatusBadge';

type Puppy = typeof puppiesSchema.$inferSelect;

export const PuppyCard = ({ puppy }: { puppy: Puppy }) => (
  <div className="
    overflow-hidden rounded-2xl border border-mako-border bg-mako-charcoal
  "
  >
    <div className="relative aspect-square overflow-hidden">
      <MediaImage src={puppy.heroImage} alt={puppy.name} label={puppy.name} rounded={false} />
      <div className="absolute top-3 right-3">
        <StatusBadge status={puppy.status} />
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-serif text-lg font-semibold text-mako-cream">{puppy.name}</h3>
      <p className="mt-1 text-sm text-mako-muted">
        {[puppy.sex, puppy.color].filter(Boolean).join(' · ')}
      </p>
      {puppy.description && (
        <p className="mt-2 line-clamp-2 text-sm text-mako-muted">
          {puppy.description}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold text-mako-gold">{puppy.price || 'Inquire'}</span>
        {puppy.status === 'available'
          ? (
              <a
                href={whatsappLink(`Hi! I'm interested in puppy "${puppy.name}". Is it still available?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  rounded-full bg-mako-gold px-3 py-1.5 text-sm font-semibold
                  text-mako-ink transition-colors
                  hover:bg-mako-gold-soft
                "
              >
                Inquire
              </a>
            )
          : (
              <span className="text-sm text-mako-muted capitalize">{puppy.status}</span>
            )}
      </div>
    </div>
  </div>
);
