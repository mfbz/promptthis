export interface PositionConfig {
  offset?: number;
  padding?: number;
}

export interface PositionResult {
  side: "top" | "bottom";
  align: "start" | "end";
}

export function positionPopover(
  trigger: HTMLElement,
  popover: HTMLElement,
  config?: PositionConfig
): PositionResult {
  if (typeof window === "undefined") {
    return { side: "bottom", align: "end" };
  }

  const offset = config?.offset ?? 4;
  const padding = config?.padding ?? 8;
  const triggerRect = trigger.getBoundingClientRect();
  const popoverWidth = popover.offsetWidth;
  const popoverHeight = popover.offsetHeight;
  const viewportHeight = window.innerHeight;

  let side: "top" | "bottom" = "bottom";
  let align: "start" | "end" = "end";

  const spaceBelow = viewportHeight - triggerRect.bottom - offset;
  const spaceAbove = triggerRect.top - offset;
  if (popoverHeight + padding > spaceBelow && spaceAbove > spaceBelow) {
    side = "top";
  }

  if (triggerRect.right - popoverWidth < padding) {
    align = "start";
  }

  popover.setAttribute("data-side", side);
  popover.setAttribute("data-align", align);

  return { side, align };
}
