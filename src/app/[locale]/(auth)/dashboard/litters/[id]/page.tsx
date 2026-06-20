import { notFound } from 'next/navigation';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { deleteLitter } from '@/features/mako/actions';
import { DeleteButton } from '@/features/mako/admin/DeleteButton';
import { LitterForm } from '@/features/mako/admin/LitterForm';
import { getLitterById } from '@/features/mako/queries';

export default async function EditLitterPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const litter = await getLitterById(Number(id));

  if (!litter) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <TitleBar title={`Edit ${litter.name}`} description="Update this litter." />
        <DeleteButton action={deleteLitter} id={litter.id} label="Delete litter" confirmText={`Delete ${litter.name}?`} />
      </div>
      <div className="rounded-xl border bg-card p-6">
        <LitterForm litter={litter} />
      </div>
    </>
  );
}
