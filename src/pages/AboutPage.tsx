import { PageBackgroundOverlay } from "@src/components/PageBackgroundOverlay";
import { PageBackgroundVideo } from "@src/components/PageBackgroundVideo";
import { useAnalytics } from "@src/hooks/useAnalytics";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function AboutPage() {
  const { t } = useTranslation("about");
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent("about_page_view", {
      page: "about",
      path: "/about",
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
          {t(($) => $.subtitle)}
        </h2>

        <p className="mt-6 text-base leading-relaxed text-brand-black/85 dark:text-brand-white/85 md:text-lg">
          {t(($) => $.paragraph1)}
        </p>

        <p className="mt-4 text-base leading-relaxed text-brand-black/85 dark:text-brand-white/85 md:text-lg">
          {t(($) => $.paragraph2)}
        </p>

        <h2 className="brand-heading mt-12 text-2xl leading-tight text-brand-black dark:text-brand-white md:text-4xl">
          {t(($) => $.philosophyTitle)}
        </h2>

        <ul className="mt-6 space-y-5">
          <li className="text-base leading-relaxed text-brand-black/85 dark:text-brand-white/85 md:text-lg">
            <strong>{t(($) => $.philosophy.mastersLabel)}</strong>{" "}
            {t(($) => $.philosophy.mastersBody)}
          </li>
          <li className="text-base leading-relaxed text-brand-black/85 dark:text-brand-white/85 md:text-lg">
            <strong>{t(($) => $.philosophy.algorithmLabel)}</strong>{" "}
            {t(($) => $.philosophy.algorithmBody)}
          </li>
          <li className="text-base leading-relaxed text-brand-black/85 dark:text-brand-white/85 md:text-lg">
            <strong>{t(($) => $.philosophy.creatorsLabel)}</strong>{" "}
            {t(($) => $.philosophy.creatorsBody)}
          </li>
        </ul>
      </section>
    </main>
  );
}
