import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrompt } from "../use-prompt";

describe("usePrompt", () => {
  it("returns assembled prompt from string content", () => {
    const { result } = renderHook(() => usePrompt({ content: "Hello world" }));
    expect(result.current.prompt).toContain("Hello world");
  });

  it("returns filtered providers based on openIn", () => {
    const { result } = renderHook(() =>
      usePrompt({
        content: "Test",
        openIn: ["claude", "chatgpt"],
      })
    );
    expect(result.current.providers).toHaveLength(2);
    expect(result.current.providers.map((p) => p.id)).toEqual([
      "claude",
      "chatgpt",
    ]);
  });

  it("returns all providers by default", () => {
    const { result } = renderHook(() => usePrompt({ content: "Test" }));
    expect(result.current.providers).toHaveLength(3);
  });

  it("exposes copy function", () => {
    const { result } = renderHook(() => usePrompt({ content: "Test" }));
    expect(typeof result.current.copy).toBe("function");
  });

  it("exposes openIn function", () => {
    const { result } = renderHook(() => usePrompt({ content: "Test" }));
    expect(typeof result.current.openIn).toBe("function");
  });

  it("custom providers override defaults with same id", () => {
    const customClaude = {
      id: "claude",
      name: "My Claude",
      icon: "★",
      url: (prompt: string) =>
        `https://custom.ai/?q=${encodeURIComponent(prompt)}`,
    };
    const { result } = renderHook(() =>
      usePrompt({
        content: "Test",
        customProviders: [customClaude],
      })
    );
    const claude = result.current.providers.find((p) => p.id === "claude");
    expect(claude?.name).toBe("My Claude");
  });

  it("custom providers with formatPrompt are included in providers list", () => {
    const customProvider = {
      id: "custom",
      name: "Custom AI",
      icon: "⬡",
      url: (prompt: string) =>
        `https://custom.ai/?q=${encodeURIComponent(prompt)}`,
      formatPrompt: () => "custom formatted prompt",
    };
    const { result } = renderHook(() =>
      usePrompt({
        content: "Test",
        customProviders: [customProvider],
      })
    );
    const custom = result.current.providers.find((p) => p.id === "custom");
    expect(custom).toBeDefined();
    expect(custom?.formatPrompt).toBeDefined();
    expect(custom?.formatPrompt?.({ content: "x" })).toBe(
      "custom formatted prompt"
    );
  });
});
