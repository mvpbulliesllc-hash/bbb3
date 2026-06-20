import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { demoDogs, demoGallery, demoLitters, demoPuppies } from '../src/features/mako/demoContent';
import { settingDefaults } from '../src/features/mako/settings';
import * as schema from '../src/models/Schema';

/**
 * Seed / refresh the live database with the current site content (dogs,
 * litters with pricing + cam, puppies, gallery, settings).
 *
 * Versioned + run once: it only (re)writes content when the stored
 * `seed_version` differs from SEED_VERSION. After it stamps the current
 * version, later deploys skip entirely, so the owner's dashboard edits are
 * never overwritten. Inquiries (leads) are never touched. Bumping
 * SEED_VERSION forces a one-time refresh on the next deploy.
 *
 * Runs at deploy time (see vercel.json) after migrations.
 */
const SEED_VERSION = '2026-06-20.1';

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn('seed: DATABASE_URL not set — skipping seed.');
    return;
  }

  const pool = new Pool({ connectionString: url, connectionTimeoutMillis: 10000 });
  const db = drizzle(pool, { schema });

  try {
    const marker = await db
      .select()
      .from(schema.settingsSchema)
      .where(eq(schema.settingsSchema.key, 'seed_version'));

    if (marker[0]?.value === SEED_VERSION) {
      console.warn(`seed: already at ${SEED_VERSION} — preserving live content.`);
      return;
    }

    console.warn(`seed: refreshing content to ${SEED_VERSION} …`);

    // Replace content tables (leads/inquiries are intentionally left alone).
    await db.delete(schema.puppiesSchema);
    await db.delete(schema.littersSchema);
    await db.delete(schema.dogsSchema);
    await db.delete(schema.gallerySchema);

    await db.insert(schema.dogsSchema).values(demoDogs.map(({ id, ...dog }) => dog));

    const insertedLitters = await db
      .insert(schema.littersSchema)
      .values(demoLitters.map(({ id, ...litter }) => litter))
      .returning();
    const newLitterIdBySlug = new Map(insertedLitters.map(l => [l.slug, l.id]));
    const demoSlugById = new Map(demoLitters.map(l => [l.id, l.slug]));

    await db.insert(schema.puppiesSchema).values(
      demoPuppies.map(({ id, litterId, ...puppy }) => ({
        ...puppy,
        litterId: litterId != null ? newLitterIdBySlug.get(demoSlugById.get(litterId) ?? '') ?? null : null,
      })),
    );

    await db.insert(schema.gallerySchema).values(demoGallery.map(({ id, ...item }) => item));

    // Editable page copy / hero / video — only add missing keys, never clobber edits.
    for (const [key, value] of Object.entries(settingDefaults)) {
      await db.insert(schema.settingsSchema).values({ key, value }).onConflictDoNothing();
    }

    // Stamp the version so later deploys skip.
    await db
      .insert(schema.settingsSchema)
      .values({ key: 'seed_version', value: SEED_VERSION })
      .onConflictDoUpdate({ target: schema.settingsSchema.key, set: { value: SEED_VERSION } });

    console.warn('seed: done — content refreshed.');
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error('seed failed:', error);
  process.exit(1);
});
