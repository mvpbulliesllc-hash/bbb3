CREATE TABLE "dogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"type" text DEFAULT 'stud' NOT NULL,
	"name" text NOT NULL,
	"color" text DEFAULT '',
	"dob" text DEFAULT '',
	"height" text DEFAULT '',
	"weight" text DEFAULT '',
	"abkc_reg" text DEFAULT '',
	"pedigree" text DEFAULT '',
	"bio" text DEFAULT '',
	"stud_fee" text DEFAULT '',
	"status" text DEFAULT 'active' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"hero_image" text DEFAULT '',
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"video_url" text DEFAULT '',
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "dogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "gallery_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"kind" text DEFAULT 'image' NOT NULL,
	"url" text NOT NULL,
	"alt" text DEFAULT '',
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text DEFAULT '',
	"phone" text DEFAULT '',
	"country" text DEFAULT '',
	"interest" text DEFAULT 'general' NOT NULL,
	"message" text DEFAULT '',
	"source" text DEFAULT '',
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "litters" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"sire_name" text DEFAULT '',
	"dam_name" text DEFAULT '',
	"status" text DEFAULT 'planned' NOT NULL,
	"date" text DEFAULT '',
	"expected_colors" text DEFAULT '',
	"description" text DEFAULT '',
	"hero_image" text DEFAULT '',
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "litters_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "puppies" (
	"id" serial PRIMARY KEY NOT NULL,
	"litter_id" integer,
	"name" text NOT NULL,
	"sex" text DEFAULT '',
	"color" text DEFAULT '',
	"price" text DEFAULT '',
	"status" text DEFAULT 'available' NOT NULL,
	"description" text DEFAULT '',
	"hero_image" text DEFAULT '',
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"video_url" text DEFAULT '',
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "site_settings_key_unique" UNIQUE("key")
);

--> statement-breakpoint
-- Seed: initial Mako Kennel content (idempotent — safe to re-run).
INSERT INTO "dogs" ("slug","type","name","color","dob","height","weight","abkc_reg","pedigree","bio","stud_fee","status","featured","sort_order") VALUES
('makos-siberia','female','Mako''s Siberia','All-white','2023','XL','—','','Euphoria (chocolate merle) x high-end stud','Our famous "white panther" — a striking all-white XL American Bully female and the face of Mako Kennel. Exceptional structure, calm temperament and rare coat.','','active',true,1),
('euphoria','female','Euphoria','Chocolate merle','2021','XL','','','','A foundation chocolate merle dam known for heavy bone and producing rare coat colors. Dam of Siberia.','','active',true,2),
('bossys-goldbar','stud','Bossy''s Goldbar','Lilac tri','2020','XL','','','','A renowned lilac tri stud celebrated for his heavy bone structure and large head. A pillar of our color program.','Inquire','active',true,3),
('moncler','stud','Moncler','','2021','XL','','','','A featured stud in our high-end breedings, bringing structure and substance to every litter.','Inquire','active',true,4)
ON CONFLICT ("slug") DO NOTHING;
--> statement-breakpoint
INSERT INTO "litters" ("slug","name","sire_name","dam_name","status","date","expected_colors","description","sort_order") VALUES
('goldbar-x-euphoria-2026','Goldbar x Euphoria','Bossy''s Goldbar','Euphoria','current','On the ground','Lilac tri, chocolate merle','A premium pairing of our lilac tri stud with our chocolate merle dam. Outstanding bone and rare colors expected.',1),
('moncler-x-siberia-2026','Moncler x Siberia','Moncler','Mako''s Siberia','planned','Planned 2026','White, lilac, merle','A highly anticipated planned breeding featuring our white panther. Join the waitlist to be first in line.',2)
ON CONFLICT ("slug") DO NOTHING;
