import { Brand } from '../Brand';

/**
 * Lightweight, dependency-free Instagram feature block. Links straight to her
 * live profile so the site never looks stale between manual updates. (The full
 * embed script from `ig-embed.html` can be dropped in later if desired.)
 */
export const InstagramBlock = () => (
  <section className="border-t border-mako-border bg-mako-charcoal">
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <p className="
        text-sm font-semibold tracking-[0.2em] text-mako-gold uppercase
      "
      >
        Follow along
      </p>
      <h2 className="mt-2 font-serif text-3xl font-bold text-mako-cream">
        @
        {Brand.instagramHandle}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-mako-muted">
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
          mt-6 inline-flex items-center gap-2 rounded-full bg-mako-gold px-6
          py-3 font-semibold text-mako-ink transition-colors
          hover:bg-mako-gold-soft
        "
      >
        View our Instagram
      </a>
    </div>
  </section>
);
