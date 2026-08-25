import { useAnalytics } from "@src/hooks/useAnalytics";
import { AppRoute } from "@src/types/app";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export function Footer() {
  const { t } = useTranslation("footer");
  const { t: tCommon } = useTranslation("common");
  const location = useLocation();
  const { trackEvent } = useAnalytics();
  const currentYear = new Date().getFullYear();

  const handleFooterNavigation = (
    destination: AppRoute.Privacy | AppRoute.Terms,
  ) => {
    trackEvent("nav_click", {
      element:
        destination === AppRoute.Privacy ? "footer_privacy" : "footer_terms",
      placement: "footer",
      destination,
    });
  };

  const linkTone =
    "text-sm font-semibold uppercase tracking-[0.14em] transition hover:text-brand-green";

  return (
    <footer className="border-t border-black/10 bg-brand-lightGray/90 px-4 py-4 text-brand-black backdrop-blur-sm dark:border-white/10 dark:bg-brand-darkGray/90 dark:text-brand-white md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs font-medium tracking-wide text-brand-black/80 dark:text-brand-white/75">
          {t(($) => $.copyright, { year: currentYear })}
        </p>

        <nav
          aria-label={tCommon(($) => $.labels.legal)}
          className="flex items-center gap-5"
        >
          <Link
            to={AppRoute.Privacy}
            onClick={() => {
              handleFooterNavigation(AppRoute.Privacy);
            }}
            aria-current={
              location.pathname === AppRoute.Privacy ? "page" : undefined
            }
            className={`${linkTone} ${location.pathname === AppRoute.Privacy ? "text-brand-green" : "text-brand-black/85 dark:text-brand-white/85"}`}
          >
            {tCommon(($) => $.nav.privacy)}
          </Link>
          <Link
            to={AppRoute.Terms}
            onClick={() => {
              handleFooterNavigation(AppRoute.Terms);
            }}
            aria-current={
              location.pathname === AppRoute.Terms ? "page" : undefined
            }
            className={`${linkTone} ${location.pathname === AppRoute.Terms ? "text-brand-green" : "text-brand-black/85 dark:text-brand-white/85"}`}
          >
            {tCommon(($) => $.nav.terms)}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
