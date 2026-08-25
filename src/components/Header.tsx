import { MenuIcon } from "@src/assets/svg/icons";
import { SideMenu } from "@src/components/SideMenu";
import { useSideMenu } from "@src/context/useSideMenu";
import { useAnalytics } from "@src/hooks/useAnalytics";
import { AppRoute } from "@src/types/app";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const { t } = useTranslation("common");
  const { trackEvent } = useAnalytics();
  const { isSideMenuOpen, openSideMenu } = useSideMenu();
  const navigate = useNavigate();
  const location = useLocation();
  const onLandingPage = location.pathname === AppRoute.Home;
  const [isHiddenOnLanding, setIsHiddenOnLanding] = useState(false);
  const hideHeaderOnLanding = onLandingPage && isHiddenOnLanding;

  useEffect(() => {
    if (!onLandingPage) {
      return;
    }

    let detachScrollListener: (() => void) | null = null;
    const minDelta = 2;
    const topRevealOffset = 24;

    const attachScrollListener = () => {
      const scrollContainer = document.getElementById(
        "landing-scroll-container",
      );

      if (!scrollContainer || detachScrollListener) {
        return;
      }

      let lastScrollTop = scrollContainer.scrollTop;

      const onScroll = () => {
        const currentScrollTop = scrollContainer.scrollTop;
        const delta = currentScrollTop - lastScrollTop;

        if (currentScrollTop <= topRevealOffset) {
          setIsHiddenOnLanding(false);
        } else if (Math.abs(delta) >= minDelta) {
          setIsHiddenOnLanding(delta > 0);
        }

        lastScrollTop = currentScrollTop;
      };

      onScroll();

      scrollContainer.addEventListener("scroll", onScroll, { passive: true });
      detachScrollListener = () => {
        scrollContainer.removeEventListener("scroll", onScroll);
      };
    };

    attachScrollListener();
    const attachInterval = window.setInterval(attachScrollListener, 150);

    return () => {
      window.clearInterval(attachInterval);
      detachScrollListener?.();
    };
  }, [onLandingPage]);

  if (hideHeaderOnLanding) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-black/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={t(($) => $.aria.openMenu)}
              aria-expanded={isSideMenuOpen}
              onClick={() => {
                trackEvent("nav_click", {
                  element: "open_menu",
                  placement: "header",
                  menu: "mobile",
                });
                openSideMenu();
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-all hover:border-brand-green hover:text-brand-green"
            >
              <MenuIcon />
            </button>
            <button
              type="button"
              onClick={() => {
                trackEvent("nav_click", {
                  element: "brand_logo",
                  placement: "header",
                  destination: AppRoute.Home,
                });
                navigate(AppRoute.Home);
              }}
              className="brand-heading text-lg tracking-wide text-white transition-opacity hover:opacity-80 md:text-2xl"
            >
              {t(($) => $.brand.name)}
            </button>
          </div>
        </div>
      </header>

      <SideMenu />
    </>
  );
}
