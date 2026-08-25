import { useEffect, useState } from "react";

export function useVideoPreload(src?: string) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isLoaded = !src || loadedSrc === src;

  useEffect(() => {
    if (!src) {
      return;
    }

    let isCancelled = false;
    const preloader = document.createElement("video");
    preloader.preload = "auto";
    preloader.muted = true;
    preloader.playsInline = true;
    preloader.src = src;

    const markLoaded = () => {
      if (!isCancelled) {
        setLoadedSrc(src);
      }
    };

    preloader.addEventListener("loadeddata", markLoaded);
    preloader.addEventListener("error", markLoaded);
    preloader.load();

    return () => {
      isCancelled = true;
      preloader.removeEventListener("loadeddata", markLoaded);
      preloader.removeEventListener("error", markLoaded);
      preloader.removeAttribute("src");
      preloader.load();
    };
  }, [src]);

  return isLoaded;
}
