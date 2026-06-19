import { TitleBar } from '@/features/dashboard/TitleBar';
import { PuppyForm } from '@/features/mako/admin/PuppyForm';
import { getLitters } from '@/features/mako/queries';

export default async function NewPuppyPage() {
  const litters = await getLitters();

  return (
    <>
      <TitleBar title="Add a puppy" description="Create a new puppy listing." />
      <div className="rounded-xl border bg-card p-6">
        <PuppyForm litters={litters} />
      </div>
    </>
  );
}
