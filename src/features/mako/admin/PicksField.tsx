'use client';

import type { LitterPick } from '@/models/Schema';
import { useState } from 'react';
import { cn } from '@/utils/Helpers';

const control
  = 'rounded-md border border-input bg-background px-2 py-2 text-sm shadow-xs focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30';

const SEXES = ['Male', 'Female'];
const PICKS = [1, 2, 3, 4, 5, 6];
const STATUSES = ['available', 'reserved', 'sold'];

type Row = { sex: string; pick: number; price: string; status: string };

/**
 * Friendly pick-pricing editor: a row per pick with Sex / Pick / Price /
 * Status dropdowns. Serialises to the `Sex | Pick | Price | Status` lines the
 * save action already understands, in a hidden input named `picks`.
 */
export function PicksField({ defaultValue = [] }: { defaultValue?: LitterPick[] }) {
  const [rows, setRows] = useState<Row[]>(
    defaultValue.length > 0
      ? defaultValue.map(p => ({ sex: p.sex || 'Male', pick: p.pick || 1, price: p.price || '', status: p.status || 'available' }))
      : [],
  );

  const update = (i: number, patch: Partial<Row>) =>
    setRows(prev => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  const remove = (i: number) => setRows(prev => prev.filter((_, idx) => idx !== i));
  const add = () => setRows(prev => [...prev, { sex: 'Male', pick: 1, price: '', status: 'available' }]);

  const serialized = rows
    .filter(r => r.price.trim() !== '')
    .map(r => `${r.sex} | ${r.pick} | ${r.price} | ${r.status}`)
    .join('\n');

  return (
    <div className="block">
      <span className="mb-1 block text-sm font-medium">Pick pricing</span>
      <input type="hidden" name="picks" value={serialized} />

      <div className="space-y-2">
        {rows.map((row, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="flex flex-wrap items-center gap-2">
            <select
              className={cn(control, 'w-28')}
              value={row.sex}
              onChange={e => update(i, { sex: e.target.value })}
            >
              {SEXES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              className={cn(control, 'w-28')}
              value={row.pick}
              onChange={e => update(i, { pick: Number(e.target.value) })}
            >
              {PICKS.map(p => <option key={p} value={p}>{`Pick ${p}`}</option>)}
            </select>
            <input
              className={cn(control, 'w-32')}
              value={row.price}
              onChange={e => update(i, { price: e.target.value })}
              placeholder="$7,500"
            />
            <select
              className={cn(control, 'w-32 capitalize')}
              value={row.status}
              onChange={e => update(i, { status: e.target.value })}
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              type="button"
              onClick={() => remove(i)}
              className="
                flex size-8 items-center justify-center rounded-md border
                border-input text-muted-foreground
                hover:bg-secondary
              "
              aria-label="Remove pick"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="
          mt-3 rounded-md border border-input px-3 py-2 text-sm font-medium
          hover:bg-secondary
        "
      >
        + Add a pick
      </button>
    </div>
  );
}
