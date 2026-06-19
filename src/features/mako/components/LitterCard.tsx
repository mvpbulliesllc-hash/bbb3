import type { littersSchema } from '@/models/Schema';
import { FadeImage } from './FadeImage';
import { StatusBadge } from './StatusBadge';

type Litter = typeof littersSchema.$inferSelect;

const Detail = ({ label, value }: { label: string; value?: string | null }) =>
  value
    ? (
        <div>
          <dt className="
            text-xs tracking-widest text-muted-foreground uppercase
          "
          >
            {label}
          </dt>
          <dd className="mt-1 text-foreground">{value}</dd>
        </div>
      )
    : null;

export const LitterCard = ({ litter }: { litter: Litter }) => (
  <div className="group overflow-hidden">
    <div className="
      relative aspect-16/10 overflow-hidden rounded-2xl bg-secondary
    "
    >
      <FadeImage
        src={litter.heroImage}
        alt={litter.name}
        label={litter.name}
        className="
          transition-transform duration-700
          group-hover:scale-105
        "
      />
      <div className="absolute top-4 left-4">
        <StatusBadge status={litter.status} />
      </div>
    </div>
    <div className="py-6">
      <h3 className="font-display text-2xl font-medium text-foreground">{litter.name}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <Detail label="Sire" value={litter.sireName} />
        <Detail label="Dam" value={litter.damName} />
        <Detail label="Date" value={litter.date} />
        <Detail label="Expected colors" value={litter.expectedColors} />
      </dl>
      {litter.description && (
        <p className="mt-4 text-sm/relaxed text-muted-foreground">
          {litter.description}
        </p>
      )}
    </div>
  </div>
);
