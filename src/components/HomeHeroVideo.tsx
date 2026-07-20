"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type HomeHeroVideoProps = {
  ariaLabel?: string;
  className?: string;
  controls?: boolean;
  decorative?: boolean;
  loop?: boolean;
  muted?: boolean;
  src: string;
  poster?: string;
  preload?: "auto" | "metadata" | "none";
};

export function HomeHeroVideo({
  ariaLabel,
  className,
  controls = false,
  decorative = true,
  loop = true,
  muted = true,
  poster,
  preload = "auto",
  src,
}: HomeHeroVideoProps) {
  const enabled = useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", onStoreChange);

      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const retryTimeoutsRef = useRef<number[]>([]);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!enabled || failed) return;

    const clearResumeTimeouts = () => {
      retryTimeoutsRef.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      retryTimeoutsRef.current = [];
    };

    const attemptPlayback = () => {
      if (document.visibilityState === "hidden") return;

      const video = videoRef.current;
      if (!video) return;

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const resumePlayback = () => {
      clearResumeTimeouts();
      attemptPlayback();

      [180, 600, 1400].forEach((delay) => {
        const timeoutId = window.setTimeout(attemptPlayback, delay);
        retryTimeoutsRef.current.push(timeoutId);
      });
    };

    resumePlayback();
    document.addEventListener("visibilitychange", resumePlayback);
    window.addEventListener("focus", resumePlayback);
    window.addEventListener("pageshow", resumePlayback);

    return () => {
      clearResumeTimeouts();
      document.removeEventListener("visibilitychange", resumePlayback);
      window.removeEventListener("focus", resumePlayback);
      window.removeEventListener("pageshow", resumePlayback);
    };
  }, [enabled, failed]);

  if (!enabled || failed) {
    if (!poster) return null;
    // Keep hero framing on SSR / reduced-motion instead of an empty arch frame.
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        alt={decorative ? "" : ariaLabel || ""}
        aria-hidden={decorative ? true : undefined}
        className={
          className ??
          "absolute inset-0 h-full w-full object-cover"
        }
        src={poster}
      />
    );
  }

  return (
    <video
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : ariaLabel}
      autoPlay
      className={
        className ??
        [
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        ].join(" ")
      }
      controls={controls}
      loop={loop}
      muted={muted}
      onCanPlay={() => setReady(true)}
      onError={() => setFailed(true)}
      onPlaying={() => setReady(true)}
      playsInline
      poster={poster}
      preload={preload}
      ref={videoRef}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
