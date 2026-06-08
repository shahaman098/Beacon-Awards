"use client";

import { useEffect, useState } from "react";

type HomeHeroVideoProps = {
  poster: string;
  src: string;
};

export function HomeHeroVideo({ poster, src }: HomeHeroVideoProps) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canUseVideo =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canUseVideo) return;

    const loadVideo = () => setEnabled(true);
    const requestIdle = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 500));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = requestIdle(loadVideo);

    return () => cancelIdle(handle);
  }, []);

  if (!enabled || failed) return null;

  return (
    <video
      aria-hidden="true"
      autoPlay
      className={[
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
        ready ? "opacity-70" : "opacity-0",
      ].join(" ")}
      loop
      muted
      onCanPlay={() => setReady(true)}
      onError={() => setFailed(true)}
      playsInline
      poster={poster}
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
