import { cn } from '@/utils/Helpers';

const styles: Record<string, string> = {
  available: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  reserved: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  sold: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30',
  current: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  planned: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  past: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30',
  active: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  retired: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30',
  reference: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  new: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  contacted: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  closed: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30',
};

export const StatusBadge = ({ status, className }: { status: string; className?: string }) => (
  <span
    className={cn(
      `
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        capitalize ring-1 ring-inset
      `,
      styles[status] ?? 'bg-mako-surface text-mako-muted ring-mako-border',
      className,
    )}
  >
    {status}
  </span>
);
