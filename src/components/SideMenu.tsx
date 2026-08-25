import { CloseIcon } from "@src/assets/svg/icons";
import { useSideMenu } from "@src/context/useSideMenu";
import { useTheme } from "@src/context/useTheme";
import { useVideoAudio } from "@src/context/useVideoAudio";
import { useAnalytics } from "@src/hooks/useAnalytics";
import { AppRoute } from "@src/types/app";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export function SideMenu() {
  const { t } = useTranslation("common");
  const { trackEvent } = useAnalytics();
  const { isDark, toggleTheme } = useTheme();
  const { isSoundEnabled, toggleGlobalSound } = useVideoAudio();
  const { isSideMenuOpen, closeSideMenu } = useSideMenu();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleTheme = () => {
    trackEvent("theme_toggle", {
      placement: "header_or_side_menu",
      next_theme: isDark ? "light" : "dark",
    });
    toggleTheme();
  };

  const handleToggleSound = () => {
    trackEvent("sound_toggle", {
      placement: "header_or_side_menu",
      next_sound_state: isSoundEnabled ? "off" : "on",
    });
    toggleGlobalSound();
  };

  const navigateTo = (destination: string, element: string) => {
    trackEvent("nav_click", { element, placement: "side_menu", destination });
    navigate(destination);
    closeSideMenu();
  };

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (!isSideMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSideMenuOpen]);

  const panelTone = isDark
    ? "border-white/10 bg-brand-darkGray text-white"
    : "border-black/10 bg-brand-lightGray text-brand-black";
  const sectionTitleTone = isDark ? "text-white/70" : "text-brand-black/70";
  const actionTone = isDark
    ? "border-white/20 text-white"
    : "border-black/20 text-brand-black";
  const closeTone = isDark
    ? "border-white/40 text-white"
    : "border-black/40 text-brand-black";

  return (
    <div
      className={`fixed inset-0 z-[60] transition ${isSideMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label={t(($) => $.aria.closeMenuOverlay)}
        onClick={() => {
          trackEvent("nav_click", {
            element: "close_menu_overlay",
            placement: "side_menu",
          });
          closeSideMenu();
        }}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isSideMenuOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        className={`relative h-full w-[84vw] max-w-sm border-r p-5 shadow-2xl transition-transform duration-300 ${panelTone} ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label={t(($) => $.aria.mobileMenu)}
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="brand-heading text-xl">{t(($) => $.labels.menu)}</p>
          <button
            type="button"
            aria-label={t(($) => $.aria.closeMenu)}
            onClick={() => {
              trackEvent("nav_click", {
                element: "close_menu_button",
                placement: "side_menu",
              });
              closeSideMenu();
            }}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:border-brand-green hover:text-brand-green ${closeTone}`}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-8">
          <section>
            <h3
              className={`text-xs font-semibold uppercase tracking-[0.24em] ${sectionTitleTone}`}
            >
              {t(($) => $.labels.navigate)}
            </h3>
            <button
              type="button"
              aria-current={isActive(AppRoute.Home) ? "page" : undefined}
              onClick={() => navigateTo(AppRoute.Home, "menu_home")}
              className={`mt-4 w-full rounded-sm border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-brand-green hover:text-brand-green ${isActive(AppRoute.Home) ? "border-brand-green text-brand-green" : actionTone}`}
            >
              {t(($) => $.nav.home)}
            </button>
            <button
              type="button"
              aria-current={isActive(AppRoute.Plans) ? "page" : undefined}
              onClick={() => navigateTo(AppRoute.Plans, "menu_plans")}
              className={`mt-3 w-full rounded-sm border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-brand-green hover:text-brand-green ${isActive(AppRoute.Plans) ? "border-brand-green text-brand-green" : actionTone}`}
            >
              {t(($) => $.nav.plans)}
            </button>
            <button
              type="button"
              aria-current={isActive(AppRoute.About) ? "page" : undefined}
              onClick={() => navigateTo(AppRoute.About, "menu_about")}
              className={`mt-3 w-full rounded-sm border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-brand-green hover:text-brand-green ${isActive(AppRoute.About) ? "border-brand-green text-brand-green" : actionTone}`}
            >
              {t(($) => $.nav.about)}
            </button>
            <button
              type="button"
              aria-current={isActive(AppRoute.Contact) ? "page" : undefined}
              onClick={() => navigateTo(AppRoute.Contact, "menu_contact")}
              className={`mt-3 w-full rounded-sm border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-brand-green hover:text-brand-green ${isActive(AppRoute.Contact) ? "border-brand-green text-brand-green" : actionTone}`}
            >
              {t(($) => $.nav.contact)}
            </button>
            <button
              type="button"
              aria-current={isActive(AppRoute.Privacy) ? "page" : undefined}
              onClick={() => navigateTo(AppRoute.Privacy, "menu_privacy")}
              className={`mt-4 w-full rounded-sm border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-brand-green hover:text-brand-green ${isActive(AppRoute.Privacy) ? "border-brand-green text-brand-green" : actionTone}`}
            >
              {t(($) => $.nav.privacy)}
            </button>
            <button
              type="button"
              aria-current={isActive(AppRoute.Terms) ? "page" : undefined}
              onClick={() => navigateTo(AppRoute.Terms, "menu_terms")}
              className={`mt-3 w-full rounded-sm border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-brand-green hover:text-brand-green ${isActive(AppRoute.Terms) ? "border-brand-green text-brand-green" : actionTone}`}
            >
              {t(($) => $.nav.terms)}
            </button>
          </section>

          <section>
            <h3
              className={`text-xs font-semibold uppercase tracking-[0.24em] ${sectionTitleTone}`}
            >
              {t(($) => $.labels.settings)}
            </h3>
            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={handleToggleSound}
                className={`flex w-full items-center justify-between rounded-sm border px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-brand-green hover:text-brand-green ${actionTone}`}
              >
                <span>{t(($) => $.labels.sound)}</span>
                <span>
                  {isSoundEnabled
                    ? t(($) => $.states.on)
                    : t(($) => $.states.off)}
                </span>
              </button>

              <button
                type="button"
                onClick={handleToggleTheme}
                className={`flex w-full items-center justify-between rounded-sm border px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-brand-green hover:text-brand-green ${actionTone}`}
              >
                <span>{t(($) => $.labels.theme)}</span>
                <span>
                  {isDark ? t(($) => $.states.dark) : t(($) => $.states.light)}
                </span>
              </button>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
