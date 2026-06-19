import Link from 'next/link';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { deleteLitter } from '@/features/mako/actions';
import { DeleteButton } from '@/features/mako/admin/DeleteButton';
import { getLitters } from '@/features/mako/queries';

export default async function AdminLittersPage() {
  const litters = await getLitters();

  return (
    <>
      <div className="flex items-center justify-between">
        <TitleBar title="Litters" description="Manage current, planned and past litters." />
        <Link
          href="/dashboard/litters/new"
          className="
            rounded-md bg-primary px-4 py-2 text-sm font-semibold
            text-primary-foreground
          "
        >
          + Add litter
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {litters.length === 0
          ? (
              <p className="p-5 text-sm text-muted-foreground">No litters yet.</p>
            )
          : (
              <table className="w-full text-sm">
                <thead className="
                  border-b bg-muted/50 text-left text-muted-foreground
                "
                >
                  <tr>
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                    <th className="px-4 py-2 font-medium">Date</th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {litters.map(litter => (
                    <tr
                      key={litter.id}
                      className="
                        border-b
                        last:border-0
                      "
                    >
                      <td className="px-4 py-3 font-medium">{litter.name}</td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">{litter.status}</td>
                      <td className="px-4 py-3 text-muted-foreground">{litter.date || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            href={`/dashboard/litters/${litter.id}`}
                            className="
                              font-medium text-primary
                              hover:underline
                            "
                          >
                            Edit
                          </Link>
                          <DeleteButton action={deleteLitter} id={litter.id} />
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
