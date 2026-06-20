import type { littersSchema } from '@/models/Schema';
import Link from 'next/link';
import { saveLitter } from '../actions';
import { LITTER_STATUSES } from '../types';
import { Field, Select, TextArea, TextInput } from './Fields';

type Litter = typeof littersSchema.$inferSelect;

export const LitterForm = ({ litter }: { litter?: Litter }) => (
  <form action={saveLitter} className="space-y-6">
    {litter && <input type="hidden" name="id" value={litter.id} />}

    <Field label="Litter name">
      <TextInput name="name" required defaultValue={litter?.name ?? ''} placeholder="e.g. Goldbar x Euphoria" />
    </Field>

    <div className="
      grid gap-5
      sm:grid-cols-2
    "
    >
      <Field label="Sire (father)">
        <TextInput name="sireName" defaultValue={litter?.sireName ?? ''} placeholder="e.g. Bossy's Goldbar" />
      </Field>
      <Field label="Dam (mother)">
        <TextInput name="damName" defaultValue={litter?.damName ?? ''} placeholder="e.g. Euphoria" />
      </Field>
      <Field label="Status">
        <Select name="status" defaultValue={litter?.status ?? 'planned'}>
          {LITTER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
      </Field>
      <Field label="Date" hint="Due or born date — free text">
        <TextInput name="date" defaultValue={litter?.date ?? ''} placeholder="e.g. Born May 2026" />
      </Field>
    </div>

    <Field label="Expected colors">
      <TextInput name="expectedColors" defaultValue={litter?.expectedColors ?? ''} placeholder="e.g. Lilac tri, chocolate merle" />
    </Field>

    <Field label="Description">
      <TextArea name="description" rows={4} defaultValue={litter?.description ?? ''} />
    </Field>

    <Field label="Hero image URL">
      <TextInput name="heroImage" defaultValue={litter?.heroImage ?? ''} placeholder="https://…" />
    </Field>

    <Field label="Gallery image URLs" hint="One URL per line.">
      <TextArea name="gallery" rows={3} defaultValue={(litter?.gallery ?? []).join('\n')} placeholder="https://…" />
    </Field>

    <Field
      label="Pick pricing"
      hint="One pick per line: Sex | Pick number | Price | Status (available/reserved/sold). e.g. Male | 1 | $9,000 | available"
    >
      <TextArea
        name="picks"
        rows={6}
        defaultValue={(litter?.picks ?? [])
          .map(p => `${p.sex} | ${p.pick} | ${p.price} | ${p.status}`)
          .join('\n')}
        placeholder={'Male | 1 | $9,000 | available\nFemale | 1 | $10,000 | reserved'}
      />
    </Field>

    <Field
      label="Litter cam"
      hint="Live feed of the puppies. Paste a MUX live Playback ID, an HLS/MP4 stream URL, or leave blank to hide. (MUX → create a live stream, point your webcam/OBS at the RTMP ingest, then paste the Playback ID.)"
    >
      <TextInput name="liveStreamUrl" defaultValue={litter?.liveStreamUrl ?? ''} placeholder="MUX playback ID or https://…/stream.m3u8" />
    </Field>

    <Field label="Sort order" hint="Lower shows first">
      <TextInput name="sortOrder" type="number" defaultValue={litter?.sortOrder ?? 0} />
    </Field>

    <div className="flex items-center gap-3 border-t pt-6">
      <button
        type="submit"
        className="
          rounded-md bg-primary px-5 py-2 text-sm font-semibold
          text-primary-foreground
        "
      >
        {litter ? 'Save changes' : 'Create litter'}
      </button>
      <Link
        href="/dashboard/litters"
        className="
          text-sm text-muted-foreground
          hover:underline
        "
      >
        Cancel
      </Link>
    </div>
  </form>
);
