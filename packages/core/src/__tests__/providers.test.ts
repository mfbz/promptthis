import { describe, it, expect } from "vitest";
import {
  defaultProviders,
  mergeProviders,
  getProviderUrl,
  canUseDeepLink,
  createProvider,
} from "../providers";

describe("defaultProviders", () => {
  it("includes claude, chatgpt, perplexity", () => {
    const ids = defaultProviders.map((p) => p.id);
    expect(ids).toEqual(["claude", "chatgpt", "perplexity"]);
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

describe("mergeProviders", () => {
  it("returns defaults when no custom providers", () => {
    const result = mergeProviders();
    expect(result.map((p) => p.id)).toEqual([
      "claude",
      "chatgpt",
      "perplexity",
    ]);
  });

  it("prepends custom providers", () => {
    const custom = createProvider({
      id: "myai",
      name: "My AI",
      url: "https://myai.com?q={prompt}",
    });
    const result = mergeProviders([custom]);
    expect(result[0].id).toBe("myai");
    expect(result).toHaveLength(4);
  });

  it("custom provider overrides default with same id", () => {
    const custom = createProvider({
      id: "claude",
      name: "My Claude",
      url: "https://custom.ai?q={prompt}",
    });
    const result = mergeProviders([custom]);
    expect(result.find((p) => p.id === "claude")?.name).toBe("My Claude");
    expect(result).toHaveLength(3);
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

  it("uses custom provider to override a default", () => {
    const custom = {
      id: "claude",
      name: "My Claude",
      icon: "★",
      url: (prompt: string) =>
        `https://custom.ai/?q=${encodeURIComponent(prompt)}`,
    };
    const url = getProviderUrl("claude", "Hello", [custom]);
    expect(url).toContain("custom.ai");
    expect(url).not.toContain("claude.ai");
  });

  it("finds a custom-only provider", () => {
    const custom = {
      id: "myai",
      name: "My AI",
      icon: "⬡",
      url: (prompt: string) =>
        `https://myai.com/?q=${encodeURIComponent(prompt)}`,
    };
    const url = getProviderUrl("myai", "Hello", [custom]);
    expect(url).toContain("myai.com");
  });
});

describe("canUseDeepLink", () => {
  it("returns true for short prompts", () => {
    expect(canUseDeepLink("Hello world")).toBe(true);
  });

  it("returns false for very long prompts", () => {
    const long = "A".repeat(20000);
    expect(canUseDeepLink(long)).toBe(false);
  });

  it("checks encoded length, not raw length", () => {
    // Spaces encode to %20 (3 chars each), so 6000 spaces = 18000 encoded chars > 16000
    const spacey = " ".repeat(6000);
    expect(canUseDeepLink(spacey)).toBe(false);
  });

  it("accepts prompts within the 16000 limit", () => {
    const medium = "A".repeat(10000);
    expect(canUseDeepLink(medium)).toBe(true);
  });
});

describe("createProvider", () => {
  it("creates provider from template string url", () => {
    const p = createProvider({
      id: "myai",
      name: "My AI",
      url: "https://myai.com/chat?q={prompt}",
    });
    expect(p.id).toBe("myai");
    expect(p.name).toBe("My AI");
    expect(p.icon).toBe("⬡");
    expect(p.url("Hello")).toBe(
      `https://myai.com/chat?q=${encodeURIComponent("Hello")}`
    );
  });

  it("creates provider from function url", () => {
    const p = createProvider({
      id: "custom",
      name: "Custom",
      icon: "🤖",
      url: (prompt) => `https://custom.ai/?q=${encodeURIComponent(prompt)}`,
    });
    expect(p.icon).toBe("🤖");
    expect(p.url("Test")).toContain("custom.ai");
  });

  it("supports optional formatPrompt", () => {
    const fmt = () => "custom formatted";
    const p = createProvider({
      id: "fmt",
      name: "Fmt",
      url: "https://example.com?q={prompt}",
      formatPrompt: fmt,
    });
    expect(p.formatPrompt).toBe(fmt);
  });

  it("omits formatPrompt when not provided", () => {
    const p = createProvider({
      id: "nofmt",
      name: "No Fmt",
      url: "https://example.com?q={prompt}",
    });
    expect(p.formatPrompt).toBeUndefined();
  });
});
