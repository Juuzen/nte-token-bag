import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
const rootEl = document.getElementById("root");
if (rootEl === null) {
    throw new Error("Root element #root not found in index.html");
}
createRoot(rootEl).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
