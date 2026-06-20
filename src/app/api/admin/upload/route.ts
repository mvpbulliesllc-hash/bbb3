import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

/**
 * A Vercel Blob read-write token looks like `vercel_blob_rw_<storeId>_<secret>`.
 * The store id is NOT secret — it is the subdomain of every public blob URL
 * (e.g. `2kwbstvq1xfuy80k.public.blob.vercel-storage.com`). Only the trailing
 * secret is sensitive, and that always stays in the environment.
 *
 * This project has more than one Blob store connected, so the default
 * `BLOB_READ_WRITE_TOKEN` can end up pointing at the wrong (private) store —
 * which makes `put({ access: 'public' })` fail with "Cannot use public access
 * on a private store". To be deterministic we pick the token whose embedded
 * store id belongs to the known PUBLIC store.
 */
const PUBLIC_STORE_ID = '2KwBstvq1XFuy80k'; // "mako" public store
const PRIVATE_STORE_ID = 'lyTYlfFeW6HpjEYi'; // legacy private store to avoid

const TOKEN_RE = /^vercel_blob_rw_([A-Za-z0-9]+)_/;

/** Pick the RW token that belongs to a public Blob store. */
function resolvePublicBlobToken(): string | undefined {
  const tokens: { storeId: string; token: string }[] = [];
  for (const value of Object.values(process.env)) {
    const match = value?.match(TOKEN_RE);
    if (match) {
      tokens.push({ storeId: match[1]!, token: value! });
    }
  }
  // 1. Exact match on the known public store.
  const exact = tokens.find(t => t.storeId === PUBLIC_STORE_ID);
  if (exact) {
    return exact.token;
  }
  // 2. Any token that isn't the known private store (covers a renamed/new public store).
  const notPrivate = tokens.find(t => t.storeId !== PRIVATE_STORE_ID);
  if (notPrivate) {
    return notPrivate.token;
  }
  // 3. Last resort: whatever the default token is.
  return process.env.BLOB_READ_WRITE_TOKEN;
}

/**
 * Authenticated image uploads for the admin dashboard. Uploads to the project's
 * public Vercel Blob store. Requires a Blob store connected to the environment.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    const result = await put(`uploads/${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type || 'image/jpeg',
      token: resolvePublicBlobToken(),
    });
    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error(`[upload] put failed: ${(error as Error).message}`);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
