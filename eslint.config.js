import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";

/**
 * Flat ESLint config.
 *
 * Primary purpose: enforce the bulletproof-react unidirectional architecture
 * (shared -> features -> app) via `import/no-restricted-paths`. The base
 * rule sets are kept light on purpose so this config stays a boundary guard
 * rather than a broad style linter.
 */
export default tseslint.config(
  {
    // `src/**/*.js` are tsc-emitted build artifacts (already gitignored);
    // only the TypeScript sources are linted.
    ignores: ["dist/**", "node_modules/**", "src/**/*.js", "*.config.{js,ts}"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooks,
    },
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // A feature may not import from another feature.
            {
              target: "./src/client/features/room",
              from: "./src/client/features",
              except: ["./room"],
            },
            {
              target: "./src/client/features/join",
              from: "./src/client/features",
              except: ["./join"],
            },
            // The app layer may not be imported by features.
            {
              target: "./src/client/features",
              from: "./src/client/app",
            },
            // Shared modules may not import from features or app
            // (unidirectional flow: shared -> features -> app).
            {
              target: [
                "./src/client/components",
                "./src/client/hooks",
                "./src/client/lib",
                "./src/client/stores",
              ],
              from: ["./src/client/features", "./src/client/app"],
            },
          ],
        },
      ],
    },
  },
);
