import { StrictMode, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { SessionProvider } from "@client/stores/session";
import { HexBackground } from "@client/components/HexBackground";
import styles from "./app.module.scss";

export function AppProvider({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const currentLng = i18n.resolvedLanguage === "en" ? "en" : "it";
  const nextLng = currentLng === "it" ? "en" : "it";

  return (
    <StrictMode>
      <PrimeReactProvider value={{ ripple: true }}>
        <BrowserRouter>
          <SessionProvider>
            <HexBackground />
            <div className="fixed top-4 right-4 z-[100] flex items-center gap-2">
              <button
                className={`${styles.themeToggle} glass-surface cursor-pointer px-[0.7rem] py-[0.45rem] font-display text-[0.78rem] font-bold uppercase tracking-[0.1em] leading-none text-text`}
                onClick={() => void i18n.changeLanguage(nextLng)}
                aria-label={t("language.switch")}
              >
                {nextLng}
              </button>
              <button
                className={`${styles.themeToggle} glass-surface cursor-pointer px-[0.7rem] py-[0.45rem] text-[1.1rem] leading-none text-text`}
                onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
                aria-label={t("theme.toggle")}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </div>
            {children}
          </SessionProvider>
        </BrowserRouter>
      </PrimeReactProvider>
    </StrictMode>
  );
}
