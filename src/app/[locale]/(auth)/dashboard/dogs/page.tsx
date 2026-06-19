import type { dogsSchema } from '@/models/Schema';
import Link from 'next/link';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { deleteDog } from '@/features/mako/actions';
import { DeleteButton } from '@/features/mako/admin/DeleteButton';
import { getDogs } from '@/features/mako/queries';

type Dog = typeof dogsSchema.$inferSelect;

const DogTable = ({ title, rows }: { title: string; rows: Dog[] }) => (
  <div className="mt-8">
    <h2 className="mb-3 text-lg font-semibold">{title}</h2>
    <div className="overflow-hidden rounded-xl border bg-card">
      {rows.length === 0
        ? (
            <p className="p-5 text-sm text-muted-foreground">None yet.</p>
          )
        : (
            <table className="w-full text-sm">
              <thead className="
                border-b bg-muted/50 text-left text-muted-foreground
              "
              >
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Color</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Featured</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map(dog => (
                  <tr
                    key={dog.id}
                    className="
                      border-b
                      last:border-0
                    "
                  >
                    <td className="px-4 py-3 font-medium">{dog.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{dog.color || '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">{dog.status}</td>
                    <td className="px-4 py-3">{dog.featured ? '★' : ''}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/dashboard/dogs/${dog.id}`}
                          className="
                            font-medium text-primary
                            hover:underline
                          "
                        >
                          Edit
                        </Link>
                        <DeleteButton action={deleteDog} id={dog.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
    </div>
  </div>
);

export default async function AdminDogsPage() {
  const dogs = await getDogs();
  const studs = dogs.filter(d => d.type === 'stud');
  const females = dogs.filter(d => d.type === 'female');

  return (
    <>
      <div className="flex items-center justify-between">
        <TitleBar title="Dogs" description="Manage your stud dogs and females." />
        <Link
          href="/dashboard/dogs/new"
          className="
            rounded-md bg-primary px-4 py-2 text-sm font-semibold
            text-primary-foreground
          "
        >
          + Add dog
        </Link>
      </div>
      <DogTable title="Stud dogs" rows={studs} />
      <DogTable title="Females" rows={females} />
    </>
  );
}
