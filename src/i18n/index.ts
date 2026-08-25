import { defaultNS, resources } from "@src/i18n/resources";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

void i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  defaultNS,
  ns: Object.keys(resources.en),
  initImmediate: false,
  enableSelector: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export { i18n };
