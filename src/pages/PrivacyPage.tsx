import { useAnalytics } from "@src/hooks/useAnalytics";
import { AppRoute } from "@src/types/app";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function PrivacyPage() {
  const { t } = useTranslation("privacy");
  const { t: tCommon } = useTranslation("common");
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent("privacy_page_view", {
      page: "privacy",
      path: AppRoute.Privacy,
    });
  }, [trackEvent]);

  const sectionHeadingClass =
    "font-sans text-xl font-bold tracking-wide text-brand-black dark:text-white md:text-2xl";

  return (
    <main className="min-h-screen overflow-x-hidden pb-16">
      <section className="mx-auto grid max-w-4xl gap-6 px-6 py-20">
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
              {t(($) => $.sections.collect.title)}
            </h2>
            <p className="mt-4 leading-relaxed">
              {t(($) => $.sections.collect.body)}
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.collect.item1Label)}</strong>{" "}
                  {t(($) => $.sections.collect.item1Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.collect.item2Label)}</strong>{" "}
                  {t(($) => $.sections.collect.item2Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.collect.item3Label)}</strong>{" "}
                  {t(($) => $.sections.collect.item3Body)}
                </span>
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className={sectionHeadingClass}>
              {t(($) => $.sections.use.title)}
            </h2>
            <p className="mt-4 leading-relaxed">
              {t(($) => $.sections.use.body)}
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>{t(($) => $.sections.use.item1)}</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>{t(($) => $.sections.use.item2)}</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  {t(($) => $.sections.use.item3Prefix)}
                  <a
                    href={tCommon(($) => $.links.instagramPageUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-green hover:underline"
                  >
                    {tCommon(($) => $.links.instagramHandle)}
                  </a>
                  {t(($) => $.sections.use.item3InstagramSuffix)}
                  {t(($) => $.sections.use.item3Joiner)}
                  <a
                    href={tCommon(($) => $.links.facebookPageUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-green hover:underline"
                  >
                    {tCommon(($) => $.links.facebookPageLabel)}
                  </a>
                  {t(($) => $.sections.use.item3Suffix)}
                </span>
              </li>
            </ul>
            <p className="mt-5 rounded-sm border border-brand-green/30 bg-brand-green/10 p-4 text-sm leading-relaxed text-brand-black dark:text-white">
              <span className="font-semibold text-brand-green">
                {t(($) => $.sections.use.noticeLabel)}
              </span>{" "}
              {t(($) => $.sections.use.noticeBody)}
            </p>
          </section>

          <section className="mt-10">
            <h2 className={sectionHeadingClass}>
              {t(($) => $.sections.storage.title)}
            </h2>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.storage.item1Label)}</strong>{" "}
                  {t(($) => $.sections.storage.item1Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.storage.item2Label)}</strong>{" "}
                  {t(($) => $.sections.storage.item2Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.storage.item3Label)}</strong>{" "}
                  {t(($) => $.sections.storage.item3Body)}
                </span>
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className={sectionHeadingClass}>
              {t(($) => $.sections.rights.title)}
            </h2>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.rights.item1Label)}</strong>{" "}
                  {t(($) => $.sections.rights.item1Body)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.rights.item2Label)}</strong>{" "}
                  {t(($) => $.sections.rights.item2Prefix)}
                  <a
                    href={tCommon(($) => $.links.instagramPageUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-green hover:underline"
                  >
                    {tCommon(($) => $.links.instagramHandle)}
                  </a>
                  {t(($) => $.sections.rights.item2InstagramSuffix)}
                  {t(($) => $.sections.rights.item2Joiner)}
                  <a
                    href={tCommon(($) => $.links.facebookPageUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-green hover:underline"
                  >
                    {tCommon(($) => $.links.facebookPageLabel)}
                  </a>
                  {t(($) => $.sections.rights.item2Suffix)}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                <span>
                  <strong>{t(($) => $.sections.rights.item3Label)}</strong>{" "}
                  {t(($) => $.sections.rights.item3Body)}
                </span>
              </li>
            </ul>
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
