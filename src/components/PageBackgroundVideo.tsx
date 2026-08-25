type PageBackgroundVideoProps = {
  src?: string;
};

const DEFAULT_VIDEO_SRC = "/assets/animations/El_Jaleo_John_Singer_Sargent.mp4";

export function PageBackgroundVideo({
  src = DEFAULT_VIDEO_SRC,
}: PageBackgroundVideoProps) {
  return (
    <video
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
      className="fixed inset-0 h-full w-full object-cover object-[80%_center] md:object-[90%_center] xl:object-center"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
