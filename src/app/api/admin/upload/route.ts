import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

/** The (public) store id — prefer the default BLOB_STORE_ID, else any *_STORE_ID. */
function resolveStoreId(): string | undefined {
  if (process.env.BLOB_STORE_ID) {
    return process.env.BLOB_STORE_ID;
  }
  for (const [key, value] of Object.entries(process.env)) {
    if (key.endsWith('STORE_ID') && typeof value === 'string' && value.startsWith('store_')) {
      return value;
    }
  }
  return undefined;
}

/**
 * Find the read-write token that belongs to a specific store. The token format
 * is `vercel_blob_rw_<storeIdCore>_<secret>`, so we can match it to the store id
 * — this guarantees we use the public store even if a second (private) store is
 * also connected.
 */
function tokenForStore(storeId: string): string | undefined {
  const core = storeId.replace(/^store_/, '');
  for (const value of Object.values(process.env)) {
    if (typeof value === 'string' && value.startsWith(`vercel_blob_rw_${core}_`)) {
      return value;
    }
  }
  return undefined;
}

/** Any read-write token, as a last resort. */
function resolveAnyToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_READ_WRITE_TOKEN;
  }
  for (const value of Object.values(process.env)) {
    if (typeof value === 'string' && value.startsWith('vercel_blob_rw_')) {
      return value;
    }
  }
  return undefined;
}

/** Auth options that deterministically target the public store. */
function blobAuth() {
  const storeId = resolveStoreId();
  if (storeId) {
    const token = tokenForStore(storeId);
    return token ? ({ token } as const) : ({ storeId } as const);
  }
  const token = resolveAnyToken();
  return token ? ({ token } as const) : ({} as const);
}

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
      ...blobAuth(),
    });
    return NextResponse.json({ url: result.url });
  } catch (error) {
    const keys = Object.keys(process.env).filter(k => k.includes('BLOB') || k.endsWith('READ_WRITE_TOKEN') || k.endsWith('STORE_ID'));
    console.error(`[upload] put failed: ${(error as Error).message} | envKeys=${keys.join(',')}`);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

/** Temporary diagnostic — open while signed in to verify the Blob connection. */
export async function GET(): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, reason: 'not signed in' }, { status: 401 });
  }
  const storeId = resolveStoreId();
  const auth_ = blobAuth();
  const envKeys = Object.keys(process.env).filter(k => k.includes('BLOB') || k.endsWith('READ_WRITE_TOKEN') || k.endsWith('STORE_ID'));
  let putTest: string;
  try {
    const result = await put(`diagnostics/test-${Date.now()}.txt`, 'ok', {
      access: 'public',
      addRandomSuffix: true,
      ...blobAuth(),
    });
    putTest = `OK → ${result.url}`;
  } catch (error) {
    putTest = `FAILED → ${(error as Error).message}`;
  }
  return NextResponse.json({
    storeId: storeId ?? null,
    using: 'token' in auth_ ? 'matched token' : 'storeId' in auth_ ? 'storeId (OIDC)' : 'none',
    envKeys,
    putTest,
  });
}
