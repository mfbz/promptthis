import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/promptthis.ts"],
  format: ["esm", "cjs", "iife"],
  globalName: "PromptThis",
  dts: true,
  clean: true,
  sourcemap: true,
  noExternal: ["@promptthis/core"],
});
