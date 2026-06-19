import type { DogType, LitterStatus, PuppyStatus } from './types';
import { asc, desc, eq } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { dogsSchema, gallerySchema, leadsSchema, littersSchema, puppiesSchema, settingsSchema } from '@/models/Schema';
import { settingDefaults } from './settings';

/**
 * Read helpers for the public site and admin. Each is wrapped so a missing or
 * unmigrated database degrades to empty results instead of crashing the page.
 */

async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch {
    return fallback;
  }
}

export const getDogs = (type?: DogType) =>
  safe(
    () =>
      db
        .select()
        .from(dogsSchema)
        .where(type ? eq(dogsSchema.type, type) : undefined)
        .orderBy(asc(dogsSchema.sortOrder), asc(dogsSchema.name)),
    [],
  );

export const getFeaturedDogs = () =>
  safe(
    async () => {
      const rows = await db
        .select()
        .from(dogsSchema)
        .where(eq(dogsSchema.featured, true))
        .orderBy(asc(dogsSchema.sortOrder), asc(dogsSchema.name));
      return rows;
    },
    [],
  );

export const getDogBySlug = (slug: string) =>
  safe(async () => {
    const rows = await db.select().from(dogsSchema).where(eq(dogsSchema.slug, slug)).limit(1);
    return rows[0] ?? null;
  }, null);

export const getDogById = (id: number) =>
  safe(async () => {
    const rows = await db.select().from(dogsSchema).where(eq(dogsSchema.id, id)).limit(1);
    return rows[0] ?? null;
  }, null);

export const getLitters = (status?: LitterStatus) =>
  safe(
    () =>
      db
        .select()
        .from(littersSchema)
        .where(status ? eq(littersSchema.status, status) : undefined)
        .orderBy(asc(littersSchema.sortOrder), desc(littersSchema.createdAt)),
    [],
  );

export const getLitterById = (id: number) =>
  safe(async () => {
    const rows = await db.select().from(littersSchema).where(eq(littersSchema.id, id)).limit(1);
    return rows[0] ?? null;
  }, null);

export const getPuppies = (status?: PuppyStatus) =>
  safe(
    () =>
      db
        .select()
        .from(puppiesSchema)
        .where(status ? eq(puppiesSchema.status, status) : undefined)
        .orderBy(asc(puppiesSchema.sortOrder), desc(puppiesSchema.createdAt)),
    [],
  );

export const getPuppyById = (id: number) =>
  safe(async () => {
    const rows = await db.select().from(puppiesSchema).where(eq(puppiesSchema.id, id)).limit(1);
    return rows[0] ?? null;
  }, null);

export const getGallery = () =>
  safe(
    () => db.select().from(gallerySchema).orderBy(asc(gallerySchema.sortOrder), desc(gallerySchema.createdAt)),
    [],
  );

export const getLeads = () =>
  safe(() => db.select().from(leadsSchema).orderBy(desc(leadsSchema.createdAt)), []);

export const getSettings = (): Promise<Record<string, string>> =>
  safe(async () => {
    const rows = await db.select().from(settingsSchema);
    const stored = Object.fromEntries(rows.map(r => [r.key, r.value]));
    return { ...settingDefaults, ...stored };
  }, { ...settingDefaults });
