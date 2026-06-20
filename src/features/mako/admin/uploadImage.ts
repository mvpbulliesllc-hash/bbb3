'use client';

/** Downscale a photo in the browser so uploads stay small and fast. */
async function downscale(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/')) {
    return file;
  }
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) {
    return file; // unsupported format (e.g. HEIC on some browsers) — send as-is
  }
  const maxDim = 2000;
  let { width, height } = bitmap;
  if (width > maxDim || height > maxDim) {
    const scale = maxDim / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  return new Promise<Blob>((resolve) => {
    canvas.toBlob(blob => resolve(blob ?? file), 'image/jpeg', 0.85);
  });
}

/** Upload one image to the admin upload route; returns its public URL. */
export async function uploadImage(file: File): Promise<string> {
  const blob = await downscale(file);
  const name = file.name.replace(/\.[^.]+$/, '') || 'photo';
  const form = new FormData();
  form.append('file', blob, `${name}.jpg`);

  const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Upload failed (${res.status})`);
  }
  const data = (await res.json()) as { url: string };
  return data.url;
}
