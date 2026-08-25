import { PageBackgroundOverlay } from "@src/components/PageBackgroundOverlay";
import { PageBackgroundVideo } from "@src/components/PageBackgroundVideo";
import { useAnalytics } from "@src/hooks/useAnalytics";
import { AppRoute } from "@src/types/app";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function ContactPage() {
  const { t } = useTranslation("contact");
  const { t: tCommon } = useTranslation("common");
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent("contact_page_view", {
      page: "contact",
      path: AppRoute.Contact,
    });
  }, [trackEvent]);

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-16">
      <div className="pointer-events-none fixed inset-0 z-0">
        <PageBackgroundVideo />
        <PageBackgroundOverlay />
      </div>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-14 md:pt-20">
        <h1 className="brand-heading text-4xl leading-tight text-brand-black dark:text-brand-white md:text-6xl">
          {t(($) => $.title)}
        </h1>

        <h2 className="brand-heading mt-8 text-2xl leading-tight text-brand-black dark:text-brand-white md:text-4xl">
          {tCommon(($) => $.actions.getInTouch)}
        </h2>

        <p className="mt-6 text-base leading-relaxed text-brand-black/85 dark:text-brand-white/85 md:text-lg">
          {t(($) => $.paragraph1)}
        </p>

        <h2 className="brand-heading mt-12 text-2xl leading-tight text-brand-black dark:text-brand-white md:text-4xl">
          {tCommon(($) => $.actions.sendDirectMessage)}
        </h2>

        <p className="mt-6 text-base leading-relaxed text-brand-black/85 dark:text-brand-white/85 md:text-lg">
          {t(($) => $.paragraph2)}
        </p>

        <a
          href={tCommon(($) => $.links.instagramPageUrl)}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            trackEvent("contact_click", {
              channel: "instagram",
              placement: "contact_page_primary_cta",
            });
          }}
          className="mt-8 inline-flex text-base font-semibold uppercase tracking-[0.14em] text-brand-green transition hover:text-brand-green/80 md:text-lg"
        >
          {tCommon(($) => $.links.instagramHandle)}
        </a>
      </section>
    </main>
  );
}
