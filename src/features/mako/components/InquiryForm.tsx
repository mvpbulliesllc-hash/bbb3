import { createLead } from '../actions';
import { LEAD_INTERESTS } from '../types';

const inputClass
  = 'w-full rounded-lg border border-mako-border bg-mako-ink px-4 py-2.5 text-mako-cream placeholder:text-mako-muted/70 focus:border-mako-gold focus:outline-none';

type InquiryFormProps = {
  source?: string;
  redirectTo?: string;
  defaultInterest?: string;
  compact?: boolean;
};

/** Reusable inquiry form that writes a lead into the CRM via a server action. */
export const InquiryForm = ({ source, redirectTo, defaultInterest = 'general', compact }: InquiryFormProps) => (
  <form action={createLead} className="space-y-4">
    <input type="hidden" name="source" value={source ?? ''} />
    <input type="hidden" name="redirectTo" value={redirectTo ?? '/contact'} />

    <div className="
      grid gap-4
      sm:grid-cols-2
    "
    >
      <div>
        <label
          htmlFor="lead-name"
          className="mb-1 block text-sm text-mako-muted"
        >
          Name *
        </label>
        <input id="lead-name" name="name" required placeholder="Your name" className={inputClass} />
      </div>
      <div>
        <label
          htmlFor="lead-email"
          className="mb-1 block text-sm text-mako-muted"
        >
          Email
        </label>
        <input id="lead-email" name="email" type="email" placeholder="you@email.com" className={inputClass} />
      </div>
    </div>

    <div className="
      grid gap-4
      sm:grid-cols-2
    "
    >
      <div>
        <label
          htmlFor="lead-phone"
          className="mb-1 block text-sm text-mako-muted"
        >
          Phone / WhatsApp
        </label>
        <input id="lead-phone" name="phone" placeholder="+1 555 000 0000" className={inputClass} />
      </div>
      <div>
        <label
          htmlFor="lead-country"
          className="mb-1 block text-sm text-mako-muted"
        >
          Country
        </label>
        <input id="lead-country" name="country" placeholder="e.g. United States" className={inputClass} />
      </div>
    </div>

    {!compact && (
      <div>
        <label
          htmlFor="lead-interest"
          className="mb-1 block text-sm text-mako-muted"
        >
          I'm interested in
        </label>
        <select id="lead-interest" name="interest" defaultValue={defaultInterest} className={inputClass}>
          {LEAD_INTERESTS.map(i => (
            <option key={i} value={i} className="bg-mako-ink capitalize">
              {i === 'general' ? 'General inquiry' : `${i.charAt(0).toUpperCase()}${i.slice(1)}`}
            </option>
          ))}
        </select>
      </div>
    )}
    {compact && <input type="hidden" name="interest" value={defaultInterest} />}

    <div>
      <label
        htmlFor="lead-message"
        className="mb-1 block text-sm text-mako-muted"
      >
        Message
      </label>
      <textarea
        id="lead-message"
        name="message"
        rows={compact ? 3 : 5}
        placeholder="Tell us what you're looking for…"
        className={inputClass}
      />
    </div>

    <button
      type="submit"
      className="
        w-full rounded-full bg-mako-gold px-6 py-3 font-semibold text-mako-ink
        transition-colors
        hover:bg-mako-gold-soft
        sm:w-auto
      "
    >
      Send inquiry
    </button>
  </form>
);
