import type { littersSchema, puppiesSchema } from '@/models/Schema';
import Link from 'next/link';
import { savePuppy } from '../actions';
import { PUPPY_STATUSES } from '../types';
import { Field, Select, TextArea, TextInput } from './Fields';
import { GalleryField } from './GalleryField';
import { ImageField } from './ImageField';

type Puppy = typeof puppiesSchema.$inferSelect;
type Litter = typeof littersSchema.$inferSelect;

export const PuppyForm = ({ puppy, litters }: { puppy?: Puppy; litters: Litter[] }) => (
  <form action={savePuppy} className="space-y-6">
    {puppy && <input type="hidden" name="id" value={puppy.id} />}

    <div className="
      grid gap-5
      sm:grid-cols-2
    "
    >
      <Field label="Name / identifier">
        <TextInput name="name" required defaultValue={puppy?.name ?? ''} placeholder="e.g. Blue collar male" />
      </Field>
      <Field label="Litter">
        <Select name="litterId" defaultValue={puppy?.litterId ?? ''}>
          <option value="">— No litter —</option>
          {litters.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </Select>
      </Field>
      <Field label="Sex">
        <Select name="sex" defaultValue={puppy?.sex ?? 'Male'}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
      </Field>
      <Field label="Color">
        <TextInput name="color" defaultValue={puppy?.color ?? ''} placeholder="e.g. Lilac tri" />
      </Field>
      <Field label="Price">
        <TextInput name="price" defaultValue={puppy?.price ?? ''} placeholder="e.g. $6,500 or Inquire" />
      </Field>
      <Field label="Status">
        <Select name="status" defaultValue={puppy?.status ?? 'available'}>
          {PUPPY_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
      </Field>
    </div>

    <Field label="Description">
      <TextArea name="description" rows={3} defaultValue={puppy?.description ?? ''} />
    </Field>

    <ImageField name="heroImage" label="Main photo" defaultValue={puppy?.heroImage ?? ''} />

    <GalleryField name="gallery" label="More photos" defaultValue={puppy?.gallery ?? []} />

    <div className="
      grid gap-5
      sm:grid-cols-2
    "
    >
      <Field label="Video URL">
        <TextInput name="videoUrl" defaultValue={puppy?.videoUrl ?? ''} placeholder="https://…" />
      </Field>
      <Field label="Sort order" hint="Lower shows first">
        <TextInput name="sortOrder" type="number" defaultValue={puppy?.sortOrder ?? 0} />
      </Field>
    </div>

    <div className="flex items-center gap-3 border-t pt-6">
      <button
        type="submit"
        className="
          rounded-md bg-primary px-5 py-2 text-sm font-semibold
          text-primary-foreground
        "
      >
        {puppy ? 'Save changes' : 'Create puppy'}
      </button>
      <Link
        href="/dashboard/puppies"
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
