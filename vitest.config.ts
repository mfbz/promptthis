import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "core",
          include: [
            "packages/core/src/__tests__/prompt.test.ts",
            "packages/core/src/__tests__/providers.test.ts",
          ],
        },
      },
      {
        test: {
          name: "core-dom",
          include: [
            "packages/core/src/__tests__/clipboard.test.ts",
            "packages/core/src/__tests__/content.test.ts",
            "packages/core/src/__tests__/position.test.ts",
          ],
          environment: "jsdom",
        },
      },
      {
        test: {
          name: "react",
          include: ["packages/react/**/*.test.{ts,tsx}"],
          environment: "jsdom",
        },
      },
    ],
  },
});
