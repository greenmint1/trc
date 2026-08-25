import { VideoAudioContext } from "@src/context/videoAudioContext";
import { useContext } from "react";

export function useVideoAudio() {
  const context = useContext(VideoAudioContext);

  if (!context) {
    throw new Error("useVideoAudio must be used within VideoAudioProvider");
  }

  return context;
}
