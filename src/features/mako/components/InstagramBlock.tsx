import { Brand } from '../Brand';

/**
 * Instagram feature block — links straight to her live profile so the site
 * never looks stale between manual updates.
 */
export const InstagramBlock = () => (
  <section className="bg-foreground text-background">
    <div className="
      mx-auto max-w-4xl px-6 py-24 text-center
      md:py-32
    "
    >
      <p className="
        text-xs font-medium tracking-[0.25em] text-background/60 uppercase
      "
      >
        Follow along
      </p>
      <h2 className="
        mt-3 font-display text-4xl font-semibold
        md:text-5xl
      "
      >
        @
        {Brand.instagramHandle}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-background/70">
        Join
        {' '}
        {Brand.followers}
        {' '}
        followers for daily looks at our dogs, new litters and the famous white panther.
      </p>
      <a
        href={Brand.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7
          py-3 font-medium text-foreground transition-opacity
          hover:opacity-90
        "
      >
        View our Instagram
      </a>
    </div>
  </section>
);
