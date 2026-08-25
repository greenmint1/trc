import { defaultNS, resources } from "@src/i18n/resources";
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
    enableSelector: true;
  }
}
