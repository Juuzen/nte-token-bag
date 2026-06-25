import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { it } from "@client/locales/it";
import { en } from "@client/locales/en";

export const supportedLngs = ["it", "en"] as const;
export type SupportedLng = (typeof supportedLngs)[number];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
    },
    fallbackLng: "it",
    supportedLngs,
    // Only persist/read the user's choice — no browser auto-detection,
    // so the default language stays Italian unless the user changes it.
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: "nte:lang",
    },
    interpolation: { escapeValue: false }, // React already escapes
    react: { useSuspense: false },
  });

export { i18n };
