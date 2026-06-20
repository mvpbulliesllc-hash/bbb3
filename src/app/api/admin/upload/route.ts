import type { HandleUploadBody } from '@vercel/blob/client';
import { auth } from '@clerk/nextjs/server';
import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

/**
 * Authenticated image uploads for the admin dashboard. Uses Vercel Blob
 * client uploads so large photos go straight to storage (bypassing the
 * serverless body-size limit). Requires BLOB_READ_WRITE_TOKEN (added
 * automatically when you enable Blob storage in the Vercel project).
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
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
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
