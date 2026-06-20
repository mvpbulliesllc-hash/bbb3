/**
 * Central brand + contact configuration for the Mako Kennel site.
 * Edit here to update business-wide details that aren't stored in the database.
 */
export const Brand = {
  name: 'Mako Kennel',
  legalName: 'MakoKennels',
  tagline: 'World-class XL American Bullies',
  standards: 'Health · Character · Structure',
  since: 2020,
  registry: 'ABKC',
  location: 'Slovakia, Europe',
  ships: 'Worldwide',
  phone: '+421 949 733 558',
  // Digits only, for tel: and WhatsApp links.
  phoneDigits: '421949733558',
  email: 'info@makokennel.com',
  instagram: 'https://www.instagram.com/makokennel/',
  instagramHandle: 'makokennel',
  facebook: 'https://www.facebook.com/p/MakoKennels-100064845482146/',
  followers: '60.4K',
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${Brand.phoneDigits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

/** Primary public navigation, used by the site header and footer. */
export const navLinks = [
  { href: '/studs', label: 'Stud Dogs' },
  { href: '/females', label: 'Females' },
  { href: '/litters', label: 'Litters' },
  { href: '/puppies', label: 'Available Puppies' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/contact', label: 'Contact' },
] as const;
