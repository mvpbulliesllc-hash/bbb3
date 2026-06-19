export type DogType = 'stud' | 'female';
export const DOG_TYPES: DogType[] = ['stud', 'female'];

export type DogStatus = 'active' | 'retired' | 'reference';
export const DOG_STATUSES: DogStatus[] = ['active', 'retired', 'reference'];

export type LitterStatus = 'planned' | 'current' | 'past';
export const LITTER_STATUSES: LitterStatus[] = ['planned', 'current', 'past'];

export type PuppyStatus = 'available' | 'reserved' | 'sold';
export const PUPPY_STATUSES: PuppyStatus[] = ['available', 'reserved', 'sold'];

export type LeadStatus = 'new' | 'contacted' | 'reserved' | 'closed';
export const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'reserved', 'closed'];

export type LeadInterest = 'stud' | 'puppy' | 'litter' | 'shipping' | 'general';
export const LEAD_INTERESTS: LeadInterest[] = ['stud', 'puppy', 'litter', 'shipping', 'general'];

/** Convert a name into a URL-friendly slug. */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
