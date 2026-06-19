'use server';

import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/libs/DB';
import { dogsSchema, gallerySchema, leadsSchema, littersSchema, puppiesSchema, settingsSchema } from '@/models/Schema';
import { SETTINGS_FIELDS } from './settings';
import { slugify } from './types';

async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
}

function str(form: FormData, key: string) {
  return (form.get(key) as string | null)?.toString().trim() ?? '';
}

function num(form: FormData, key: string) {
  const value = Number.parseInt(str(form, key), 10);
  return Number.isNaN(value) ? 0 : value;
}

function bool(form: FormData, key: string) {
  return form.get(key) === 'on' || form.get(key) === 'true';
}

/** Split a textarea / comma list of image URLs into a clean array. */
function urlList(form: FormData, key: string) {
  return str(form, key)
    .split(/[\n,]+/)
    .map(s => s.trim())
    .filter(Boolean);
}

function revalidatePublic() {
  revalidatePath('/', 'layout');
}

// ─── Dogs ────────────────────────────────────────────────────────────────────

export async function saveDog(formData: FormData) {
  await requireAuth();

  const id = num(formData, 'id');
  const name = str(formData, 'name');
  const slug = str(formData, 'slug') || slugify(name);

  const values = {
    slug,
    type: str(formData, 'type') || 'stud',
    name,
    color: str(formData, 'color'),
    dob: str(formData, 'dob'),
    height: str(formData, 'height'),
    weight: str(formData, 'weight'),
    abkcReg: str(formData, 'abkcReg'),
    pedigree: str(formData, 'pedigree'),
    bio: str(formData, 'bio'),
    studFee: str(formData, 'studFee'),
    status: str(formData, 'status') || 'active',
    featured: bool(formData, 'featured'),
    heroImage: str(formData, 'heroImage'),
    gallery: urlList(formData, 'gallery'),
    videoUrl: str(formData, 'videoUrl'),
    sortOrder: num(formData, 'sortOrder'),
  };

  if (id) {
    await db.update(dogsSchema).set(values).where(eq(dogsSchema.id, id));
  } else {
    await db.insert(dogsSchema).values(values);
  }

  revalidatePublic();
  redirect('/dashboard/dogs');
}

export async function deleteDog(formData: FormData) {
  await requireAuth();
  const id = num(formData, 'id');
  if (id) {
    await db.delete(dogsSchema).where(eq(dogsSchema.id, id));
  }
  revalidatePublic();
  redirect('/dashboard/dogs');
}

// ─── Litters ─────────────────────────────────────────────────────────────────

export async function saveLitter(formData: FormData) {
  await requireAuth();

  const id = num(formData, 'id');
  const name = str(formData, 'name');
  const slug = str(formData, 'slug') || slugify(name);

  const values = {
    slug,
    name,
    sireName: str(formData, 'sireName'),
    damName: str(formData, 'damName'),
    status: str(formData, 'status') || 'planned',
    date: str(formData, 'date'),
    expectedColors: str(formData, 'expectedColors'),
    description: str(formData, 'description'),
    heroImage: str(formData, 'heroImage'),
    gallery: urlList(formData, 'gallery'),
    sortOrder: num(formData, 'sortOrder'),
  };

  if (id) {
    await db.update(littersSchema).set(values).where(eq(littersSchema.id, id));
  } else {
    await db.insert(littersSchema).values(values);
  }

  revalidatePublic();
  redirect('/dashboard/litters');
}

export async function deleteLitter(formData: FormData) {
  await requireAuth();
  const id = num(formData, 'id');
  if (id) {
    await db.delete(littersSchema).where(eq(littersSchema.id, id));
  }
  revalidatePublic();
  redirect('/dashboard/litters');
}

// ─── Puppies ─────────────────────────────────────────────────────────────────

export async function savePuppy(formData: FormData) {
  await requireAuth();

  const id = num(formData, 'id');
  const litterId = num(formData, 'litterId');

  const values = {
    litterId: litterId || null,
    name: str(formData, 'name'),
    sex: str(formData, 'sex'),
    color: str(formData, 'color'),
    price: str(formData, 'price'),
    status: str(formData, 'status') || 'available',
    description: str(formData, 'description'),
    heroImage: str(formData, 'heroImage'),
    gallery: urlList(formData, 'gallery'),
    videoUrl: str(formData, 'videoUrl'),
    sortOrder: num(formData, 'sortOrder'),
  };

  if (id) {
    await db.update(puppiesSchema).set(values).where(eq(puppiesSchema.id, id));
  } else {
    await db.insert(puppiesSchema).values(values);
  }

  revalidatePublic();
  redirect('/dashboard/puppies');
}

export async function deletePuppy(formData: FormData) {
  await requireAuth();
  const id = num(formData, 'id');
  if (id) {
    await db.delete(puppiesSchema).where(eq(puppiesSchema.id, id));
  }
  revalidatePublic();
  redirect('/dashboard/puppies');
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export async function addGalleryItems(formData: FormData) {
  await requireAuth();
  const urls = urlList(formData, 'urls');
  const alt = str(formData, 'alt');
  const kind = str(formData, 'kind') || 'image';
  if (urls.length > 0) {
    await db.insert(gallerySchema).values(urls.map(url => ({ url, alt, kind })));
  }
  revalidatePublic();
  redirect('/dashboard/gallery');
}

export async function deleteGalleryItem(formData: FormData) {
  await requireAuth();
  const id = num(formData, 'id');
  if (id) {
    await db.delete(gallerySchema).where(eq(gallerySchema.id, id));
  }
  revalidatePublic();
  redirect('/dashboard/gallery');
}

// ─── Leads (CRM) ─────────────────────────────────────────────────────────────

/** Public action — visitors submit inquiry forms. No auth required. */
export async function createLead(formData: FormData) {
  const name = str(formData, 'name');
  if (!name) {
    redirect('/contact?error=1');
  }

  await db.insert(leadsSchema).values({
    name,
    email: str(formData, 'email'),
    phone: str(formData, 'phone'),
    country: str(formData, 'country'),
    interest: str(formData, 'interest') || 'general',
    message: str(formData, 'message'),
    source: str(formData, 'source'),
  });

  const redirectTo = str(formData, 'redirectTo') || '/contact';
  redirect(`${redirectTo}?sent=1`);
}

export async function updateLeadStatus(formData: FormData) {
  await requireAuth();
  const id = num(formData, 'id');
  const status = str(formData, 'status') || 'new';
  if (id) {
    await db.update(leadsSchema).set({ status }).where(eq(leadsSchema.id, id));
  }
  revalidatePath('/dashboard/leads');
}

export async function deleteLead(formData: FormData) {
  await requireAuth();
  const id = num(formData, 'id');
  if (id) {
    await db.delete(leadsSchema).where(eq(leadsSchema.id, id));
  }
  revalidatePath('/dashboard/leads');
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function saveSettings(formData: FormData) {
  await requireAuth();

  for (const field of SETTINGS_FIELDS) {
    const value = str(formData, field.key);
    await db
      .insert(settingsSchema)
      .values({ key: field.key, value })
      .onConflictDoUpdate({ target: settingsSchema.key, set: { value } });
  }

  revalidatePublic();
  redirect('/dashboard/settings?saved=1');
}
