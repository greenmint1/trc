import { createContext } from "react";

export type VideoAudioContextValue = {
  hasAudioConsent: boolean;
  isSoundEnabled: boolean;
  isVideoAudible: (videoId: string) => boolean;
  registerVideo: (
    videoId: string,
    element: HTMLVideoElement,
    options?: { audioGroup?: string; audioPriority?: number },
  ) => void;
  setGlobalSoundEnabled: (enabled: boolean) => void;
  toggleGlobalSound: () => void;
  unregisterVideo: (videoId: string) => void;
  updateVideoRatio: (videoId: string, ratio: number) => void;
};

export const VideoAudioContext = createContext<
  VideoAudioContextValue | undefined
>(undefined);
