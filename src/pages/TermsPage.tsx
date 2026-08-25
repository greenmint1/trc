import { useAnalytics } from "@src/hooks/useAnalytics";
import { AppRoute } from "@src/types/app";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function TermsPage() {
  const { t } = useTranslation("terms");
  const { t: tCommon } = useTranslation("common");
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent("terms_page_view", {
      page: "terms",
      path: AppRoute.Terms,
    });
  }, [trackEvent]);

  const sectionHeadingClass =
    "font-sans text-xl font-bold tracking-wide text-brand-black dark:text-white md:text-2xl";

  return (
    <main className="min-h-screen overflow-x-hidden pb-16">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-sm border border-black/5 bg-brand-lightGray p-8 text-gray-700 dark:border-white/10 dark:bg-brand-darkGray dark:text-gray-300 md:p-10">
          <h1 className="font-sans text-3xl font-bold tracking-wide text-brand-black dark:text-white md:text-4xl">
            {t(($) => $.title)}
          </h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {tCommon(($) => $.meta.effectiveDate)}
          </p>

          <p className="mt-6 text-base leading-relaxed">
            {t(($) => $.introPrefix)}
            <a
              href="https://therevivedcanvas.com/"
              target="_blank"
              rel="noreferrer"
              className="text-brand-green hover:underline"
            >
              {tCommon(($) => $.links.website)}
            </a>
            {t(($) => $.introSuffix)}
          </p>

          <section className="mt-10">
            <h2 className={sectionHeadingClass}>
              {t(($) => $.sections.framework.title)}
            </h2>
            <p className="mt-4 leading-relaxed">
              {t(($) => $.sections.framework.body)}
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.framework.item1Label)}</strong>{" "}
                  {t(($) => $.sections.framework.item1Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.framework.item2Label)}</strong>{" "}
                  {t(($) => $.sections.framework.item2Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.framework.item3Label)}</strong>{" "}
                  {t(($) => $.sections.framework.item3Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.framework.item4Label)}</strong>{" "}
                  {t(($) => $.sections.framework.item4Body)}
                </span>
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className={sectionHeadingClass}>
              {t(($) => $.sections.payments.title)}
            </h2>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.payments.item1Label)}</strong>{" "}
                  {t(($) => $.sections.payments.item1Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.payments.item2Label)}</strong>{" "}
                  {t(($) => $.sections.payments.item2Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.payments.item3Label)}</strong>{" "}
                  {t(($) => $.sections.payments.item3Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.payments.item4Label)}</strong>{" "}
                  {t(($) => $.sections.payments.item4Body)}
                </span>
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className={sectionHeadingClass}>
              {t(($) => $.sections.licensing.title)}
            </h2>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.licensing.item1Label)}</strong>{" "}
                  {t(($) => $.sections.licensing.item1Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.licensing.item2Label)}</strong>{" "}
                  {t(($) => $.sections.licensing.item2Prefix)}
                  <a
                    href={tCommon(($) => $.links.instagramPageUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-green hover:underline"
                  >
                    {tCommon(($) => $.links.instagramHandle)}
                  </a>
                  {t(($) => $.sections.licensing.item2InstagramSuffix)}
                  {t(($) => $.sections.licensing.item2Joiner)}
                  <a
                    href={tCommon(($) => $.links.facebookPageUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-green hover:underline"
                  >
                    {tCommon(($) => $.links.facebookPageLabel)}
                  </a>
                  {t(($) => $.sections.licensing.item2Suffix)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.licensing.item3Label)}</strong>{" "}
                  {t(($) => $.sections.licensing.item3Body)}
                </span>
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className={sectionHeadingClass}>
              {t(($) => $.sections.liability.title)}
            </h2>
            <p className="mt-4 leading-relaxed">
              {t(($) => $.sections.liability.body)}
            </p>
          </section>

          <section className="mt-10">
            <h2 className={sectionHeadingClass}>
              {t(($) => $.sections.contact.title)}
            </h2>
            <p className="mt-4 leading-relaxed">
              {t(($) => $.sections.contact.body)}
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.contact.instagramLabel)}</strong>{" "}
                  <a
                    href={tCommon(($) => $.links.instagramPageUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-green hover:underline"
                  >
                    {tCommon(($) => $.links.instagramHandle)}
                  </a>
                </span>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
