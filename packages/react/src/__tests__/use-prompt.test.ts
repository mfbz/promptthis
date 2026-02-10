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
    expect(result.current.providers).toHaveLength(4);
  });

  it("exposes copy function", () => {
    const { result } = renderHook(() => usePrompt({ content: "Test" }));
    expect(typeof result.current.copy).toBe("function");
  });

  it("exposes openIn function", () => {
    const { result } = renderHook(() => usePrompt({ content: "Test" }));
    expect(typeof result.current.openIn).toBe("function");
  });
});
