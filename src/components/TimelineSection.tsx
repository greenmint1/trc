import { VideoPanel } from "@src/components/VideoPanel";
import type { TimelineBlock } from "@src/types/app";

type TimelineSectionProps = {
  block: TimelineBlock;
};

export function TimelineSection({ block }: TimelineSectionProps) {
  if (block.split) {
    return (
      <>
        {block.videos.map((video, index) => (
          <section
            key={`${block.headline}-${video.src}`}
            className={`flex h-full w-screen snap-start snap-always flex-col overflow-hidden px-4 py-6 text-center md:hidden ${index === 0 ? "items-center gap-3" : "justify-end"}`}
          >
            {index === 0 ? (
              <h2 className="brand-heading shrink-0 max-w-4xl text-3xl font-bold leading-tight text-brand-black dark:text-brand-white">
                {block.headline}
              </h2>
            ) : null}
            <div
              className={`w-full ${index === 0 ? "flex-1" : "h-[78vh] max-h-[78vh]"}`}
            >
              <VideoPanel
                src={video.src}
                watermark={video.watermark}
                audioGroup={video.audioGroup}
                audioPriority={video.audioPriority}
              />
            </div>
          </section>
        ))}

        <section className="hidden h-full w-screen snap-start snap-always flex-col items-center gap-3 overflow-hidden px-4 py-6 text-center md:gap-4 lg:gap-6 md:flex">
          <h2 className="brand-heading shrink-0 max-w-4xl text-3xl font-bold leading-tight text-brand-black dark:text-brand-white md:text-5xl">
            {block.headline}
          </h2>

          <div className="flex w-full flex-1 items-start justify-center overflow-hidden lg:items-center">
            <div className="grid h-full w-full max-w-7xl grid-cols-2 gap-4">
              {block.videos.map((video) => (
                <VideoPanel
                  key={video.src}
                  src={video.src}
                  watermark={video.watermark}
                  audioGroup={video.audioGroup}
                  audioPriority={video.audioPriority}
                />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <section className="flex h-full w-screen snap-start snap-always flex-col items-center gap-3 overflow-hidden px-4 py-6 text-center md:gap-4 lg:gap-6">
      <h2 className="brand-heading shrink-0 max-w-4xl text-3xl font-bold leading-tight text-brand-black dark:text-brand-white md:text-5xl">
        {block.headline}
      </h2>

      <div className="flex w-full flex-1 items-start justify-center overflow-hidden lg:items-center">
        {block.sequence ? (
          <div className="grid h-full w-full max-w-5xl grid-cols-2 gap-4">
            {block.videos.map((video) => (
              <VideoPanel
                key={video.src}
                src={video.src}
                watermark={video.watermark}
                audioGroup={video.audioGroup}
                audioPriority={video.audioPriority}
              />
            ))}
          </div>
        ) : null}

        {!block.split && !block.sequence ? (
          <div className="h-full w-full max-w-6xl">
            {block.videos.map((video) => (
              <VideoPanel
                key={video.src}
                src={video.src}
                watermark={video.watermark}
                audioGroup={video.audioGroup}
                audioPriority={video.audioPriority}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
