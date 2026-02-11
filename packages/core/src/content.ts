export interface ExtractOptions {
  maxLength?: number;
  excludeSelector?: string;
}

const DEFAULT_MAX_LENGTH = 12000;
const DEFAULT_EXCLUDE = ".promptthis-btn,[data-promptthis-trigger]";

export function extractContent(
  element: HTMLElement,
  options?: ExtractOptions
): string {
  if (typeof document === "undefined") {
    return "";
  }
  const maxLength = options?.maxLength ?? DEFAULT_MAX_LENGTH;
  const exclude = options?.excludeSelector ?? DEFAULT_EXCLUDE;

  const clone = element.cloneNode(true) as HTMLElement;
  clone.querySelectorAll(exclude).forEach((el) => el.remove());

  let text = (clone.innerText || clone.textContent || "").trim();
  text = text.replace(/\n{3,}/g, "\n\n");

  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + "\n[Content truncated for length...]";
  }

  return text;
}
