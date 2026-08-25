import audioConsent from "@src/locales/en/components/audioConsent.json";
import common from "@src/locales/en/components/common.json";
import footer from "@src/locales/en/components/footer.json";
import geminiChatAssistant from "@src/locales/en/components/geminiChatAssistant.json";
import about from "@src/locales/en/pages/about.json";
import contact from "@src/locales/en/pages/contact.json";
import home from "@src/locales/en/pages/home.json";
import plans from "@src/locales/en/pages/plans.json";
import privacy from "@src/locales/en/pages/privacy.json";
import terms from "@src/locales/en/pages/terms.json";

export const defaultNS = "common";

export const resources = {
  en: {
    about,
    audioConsent,
    common,
    contact,
    footer,
    geminiChatAssistant,
    home,
    plans,
    privacy,
    terms,
  },
} as const;

export type AppNamespaces = keyof (typeof resources)["en"];
