import type { dogsSchema } from '@/models/Schema';
import { Link } from '@/libs/I18nNavigation';
import { whatsappLink } from '../Brand';
import { InquiryForm } from './InquiryForm';
import { MediaImage } from './MediaImage';
import { StatusBadge } from './StatusBadge';

type Dog = typeof dogsSchema.$inferSelect;

const Detail = ({ label, value }: { label: string; value?: string | null }) =>
  value
    ? (
        <div className="border-b border-mako-border py-3">
          <dt className="text-sm text-mako-muted">{label}</dt>
          <dd className="mt-0.5 text-mako-cream">{value}</dd>
        </div>
      )
    : null;

export const DogProfile = ({ dog }: { dog: Dog }) => {
  const backHref = dog.type === 'female' ? '/females' : '/studs';
  const isStud = dog.type === 'stud';

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link
        href={backHref}
        className="
          text-sm text-mako-muted
          hover:text-mako-gold
        "
      >
        ←
        {' '}
        Back to
        {' '}
        {isStud ? 'stud dogs' : 'females'}
      </Link>

      <div className="
        mt-6 grid gap-10
        lg:grid-cols-2
      "
      >
        <div>
          <div className="
            aspect-4/5 overflow-hidden rounded-2xl border border-mako-border
          "
          >
            <MediaImage src={dog.heroImage} alt={dog.name} label={dog.name} rounded={false} />
          </div>
          {dog.gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {dog.gallery.map(url => (
                <div
                  key={url}
                  className="
                    aspect-square overflow-hidden rounded-lg border
                    border-mako-border
                  "
                >
                  <MediaImage src={url} alt={dog.name} rounded={false} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-4xl font-bold text-mako-cream">{dog.name}</h1>
            {dog.status !== 'active' && <StatusBadge status={dog.status} />}
          </div>
          {dog.color && <p className="mt-2 text-lg text-mako-gold">{dog.color}</p>}
          {dog.bio && <p className="mt-5 leading-relaxed text-mako-muted">{dog.bio}</p>}

          <dl className="mt-8">
            <Detail label="Sex" value={isStud ? 'Male' : 'Female'} />
            <Detail label="Date of birth" value={dog.dob} />
            <Detail label="Height" value={dog.height} />
            <Detail label="Weight" value={dog.weight} />
            <Detail label="ABKC registration" value={dog.abkcReg} />
            <Detail label="Pedigree" value={dog.pedigree} />
            {isStud && <Detail label="Stud fee" value={dog.studFee} />}
          </dl>

          {dog.videoUrl && (
            <a
              href={dog.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6 inline-block text-sm text-mako-gold
                hover:underline
              "
            >
              ▶ Watch video
            </a>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(`Hi! I'm interested in ${dog.name}${isStud ? ' for stud service' : ''}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-full bg-mako-gold px-6 py-3 font-semibold text-mako-ink
                transition-colors
                hover:bg-mako-gold-soft
              "
            >
              {isStud ? 'Inquire about stud service' : 'Inquire'}
            </a>
          </div>
        </div>
      </div>

      <div className="
        mt-16 rounded-2xl border border-mako-border bg-mako-charcoal p-8
      "
      >
        <h2 className="font-serif text-2xl font-bold text-mako-cream">
          Inquire about
          {' '}
          {dog.name}
        </h2>
        <p className="mt-2 text-mako-muted">Send us a message and we'll get back to you personally.</p>
        <div className="mt-6">
          <InquiryForm
            source={`${isStud ? 'Stud' : 'Female'}: ${dog.name}`}
            redirectTo={`${backHref}/${dog.slug}`}
            defaultInterest={isStud ? 'stud' : 'general'}
            compact
          />
        </div>
      </div>
    </div>
  );
};
