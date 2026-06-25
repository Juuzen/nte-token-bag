import { createRoot } from "react-dom/client";
import { App } from "./app/app";
import "@client/lib/i18n";
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "./styles/global.css";

const rootEl = document.getElementById("root");
if (rootEl === null) {
  throw new Error("Root element #root not found in index.html");
}

createRoot(rootEl).render(<App />);
