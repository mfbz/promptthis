import { describe, it, expect, vi, beforeEach } from "vitest";
import { copyToClipboard } from "../clipboard";

describe("copyToClipboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("is a function", () => {
    expect(typeof copyToClipboard).toBe("function");
  });

  it("uses navigator.clipboard.writeText when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    const result = await copyToClipboard("hello");
    expect(writeText).toHaveBeenCalledWith("hello");
    expect(result).toBe(true);
  });

  it("falls back to execCommand when clipboard API throws", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    document.execCommand = vi.fn().mockReturnValue(true);
    const result = await copyToClipboard("fallback text");
    expect(document.execCommand).toHaveBeenCalledWith("copy");
    expect(result).toBe(true);
  });

  it("returns false when both methods fail", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    document.execCommand = vi.fn().mockReturnValue(false);
    const result = await copyToClipboard("fail");
    expect(result).toBe(false);
  });
});
