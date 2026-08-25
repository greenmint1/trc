import { useTranslation } from "react-i18next";

export function PricingHero() {
  const { t } = useTranslation("plans");

  return (
    <section className="mx-auto max-w-4xl px-6 pb-12 pt-32">
      <h1 className="brand-heading mb-8 text-4xl leading-tight text-brand-black dark:text-brand-white md:text-6xl">
        {t(($) => $.hero.title)}
      </h1>
      <p className="text-base leading-relaxed text-brand-black/85 dark:text-brand-lightGray">
        {t(($) => $.hero.description)}
      </p>
    </section>
  );
}
