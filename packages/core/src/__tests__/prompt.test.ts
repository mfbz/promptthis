import { describe, it, expect } from "vitest";
import { buildPrompt } from "../prompt";

describe("buildPrompt", () => {
  it("builds a basic prompt with just content", () => {
    const result = buildPrompt({ content: "Hello world" });
    expect(result).toContain("Hello world");
    expect(result).toContain("Help me with the above content.");
  });

  it("includes role when provided", () => {
    const result = buildPrompt({
      content: "Some content",
      role: "You are a senior developer.",
    });
    expect(result).toMatch(/^You are a senior developer\./);
  });

  it("includes context when provided", () => {
    const result = buildPrompt({
      content: "Some content",
      context: "The user is a beginner.",
    });
    expect(result).toContain("The user is a beginner.");
  });

  it("uses custom instruction when provided", () => {
    const result = buildPrompt({
      content: "Some content",
      instruction: "Explain this step by step",
    });
    expect(result).toContain("Explain this step by step");
    expect(result).not.toContain("Help me with the above content.");
  });

  it("assembles in correct order: role, context, content, instruction", () => {
    const result = buildPrompt({
      content: "The content",
      role: "You are an expert.",
      context: "Background info.",
      instruction: "Do the thing.",
    });
    const roleIdx = result.indexOf("You are an expert.");
    const contextIdx = result.indexOf("Background info.");
    const contentIdx = result.indexOf("The content");
    const instructionIdx = result.indexOf("Do the thing.");
    expect(roleIdx).toBeLessThan(contextIdx);
    expect(contextIdx).toBeLessThan(contentIdx);
    expect(contentIdx).toBeLessThan(instructionIdx);
  });

  it("collapses multiple blank lines in content", () => {
    const result = buildPrompt({ content: "Line 1\n\n\n\n\nLine 2" });
    expect(result).toContain("Line 1\n\nLine 2");
    expect(result).not.toContain("\n\n\n");
  });

  it("trims content whitespace", () => {
    const result = buildPrompt({ content: "   Hello   " });
    expect(result).toContain("---\nHere is the content:\n\nHello\n\n---");
  });

  it("truncates content exceeding max length", () => {
    const longContent = "A".repeat(15000);
    const result = buildPrompt({ content: longContent });
    expect(result).toContain("[Content truncated for length...]");
    expect(result.indexOf("A".repeat(12000))).toBeGreaterThan(-1);
  });
});
