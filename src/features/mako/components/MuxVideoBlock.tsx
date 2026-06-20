'use client';

import dynamic from 'next/dynamic';

// Loaded client-side only — mux-player is a custom element that touches `window`.
const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false });

type Props = {
  playbackId: string;
  title?: string;
  poster?: string;
};

/** Full-bleed MUX video block (e.g. a kennel reel near the foot of the page). */
export function MuxVideoBlock({ playbackId, title, poster }: Props) {
  if (!playbackId) {
    return null;
  }

  return (
    <section className="w-full bg-black">
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        accentColor="#ffffff"
        poster={poster}
        metadata={{ video_title: title ?? 'Mako Kennel' }}
        className="w-full"
        style={{ width: '100%', aspectRatio: '16 / 9' }}
      />
    </section>
  );
}
