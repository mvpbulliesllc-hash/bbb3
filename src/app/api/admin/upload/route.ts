import type { HandleUploadBody } from '@vercel/blob/client';
import { auth } from '@clerk/nextjs/server';
import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

/**
 * Find the Vercel Blob read-write token. Defaults to BLOB_READ_WRITE_TOKEN,
 * but a custom-named store can expose it under a prefixed var
 * (e.g. MAKE_PHOTO_READ_WRITE_TOKEN), so fall back to any matching token.
 */
function resolveBlobToken(): string | undefined {
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

/**
 * Authenticated image uploads for the admin dashboard (Vercel Blob client
 * uploads, so large photos bypass the serverless body-size limit).
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  const token = resolveBlobToken();

  try {
    const result = await handleUpload({
      body,
      request,
      token,
      onBeforeGenerateToken: async () => {
        const { userId } = await auth();
        if (!userId) {
          throw new Error('Unauthorized');
        }
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'],
          maximumSizeInBytes: 20 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // No-op: the client stores the returned URL in the form.
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    const blobKeys = Object.keys(process.env).filter(k => k.includes('BLOB') || k.endsWith('READ_WRITE_TOKEN'));
    console.error(`[upload] failed: ${(error as Error).message} | tokenResolved=${!!token} | blobEnvKeys=${blobKeys.join(',')}`);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
