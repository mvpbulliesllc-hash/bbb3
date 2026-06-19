import { TitleBar } from '@/features/dashboard/TitleBar';
import { LitterForm } from '@/features/mako/admin/LitterForm';

export default function NewLitterPage() {
  return (
    <>
      <TitleBar title="Add a litter" description="Create a current, planned or past litter." />
      <div className="rounded-xl border bg-card p-6">
        <LitterForm />
      </div>
    </>
  );
}
