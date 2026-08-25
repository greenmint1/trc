import type { RefObject } from "react";
import { useEffect } from "react";

export function useVideoInViewport(
  videoRef: RefObject<HTMLVideoElement | null>,
  onVisibilityChange?: (entry: IntersectionObserverEntry) => void,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onVisibilityChange?.(entry);
      },
      { threshold: [0, 0.35, 0.6, 0.85] },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [onVisibilityChange, videoRef]);
}
