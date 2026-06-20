'use client';

import { useEffect } from 'react';
import { Brand } from '../Brand';

const PROFILE_URL = `https://www.instagram.com/${Brand.instagramHandle}/`;

const blockquoteHtml = `<blockquote class="instagram-media" data-instgrm-permalink="${PROFILE_URL}?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="14" style="background:#FFF;border:0;border-radius:3px;box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15);margin:0;max-width:540px;min-width:326px;padding:0;width:100%;"><a href="${PROFILE_URL}?utm_source=ig_embed&utm_campaign=loading" target="_blank" rel="noopener noreferrer">View this profile on Instagram</a></blockquote>`;

declare global {
  // eslint-disable-next-line vars-on-top
  var instgrm: { Embeds: { process: () => void } } | undefined;
}

/** Renders Instagram's official profile embed and (re)processes it client-side. */
export function InstagramEmbed() {
  useEffect(() => {
    if (globalThis.instgrm) {
      globalThis.instgrm.Embeds.process();
      return;
    }
    if (document.getElementById('instagram-embed-js')) {
      return;
    }
    const script = document.createElement('script');
    script.id = 'instagram-embed-js';
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => globalThis.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="mx-auto w-full max-w-[540px] text-left text-foreground"
      // eslint-disable-next-line react/dom-no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: blockquoteHtml }}
    />
  );
}
