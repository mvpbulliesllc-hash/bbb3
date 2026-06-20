import { notFound } from 'next/navigation';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { deletePuppy } from '@/features/mako/actions';
import { DeleteButton } from '@/features/mako/admin/DeleteButton';
import { PuppyForm } from '@/features/mako/admin/PuppyForm';
import { getLitters, getPuppyById } from '@/features/mako/queries';

export default async function EditPuppyPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const [puppy, litters] = await Promise.all([getPuppyById(Number(id)), getLitters()]);

  if (!puppy) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <TitleBar title={`Edit ${puppy.name}`} description="Update this puppy." />
        <DeleteButton action={deletePuppy} id={puppy.id} label="Delete puppy" confirmText={`Delete ${puppy.name}?`} />
      </div>
      <div className="rounded-xl border bg-card p-6">
        <PuppyForm puppy={puppy} litters={litters} />
      </div>
    </>
  );
}
