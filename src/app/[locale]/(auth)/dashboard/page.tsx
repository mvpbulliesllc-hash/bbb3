import Link from 'next/link';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { getDogs, getGallery, getLeads, getLitters, getPuppies } from '@/features/mako/queries';

export default async function DashboardIndexPage() {
  const [studs, females, litters, puppies, leads, gallery] = await Promise.all([
    getDogs('stud'),
    getDogs('female'),
    getLitters(),
    getPuppies(),
    getLeads(),
    getGallery(),
  ]);

  const newLeads = leads.filter(l => l.status === 'new').length;
  const availablePuppies = puppies.filter(p => p.status === 'available').length;

  const cards = [
    { href: '/dashboard/dogs', label: 'Stud dogs', value: studs.length },
    { href: '/dashboard/dogs', label: 'Females', value: females.length },
    { href: '/dashboard/litters', label: 'Litters', value: litters.length },
    { href: '/dashboard/puppies', label: 'Available puppies', value: availablePuppies },
    { href: '/dashboard/leads', label: 'New inquiries', value: newLeads },
    { href: '/dashboard/gallery', label: 'Gallery items', value: gallery.length },
  ];

  const quickLinks = [
    { href: '/dashboard/dogs/new', label: 'Add a dog' },
    { href: '/dashboard/litters/new', label: 'Add a litter' },
    { href: '/dashboard/puppies/new', label: 'Add a puppy' },
    { href: '/dashboard/gallery', label: 'Add photos' },
    { href: '/dashboard/settings', label: 'Edit page content' },
  ];

  return (
    <>
      <TitleBar
        title="Welcome to your Mako Kennel admin"
        description="Add and update your dogs, litters, puppies and photos — and follow up with inquiries — all without a developer."
      />

      <div className="
        grid gap-4
        sm:grid-cols-2
        lg:grid-cols-3
      "
      >
        {cards.map(card => (
          <Link
            key={card.label}
            href={card.href}
            className="
              rounded-xl border bg-card p-5 transition-colors
              hover:border-primary
            "
          >
            <div className="text-3xl font-bold">{card.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {quickLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="
                rounded-md bg-primary px-4 py-2 text-sm font-semibold
                text-primary-foreground
              "
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/"
            className="rounded-md border px-4 py-2 text-sm font-semibold"
          >
            View live site →
          </Link>
        </div>
      </div>
    </>
  );
}
