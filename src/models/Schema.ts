import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// It automatically run the command `db-server:file`, which apply the migration before Next.js starts in development mode,
// Alternatively, if your database is running, you can run `npm run db:migrate` and there is no need to restart the server.

export const todoSchema = pgTable('todo', {
  id: serial('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ─────────────────────────────────────────────────────────────────────────────
// Mako Kennel — content the owner manages from the admin (CMS) without a developer.
// ─────────────────────────────────────────────────────────────────────────────

/** Stud dogs (type = 'stud') and females/dams (type = 'female'). */
export const dogsSchema = pgTable('dogs', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  type: text('type').notNull().default('stud'), // 'stud' | 'female'
  name: text('name').notNull(),
  color: text('color').default(''),
  dob: text('dob').default(''), // free text, e.g. "2022" or "Mar 2022"
  height: text('height').default(''),
  weight: text('weight').default(''),
  abkcReg: text('abkc_reg').default(''),
  pedigree: text('pedigree').default(''),
  bio: text('bio').default(''),
  studFee: text('stud_fee').default(''),
  status: text('status').notNull().default('active'), // 'active' | 'retired' | 'reference'
  featured: boolean('featured').notNull().default(false),
  heroImage: text('hero_image').default(''),
  gallery: jsonb('gallery').$type<string[]>().notNull().default([]),
  videoUrl: text('video_url').default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

/** A "pick of the litter" reservation slot with its price and availability. */
export type LitterPick = {
  sex: string; // 'Male' | 'Female'
  pick: number; // 1..6
  price: string; // free text, e.g. "$9,000"
  status: string; // 'available' | 'reserved' | 'sold'
};

/** Current, planned and past litters. */
export const littersSchema = pgTable('litters', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  sireName: text('sire_name').default(''),
  damName: text('dam_name').default(''),
  status: text('status').notNull().default('planned'), // 'planned' | 'current' | 'past'
  date: text('date').default(''), // due or born date, free text
  expectedColors: text('expected_colors').default(''),
  description: text('description').default(''),
  heroImage: text('hero_image').default(''),
  gallery: jsonb('gallery').$type<string[]>().notNull().default([]),
  picks: jsonb('picks').$type<LitterPick[]>().notNull().default([]),
  sortOrder: integer('sort_order').notNull().default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

/** Individual puppies (availability storefront). */
export const puppiesSchema = pgTable('puppies', {
  id: serial('id').primaryKey(),
  litterId: integer('litter_id'),
  name: text('name').notNull(),
  sex: text('sex').default(''), // 'male' | 'female' (free text)
  color: text('color').default(''),
  price: text('price').default(''),
  status: text('status').notNull().default('available'), // 'available' | 'reserved' | 'sold'
  description: text('description').default(''),
  heroImage: text('hero_image').default(''),
  gallery: jsonb('gallery').$type<string[]>().notNull().default([]),
  videoUrl: text('video_url').default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

/** Stand-alone gallery showcase items (photos & videos). */
export const gallerySchema = pgTable('gallery_items', {
  id: serial('id').primaryKey(),
  kind: text('kind').notNull().default('image'), // 'image' | 'video'
  url: text('url').notNull(),
  alt: text('alt').default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

/** Inquiries captured from contact / puppy / stud / waitlist forms (CRM). */
export const leadsSchema = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').default(''),
  phone: text('phone').default(''),
  country: text('country').default(''),
  interest: text('interest').notNull().default('general'),
  message: text('message').default(''),
  source: text('source').default(''), // which dog/page drove the inquiry
  status: text('status').notNull().default('new'), // 'new' | 'contacted' | 'reserved' | 'closed'
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

/** Editable singleton page content (shipping info, about, hero copy, etc.). */
export const settingsSchema = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull().default(''),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
