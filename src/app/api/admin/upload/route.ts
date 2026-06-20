import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

/**
 * Authenticated image uploads for the admin dashboard. Uploads to the project's
 * connected (public) Vercel Blob store using the standard
 * BLOB_READ_WRITE_TOKEN. Requires Blob storage connected to the environment.
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
    });
    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error(`[upload] put failed: ${(error as Error).message}`);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

/** Temporary diagnostic — open while signed in to verify the Blob connection. */
export async function GET(): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, reason: 'not signed in' }, { status: 401 });
  }
  const envKeys = Object.keys(process.env).filter(k => k.includes('BLOB') || k.endsWith('STORE_ID'));
  let putTest: string;
  try {
    const result = await put(`diagnostics/test-${Date.now()}.txt`, 'ok', {
      access: 'public',
      addRandomSuffix: true,
    });
    putTest = `OK → ${result.url}`;
  } catch (error) {
    putTest = `FAILED → ${(error as Error).message}`;
  }
  return NextResponse.json({ envKeys, putTest });
}
