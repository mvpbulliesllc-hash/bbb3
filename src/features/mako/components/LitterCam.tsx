'use client';

import dynamic from 'next/dynamic';

const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false });

/**
 * Resolve the litter-cam source. Accepts a direct file/HLS URL (starts with
 * http or /) or a MUX **live** playback ID, which becomes its HLS URL.
 */
function resolveStream(raw: string) {
  const value = raw.trim();
  if (!value) {
    return null;
  }
  const isUrl = value.startsWith('http') || value.startsWith('/');
  const src = isUrl ? value : `https://stream.mux.com/${value}.m3u8`;
  const isFile = /\.(?:mp4|webm|mov)$/i.test(value);
  return { src, live: !isFile };
}

/** "Litter cam" — a live webcam/stream feed of the puppies. */
export function LitterCam({ streamUrl, title }: { streamUrl: string; title?: string }) {
  const resolved = resolveStream(streamUrl);
  if (!resolved) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-black">
      <div className="flex items-center gap-2 px-5 py-3">
        <span className="relative flex size-2.5 items-center justify-center">
          <span className="
            absolute inline-flex size-full animate-ping rounded-full bg-red-500
            opacity-75
          "
          />
          <span className="
            relative inline-flex size-2.5 rounded-full bg-red-500
          "
          />
        </span>
        <span className="text-sm font-medium tracking-wide text-white">
          {resolved.live ? 'LIVE' : 'LITTER CAM'}
        </span>
      </div>
      <MuxPlayer
        src={resolved.src}
        streamType={resolved.live ? 'live' : 'on-demand'}
        autoPlay="muted"
        muted
        loop={!resolved.live}
        accentColor="#ffffff"
        metadata={{ video_title: title ?? 'Litter Cam' }}
        className="w-full"
        style={{ width: '100%', aspectRatio: '16 / 9' }}
      />
    </div>
  );
}
