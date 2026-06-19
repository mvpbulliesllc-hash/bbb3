import type { littersSchema } from '@/models/Schema';
import { MediaImage } from './MediaImage';
import { StatusBadge } from './StatusBadge';

type Litter = typeof littersSchema.$inferSelect;

export const LitterCard = ({ litter }: { litter: Litter }) => (
  <div className="
    overflow-hidden rounded-2xl border border-mako-border bg-mako-charcoal
  "
  >
    <div className="aspect-16/10 overflow-hidden">
      <MediaImage src={litter.heroImage} alt={litter.name} label={litter.name} rounded={false} />
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-serif text-xl font-semibold text-mako-cream">{litter.name}</h3>
        <StatusBadge status={litter.status} />
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        {litter.sireName && (
          <div>
            <dt className="text-mako-muted">Sire</dt>
            <dd className="text-mako-cream">{litter.sireName}</dd>
          </div>
        )}
        {litter.damName && (
          <div>
            <dt className="text-mako-muted">Dam</dt>
            <dd className="text-mako-cream">{litter.damName}</dd>
          </div>
        )}
        {litter.date && (
          <div>
            <dt className="text-mako-muted">Date</dt>
            <dd className="text-mako-cream">{litter.date}</dd>
          </div>
        )}
        {litter.expectedColors && (
          <div>
            <dt className="text-mako-muted">Expected colors</dt>
            <dd className="text-mako-cream">{litter.expectedColors}</dd>
          </div>
        )}
      </dl>
      {litter.description && <p className="mt-4 text-sm text-mako-muted">{litter.description}</p>}
    </div>
  </div>
);
