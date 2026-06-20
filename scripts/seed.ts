import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { demoDogs, demoGallery, demoLitters, demoPuppies } from '../src/features/mako/demoContent';
import { settingDefaults } from '../src/features/mako/settings';
import * as schema from '../src/models/Schema';

/**
 * Seed the live database with the current site content (dogs, litters with
 * pricing + cam, puppies, gallery, settings). Idempotent: if dogs already
 * exist it does nothing, so it will never overwrite the owner's later edits.
 *
 * Runs at deploy time (see vercel.json) after migrations.
 */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn('seed: DATABASE_URL not set — skipping seed.');
    return;
  }

  const pool = new Pool({ connectionString: url, connectionTimeoutMillis: 10000 });
  const db = drizzle(pool, { schema });

  try {
    const existing = await db.select().from(schema.dogsSchema);
    if (existing.length > 0) {
      const litters = await db.select().from(schema.littersSchema);
      const puppies = await db.select().from(schema.puppiesSchema);
      const gallery = await db.select().from(schema.gallerySchema);
      console.warn(
        `seed: content already present — skipping. dogs=${existing.length} [${existing.map(d => d.slug).join(', ')}] `
        + `litters=${litters.length} puppies=${puppies.length} gallery=${gallery.length}`,
      );
      return;
    }

    // Dogs
    await db.insert(schema.dogsSchema).values(demoDogs.map(({ id, ...dog }) => dog));

    // Litters (capture generated ids so puppies can reference them)
    const insertedLitters = await db
      .insert(schema.littersSchema)
      .values(demoLitters.map(({ id, ...litter }) => litter))
      .returning();
    const newLitterIdBySlug = new Map(insertedLitters.map(l => [l.slug, l.id]));
    const demoSlugById = new Map(demoLitters.map(l => [l.id, l.slug]));

    // Puppies (remap litterId from the demo id to the freshly generated id)
    await db.insert(schema.puppiesSchema).values(
      demoPuppies.map(({ id, litterId, ...puppy }) => ({
        ...puppy,
        litterId: litterId != null ? newLitterIdBySlug.get(demoSlugById.get(litterId) ?? '') ?? null : null,
      })),
    );

    // Gallery
    await db.insert(schema.gallerySchema).values(demoGallery.map(({ id, ...item }) => item));

    // Settings (editable page copy / hero / video — skip any already present)
    for (const [key, value] of Object.entries(settingDefaults)) {
      await db.insert(schema.settingsSchema).values({ key, value }).onConflictDoNothing();
    }

    console.warn('seed: done — content inserted.');
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error('seed failed:', error);
  process.exit(1);
});
