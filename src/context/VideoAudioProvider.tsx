import {
  VideoAudioContext,
  type VideoAudioContextValue,
} from "@src/context/videoAudioContext";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type VideoEntry = {
  element: HTMLVideoElement;
  ratio: number;
  audioGroup?: string;
  audioPriority: number;
};

function selectFocusedVideoId(videos: Map<string, VideoEntry>): string | null {
  const visibleCandidates = Array.from(videos.entries()).filter(
    ([, entry]) => entry.ratio >= 0.55,
  );

  const fallbackCandidates = Array.from(videos.entries()).filter(
    ([, entry]) => entry.ratio > 0,
  );

  const candidates =
    visibleCandidates.length > 0 ? visibleCandidates : fallbackCandidates;

  if (candidates.length === 0) {
    return null;
  }

  const groupCounts = new Map<string, number>();

  for (const [, entry] of candidates) {
    if (!entry.audioGroup) {
      continue;
    }

    groupCounts.set(
      entry.audioGroup,
      (groupCounts.get(entry.audioGroup) ?? 0) + 1,
    );
  }

  const groupedCandidates = candidates.filter(
    ([, entry]) =>
      !!entry.audioGroup && (groupCounts.get(entry.audioGroup) ?? 0) > 1,
  );

  const scopedCandidates =
    groupedCandidates.length > 0 ? groupedCandidates : candidates;

  scopedCandidates.sort((a, b) => {
    const priorityDiff = a[1].audioPriority - b[1].audioPriority;

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    const ratioDiff = b[1].ratio - a[1].ratio;

    if (ratioDiff !== 0) {
      return ratioDiff;
    }

    const rectA = a[1].element.getBoundingClientRect();
    const rectB = b[1].element.getBoundingClientRect();
    const topDiff = rectA.top - rectB.top;

    if (topDiff !== 0) {
      return topDiff;
    }

    return rectA.left - rectB.left;
  });

  return scopedCandidates[0][0];
}

export function VideoAudioProvider({ children }: { children: ReactNode }) {
  const videosRef = useRef<Map<string, VideoEntry>>(new Map());
  const [hasAudioConsent, setHasAudioConsent] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const applyMediaState = useCallback(
    (canPlay: boolean, enabled: boolean, focusedVideoId: string | null) => {
      for (const [videoId, entry] of videosRef.current.entries()) {
        const isVisible = entry.ratio > 0;
        const shouldPlay = canPlay && isVisible;
        const shouldBeAudible =
          canPlay && enabled && focusedVideoId === videoId;

        if (shouldPlay) {
          void entry.element.play().catch(() => {});
        } else {
          entry.element.pause();
        }

        entry.element.muted = !shouldBeAudible;
      }
    },
    [],
  );

  useEffect(() => {
    applyMediaState(hasAudioConsent, soundEnabled, activeVideoId);
  }, [activeVideoId, applyMediaState, hasAudioConsent, soundEnabled]);

  const registerVideo = useCallback(
    (
      videoId: string,
      element: HTMLVideoElement,
      options?: { audioGroup?: string; audioPriority?: number },
    ) => {
      videosRef.current.set(videoId, {
        element,
        ratio: 0,
        audioGroup: options?.audioGroup,
        audioPriority: options?.audioPriority ?? Number.MAX_SAFE_INTEGER,
      });

      const focusedVideoId = selectFocusedVideoId(videosRef.current);
      setActiveVideoId(focusedVideoId);
      applyMediaState(hasAudioConsent, soundEnabled, focusedVideoId);
    },
    [applyMediaState, hasAudioConsent, soundEnabled],
  );

  const unregisterVideo = useCallback((videoId: string) => {
    videosRef.current.delete(videoId);
    setActiveVideoId(selectFocusedVideoId(videosRef.current));
  }, []);

  const updateVideoRatio = useCallback(
    (videoId: string, ratio: number) => {
      const entry = videosRef.current.get(videoId);
      if (!entry) {
        return;
      }

      entry.ratio = ratio;
      videosRef.current.set(videoId, entry);

      const focusedVideoId = selectFocusedVideoId(videosRef.current);
      setActiveVideoId(focusedVideoId);
      applyMediaState(hasAudioConsent, soundEnabled, focusedVideoId);
    },
    [applyMediaState, hasAudioConsent, soundEnabled],
  );

  const setGlobalSoundEnabled = useCallback(
    (enabled: boolean) => {
      const nextHasAudioConsent = hasAudioConsent || enabled;

      if (!hasAudioConsent && enabled) {
        setHasAudioConsent(true);
      }

      setSoundEnabled(enabled);

      const focusedVideoId = selectFocusedVideoId(videosRef.current);
      setActiveVideoId(focusedVideoId);
      applyMediaState(nextHasAudioConsent, enabled, focusedVideoId);
    },
    [applyMediaState, hasAudioConsent],
  );

  const toggleGlobalSound = useCallback(() => {
    setGlobalSoundEnabled(!soundEnabled);
  }, [setGlobalSoundEnabled, soundEnabled]);

  const isVideoAudible = useCallback(
    (videoId: string) => soundEnabled && activeVideoId === videoId,
    [activeVideoId, soundEnabled],
  );

  const value = useMemo<VideoAudioContextValue>(
    () => ({
      hasAudioConsent,
      isSoundEnabled: soundEnabled,
      isVideoAudible,
      registerVideo,
      setGlobalSoundEnabled,
      toggleGlobalSound,
      unregisterVideo,
      updateVideoRatio,
    }),
    [
      hasAudioConsent,
      soundEnabled,
      isVideoAudible,
      registerVideo,
      setGlobalSoundEnabled,
      toggleGlobalSound,
      unregisterVideo,
      updateVideoRatio,
    ],
  );

  return (
    <VideoAudioContext.Provider value={value}>
      {children}
    </VideoAudioContext.Provider>
  );
}
