import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

/** Vercel Blob read-write token under any env var name (BLOB_… or a prefixed store). */
function resolveToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_READ_WRITE_TOKEN;
  }
  for (const [key, value] of Object.entries(process.env)) {
    if (key.endsWith('READ_WRITE_TOKEN') && typeof value === 'string' && value.startsWith('vercel_blob_rw_')) {
      return value;
    }
  }
  return undefined;
}

/** Vercel Blob store id under any env var name (newer storeId-based auth). */
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

/** Put options that work whether the store exposes a token or just a storeId. */
function blobAuth() {
  const token = resolveToken();
  const storeId = resolveStoreId();
  if (token) {
    return { token } as const;
  }
  if (storeId) {
    return { storeId } as const;
  }
  return {} as const;
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
  const token = resolveToken();
  const storeId = resolveStoreId();
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
  return NextResponse.json({ hasToken: !!token, hasStoreId: !!storeId, envKeys, putTest });
}
