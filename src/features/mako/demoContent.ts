import type { dogsSchema, gallerySchema, littersSchema, puppiesSchema } from '@/models/Schema';

/**
 * Demo fixtures used ONLY when `DEMO_MODE=true` and the database returns no rows
 * (e.g. the public preview, which has no migrated database). Production behaviour
 * is unchanged when the flag is off. Images are the kennel's own photos served
 * from `public/images`.
 */
export const isDemoMode = process.env.DEMO_MODE === 'true';

type Dog = typeof dogsSchema.$inferSelect;
type Litter = typeof littersSchema.$inferSelect;
type Puppy = typeof puppiesSchema.$inferSelect;
type GalleryItem = typeof gallerySchema.$inferSelect;

const now = new Date('2026-01-01T00:00:00Z');

/** Local photo in /public/images. */
const img = (n: string) => `/images/img-${n}.jpg`;

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
    slug: 'bossys-goldbar',
    type: 'stud',
    name: 'Bossy\'s Goldbar',
    color: 'Lilac tri',
    bio: 'Our foundation lilac tri sire from the Bossy bloodline — celebrated for heavy bone, a massive head and rare coat. The father behind many of our standout dogs.',
    studFee: 'Inquire',
    featured: true,
    heroImage: img('002'),
    gallery: [img('042'), img('061')],
    sortOrder: 1,
  },
  {
    ...dogDefaults,
    id: 2,
    slug: 'makos-siberia',
    type: 'female',
    name: 'Mako\'s Siberia',
    color: 'All-white',
    bio: 'Our famous "white panther." As the youngest female in her category at the ABKC Show Tatry, she placed at all six shows with two 1st-place wins — confident movement, beautiful structure and the face of Mako Kennel.',
    featured: true,
    heroImage: img('005'),
    gallery: [img('012'), img('085')],
    sortOrder: 2,
  },
  {
    ...dogDefaults,
    id: 3,
    slug: 'euphoria',
    type: 'female',
    name: 'Euphoria',
    color: 'Chocolate merle',
    bio: 'Our chocolate merle dam from the Bossy bloodline — 55 kg of structure, a massive head and a rare merle coat. The dam behind standout breedings, including Moncler × Euphoria.',
    featured: true,
    heroImage: img('061'),
    gallery: [img('046')],
    sortOrder: 3,
  },
  {
    ...dogDefaults,
    id: 4,
    slug: 'moncler',
    type: 'stud',
    name: 'Moncler',
    color: 'Chocolate tri',
    bio: 'A featured stud in our high-end breedings, bringing substance, structure and a massive head to every litter.',
    studFee: 'Inquire',
    featured: true,
    heroImage: img('104'),
    gallery: [img('071')],
    sortOrder: 4,
  },
];

export const demoLitters: Litter[] = [
  {
    id: 1,
    slug: 'moncler-x-euphoria',
    name: 'Moncler × Euphoria',
    sireName: 'Moncler',
    damName: 'Euphoria',
    status: 'current',
    date: 'Born — first days',
    expectedColors: 'Merle females',
    description: 'On the ground! Euphoria × Moncler — gorgeous merle females in their first days. A pairing built for extreme structure, massive heads and that real XL bully presence. Waitlist open.',
    heroImage: img('019'),
    gallery: [img('046'), img('071')],
    sortOrder: 1,
    updatedAt: now,
    createdAt: now,
  },
  {
    id: 2,
    slug: 'goldbar-x-siberia',
    name: 'Goldbar × Siberia',
    sireName: 'Bossy\'s Goldbar',
    damName: 'Mako\'s Siberia',
    status: 'planned',
    date: 'Planned 2026',
    expectedColors: 'White, lilac tri, merle',
    description: 'A highly anticipated planned breeding pairing our lilac tri stud with the white panther. Join the waitlist to be first in line.',
    heroImage: img('042'),
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
    name: 'Lilac tri male',
    sex: 'Male',
    color: 'Lilac tri',
    price: '$7,500',
    status: 'available',
    description: 'Heavy-boned male with a massive head and a calm, confident temperament.',
    heroImage: img('038'),
    gallery: [],
    videoUrl: '',
    sortOrder: 1,
    updatedAt: now,
    createdAt: now,
  },
  {
    id: 2,
    litterId: 1,
    name: 'Chocolate merle female',
    sex: 'Female',
    color: 'Chocolate merle',
    price: '$8,000',
    status: 'available',
    description: 'Exotic chocolate merle female with striking structure and rare coat.',
    heroImage: img('046'),
    gallery: [],
    videoUrl: '',
    sortOrder: 2,
    updatedAt: now,
    createdAt: now,
  },
  {
    id: 3,
    litterId: 1,
    name: 'White male',
    sex: 'Male',
    color: 'White',
    price: 'Reserved',
    status: 'reserved',
    description: 'All-white male in the line of our white panther — reserved to an approved home.',
    heroImage: img('071'),
    gallery: [],
    videoUrl: '',
    sortOrder: 3,
    updatedAt: now,
    createdAt: now,
  },
];

const galleryPhotos = [
  '002',
  '005',
  '012',
  '042',
  '061',
  '104',
  '019',
  '038',
  '046',
  '071',
  '074',
  '085',
  '070',
  '091',
  '103',
  '015',
  '089',
];

export const demoGallery: GalleryItem[] = galleryPhotos.map((n, i) => ({
  id: i + 1,
  kind: 'image',
  url: img(n),
  alt: 'Mako Kennel XL American Bully',
  sortOrder: i,
  createdAt: now,
}));
