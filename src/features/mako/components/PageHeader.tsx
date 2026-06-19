export const PageHeader = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) => (
  <div className="border-b border-mako-border bg-mako-charcoal">
    <div className="mx-auto max-w-6xl px-4 py-14 text-center">
      {eyebrow && (
        <p className="
          text-sm font-semibold tracking-[0.2em] text-mako-gold uppercase
        "
        >
          {eyebrow}
        </p>
      )}
      <h1 className="
        mt-2 font-serif text-4xl font-bold text-mako-cream
        sm:text-5xl
      "
      >
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-mako-muted">{description}</p>
      )}
    </div>
  </div>
);
