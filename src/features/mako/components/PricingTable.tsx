import type { LitterPick } from '@/models/Schema';

const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
};

const statusStyles: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-800',
  reserved: 'bg-amber-100 text-amber-800',
  sold: 'bg-neutral-200 text-neutral-600',
};

const PickColumn = ({ title, picks }: { title: string; picks: LitterPick[] }) => {
  if (picks.length === 0) {
    return null;
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="
        border-b border-border bg-secondary px-5 py-3 font-display text-lg
        font-medium text-foreground
      "
      >
        {title}
      </div>
      <table className="w-full text-sm">
        <tbody>
          {picks
            .slice()
            .sort((a, b) => a.pick - b.pick)
            .map(p => (
              <tr
                key={`${p.sex}-${p.pick}`}
                className="
                  border-b border-border
                  last:border-0
                "
              >
                <td className="px-5 py-3 text-muted-foreground">
                  {ordinal(p.pick)}
                  {' '}
                  Pick
                </td>
                <td className="px-5 py-3 font-medium text-foreground">{p.price || '—'}</td>
                <td className="px-5 py-3 text-right">
                  <span className={`
                    inline-block rounded-full px-2.5 py-0.5 text-xs font-medium
                    capitalize
                    ${statusStyles[p.status] ?? statusStyles.available}
                  `}
                  >
                    {p.status || 'available'}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

/** Male / Female "pick of the litter" pricing tables. */
export const PricingTable = ({ picks }: { picks: LitterPick[] }) => {
  const males = picks.filter(p => p.sex.toLowerCase().startsWith('m'));
  const females = picks.filter(p => p.sex.toLowerCase().startsWith('f'));

  if (picks.length === 0) {
    return null;
  }

  return (
    <div className="
      grid gap-6
      md:grid-cols-2
    "
    >
      <PickColumn title="Males" picks={males} />
      <PickColumn title="Females" picks={females} />
    </div>
  );
};
