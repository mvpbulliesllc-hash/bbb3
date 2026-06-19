import type { dogsSchema } from '@/models/Schema';
import Link from 'next/link';
import { saveDog } from '../actions';
import { DOG_STATUSES, DOG_TYPES } from '../types';
import { Field, Select, TextArea, TextInput } from './Fields';

type Dog = typeof dogsSchema.$inferSelect;

export const DogForm = ({ dog, defaultType }: { dog?: Dog; defaultType?: string }) => (
  <form action={saveDog} className="space-y-6">
    {dog && <input type="hidden" name="id" value={dog.id} />}

    <div className="
      grid gap-5
      sm:grid-cols-2
    "
    >
      <Field label="Name">
        <TextInput name="name" required defaultValue={dog?.name ?? ''} placeholder="e.g. Mako's Siberia" />
      </Field>
      <Field label="Type">
        <Select name="type" defaultValue={dog?.type ?? defaultType ?? 'stud'}>
          {DOG_TYPES.map(t => (
            <option key={t} value={t}>{t === 'stud' ? 'Stud (male)' : 'Female (dam)'}</option>
          ))}
        </Select>
      </Field>
      <Field label="Color">
        <TextInput name="color" defaultValue={dog?.color ?? ''} placeholder="e.g. Lilac tri" />
      </Field>
      <Field label="Date of birth" hint="Free text, e.g. 'Mar 2022'">
        <TextInput name="dob" defaultValue={dog?.dob ?? ''} />
      </Field>
      <Field label="Height">
        <TextInput name="height" defaultValue={dog?.height ?? ''} placeholder="e.g. XL / 21in" />
      </Field>
      <Field label="Weight">
        <TextInput name="weight" defaultValue={dog?.weight ?? ''} placeholder="e.g. 120 lbs" />
      </Field>
      <Field label="ABKC registration">
        <TextInput name="abkcReg" defaultValue={dog?.abkcReg ?? ''} />
      </Field>
      <Field label="Stud fee" hint="Studs only — leave blank for females">
        <TextInput name="studFee" defaultValue={dog?.studFee ?? ''} placeholder="e.g. Inquire" />
      </Field>
    </div>

    <Field label="Pedigree" hint="Sire x Dam lines, titles, etc.">
      <TextArea name="pedigree" rows={2} defaultValue={dog?.pedigree ?? ''} />
    </Field>

    <Field label="Bio / description">
      <TextArea name="bio" rows={4} defaultValue={dog?.bio ?? ''} />
    </Field>

    <Field label="Hero image URL" hint="Paste an image link (e.g. from Instagram or your hosting).">
      <TextInput name="heroImage" defaultValue={dog?.heroImage ?? ''} placeholder="https://…" />
    </Field>

    <Field label="Gallery image URLs" hint="One URL per line.">
      <TextArea name="gallery" rows={3} defaultValue={(dog?.gallery ?? []).join('\n')} placeholder="https://…" />
    </Field>

    <div className="
      grid gap-5
      sm:grid-cols-3
    "
    >
      <Field label="Video URL" hint="YouTube / Instagram reel / Mux link">
        <TextInput name="videoUrl" defaultValue={dog?.videoUrl ?? ''} placeholder="https://…" />
      </Field>
      <Field label="Status">
        <Select name="status" defaultValue={dog?.status ?? 'active'}>
          {DOG_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
      </Field>
      <Field label="Sort order" hint="Lower shows first">
        <TextInput name="sortOrder" type="number" defaultValue={dog?.sortOrder ?? 0} />
      </Field>
    </div>

    <label className="flex items-center gap-2 text-sm font-medium">
      <input
        type="checkbox"
        name="featured"
        defaultChecked={dog?.featured ?? false}
        className="size-4"
      />
      Feature on the homepage
    </label>

    <div className="flex items-center gap-3 border-t pt-6">
      <button
        type="submit"
        className="
          rounded-md bg-primary px-5 py-2 text-sm font-semibold
          text-primary-foreground
        "
      >
        {dog ? 'Save changes' : 'Create dog'}
      </button>
      <Link
        href="/dashboard/dogs"
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
