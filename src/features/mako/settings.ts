/**
 * Editable site settings. Each key is exposed in the admin → Settings page and
 * rendered on the public site. Defaults seed the first-run experience.
 */
export const SETTINGS_FIELDS = [
  {
    key: 'hero_headline',
    label: 'Home hero headline',
    type: 'text',
    default: 'World-Class XL American Bullies',
  },
  {
    key: 'hero_subhead',
    label: 'Home hero subheadline',
    type: 'textarea',
    default:
      'Professional ABKC breeder since 2020. Heavy bone, large heads and rare coat colors — bred for health, character and structure, and shipped worldwide from Europe.',
  },
  {
    key: 'hero_image',
    label: 'Home hero — main photo',
    type: 'image',
    hint: 'The big photo behind the MAKO wordmark. Leave empty to use your first featured dog.',
    default: '',
  },
  {
    key: 'about_body',
    label: 'About paragraph',
    type: 'textarea',
    default:
      'Mako Kennel is a professional ABKC breeder of world-class XL American Bullies based in Slovakia. We focus on heavy bone structure, large heads and specific rare coat colors — lilac tri, chocolate merle and all-white — while never compromising on health, temperament and structure. Our dogs are family first, and we ship internationally to approved homes.',
  },
  {
    key: 'shipping_body',
    label: 'Shipping & import information',
    type: 'textarea',
    default:
      'We ship our puppies worldwide, including the USA, Canada, the UK and across Europe.\n\nEvery puppy travels with full ABKC paperwork, up-to-date vaccinations, microchip, EU pet passport and a veterinary health certificate. We coordinate flight-nanny or cargo transport with trusted, USDA/IATA-compliant partners and handle all export documentation.\n\nTypical process:\n1. Reserve your puppy with a deposit.\n2. We arrange health checks, vaccinations and travel paperwork.\n3. We book the safest available transport to your nearest major airport.\n4. Your puppy arrives with a full document pack and our ongoing support.\n\nContact us on WhatsApp for a personalized shipping quote to your country.',
  },
  {
    key: 'contact_intro',
    label: 'Contact page intro',
    type: 'textarea',
    default:
      'Interested in a puppy, a stud service or shipping to your country? Send us a message and we\'ll get back to you personally. For the fastest reply, reach us on WhatsApp.',
  },
  {
    key: 'philosophy_left_image',
    label: 'Home — “Show-quality structure” photo',
    type: 'image',
    hint: 'Left photo in the “Health. Character. Structure.” section.',
    default: '/images/structure-show.jpg',
  },
  {
    key: 'philosophy_right_image',
    label: 'Home — “Calm, family temperament” photo',
    type: 'image',
    hint: 'Right photo in the “Health. Character. Structure.” section. Leave empty to use a gallery photo.',
    default: '',
  },
  {
    key: 'home_video_url',
    label: 'Home video — direct file URL (overrides MUX Playback ID)',
    type: 'text',
    default: '/videos/mako.mp4',
  },
  {
    key: 'home_video_playback_id',
    label: 'Home video — MUX Playback ID',
    type: 'text',
    default: '',
  },
] as const;

export const settingDefaults: Record<string, string> = Object.fromEntries(
  SETTINGS_FIELDS.map(field => [field.key, field.default]),
);
