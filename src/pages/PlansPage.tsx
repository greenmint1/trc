import { ImpactPillarCard } from "@src/components/ImpactPillarCard";
import { PageBackgroundOverlay } from "@src/components/PageBackgroundOverlay";
import { PageBackgroundVideo } from "@src/components/PageBackgroundVideo";
import { PricingCard } from "@src/components/PricingCard";
import { PricingHero } from "@src/components/PricingHero";
import {
  GOOGLE_FORM_URL,
  getImpactPillars,
  getPackages,
} from "@src/data/content";
import { useAnalytics } from "@src/hooks/useAnalytics";
import { AppRoute } from "@src/types/app";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function PlansPage() {
  const { t } = useTranslation("plans");
  const { trackEvent } = useAnalytics();
  const impactPillars = getImpactPillars(t);
  const packages = getPackages(t);

  useEffect(() => {
    trackEvent("plans_page_view", {
      page: "plans",
      path: AppRoute.Plans,
    });
  }, [trackEvent]);

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-16">
      <div className="pointer-events-none fixed inset-0 z-0">
        <PageBackgroundVideo />
        <PageBackgroundOverlay />
      </div>

      <div className="relative z-10">
        <PricingHero />

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-16 md:grid-cols-2">
          {impactPillars.map((pillar) => (
            <ImpactPillarCard key={pillar.title} pillar={pillar} />
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-10">
          <div className="rounded-sm border border-brand-black/10 bg-brand-lightGray/80 p-6 dark:border-white/10 dark:bg-brand-darkGray/70 md:p-8">
            <h2 className="brand-heading text-2xl leading-tight text-brand-black dark:text-brand-white md:text-4xl">
              {t(($) => $.booking.title)}
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-brand-black/85 dark:text-brand-white/85 md:text-lg">
              <p className="font-semibold text-brand-black dark:text-brand-white">
                {t(($) => $.booking.noteTitle)}
              </p>

              <ul className="space-y-4 pl-5">
                <li className="list-disc">
                  <strong>{t(($) => $.booking.zeroUpfrontLabel)}</strong>{" "}
                  {t(($) => $.booking.zeroUpfrontBody)}
                </li>
                <li className="list-disc">
                  <strong>{t(($) => $.booking.googleSignInLabel)}</strong>{" "}
                  {t(($) => $.booking.googleSignInBody)}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-24 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PricingCard key={pkg.name} pkg={pkg} formUrl={GOOGLE_FORM_URL} />
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="rounded-sm border border-brand-black/10 bg-brand-lightGray/80 p-6 dark:border-white/10 dark:bg-brand-darkGray/70 md:p-8">
            <h2 className="brand-heading text-2xl leading-tight text-brand-black dark:text-brand-white md:text-4xl">
              {t(($) => $.guidelines.title)}
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-brand-black/85 dark:text-brand-white/85 md:text-lg">
              <ul className="space-y-4 pl-5">
                <li className="list-disc">
                  <strong>{t(($) => $.guidelines.customAnimationLabel)}</strong>{" "}
                  {t(($) => $.guidelines.customAnimationBody)}
                </li>
                <li className="list-disc">
                  <strong>
                    {t(($) => $.guidelines.noCustomRequestsLabel)}
                  </strong>{" "}
                  {t(($) => $.guidelines.noCustomRequestsBody)}
                </li>
                <li className="list-disc">
                  <strong>
                    {t(($) => $.guidelines.unifiedFrameworkLabel)}
                  </strong>{" "}
                  {t(($) => $.guidelines.unifiedFrameworkBody)}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
