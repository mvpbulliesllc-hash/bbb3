'use client';

import { upload } from '@vercel/blob/client';
import { useRef, useState } from 'react';
import { cn } from '@/utils/Helpers';

async function uploadFile(file: File) {
  const blob = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: '/api/admin/upload',
  });
  return blob.url;
}

const dropBase
  = 'flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background px-4 py-6 text-center text-sm text-muted-foreground transition-colors cursor-pointer hover:border-ring';

/** Single drag-and-drop image upload. Stores the resulting URL in a hidden input. */
export function ImageField({
  name,
  label,
  hint,
  defaultValue = '',
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) {
      return;
    }
    setBusy(true);
    setError('');
    try {
      setUrl(await uploadFile(file));
    } catch (error_) {
      setError((error_ as Error).message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input type="hidden" name={name} value={url} />

      {url
        ? (
            <div className="relative w-40">
              <img
                src={url}
                alt=""
                className="aspect-square w-40 rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => setUrl('')}
                className="
                  absolute -top-2 -right-2 flex size-6 items-center
                  justify-center rounded-full bg-foreground text-xs
                  text-background
                "
              >
                ✕
              </button>
            </div>
          )
        : (
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
                handleFile(e.dataTransfer.files?.[0]);
              }}
              className={cn(dropBase, dragging && 'border-ring bg-secondary')}
            >
              {busy
                ? <span>Uploading…</span>
                : (
                    <>
                      <span className="text-2xl">⬆</span>
                      <span>
                        Drag a photo here, or
                        {' '}
                        <span className="underline">click to choose</span>
                      </span>
                    </>
                  )}
            </div>
          )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => handleFile(e.target.files?.[0])}
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
