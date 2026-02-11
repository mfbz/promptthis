import { describe, it, expect, vi, beforeEach } from "vitest";
import { positionPopover } from "../position";

function mockTrigger(rect: Partial<DOMRect>): HTMLElement {
  const el = document.createElement("button");
  el.getBoundingClientRect = () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
    ...rect,
  });
  return el;
}

function mockPopover(width: number, height: number): HTMLElement {
  const el = document.createElement("div");
  Object.defineProperty(el, "offsetWidth", { value: width });
  Object.defineProperty(el, "offsetHeight", { value: height });
  return el;
}

describe("positionPopover", () => {
  beforeEach(() => {
    vi.stubGlobal("innerWidth", 1024);
    vi.stubGlobal("innerHeight", 768);
  });

  it("defaults to bottom + end when there is plenty of space", () => {
    const trigger = mockTrigger({
      top: 100,
      right: 500,
      bottom: 140,
      left: 400,
    });
    const popover = mockPopover(200, 150);
    const result = positionPopover(trigger, popover);
    expect(result).toEqual({ side: "bottom", align: "end" });
    expect(popover.getAttribute("data-side")).toBe("bottom");
    expect(popover.getAttribute("data-align")).toBe("end");
  });

  it("flips to top when near bottom edge", () => {
    const trigger = mockTrigger({
      top: 650,
      right: 500,
      bottom: 690,
      left: 400,
    });
    const popover = mockPopover(200, 150);
    const result = positionPopover(trigger, popover);
    expect(result.side).toBe("top");
    expect(popover.getAttribute("data-side")).toBe("top");
  });

  it("flips to start when near left edge", () => {
    const trigger = mockTrigger({ top: 100, right: 80, bottom: 140, left: 0 });
    const popover = mockPopover(200, 150);
    const result = positionPopover(trigger, popover);
    expect(result.align).toBe("start");
    expect(popover.getAttribute("data-align")).toBe("start");
  });

  it("flips to top + start at bottom-left corner", () => {
    const trigger = mockTrigger({ top: 700, right: 80, bottom: 740, left: 0 });
    const popover = mockPopover(200, 150);
    const result = positionPopover(trigger, popover);
    expect(result).toEqual({ side: "top", align: "start" });
  });

  it("keeps bottom + end at top-right corner", () => {
    const trigger = mockTrigger({
      top: 10,
      right: 1000,
      bottom: 50,
      left: 900,
    });
    const popover = mockPopover(200, 150);
    const result = positionPopover(trigger, popover);
    expect(result).toEqual({ side: "bottom", align: "end" });
  });

  it("respects custom offset", () => {
    const trigger = mockTrigger({
      top: 600,
      right: 500,
      bottom: 640,
      left: 400,
    });
    const popover = mockPopover(200, 100);
    // With default offset=4: spaceBelow = 768 - 640 - 4 = 124, popoverHeight+padding = 108 → fits
    const defaultResult = positionPopover(trigger, popover);
    expect(defaultResult.side).toBe("bottom");

    // With large offset=50: spaceBelow = 768 - 640 - 50 = 78, popoverHeight+padding = 108 → doesn't fit
    const customResult = positionPopover(trigger, popover, { offset: 50 });
    expect(customResult.side).toBe("top");
  });

  it("respects custom padding", () => {
    const trigger = mockTrigger({
      top: 100,
      right: 190,
      bottom: 140,
      left: 90,
    });
    const popover = mockPopover(200, 150);
    // With default padding=8: triggerRect.right - popoverWidth = 190 - 200 = -10 < 8 → flips to start
    const defaultResult = positionPopover(trigger, popover);
    expect(defaultResult.align).toBe("start");

    // With padding=0: -10 < 0 → still flips
    const trigger2 = mockTrigger({
      top: 100,
      right: 201,
      bottom: 140,
      left: 101,
    });
    const result2 = positionPopover(trigger2, popover, { padding: 0 });
    expect(result2.align).toBe("end");
  });

  it("sets data-side and data-align attributes on popover", () => {
    const trigger = mockTrigger({ top: 700, right: 80, bottom: 740, left: 0 });
    const popover = mockPopover(200, 150);
    positionPopover(trigger, popover);
    expect(popover.getAttribute("data-side")).toBe("top");
    expect(popover.getAttribute("data-align")).toBe("start");
  });

  it("handles zero-size elements gracefully", () => {
    const trigger = mockTrigger({});
    const popover = mockPopover(0, 0);
    const result = positionPopover(trigger, popover);
    expect(result.side).toBe("bottom");
    // align flips to "start" because 0 - 0 = 0 < 8 (padding)
    expect(result.align).toBe("start");
  });
});
