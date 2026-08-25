import { useCallback } from "react";

export const GA_MEASUREMENT_ID = "G-HK9Z7WTK32";

type AnalyticsEventParams = Record<string, string | number | boolean>;

type AnalyticsEventName =
  | "button_click"
  | "nav_click"
  | "home_page_view"
  | "about_page_view"
  | "plans_page_view"
  | "contact_page_view"
  | "privacy_page_view"
  | "terms_page_view"
  | "plans_package_click"
  | "contact_click"
  | "audio_consent"
  | "theme_toggle"
  | "sound_toggle";

type ButtonName =
  | "view_plans"
  | "turn_on_audio"
  | "open_chat"
  | "close_chat"
  | "clear_chat"
  | "send_chat";

type ButtonPlacement = "home_final_cta" | "home_audio_gate" | "chat_assistant";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (
      command: "config" | "event" | "js",
      target: string | Date,
      params?: AnalyticsEventParams,
    ) => void;
  }
}

function sendAnalyticsEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function useAnalytics() {
  const trackEvent = useCallback(
    (eventName: AnalyticsEventName, params: AnalyticsEventParams) => {
      sendAnalyticsEvent(eventName, params);
    },
    [],
  );

  const trackButtonClick = useCallback(
    (
      buttonName: ButtonName,
      placement: ButtonPlacement,
      params: AnalyticsEventParams = {},
    ) => {
      sendAnalyticsEvent("button_click", {
        button_name: buttonName,
        placement,
        ...params,
      });
    },
    [],
  );

  return { trackEvent, trackButtonClick };
}
