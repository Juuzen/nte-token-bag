import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { App } from "./App";
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "./styles/global.css";

const rootEl = document.getElementById("root");
if (rootEl === null) {
  throw new Error("Root element #root not found in index.html");
}

createRoot(rootEl).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrimeReactProvider>
  </StrictMode>
);
