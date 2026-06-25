import "i18next";
import type { it } from "@client/locales/it";

// Type-safe translation keys: `t("…")` is checked against the Italian resource
// (the source of truth for the key shape; English mirrors it).
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: { translation: typeof it };
  }
}
