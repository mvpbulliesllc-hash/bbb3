import type { DogType, LitterStatus, PuppyStatus } from './types';
import { asc, desc, eq } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { dogsSchema, gallerySchema, leadsSchema, littersSchema, puppiesSchema, settingsSchema } from '@/models/Schema';
import { demoDogs, demoGallery, demoLitters, demoPuppies, isDemoMode } from './demoContent';
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

/** In demo mode, fall back to fixtures when the database returns nothing. */
function withDemo<T>(rows: T[], demo: T[]): T[] {
  return isDemoMode && rows.length === 0 ? demo : rows;
}

export const getDogs = (type?: DogType) =>
  safe(
    async () => {
      const rows = await db
        .select()
        .from(dogsSchema)
        .where(type ? eq(dogsSchema.type, type) : undefined)
        .orderBy(asc(dogsSchema.sortOrder), asc(dogsSchema.name));
      return withDemo(rows, demoDogs.filter(d => !type || d.type === type));
    },
    withDemo([], demoDogs.filter(d => !type || d.type === type)),
  );

export const getFeaturedDogs = () =>
  safe(
    async () => {
      const rows = await db
        .select()
        .from(dogsSchema)
        .where(eq(dogsSchema.featured, true))
        .orderBy(asc(dogsSchema.sortOrder), asc(dogsSchema.name));
      return withDemo(rows, demoDogs.filter(d => d.featured));
    },
    withDemo([], demoDogs.filter(d => d.featured)),
  );

export const getDogBySlug = (slug: string) =>
  safe(async () => {
    const rows = await db.select().from(dogsSchema).where(eq(dogsSchema.slug, slug)).limit(1);
    return rows[0] ?? (isDemoMode ? demoDogs.find(d => d.slug === slug) ?? null : null);
  }, isDemoMode ? demoDogs.find(d => d.slug === slug) ?? null : null);

export const getDogById = (id: number) =>
  safe(async () => {
    const rows = await db.select().from(dogsSchema).where(eq(dogsSchema.id, id)).limit(1);
    return rows[0] ?? null;
  }, null);

export const getLitters = (status?: LitterStatus) =>
  safe(
    async () => {
      const rows = await db
        .select()
        .from(littersSchema)
        .where(status ? eq(littersSchema.status, status) : undefined)
        .orderBy(asc(littersSchema.sortOrder), desc(littersSchema.createdAt));
      return withDemo(rows, demoLitters.filter(l => !status || l.status === status));
    },
    withDemo([], demoLitters.filter(l => !status || l.status === status)),
  );

export const getLitterById = (id: number) =>
  safe(async () => {
    const rows = await db.select().from(littersSchema).where(eq(littersSchema.id, id)).limit(1);
    return rows[0] ?? null;
  }, null);

export const getLitterBySlug = (slug: string) =>
  safe(
    async () => {
      const rows = await db.select().from(littersSchema).where(eq(littersSchema.slug, slug)).limit(1);
      return rows[0] ?? (isDemoMode ? demoLitters.find(l => l.slug === slug) ?? null : null);
    },
    isDemoMode ? demoLitters.find(l => l.slug === slug) ?? null : null,
  );

export const getPuppies = (status?: PuppyStatus) =>
  safe(
    async () => {
      const rows = await db
        .select()
        .from(puppiesSchema)
        .where(status ? eq(puppiesSchema.status, status) : undefined)
        .orderBy(asc(puppiesSchema.sortOrder), desc(puppiesSchema.createdAt));
      return withDemo(rows, demoPuppies.filter(p => !status || p.status === status));
    },
    withDemo([], demoPuppies.filter(p => !status || p.status === status)),
  );

export const getPuppyById = (id: number) =>
  safe(async () => {
    const rows = await db.select().from(puppiesSchema).where(eq(puppiesSchema.id, id)).limit(1);
    return rows[0] ?? null;
  }, null);

export const getGallery = () =>
  safe(
    async () => {
      const rows = await db.select().from(gallerySchema).orderBy(asc(gallerySchema.sortOrder), desc(gallerySchema.createdAt));
      return withDemo(rows, demoGallery);
    },
    withDemo([], demoGallery),
  );

export const getLeads = () =>
  safe(() => db.select().from(leadsSchema).orderBy(desc(leadsSchema.createdAt)), []);

export const getSettings = (): Promise<Record<string, string>> =>
  safe(async () => {
    const rows = await db.select().from(settingsSchema);
    const stored = Object.fromEntries(rows.map(r => [r.key, r.value]));
    return { ...settingDefaults, ...stored };
  }, { ...settingDefaults });
