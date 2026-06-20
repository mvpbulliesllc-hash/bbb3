'use client';

import { upload } from '@vercel/blob/client';
import { useRef, useState } from 'react';
import { cn } from '@/utils/Helpers';

const dropBase
  = 'flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background px-4 py-6 text-center text-sm text-muted-foreground transition-colors cursor-pointer hover:border-ring';

/** Multi-image drag-and-drop. Stores newline-joined URLs in a hidden input. */
export function GalleryField({
  name,
  label,
  hint,
  defaultValue = [],
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) {
      return;
    }
    setBusy(true);
    setError('');
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/upload',
        });
        uploaded.push(blob.url);
      }
      setUrls(prev => [...prev, ...uploaded]);
    } catch (error_) {
      setError((error_ as Error).message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  const remove = (url: string) => setUrls(prev => prev.filter(u => u !== url));

  return (
    <div className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input type="hidden" name={name} value={urls.join('\n')} />

      {urls.length > 0 && (
        <div className="
          mb-3 grid grid-cols-3 gap-3
          sm:grid-cols-4
        "
        >
          {urls.map(url => (
            <div key={url} className="relative">
              <img
                src={url}
                alt=""
                className="aspect-square w-full rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => remove(url)}
                className="
                  absolute -top-2 -right-2 flex size-6 items-center
                  justify-center rounded-full bg-foreground text-xs
                  text-background
                "
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(dropBase, dragging && 'border-ring bg-secondary')}
      >
        {busy
          ? <span>Uploading…</span>
          : (
              <>
                <span className="text-2xl">⬆</span>
                <span>
                  Drag photos here, or
                  {' '}
                  <span className="underline">click to choose</span>
                  {' '}
                  (you can pick several)
                </span>
              </>
            )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
      {hint && !error && (
        <span className="mt-1 block text-xs text-muted-foreground">
          {hint}
        </span>
      )}
    </div>
  );
}
