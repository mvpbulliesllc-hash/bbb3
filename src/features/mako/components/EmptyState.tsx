export const EmptyState = ({ title, description }: { title: string; description?: string }) => (
  <div className="
    rounded-2xl border border-dashed border-border bg-secondary/40 p-16
    text-center
  "
  >
    <p className="font-display text-2xl text-foreground">{title}</p>
    {description && (
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
    )}
  </div>
);
