import { notFound } from 'next/navigation';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { deleteDog } from '@/features/mako/actions';
import { DeleteButton } from '@/features/mako/admin/DeleteButton';
import { DogForm } from '@/features/mako/admin/DogForm';
import { getDogById } from '@/features/mako/queries';

export default async function EditDogPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const dog = await getDogById(Number(id));

  if (!dog) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <TitleBar title={`Edit ${dog.name}`} description="Update this dog's profile." />
        <DeleteButton action={deleteDog} id={dog.id} label="Delete dog" confirmText={`Delete ${dog.name}?`} />
      </div>
      <div className="rounded-xl border bg-card p-6">
        <DogForm dog={dog} />
      </div>
    </>
  );
}
