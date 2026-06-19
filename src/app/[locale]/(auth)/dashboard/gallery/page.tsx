import { TitleBar } from '@/features/dashboard/TitleBar';
import { addGalleryItems, deleteGalleryItem } from '@/features/mako/actions';
import { DeleteButton } from '@/features/mako/admin/DeleteButton';
import { Field, Select, TextArea, TextInput } from '@/features/mako/admin/Fields';
import { MediaImage } from '@/features/mako/components/MediaImage';
import { getGallery } from '@/features/mako/queries';

export default async function AdminGalleryPage() {
  const items = await getGallery();

  return (
    <>
      <TitleBar title="Gallery" description="Add photos and videos to your public gallery." />

      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Add items</h2>
        <form action={addGalleryItems} className="mt-4 space-y-5">
          <Field label="Image / video URLs" hint="One URL per line — paste links to your photos or video.">
            <TextArea name="urls" rows={4} required placeholder="https://…" />
          </Field>
          <div className="
            grid gap-5
            sm:grid-cols-2
          "
          >
            <Field label="Type">
              <Select name="kind" defaultValue="image">
                <option value="image">Image</option>
                <option value="video">Video link</option>
              </Select>
            </Field>
            <Field label="Caption / alt text">
              <TextInput name="alt" placeholder="Optional description" />
            </Field>
          </div>
          <button
            type="submit"
            className="
              rounded-md bg-primary px-5 py-2 text-sm font-semibold
              text-primary-foreground
            "
          >
            Add to gallery
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">
          Current items (
          {items.length}
          )
        </h2>
        {items.length === 0
          ? (
              <p className="text-sm text-muted-foreground">Nothing in the gallery yet.</p>
            )
          : (
              <div className="
                grid grid-cols-2 gap-4
                sm:grid-cols-3
                lg:grid-cols-4
              "
              >
                {items.map(item => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border bg-card"
                  >
                    <div className="aspect-square">
                      <MediaImage src={item.kind === 'image' ? item.url : undefined} alt={item.alt || 'Gallery item'} label={item.kind === 'video' ? 'Video' : 'MK'} rounded={false} />
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span className="
                        truncate text-xs text-muted-foreground capitalize
                      "
                      >
                        {item.kind}
                      </span>
                      <DeleteButton action={deleteGalleryItem} id={item.id} label="Remove" confirmText="Remove this item?" />
                    </div>
                  </div>
                ))}
              </div>
            )}
      </div>
    </>
  );
}
