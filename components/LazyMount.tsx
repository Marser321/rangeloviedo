'use client';

import React from 'react';

/**
 * Mounts children only when the block approaches the viewport. Combined with
 * `dynamic(ssr:false)`, this delays component imports and media preloads until
 * they are near the user. Falls back to immediate mounting without
 * IntersectionObserver support.
 */
export default function LazyMount({
  children,
  placeholder = null,
  rootMargin = '600px 0px',
  minHeight = '100vh',
}: {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  rootMargin?: string;
  /** Reserved height before mounting to avoid layout shift. */
  minHeight?: string | number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={inView ? undefined : { minHeight }}>
      {inView ? children : placeholder}
    </div>
  );
}
