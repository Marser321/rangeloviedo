import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  {
    extends: [...next],
    rules: {
      // Marketing copy contains literal punctuation. The HTML parser handles ASCII
      // quotes/apostrophes inside JSX text fine — escaping them harms readability
      // and offers no real safety benefit here.
      "react/no-unescaped-entities": "off",
      // Hydration-safe client state (localStorage prefs, media-query matches)
      // requires reading the browser API inside useEffect and committing the
      // result via setState. This is the canonical SSR-safe pattern.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
