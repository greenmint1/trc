import { AudioConsentPopup } from "@src/components/AudioConsentPopup";
import { Footer } from "@src/components/Footer";
import { TimelineSection } from "@src/components/TimelineSection";
import { useVideoAudio } from "@src/context/useVideoAudio";
import { getTimelineBlocks } from "@src/data/content";
import { useAnalytics } from "@src/hooks/useAnalytics";
import { useVideoPreload } from "@src/hooks/useVideoPreload";
import { AppRoute } from "@src/types/app";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { t } = useTranslation("home");
  const { t: tCommon } = useTranslation("common");
  const navigate = useNavigate();
  const { hasAudioConsent, setGlobalSoundEnabled } = useVideoAudio();
  const { trackButtonClick, trackEvent } = useAnalytics();
  const timelineBlocks = getTimelineBlocks(t);
  const firstVideoSrc = timelineBlocks[0]?.videos[0]?.src;
  const isFirstVideoLoaded = useVideoPreload(firstVideoSrc);

  useEffect(() => {
    trackEvent("home_page_view", {
      page: "home",
      path: "/",
    });
  }, [trackEvent]);

  useEffect(() => {
    if (hasAudioConsent) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [hasAudioConsent]);

  if (!isFirstVideoLoaded) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 pb-24 pt-10">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-brand-black/20 border-t-brand-green dark:border-brand-white/20 dark:border-t-brand-green" />
          <p className="mt-4 text-sm font-semibold tracking-wide text-brand-black/80 dark:text-brand-white/80">
            {tCommon(($) => $.states.loading)}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      id="landing-scroll-container"
      className={`relative h-full overflow-x-hidden snap-y snap-mandatory ${hasAudioConsent ? "overflow-y-scroll scroll-smooth" : "overflow-y-hidden"}`}
    >
      {timelineBlocks.map((block) => (
        <TimelineSection key={block.headline} block={block} />
      ))}

      <section className="flex h-full w-screen snap-start snap-always flex-col items-center justify-center gap-8 px-4 text-center">
        <h2 className="brand-heading text-3xl font-bold leading-tight text-brand-black dark:text-brand-white md:text-5xl">
          {t(($) => $.hero.headline)}
        </h2>
        <button
          type="button"
          onClick={() => {
            trackButtonClick("view_plans", "home_final_cta", {
              destination: AppRoute.Plans,
            });
            navigate(AppRoute.Plans);
          }}
          className="rounded-sm bg-brand-green px-8 py-4 text-base font-bold tracking-wide text-black shadow-lg transition-all hover:bg-brand-green-hover"
        >
          {tCommon(($) => $.actions.viewPlans)}
        </button>
      </section>

      <section className="w-screen snap-start snap-always">
        <Footer />
      </section>

      {!hasAudioConsent ? (
        <AudioConsentPopup
          onEnableSound={() => {
            trackEvent("audio_consent", {
              source: "landing_modal",
              action: "enable_sound",
            });
            trackButtonClick("turn_on_audio", "home_audio_gate");
            setGlobalSoundEnabled(true);
          }}
        />
      ) : null}
    </main>
  );
}
