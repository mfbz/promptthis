import { describe, it, expect } from "vitest";
import { defaultProviders, getProviderUrl, canUseDeepLink } from "../providers";

describe("defaultProviders", () => {
  it("includes claude, chatgpt, gemini, perplexity", () => {
    const ids = defaultProviders.map((p) => p.id);
    expect(ids).toEqual(["claude", "chatgpt", "gemini", "perplexity"]);
  });

  it("each provider has id, name, icon, url", () => {
    for (const p of defaultProviders) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(typeof p.url).toBe("function");
    }
  });
});

describe("getProviderUrl", () => {
  it("returns a URL for known provider", () => {
    const url = getProviderUrl("claude", "Hello");
    expect(url).toContain("claude.ai");
    expect(url).toContain(encodeURIComponent("Hello"));
  });

  it("returns null for unknown provider", () => {
    expect(getProviderUrl("unknown", "Hello")).toBeNull();
  });
});

describe("canUseDeepLink", () => {
  it("returns true for short prompts", () => {
    expect(canUseDeepLink("Hello world")).toBe(true);
  });

  it("returns false for very long prompts", () => {
    const long = "A".repeat(2000);
    expect(canUseDeepLink(long)).toBe(false);
  });

  it("checks encoded length, not raw length", () => {
    // Spaces encode to %20 (3 chars each), so 700 spaces = 2100 encoded chars
    const spacey = " ".repeat(700);
    expect(canUseDeepLink(spacey)).toBe(false);
  });
});
