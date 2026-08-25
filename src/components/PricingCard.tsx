import { useAnalytics } from "@src/hooks/useAnalytics";
import type { PackageTier } from "@src/types/app";
import { useTranslation } from "react-i18next";

type PricingCardProps = {
  pkg: PackageTier;
  formUrl: string;
};

export function PricingCard({ pkg, formUrl }: PricingCardProps) {
  const { t } = useTranslation("common");
  const { trackEvent } = useAnalytics();

  const cardClasses = pkg.popular
    ? "relative rounded-sm border-2 border-brand-green bg-white/92 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)] dark:bg-brand-darkGray/90 dark:shadow-neon"
    : "rounded-sm border border-brand-green bg-white/80 p-8 dark:bg-black/70";

  return (
    <article className={cardClasses}>
      {pkg.popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-brand-green px-4 py-1 text-xs font-black tracking-[0.2em] text-black">
          {t(($) => $.labels.mostPopular)}
        </span>
      ) : null}

      <h3 className="brand-heading mb-2 text-2xl text-brand-black dark:text-brand-white">
        {pkg.name}
      </h3>
      <p className="mb-3 text-4xl font-black text-brand-black dark:text-brand-green">
        {pkg.price}
      </p>
      <p className="mb-5 leading-relaxed text-brand-black/80 dark:text-brand-lightGray">
        {pkg.summary}
      </p>

      <ul className="mb-5 space-y-2 text-sm leading-relaxed text-brand-black/85 dark:text-brand-lightGray">
        {pkg.features.map((feature) => (
          <li key={feature}>- {feature}</li>
        ))}
      </ul>

      <p className="mb-6 text-sm italic text-brand-black/70 dark:text-brand-lightGray">
        {pkg.bestFor}
      </p>

      <a
        href={formUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          trackEvent("plans_package_click", {
            package_name: pkg.name,
            package_price: pkg.price,
            cta_text: pkg.cta,
            placement: "plans_packages_grid",
          });
        }}
        className={
          pkg.popular
            ? "inline-block w-full rounded-sm bg-brand-green px-5 py-3 text-center font-extrabold text-black transition-all hover:bg-brand-green-hover"
            : "inline-block w-full rounded-sm border border-brand-green bg-transparent px-5 py-3 text-center font-bold text-brand-green transition-all hover:bg-brand-green hover:text-black"
        }
      >
        {pkg.cta}
      </a>
    </article>
  );
}
