import { TitleBar } from '@/features/dashboard/TitleBar';
import { DogForm } from '@/features/mako/admin/DogForm';

export default async function NewDogPage(props: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await props.searchParams;

  return (
    <>
      <TitleBar title="Add a dog" description="Create a new stud dog or female profile." />
      <div className="rounded-xl border bg-card p-6">
        <DogForm defaultType={type} />
      </div>
    </>
  );
}
