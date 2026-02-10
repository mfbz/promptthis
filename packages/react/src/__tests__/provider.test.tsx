import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { PromptProvider, usePromptContext } from "../provider";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <PromptProvider openIn={["claude"]} defaultRole="Test role.">
    {children}
  </PromptProvider>
);

describe("PromptProvider", () => {
  it("provides openIn to consumers", () => {
    const { result } = renderHook(() => usePromptContext(), { wrapper });
    expect(result.current.openIn).toEqual(["claude"]);
  });

  it("provides defaultRole to consumers", () => {
    const { result } = renderHook(() => usePromptContext(), { wrapper });
    expect(result.current.defaultRole).toBe("Test role.");
  });

  it("returns empty defaults without provider", () => {
    const { result } = renderHook(() => usePromptContext());
    expect(result.current.openIn).toBeUndefined();
    expect(result.current.defaultRole).toBeUndefined();
  });
});
