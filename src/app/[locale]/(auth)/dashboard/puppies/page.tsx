import Link from 'next/link';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { deletePuppy } from '@/features/mako/actions';
import { DeleteButton } from '@/features/mako/admin/DeleteButton';
import { getPuppies } from '@/features/mako/queries';

export default async function AdminPuppiesPage() {
  const puppies = await getPuppies();

  return (
    <>
      <div className="flex items-center justify-between">
        <TitleBar title="Puppies" description="Manage availability and details for individual puppies." />
        <Link
          href="/dashboard/puppies/new"
          className="
            rounded-md bg-primary px-4 py-2 text-sm font-semibold
            text-primary-foreground
          "
        >
          + Add puppy
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {puppies.length === 0
          ? (
              <p className="p-5 text-sm text-muted-foreground">No puppies yet.</p>
            )
          : (
              <table className="w-full text-sm">
                <thead className="
                  border-b bg-muted/50 text-left text-muted-foreground
                "
                >
                  <tr>
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">Sex / Color</th>
                    <th className="px-4 py-2 font-medium">Price</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {puppies.map(puppy => (
                    <tr
                      key={puppy.id}
                      className="
                        border-b
                        last:border-0
                      "
                    >
                      <td className="px-4 py-3 font-medium">{puppy.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {[puppy.sex, puppy.color].filter(Boolean).join(' · ') || '—'}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{puppy.price || '—'}</td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">{puppy.status}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            href={`/dashboard/puppies/${puppy.id}`}
                            className="
                              font-medium text-primary
                              hover:underline
                            "
                          >
                            Edit
                          </Link>
                          <DeleteButton action={deletePuppy} id={puppy.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
      </div>
    </>
  );
}
