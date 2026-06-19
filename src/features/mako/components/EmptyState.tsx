export const EmptyState = ({ title, description }: { title: string; description?: string }) => (
  <div className="
    rounded-2xl border border-dashed border-mako-border bg-mako-charcoal p-12
    text-center
  "
  >
    <p className="font-serif text-xl text-mako-cream">{title}</p>
    {description && <p className="mx-auto mt-2 max-w-md text-sm text-mako-muted">{description}</p>}
  </div>
);
