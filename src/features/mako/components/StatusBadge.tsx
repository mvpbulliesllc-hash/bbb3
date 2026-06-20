import { cn } from '@/utils/Helpers';

const styles: Record<string, string> = {
  available: 'bg-emerald-600 text-white',
  reserved: 'bg-amber-500 text-white',
  sold: 'bg-neutral-400 text-white',
  current: 'bg-emerald-600 text-white',
  planned: 'bg-foreground text-background',
  past: 'bg-neutral-400 text-white',
  active: 'bg-emerald-600 text-white',
  retired: 'bg-neutral-400 text-white',
  reference: 'bg-foreground text-background',
  new: 'bg-emerald-600 text-white',
  contacted: 'bg-foreground text-background',
  closed: 'bg-neutral-400 text-white',
};

export const StatusBadge = ({ status, className }: { status: string; className?: string }) => (
  <span
    className={cn(
      `
        inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
        capitalize
      `,
      styles[status] ?? 'bg-secondary text-secondary-foreground',
      className,
    )}
  >
    {status}
  </span>
);
