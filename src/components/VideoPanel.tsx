import { useVideoAudio } from "@src/context/useVideoAudio";
import { useVideoInViewport } from "@src/hooks/useVideoInViewport";
import type { VideoPanelProps } from "@src/types/app";
import { useEffect, useId, useRef } from "react";

export function VideoPanel({
  src,
  watermark,
  audioGroup,
  audioPriority,
}: VideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoId = useId();
  const { isVideoAudible, registerVideo, unregisterVideo, updateVideoRatio } =
    useVideoAudio();

  useVideoInViewport(videoRef, (entry) => {
    updateVideoRatio(
      videoId,
      entry.isIntersecting ? entry.intersectionRatio : 0,
    );
  });

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    registerVideo(videoId, videoRef.current, { audioGroup, audioPriority });

    return () => {
      unregisterVideo(videoId);
    };
  }, [audioGroup, audioPriority, registerVideo, unregisterVideo, videoId]);

  const isAudible = isVideoAudible(videoId);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-sm bg-brand-lightGray dark:bg-brand-black">
      <video
        ref={videoRef}
        muted={!isAudible}
        playsInline
        loop
        preload="auto"
        className="mt-[30px] h-fit w-full max-h-full object-contain md:mt-[40px] lg:mt-[0px] xl:mt-0 lg:h-full"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute bottom-6 left-6 z-10">
        <p className="hidden text-sm font-bold tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] md:text-base">
          {watermark}
        </p>
      </div>
    </div>
  );
}
