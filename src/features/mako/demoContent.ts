import type { dogsSchema, gallerySchema, littersSchema, puppiesSchema } from '@/models/Schema';

/**
 * Demo fixtures used ONLY when `DEMO_MODE=true` and the database returns no rows
 * (e.g. the public Vercel preview, which has no migrated database). Production
 * behaviour is unchanged when the flag is off. Images are royalty-free stock
 * placeholders purely to show the design populated.
 */
export const isDemoMode = process.env.DEMO_MODE === 'true';

type Dog = typeof dogsSchema.$inferSelect;
type Litter = typeof littersSchema.$inferSelect;
type Puppy = typeof puppiesSchema.$inferSelect;
type GalleryItem = typeof gallerySchema.$inferSelect;

const now = new Date('2026-01-01T00:00:00Z');

const img = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

const dogDefaults = {
  dob: '',
  height: 'XL',
  weight: '',
  abkcReg: '',
  pedigree: '',
  studFee: '',
  status: 'active',
  videoUrl: '',
  updatedAt: now,
  createdAt: now,
};

export const demoDogs: Dog[] = [
  {
    ...dogDefaults,
    id: 1,
    slug: 'makos-siberia',
    type: 'female',
    name: 'Mako\'s Siberia',
    color: 'All-white',
    bio: 'Our famous "white panther" — a striking all-white XL American Bully female and the face of Mako Kennel.',
    featured: true,
    heroImage: img('photo-1583511655857-d19b40a7a54e'),
    gallery: [img('photo-1552053831-71594a27632d'), img('photo-1561037404-61cd46aa615b')],
    sortOrder: 1,
  },
  {
    ...dogDefaults,
    id: 2,
    slug: 'euphoria',
    type: 'female',
    name: 'Euphoria',
    color: 'Chocolate merle',
    bio: 'A foundation chocolate merle dam known for heavy bone and producing rare coat colors. Dam of Siberia.',
    featured: true,
    heroImage: img('photo-1568572933382-74d440642117'),
    gallery: [],
    sortOrder: 2,
  },
  {
    ...dogDefaults,
    id: 3,
    slug: 'bossys-goldbar',
    type: 'stud',
    name: 'Bossy\'s Goldbar',
    color: 'Lilac tri',
    bio: 'A renowned lilac tri stud celebrated for his heavy bone structure and large head. A pillar of our color program.',
    studFee: 'Inquire',
    featured: true,
    heroImage: img('photo-1597633425046-08f5110420b5'),
    gallery: [],
    sortOrder: 3,
  },
  {
    ...dogDefaults,
    id: 4,
    slug: 'moncler',
    type: 'stud',
    name: 'Moncler',
    color: 'Blue',
    bio: 'A featured stud in our high-end breedings, bringing structure and substance to every litter.',
    studFee: 'Inquire',
    featured: true,
    heroImage: img('photo-1602491453631-e2a5ad90a131'),
    gallery: [],
    sortOrder: 4,
  },
];

export const demoLitters: Litter[] = [
  {
    id: 1,
    slug: 'goldbar-x-euphoria-2026',
    name: 'Goldbar x Euphoria',
    sireName: 'Bossy\'s Goldbar',
    damName: 'Euphoria',
    status: 'current',
    date: 'On the ground',
    expectedColors: 'Lilac tri, chocolate merle',
    description: 'A premium pairing of our lilac tri stud with our chocolate merle dam. Outstanding bone and rare colors expected.',
    heroImage: img('photo-1601758228041-f3b2795255f1'),
    gallery: [],
    sortOrder: 1,
    updatedAt: now,
    createdAt: now,
  },
  {
    id: 2,
    slug: 'moncler-x-siberia-2026',
    name: 'Moncler x Siberia',
    sireName: 'Moncler',
    damName: 'Mako\'s Siberia',
    status: 'planned',
    date: 'Planned 2026',
    expectedColors: 'White, lilac, merle',
    description: 'A highly anticipated planned breeding featuring our white panther. Join the waitlist to be first in line.',
    heroImage: img('photo-1543466835-00a7907e9de1'),
    gallery: [],
    sortOrder: 2,
    updatedAt: now,
    createdAt: now,
  },
];

export const demoPuppies: Puppy[] = [
  {
    id: 1,
    litterId: 1,
    name: 'Blue collar male',
    sex: 'Male',
    color: 'Lilac tri',
    price: '$6,500',
    status: 'available',
    description: 'Heavy-boned male with a massive head and calm temperament.',
    heroImage: img('photo-1583337130417-3346a1be7dee'),
    gallery: [],
    videoUrl: '',
    sortOrder: 1,
    updatedAt: now,
    createdAt: now,
  },
  {
    id: 2,
    litterId: 1,
    name: 'Pink collar female',
    sex: 'Female',
    color: 'Chocolate merle',
    price: '$7,000',
    status: 'available',
    description: 'Exotic chocolate merle female with striking structure.',
    heroImage: img('photo-1591769225440-811ad7d6eab3'),
    gallery: [],
    videoUrl: '',
    sortOrder: 2,
    updatedAt: now,
    createdAt: now,
  },
  {
    id: 3,
    litterId: 1,
    name: 'Green collar male',
    sex: 'Male',
    color: 'Blue fawn',
    price: 'Reserved',
    status: 'reserved',
    description: 'Compact, blocky male — reserved to an approved home.',
    heroImage: img('photo-1605897472359-85e4b94d685d'),
    gallery: [],
    videoUrl: '',
    sortOrder: 3,
    updatedAt: now,
    createdAt: now,
  },
];

export const demoGallery: GalleryItem[] = [
  img('photo-1583511655857-d19b40a7a54e'),
  img('photo-1568572933382-74d440642117'),
  img('photo-1597633425046-08f5110420b5'),
  img('photo-1602491453631-e2a5ad90a131'),
  img('photo-1601758228041-f3b2795255f1'),
  img('photo-1583337130417-3346a1be7dee'),
].map((url, i) => ({ id: i + 1, kind: 'image', url, alt: 'Mako Kennel', sortOrder: i, createdAt: now }));
