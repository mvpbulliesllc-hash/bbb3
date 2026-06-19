import type { dogsSchema } from '@/models/Schema';
import { Link } from '@/libs/I18nNavigation';
import { whatsappLink } from '../Brand';
import { FadeImage } from './FadeImage';
import { InquiryForm } from './InquiryForm';
import { StatusBadge } from './StatusBadge';

type Dog = typeof dogsSchema.$inferSelect;

const Detail = ({ label, value }: { label: string; value?: string | null }) =>
  value
    ? (
        <div className="border-b border-border py-3">
          <dt className="
            text-xs tracking-widest text-muted-foreground uppercase
          "
          >
            {label}
          </dt>
          <dd className="mt-1 text-foreground">{value}</dd>
        </div>
      )
    : null;

export const DogProfile = ({ dog }: { dog: Dog }) => {
  const backHref = dog.type === 'female' ? '/females' : '/studs';
  const isStud = dog.type === 'stud';

  return (
    <div className="
      mx-auto max-w-6xl px-6 pt-32 pb-20
      md:pt-40
    "
    >
      <Link
        href={backHref}
        className="
          text-sm text-muted-foreground transition-colors
          hover:text-foreground
        "
      >
        ←
        {' '}
        Back to
        {' '}
        {isStud ? 'stud dogs' : 'females'}
      </Link>

      <div className="
        mt-8 grid gap-12
        lg:grid-cols-2
      "
      >
        <div>
          <div className="
            relative aspect-4/5 overflow-hidden rounded-2xl bg-secondary
          "
          >
            <FadeImage src={dog.heroImage} alt={dog.name} label={dog.name} />
          </div>
          {dog.gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {dog.gallery.map(url => (
                <div
                  key={url}
                  className="
                    relative aspect-square overflow-hidden rounded-xl
                    bg-secondary
                  "
                >
                  <FadeImage src={url} alt={dog.name} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h1 className="
              font-display text-4xl font-semibold text-foreground
              lg:text-5xl
            "
            >
              {dog.name}
            </h1>
            {dog.status !== 'active' && <StatusBadge status={dog.status} />}
          </div>
          {dog.color && (
            <p className="
              mt-3 text-sm tracking-widest text-muted-foreground uppercase
            "
            >
              {dog.color}
            </p>
          )}
          {dog.bio && <p className="mt-6 leading-relaxed text-muted-foreground">{dog.bio}</p>}

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
                mt-6 inline-block text-sm text-foreground underline
                underline-offset-4
              "
            >
              ▶ Watch video
            </a>
          )}

          <div className="mt-8">
            <a
              href={whatsappLink(`Hi! I'm interested in ${dog.name}${isStud ? ' for stud service' : ''}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-full bg-foreground px-7 py-3 font-medium text-background
                transition-opacity
                hover:opacity-80
              "
            >
              {isStud ? 'Inquire about stud service' : 'Inquire'}
            </a>
          </div>
        </div>
      </div>

      <div className="
        mt-20 rounded-2xl bg-secondary/50 p-8
        md:p-12
      "
      >
        <h2 className="font-display text-3xl font-semibold text-foreground">
          Inquire about
          {' '}
          {dog.name}
        </h2>
        <p className="mt-2 text-muted-foreground">Send us a message and we'll get back to you personally.</p>
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
