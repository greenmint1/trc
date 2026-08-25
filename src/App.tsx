import { Footer } from "@src/components/Footer";
import { GeminiChatAssistant } from "@src/components/GeminiChatAssistant";
import { Header } from "@src/components/Header";
import { SideMenuProvider } from "@src/context/SideMenuProvider";
import { ThemeProvider } from "@src/context/ThemeProvider";
import { VideoAudioProvider } from "@src/context/VideoAudioProvider";
import "@src/i18n";
import { AppRoute } from "@src/types/app";
import { Suspense, lazy, type ReactNode } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";

const HomePage = lazy(() =>
  import("@src/pages/HomePage").then((module) => ({
    default: module.HomePage,
  })),
);
const PlansPage = lazy(() =>
  import("@src/pages/PlansPage").then((module) => ({
    default: module.PlansPage,
  })),
);
const AboutPage = lazy(() =>
  import("@src/pages/AboutPage").then((module) => ({
    default: module.AboutPage,
  })),
);
const ContactPage = lazy(() =>
  import("@src/pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  })),
);
const PrivacyPage = lazy(() =>
  import("@src/pages/PrivacyPage").then((module) => ({
    default: module.PrivacyPage,
  })),
);
const TermsPage = lazy(() =>
  import("@src/pages/TermsPage").then((module) => ({
    default: module.TermsPage,
  })),
);

type AppContentProps = {
  loadingFallback: ReactNode;
};

function AppContent({ loadingFallback }: AppContentProps) {
  const location = useLocation();
  const isHomeRoute = location.pathname === AppRoute.Home;
  const showShellFooter = location.pathname !== AppRoute.Home;

  return (
    <div
      className={`flex ${isHomeRoute ? "h-screen" : "min-h-screen"} flex-col bg-brand-lightGray text-brand-black dark:bg-brand-black dark:text-brand-white`}
    >
      <VideoAudioProvider>
        <SideMenuProvider>
          <Header />
          <main className="min-h-0 flex-1">
            <Suspense fallback={loadingFallback}>
              <Routes>
                <Route path={AppRoute.Home} element={<HomePage />} />
                <Route path={AppRoute.Plans} element={<PlansPage />} />
                <Route path={AppRoute.About} element={<AboutPage />} />
                <Route path={AppRoute.Contact} element={<ContactPage />} />
                <Route path={AppRoute.Privacy} element={<PrivacyPage />} />
                <Route path={AppRoute.Terms} element={<TermsPage />} />
              </Routes>
            </Suspense>
          </main>
          {showShellFooter ? <Footer /> : null}
          <GeminiChatAssistant />
        </SideMenuProvider>
      </VideoAudioProvider>
    </div>
  );
}

function App() {
  const loadingFallback = (
    <div className="flex h-full min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-black/20 border-t-brand-green dark:border-brand-white/20 dark:border-t-brand-green" />
    </div>
  );

  return (
    <HashRouter>
      <ThemeProvider>
        <AppContent loadingFallback={loadingFallback} />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
