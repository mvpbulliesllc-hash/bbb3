export const PageHeader = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) => (
  <div className="
    bg-background px-6 pt-36 pb-12 text-center
    md:pt-44 md:pb-16
  "
  >
    <div className="mx-auto max-w-3xl">
      {eyebrow && (
        <p className="
          text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase
        "
        >
          {eyebrow}
        </p>
      )}
      <h1 className="
        mt-4 font-display text-4xl font-semibold tracking-tight text-foreground
        sm:text-5xl
        lg:text-6xl
      "
      >
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  </div>
);
