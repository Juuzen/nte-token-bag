import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { App } from "./App";
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "./index.css";

const rootEl = document.getElementById("root");
if (rootEl === null) {
  throw new Error("Root element #root not found in index.html");
}

createRoot(rootEl).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
