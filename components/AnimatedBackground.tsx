'use client';

import React from 'react';

/**
 * Reusable video background. It pauses outside the viewport, respects reduced
 * motion, and renders nothing when no video source is configured.
 */
export default function AnimatedBackground({
  src,
  webmSrc,
  poster,
  className = '',
  videoClassName = '',
  overlayClassName = 'bg-black/40',
  children,
}: {
  src?: string;
  webmSrc?: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(src || webmSrc);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      video.pause();
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      void video.play?.().catch(() => {});
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) void video.play?.().catch(() => {});
          else video.pause?.();
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {hasVideo && (
        <>
          <video
            ref={videoRef}
            className={`absolute inset-0 -z-10 h-full w-full object-cover ${videoClassName}`}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden
          >
            {webmSrc && <source src={webmSrc} type="video/webm" />}
            {src && <source src={src} type="video/mp4" />}
          </video>
          <div className={`pointer-events-none absolute inset-0 -z-10 ${overlayClassName}`} aria-hidden />
        </>
      )}
      {children}
    </div>
  );
}
