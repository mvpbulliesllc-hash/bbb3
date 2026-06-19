import { TitleBar } from '@/features/dashboard/TitleBar';
import { saveSettings } from '@/features/mako/actions';
import { Field, TextArea, TextInput } from '@/features/mako/admin/Fields';
import { getSettings } from '@/features/mako/queries';
import { SETTINGS_FIELDS } from '@/features/mako/settings';

export default async function AdminSettingsPage(props: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await props.searchParams;
  const settings = await getSettings();

  return (
    <>
      <TitleBar title="Page content" description="Edit the wording shown across your site — hero, about, shipping and contact." />

      {saved && (
        <div className="
          mb-6 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4
          text-sm text-emerald-700
        "
        >
          Your changes have been saved and are live on the site.
        </div>
      )}

      <div className="rounded-xl border bg-card p-6">
        <form action={saveSettings} className="space-y-6">
          {SETTINGS_FIELDS.map(field => (
            <Field key={field.key} label={field.label}>
              {field.type === 'textarea'
                ? (
                    <TextArea name={field.key} rows={5} defaultValue={settings[field.key] ?? ''} />
                  )
                : (
                    <TextInput name={field.key} defaultValue={settings[field.key] ?? ''} />
                  )}
            </Field>
          ))}
          <button
            type="submit"
            className="
              rounded-md bg-primary px-5 py-2 text-sm font-semibold
              text-primary-foreground
            "
          >
            Save content
          </button>
        </form>
      </div>
    </>
  );
}
