import { StrictMode, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { SessionProvider } from "@client/stores/session";
import { HexBackground } from "@client/components/HexBackground";
import styles from "./app.module.scss";

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <StrictMode>
      <PrimeReactProvider value={{ ripple: true }}>
        <BrowserRouter>
          <SessionProvider>
            <HexBackground />
            <button
              className={`${styles.themeToggle} glass-surface fixed top-4 right-4 z-[100] cursor-pointer px-[0.7rem] py-[0.45rem] text-[1.1rem] leading-none text-text`}
              onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            {children}
          </SessionProvider>
        </BrowserRouter>
      </PrimeReactProvider>
    </StrictMode>
  );
}
