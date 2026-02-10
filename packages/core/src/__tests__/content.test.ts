import { describe, it, expect } from "vitest";
import { extractContent } from "../content";

function makeElement(...children: HTMLElement[]): HTMLElement {
  const div = document.createElement("div");
  children.forEach((c) => div.appendChild(c));
  return div;
}

function p(text: string): HTMLParagraphElement {
  const el = document.createElement("p");
  el.textContent = text;
  return el;
}

function btn(text: string): HTMLButtonElement {
  const el = document.createElement("button");
  el.setAttribute("data-promptthis-trigger", "");
  el.textContent = text;
  return el;
}

describe("extractContent", () => {
  it("is a function", () => {
    expect(typeof extractContent).toBe("function");
  });

  it("extracts text content from an element", () => {
    const el = makeElement(p("Hello world"));
    const result = extractContent(el);
    expect(result).toContain("Hello world");
  });

  it("excludes elements matching the default selector", () => {
    const el = makeElement(p("Keep this"), btn("Remove me"));
    const result = extractContent(el);
    expect(result).toContain("Keep this");
    expect(result).not.toContain("Remove me");
  });

  it("excludes elements matching a custom selector", () => {
    const ad = document.createElement("span");
    ad.className = "ad";
    ad.textContent = "Ad";
    const el = makeElement(p("Content"), ad);
    const result = extractContent(el, { excludeSelector: ".ad" });
    expect(result).toContain("Content");
    expect(result).not.toContain("Ad");
  });

  it("truncates content exceeding maxLength", () => {
    const long = "x".repeat(200);
    const el = makeElement(p(long));
    const result = extractContent(el, { maxLength: 50 });
    expect(result).toContain("[Content truncated for length...]");
  });

  it("does not mutate the original element", () => {
    const el = makeElement(p("Text"), btn("Btn"));
    extractContent(el);
    expect(el.querySelector("[data-promptthis-trigger]")).not.toBeNull();
  });
});
